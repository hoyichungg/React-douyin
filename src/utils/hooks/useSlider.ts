import { useRef, useState, useEffect } from 'react';
import { checkEvent } from '../check';
import { _css } from '../dom';
import { SlideType } from '../const_var';
import useEventBus from './useEventBus';

const useSlider = (sliderType: number) => {
  const { emit } = useEventBus();
  const wrapperEl = useRef(null);

  const [state, setState] = useState({
    judgeValue: 20,
    type: sliderType,
    name: '',
    localIndex: 0,
    needCheck: true,
    next: false,
    isDown: false,
    start: { x: 0, y: 0, time: 0 },
    move: { x: 0, y: 0 },
    wrapper: { width: 0, height: 0, childrenLength: 0 }
  });

  /**
   * 初始化
   */
  useEffect(() => {
    const el = wrapperEl.current;
    if (!el) return;

    const updateDimensions = () => {
      setState(prevState => ({
        ...prevState,
        wrapper: {
          ...prevState.wrapper,
          width: _css(el, 'width'),
          height: _css(el, 'height'),
          childrenLength: el.children.length
        }
      }));
    };

    updateDimensions(); // 初始化尺寸

    // 監聽resize事件以更新尺寸
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  //機算偏移量transform
  useEffect(() => {
    if (!wrapperEl.current) return;

    const t = getSlideOffset(wrapperEl.current);
    let dx1 = 0, dx2 = 0;
    if (state.type === SlideType.HORIZONTAL) {
      dx1 = t;
    } else {
      dx2 = t;
    }
    _css(wrapperEl.current, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`);
  }, [state.type]);  // 響應類型變化

  /**
   * 偵測對應方向上能否允許滑動,例如SlideHorizontal元件就只處理左右滑動事件,SlideVertical只處理上下滑動事件
   * @returns {boolean}
   */
  const canSlide = (): boolean => {
    // 每次都需要檢查,up事件會重製會重製true
    if (state.needCheck) {
      // 判斷move x和y的距離是否大於判斷值,因為距離太小無法判斷滑動方向
      if (Math.abs(state.move.x) > state.judgeValue || Math.abs(state.move.y) > state.judgeValue) {
        // 放大再相除,根據長寬比方向判斷,angle大於1就是左右滑動,小於1是上下滑動
        const angle = (Math.abs(state.move.x) * 10) / (Math.abs(state.move.y) * 10)
        // 根據type判斷能否滑動,並記錄下來,後續不再判斷,直接返回紀錄值
        state.next = state.type === SlideType.HORIZONTAL ? angle > 1 : angle <= 1
        state.needCheck = false
      } else {
        return false
      }
    }
    return state.next
  }

  /**
   * 可不可以繼續滑動
   * @param isNext 朝向,向右或向下
   * @returns {boolean}
   */
  const canNext = (isNext: boolean): boolean => {
    return !(
      (state.localIndex === 0 && !isNext) ||
      (state.localIndex === state.wrapper.childrenLength - 1 && isNext)
    )
  }

  /**
   * 根據當前index,獲取slide偏移距離
   * 如果每個頁面的寬度是相同都是100%,只需要當前index * wrapper的寬(高)即可:localIndex * wrapper.width
   */
  const getSlideOffset = (el: HTMLDivElement) => {
    if (state.type === SlideType.HORIZONTAL) {
      let widths = []
      // 獲取所有子元素的寬度
      Array.from(el.children).map((v) => {
        widths.push(v.getBoundingClientRect().width)
      })
      // 取0到當前index的子元素的寬度
      widths = widths.slice(0, state.localIndex)
      if (widths.length) {
        return -widths.reduce((a, b) => a + b)
      }
      return 0
    }
  }

  /**
   * 開始滑動
   * @param e
   * @param el
   * @param name
  */
  const slideTouchStart = (e, el: HTMLDivElement, name: string) => {
    if (!checkEvent(e)) return
    _css(el, 'transition-duration', `0ms`)
    setState(prevState => ({
      ...prevState,
      name,
      start: {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        time: Date.now()
      },
      isDown: true
    }))
  }

  /**
   * move事件
   * @param e
   * @param el
   * @param name
   * @param canNextCb 是否能繼續滑的回調
   * @param notNextCb 不能繼續滑的回調
   * @param slideOtherDirectionCb 滑動其他方向時的回調,目前用於圖集進於放大模式後,上下滑動推出放大模式
  */
  const slideTouchMove = (
    e,
    el: HTMLDivElement,
    name: string,
    canNextCb = null,
    notNextCb = null,
    slideOtherDirectionCb = null
  ) => {
    if (!checkEvent(e)) return
    if (!state.isDown) return

    setState(prevState => ({
      ...prevState,
      move: {
        x: e.touches[0].pageX - prevState.start.x,
        y: e.touches[0].pageY - prevState.start.y
      }
    }))

    // 檢查是否能滑動
    const canSlideRes = canSlide(state)

    // 是否再往頭或尾滑動
    const isNext = state.type === SlideType.HORIZONTAL ? state.move.x < 0 : state.move.y < 0

    if (canSlideRes) {
      if (!canNextCb) canNextCb = canNext
      if (canNextCb(isNext)) {
        window.isMoved = true
        // 能滑動,就把事件捕獲,不能給父組件處裡
        // e.stopPropagation(e)
        if (state.type === SlideType.HORIZONTAL) {
          emit(state.type, name + '-moveX', state.move.x)
        }
        // 獲取偏移量
        const t = getSlideOffset(el) + (isNext ? state.judgeValue : -state.judgeValue)
        let dx1 = 0, dx2 = 0;
        // 偏移量加當前手指頭移動的距離就是slide要偏移的值
        if (state.type === SlideType.HORIZONTAL) {
          dx1 = t + state.move.x
        } else {
          dx2 = t + state.move.y
        }
        _css(el, 'transition-duration', `0ms`)
        _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
      } else {
        notNextCb?.()
      }
    } else {
      slideOtherDirectionCb?.(e)
    }
  }

  /**
   * 滑動結束事件
   * @param e
   * @param canNextCb
   * @param nextCb
   * @param notNextCb
   * @returns {*}
   */
  const slideTouchEnd = (e, canNextCb = null, nextCb = null, notNextCb = null) => {
    if (!checkEvent(e)) return
    if (!state.isDown) return

    if (state.next) {
      const isHorizontal = state.type === SlideType.HORIZONTAL
      const isNext = isHorizontal ? state.move.x < 0 : state.move.y < 0

      if (!canNextCb) canNextCb = canNext
      if (canNextCb(isNext)) {
        const endTime = Date.now()
        let gapTime = endTime - state.start.time
        const distance = isHorizontal ? state.move.x : state.move.y
        const judgeValue = isHorizontal ? state.wrapper.width : state.wrapper.height
        // 1.距離太短,直接不通過
        if (Math.abs(distance) < 20) gapTime = 1000
        // 2.距離太長,直接通過
        if (Math.abs(distance) > judgeValue / 3) gapTime = 100
        // 3.若不再上述兩種狀況,只需要判斷時間即可
        if (gapTime < 150) {
          if (isNext) {
            state.localIndex++
          }
          else {
            state.localIndex--
          }
          return nextCb?.(isNext)
        }
      } else {
        return notNextCb?.()
      }
    } else {
      notNextCb?.()
    }
  }

  /**
   * 結束後重製變量
   * @param e
   * @param el
   * @param name
   */
  const slideReset = (e, el: HTMLDivElement, name: string,) => {
    if (!checkEvent(e)) return

    _css(el, 'transition-duration', `300ms`)

    const t = getSlideOffset(el)
    let dx1 = 0
    let dx2 = 0
    if (state.type === SlideType.HORIZONTAL) {
      emit(name + '-end', state.localIndex)
      dx1 = t
    } else {
      emit(name + '-end')
      dx2 = t
    }
    _css(el, 'transform', `translate3d(${dx1}px, ${dx2}px, 0)`)
    setState(prevState => ({
      ...prevState,
      start: {
        ...prevState.start,
        x: 0,
        y: 0,
        time: 0
      },
      move: {
        ...prevState.move,
        x: 0,
        y: 0
      },
      next: false,
      needCheck: true,
      isDown: false
    }));

    setTimeout(() => {
      window.isMoved = false
    }, 200)
    emit?.('update:index', state.localIndex)
  }

  return {
    state,
    wrapperEl,
    slideTouchStart,
    slideTouchMove,
    slideTouchEnd,
    slideReset
  }
}

export default useSlider;

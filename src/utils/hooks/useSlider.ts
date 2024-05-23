import { useRef, useState } from 'react';
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

  const canSlide = () => {
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
   * 開始滑動
   * @param e
   * @param el
   * @param name
  */
  const slideTouchStart = (e, el, name) => {
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
    el,
    name,
    canNextCb = null,
    notNextCb = null,
    // slideOtherDirectionCb = null
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
        e.stopPropagation(e)
        if (state.type === SlideType.HORIZONTAL) {
          emit(state.type, state.name + '-moveX', state.move.x)
        }
      }

    } else {
      notNextCb?.()
    }
  }

  return {
    state,
    wrapperEl,
    slideTouchStart,
    slideTouchMove
  }
}

export default useSlider;

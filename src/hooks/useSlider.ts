import { useRef, useState } from 'react';
import { checkEvent } from '../utils/check';
import { _css } from '../utils/dom';

const useSlider = () => {
  const wrapperEl = useRef(null);

  const [state, setState] = useState({
    judgeValue: 20,
    type: 'HORIZONTAL',
    localIndex: 0,
    needCheck: true,
    next: false,
    isDown: false,
    start: { x: 0, y: 0, time: 0 },
    move: { x: 0, y: 0 },
    wrapper: { width: 0, height: 0, childrenLength: 0 }
  });


  /**
   * 開始滑動
   * @param e
   * @param el
  */
  const slideTouchStart = (e, el) => {
    if (!checkEvent(e)) return
    _css(el, 'transition-duration', `0ms`)
    setState(prevState => ({
      ...prevState,
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
   * @param canNextCb 是否能繼續滑的回調
   * @param notNextCb 不能繼續滑的回調
   * @param slideOtherDirectionCb 滑動其他方向時的回調，目前用於圖集進於放大模式後，上下滑動推出放大模式
  */
  // const slideTouchMove = (e, el, canNextCb = null, notNextCb = null, slideOtherDirectionCb = null) => {

  // }

  return {
    state,
    wrapperEl,
    slideTouchStart
  }
}

export default useSlider;

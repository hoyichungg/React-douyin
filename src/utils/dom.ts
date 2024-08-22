//適合在需要動態控制元素樣式的場景中使用，尤其是在動畫、回應使用者操作或條件渲染樣式時
export function _css(el, key, value?) {
  const reg = /^-?\d+.?\d*(px|pt|em|rem|vw|vh|%|rpx|ms)$/i
  if (value === undefined) {
    let val = null
    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(el, null)[key]
    } else {
      val = el.currentStyle[key]
    }
    return reg.test(val) ? parseFloat(val) : val
    // return parseFloat(val)
  } else {
    if (
      [
        'top',
        'left',
        'bottom',
        'right',
        'width',
        'height',
        'font-size',
        'margin',
        'padding'
      ].includes(key)
    ) {
      if (!reg.test(value)) {
        if (!String(value).includes('calc')) {
          value += 'px'
        }
      }
    }
    if (key === 'transform') {
      el.style.webkitTransform =
        el.style.MsTransform =
        el.style.msTransform =
        el.style.MozTransform =
        el.style.OTransform =
        el.style.transform =
          value
    } else {
      el.style[key] = value
    }
  }
}

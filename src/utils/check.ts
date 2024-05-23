// 主要用於處理事件物件 e，使其能夠在不同的裝置上（尤其是在行動裝置和非行動裝置之間）以一致的方式使用
export const checkEvent = (e) => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
  // React 使用的是合成事件（SyntheticEvent）而不是原生的 DOM 事件。 React 為了提高效能和跨瀏覽器相容性，對所有 DOM 事件進行了封裝，產生了合成事件
  // React 中存取原生事件物件以執行特定的類型檢查，可以使用 nativeEvent 屬性
  if (!isMobile || (isMobile && e.nativeEvent instanceof PointerEvent)) {
    e.touches = [
      {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY
      }
    ]
  }
  return true
}

const subscribers = new Set()

let raf = 0

function notify() {
  raf = 0
  const y = window.scrollY
  subscribers.forEach((callback) => callback(y))
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(notify)
}

/**
 * 全站共享的滚动 / 视口尺寸通知。
 * 多个组件同时需要滚动数据时，浏览器只挂一个 scroll 和一个 resize 监听。
 */
export default function subscribeViewport(callback) {
  subscribers.add(callback)
  if (subscribers.size === 1) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  }

  callback(window.scrollY)

  return () => {
    subscribers.delete(callback)
    if (!subscribers.size) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
  }
}

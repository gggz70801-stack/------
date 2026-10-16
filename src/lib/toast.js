const listeners = new Set()
let hideTimer = null

export function showToast(message) {
  listeners.forEach((fn) => fn(message))
  window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    listeners.forEach((fn) => fn(''))
  }, 2000)
}

export function subscribeToast(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export async function copyText(text, label = '联系方式') {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    showToast(`${label}已复制：${text}`)
  } catch {
    showToast('复制失败，请手动选择文本')
  }
}

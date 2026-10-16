import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * React Bits「AnimatedContent」的零依赖实现
 * ------------------------------------------------------------------
 * 原版依赖 GSAP + ScrollTrigger（约 40KB gzip）。本站规则是「能用原生能力解决就不装包」，
 * 所以这里用 IntersectionObserver + requestAnimationFrame 复刻同一套属性，用法和原版一致：
 *
 *   <AnimatedContent distance={60} blur={8} stagger={0.08}>
 *     <h2>标题</h2>
 *     <p>正文</p>
 *   </AnimatedContent>
 *
 * 支持：as / distance / direction / reverse / duration / ease / initialOpacity / animateOpacity /
 *      scale / blur / rotate / tilt / wipe / threshold / delay / stagger / staggerFrom /
 *      trigger / once / scrub / disappearAfter / disappearDuration / disappearEase / onStart 等回调
 *
 * 说明：stagger > 0 时，动画作用在「直接子元素」上（一个一个进场）；
 *      为 0 时整块一起进场。wipe 用遮罩推入，center 用圆形裁切。
 */

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const clamp01 = (v) => Math.min(1, Math.max(0, v))

/* ---------------- 缓动：GSAP 命名 → 纯函数 ---------------- */

const power = (n) => ({
  in: (t) => Math.pow(t, n),
  out: (t) => 1 - Math.pow(1 - t, n),
  inOut: (t) => (t < 0.5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 - 2 * t, n) / 2),
})

const EASES = {
  linear: { in: (t) => t, out: (t) => t, inOut: (t) => t },
  power1: power(2),
  power2: power(3),
  power3: power(4),
  power4: power(5),
  quad: power(2),
  cubic: power(3),
  quart: power(4),
  quint: power(5),
  sine: {
    in: (t) => 1 - Math.cos((t * Math.PI) / 2),
    out: (t) => Math.sin((t * Math.PI) / 2),
    inOut: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  },
  expo: {
    in: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    out: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inOut: (t) =>
      t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  },
  circ: {
    in: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    out: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    inOut: (t) =>
      t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(2 - 2 * t, 2)) + 1) / 2,
  },
  back: (() => {
    const c1 = 1.70158
    const c3 = c1 + 1
    const c2 = c1 * 1.525
    return {
      in: (t) => c3 * t * t * t - c1 * t * t,
      out: (t) => 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2),
      inOut: (t) =>
        t < 0.5
          ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
          : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2,
    }
  })(),
}

/** 手写一个极小的 cubic-bezier 求值，方便直接写 CSS 里的贝塞尔曲线 */
function bezier(x1, y1, x2, y2) {
  const A = (a, b) => 1 - 3 * b + 3 * a
  const B = (a, b) => 3 * b - 6 * a
  const C = (a) => 3 * a
  const calc = (t, a, b) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t
  const slope = (t, a, b) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a)
  return (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i += 1) {
      const s = slope(t, x1, x2)
      if (Math.abs(s) < 1e-6) break
      t -= (calc(t, x1, x2) - x) / s
    }
    return calc(t, y1, y2)
  }
}

function resolveEase(name) {
  if (typeof name === 'function') return name
  const raw = String(name || '').trim()
  if (!raw) return EASES.power3.out

  const bezierMatch = raw.match(/^cubic-bezier\(([^)]+)\)$/)
  if (bezierMatch) {
    const nums = bezierMatch[1].split(',').map((n) => Number(n.trim()))
    if (nums.length === 4 && nums.every((n) => Number.isFinite(n))) return bezier(...nums)
    return EASES.power3.out
  }

  const m = raw.match(/^([a-zA-Z]+[0-9]?)(?:\.(in|out|inOut))?$/)
  const base = EASES[(m?.[1] || 'power3').toLowerCase()] || EASES.power3
  const mode = m?.[2] || 'out'
  return base[mode] || base.out
}

/* ---------------- 入场方向 / 遮罩 ---------------- */

const WIPE_MASK = {
  up: { image: 'linear-gradient(to top, #000 45%, transparent 62%)', from: [0, 0], to: [0, 100] },
  down: { image: 'linear-gradient(to bottom, #000 45%, transparent 62%)', from: [0, 100], to: [0, 0] },
  left: { image: 'linear-gradient(to left, #000 45%, transparent 62%)', from: [0, 0], to: [100, 0] },
  right: { image: 'linear-gradient(to right, #000 45%, transparent 62%)', from: [100, 0], to: [0, 0] },
}

function staggerRank(count, from) {
  const list = Array.from({ length: count }, (_, i) => i)
  const center = (count - 1) / 2
  let sorted = list
  if (from === 'end') sorted = [...list].reverse()
  else if (from === 'center') sorted = [...list].sort((a, b) => Math.abs(a - center) - Math.abs(b - center))
  else if (from === 'edges') sorted = [...list].sort((a, b) => Math.abs(b - center) - Math.abs(a - center))
  else if (from === 'random') sorted = [...list].sort(() => Math.random() - 0.5)
  const rank = new Array(count)
  sorted.forEach((value, order) => {
    rank[value] = order
  })
  return rank
}

function createPainter({
  distance,
  direction,
  reverse,
  scale,
  initialOpacity,
  animateOpacity,
  blur,
  rotate,
  tilt,
  wipe,
}) {
  const horizontal = direction === 'horizontal'
  const sign = reverse ? -1 : 1
  const travel = distance * sign
  const tiltFrom = horizontal ? -tilt * sign : tilt * sign
  const mask = WIPE_MASK[wipe]
  const radial = wipe === 'center'

  return (node, p) => {
    const parts = []
    if (tilt) parts.push('perspective(900px)')
    const x = horizontal ? travel * (1 - p) : 0
    const y = horizontal ? 0 : travel * (1 - p)
    if (x || y) parts.push(`translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`)
    if (scale !== 1) parts.push(`scale(${(scale + (1 - scale) * p).toFixed(4)})`)
    if (rotate) parts.push(`rotate(${(rotate * sign * (1 - p)).toFixed(3)}deg)`)
    if (tilt) parts.push(`${horizontal ? 'rotateY' : 'rotateX'}(${(tiltFrom * (1 - p)).toFixed(3)}deg)`)
    // 到位后把内联样式清掉：不留 transform / filter，避免多出无谓的合成层
    node.style.transform = parts.length ? parts.join(' ') : ''

    node.style.opacity = animateOpacity ? (p >= 1 ? '' : (initialOpacity + (1 - initialOpacity) * p).toFixed(4)) : ''

    if (blur > 0) node.style.filter = p >= 1 ? '' : `blur(${(blur * (1 - p)).toFixed(2)}px)`

    if (radial) {
      // 从中心向外张开：圆形裁切，边到边时正好铺满（150% 半径足够覆盖四角）
      node.style.clipPath = p >= 1 ? 'none' : `circle(${(p * 150).toFixed(2)}% at 50% 50%)`
    } else if (mask) {
      const mx = mask.from[0] + (mask.to[0] - mask.from[0]) * p
      const my = mask.from[1] + (mask.to[1] - mask.from[1]) * p
      node.style.maskImage = mask.image
      node.style.webkitMaskImage = mask.image
      node.style.maskSize = '100% 300%'
      node.style.webkitMaskSize = '100% 300%'
      node.style.maskRepeat = 'no-repeat'
      node.style.webkitMaskRepeat = 'no-repeat'
      node.style.maskPosition = `${mx.toFixed(2)}% ${my.toFixed(2)}%`
      node.style.webkitMaskPosition = `${mx.toFixed(2)}% ${my.toFixed(2)}%`
    }
  }
}

function clearPainterStyles(node) {
  node.style.transform = ''
  node.style.opacity = ''
  node.style.filter = ''
  node.style.clipPath = ''
  node.style.maskImage = ''
  node.style.webkitMaskImage = ''
  node.style.maskSize = ''
  node.style.webkitMaskSize = ''
  node.style.maskRepeat = ''
  node.style.webkitMaskRepeat = ''
  node.style.maskPosition = ''
  node.style.webkitMaskPosition = ''
  node.style.willChange = ''
}

export default function AnimatedContent({
  children,
  as: Tag = 'div',
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  blur = 0,
  rotate = 0,
  tilt = 0,
  wipe = 'none',
  threshold = 0.1,
  delay = 0,
  stagger = 0,
  staggerFrom = 'start',
  trigger = 'scroll',
  once = true,
  scrub = false,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onStart,
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null)
  const callbacks = useRef({ onStart, onComplete, onDisappearanceComplete })
  callbacks.current = { onStart, onComplete, onDisappearanceComplete }

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const containerEl =
      typeof container === 'string' ? document.querySelector(container) : container || null

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const painter = createPainter({
      distance,
      direction,
      reverse,
      scale,
      initialOpacity,
      animateOpacity,
      blur,
      rotate,
      tilt,
      wipe,
    })
    const kids = stagger > 0 && el.children.length > 1 ? Array.from(el.children) : [el]
    const ranks = stagger > 0 ? staggerRank(kids.length, staggerFrom) : kids.map(() => 0)
    const easeIn = resolveEase(ease)
    const easeOut = resolveEase(disappearEase)
    const progress = kids.map(() => 0)

    let raf = 0
    let hideTimer = 0
    let guardTimer = 0
    let alive = true
    let entered = false

    const setProgress = (index, p) => {
      progress[index] = clamp01(p)
      painter(kids[index], progress[index])
    }

    const paintAll = (p) => {
      kids.forEach((node, i) => {
        node.style.willChange = ''
        setProgress(i, p)
      })
    }

    const tween = (to, seconds, easing, startDelay, onEnd) => {
      if (raf) cancelAnimationFrame(raf)
      const from = [...progress]
      const total = Math.max(0, seconds) * 1000
      const begin = performance.now() + Math.max(0, startDelay) * 1000
      const stepGap = Math.max(0, stagger) * 1000

      kids.forEach((node, i) => {
        if (ranks[i] > 0) node.style.willChange = 'transform, opacity, filter'
      })

      const frame = (now) => {
        raf = 0
        if (!alive) return
        let done = true
        kids.forEach((node, i) => {
          const wait = ranks[i] * stepGap
          const raw = total > 0 ? (now - begin - wait) / total : 1
          const p = clamp01(raw)
          if (p < 1) done = false
          const eased = easing(p)
          setProgress(i, from[i] + (to - from[i]) * eased)
          if (p >= 1) node.style.willChange = ''
        })
        if (done) {
          onEnd?.()
          return
        }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    const playIn = () => {
      entered = true
      callbacks.current.onStart?.()
      tween(1, duration, easeIn, delay, () => {
        callbacks.current.onComplete?.()
        if (disappearAfter > 0) {
          hideTimer = window.setTimeout(() => {
            tween(0, disappearDuration, easeOut, 0, () =>
              callbacks.current.onDisappearanceComplete?.()
            )
          }, disappearAfter * 1000)
        }
      })
    }

    const playOut = () => {
      if (hideTimer) window.clearTimeout(hideTimer)
      tween(0, disappearDuration, easeOut, 0, () => callbacks.current.onDisappearanceComplete?.())
    }

    /* ---------- 减少动效：直接显示，不留动画 ---------- */
    if (reduce) {
      paintAll(1)
      callbacks.current.onComplete?.()
      return () => {
        alive = false
      }
    }

    /* ---------- 初始隐藏 ---------- */
    paintAll(0)

    if (trigger === 'mount') {
      playIn()
      return () => {
        alive = false
        if (raf) cancelAnimationFrame(raf)
        if (hideTimer) window.clearTimeout(hideTimer)
        kids.forEach(clearPainterStyles)
      }
    }

    /* ---------- scrub：动画进度直接跟滚动条绑在一起 ---------- */
    if (scrub) {
      const smooth = scrub === true ? 0 : Math.max(Number(scrub) || 0, 0.01)
      let target = 0
      let current = 0
      let last = 0

      const read = () => {
        const rect = el.getBoundingClientRect()
        const frameH = containerEl ? containerEl.getBoundingClientRect().height : window.innerHeight
        const top = containerEl ? rect.top - containerEl.getBoundingClientRect().top : rect.top
        const startAt = frameH * (1 - threshold)
        const span = Math.max(frameH * 0.45, 1)
        return clamp01((startAt - top) / span)
      }

      const loop = (now) => {
        raf = 0
        if (!alive) return
        const dt = Math.min(0.1, Math.max(0.001, (now - last) / 1000))
        last = now
        const k = smooth > 0 ? 1 - Math.exp(-dt / (smooth / 3)) : 1
        current += (target - current) * k
        kids.forEach((node, i) => {
          progress[i] = current
          painter(node, current)
        })
        if (Math.abs(target - current) > 0.001) raf = requestAnimationFrame(loop)
      }

      const onScroll = () => {
        target = read()
        if (raf) return
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      if (containerEl) containerEl.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      callbacks.current.onStart?.()

      return () => {
        alive = false
        if (raf) cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        if (containerEl) containerEl.removeEventListener('scroll', onScroll)
        kids.forEach(clearPainterStyles)
      }
    }

    /* ---------- 滚动触发 ---------- */
    /*
      阈值换算：threshold = 0.1 表示"元素顶边走到视口 90% 高度处就触发"（越靠近底边越早），
      对应到 IntersectionObserver 就是把 root 底边往上收 10%。
      注意不是 (1 - threshold)——那样会变成"必须顶到窗口最上方 15% 才触发"，元素会一直藏着。
    */
    const rootMarginBottom = Math.min(Math.max(threshold, 0), 0.9) * 100
    const options = {
      root: containerEl || null,
      rootMargin: `0px 0px -${rootMarginBottom.toFixed(2)}% 0px`,
      threshold: 0,
    }

    if (typeof IntersectionObserver === 'undefined') {
      paintAll(1)
      callbacks.current.onComplete?.()
      return () => {
        alive = false
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entered || !once) playIn()
          if (once) observer.unobserve(entry.target)
          return
        }
        if (!once && entered) playOut()
      })
    }, options)

    observer.observe(el)

    // 保险：万一观察器没触发，也保证内容不会一直藏着
    guardTimer = window.setTimeout(() => {
      if (entered) return
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < viewport && rect.bottom > 0) playIn()
    }, 1500)

    return () => {
      alive = false
      if (raf) cancelAnimationFrame(raf)
      if (hideTimer) window.clearTimeout(hideTimer)
      if (guardTimer) window.clearTimeout(guardTimer)
      observer.disconnect()
      kids.forEach(clearPainterStyles)
    }
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    blur,
    rotate,
    tilt,
    wipe,
    threshold,
    delay,
    stagger,
    staggerFrom,
    trigger,
    once,
    scrub,
    disappearAfter,
    disappearDuration,
    disappearEase,
  ])

  return (
    <Tag ref={ref} className={className || undefined} style={style} {...rest}>
      {children}
    </Tag>
  )
}

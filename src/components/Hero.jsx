import { useEffect, useRef, useState } from 'react'
import HeroPoster from './HeroPoster'
import TechText from './TechText'
import { hero } from '../data/profile'
import './hero.css'

/**
 * 首屏结构（电影海报式）：
 *  - 全幅画面铺满整屏（导航悬浮其上）
 *  - 文字组压在画面下方：巨字标题 → 底部标语
 *  - 文字背后用柔和压暗 + 羽化过渡与画面融合，不使用硬边黑条
 *
 * 加载顺序（体积优化 + 秒开）：
 *  1. HeroPoster 矢量海报立刻出现（无需下载任何素材）
 *  2. 视频只带 poster 静帧（156KB），不预载视频本体
 *  3. 浏览器空闲后再加载并播放视频，失败则保持静帧/矢量画面
 */
export default function Hero() {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const play = () => video.play().catch(() => {})
    let id
    if (typeof window.requestIdleCallback === 'function') {
      id = window.requestIdleCallback(play, { timeout: 2000 })
    } else {
      id = window.setTimeout(play, 1200)
    }
    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero__media">
        <HeroPoster />

        {hero.image && <img className="hero__image" src={hero.image} alt="" />}

        {hero.video && !failed && (
          <video
            ref={videoRef}
            className="hero__image"
            src={hero.video}
            poster={hero.posterImage || undefined}
            muted
            loop
            playsInline
            preload="none"
            onError={() => setFailed(true)}
          />
        )}

        {/* 画面整体调色：底部渐隐 + 暗角 */}
        <span className="hero__bloom" aria-hidden="true" />
        <span className="hero__grade" aria-hidden="true" />
        {/* 文字背后的羽化对比区（让文字与画面融合，而不是压黑条） */}
        <span className="hero__veil" aria-hidden="true" />
      </div>

      <div className="poster">
        <h1 className="poster__title">
          {/*
            巨字标题用 React Bits 的 TechText（canvas 绘制）：
            鼠标扫过字母时，实心字母会变成虚线矢量轮廓，带选择框 / 采样小方块 / 空闲扫光。
            字体走容器的 font-family（--font-display），颜色与强调色在 hero.css 里定。
          */}
          <TechText
            text={hero.poster.title}
            fontWeight={700}
            fontSize={300}
            letterSpacing={0}
            align="center"
            reveal="letter"
            reach={200}
            softness={0.7}
            dashLength={5}
            dashGap={3}
            strokeWidth={1.6}
            specks={12}
            selection
            labels
            draggable
            bounce={0.4}
            sweep
            speed={0.5}
            clickKick
            intro="none"
            guides={false}
            /* 巨字标题本身是白色；橙色只出现在"鼠标扫过字母"时那道虚线矢量轮廓上 */
            accentColor="#ff7a18"
          />
          <span className="sr-only">{hero.poster.title}</span>
        </h1>

        <p className="poster__tagline">{hero.poster.tagline}</p>
      </div>
    </section>
  )
}

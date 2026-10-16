import { useEffect, useState } from 'react'
import Particles from './Particles'
import './particles-layer.css'

/**
 * 页面背景 · 粒子场（React Bits <Particles />，WebGL 实现）
 * ------------------------------------------------------------------
 * 按使用者定的三条规矩配置：
 *  1. 不影响阅读：整层在正文下方（z-index: -1）、不接收鼠标事件；粒子数量 / 尺寸 /
 *     亮度 / 速度全部往下压，并开景深模糊，让它像"远处的微尘"而不是噪点
 *  2. 头图不出现：首屏保持干净，滚过约半屏之后才淡入；首屏期间完全暂停渲染（不占 GPU）
 *  3. 互动保留：鼠标移到哪，附近的粒子被轻轻推开，移开后自动归位
 */

/** 首屏之后多少位置开始出现（0.55 ≈ 滚过半屏） */
const REVEAL_AT = 0.55

export default function ParticleLayer() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    // 系统开了"减少动效"就完全不加载
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let raf = 0
    const measure = () => {
      raf = 0
      setOn(window.scrollY > window.innerHeight * REVEAL_AT)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={`page-particles${on ? ' is-on' : ''}`} aria-hidden="true">
      <Particles
        /* 密度：比官方默认（200）更稀，整屏大约一百多颗 */
        particleCount={140}
        particleSpread={11}
        /* 动静：漂移速度压到默认的一半 */
        speed={0.05}
        /* 颜色：以白为主，掺一点点暖橙和冷蓝——和主色呼应，又不至于变成彩色噪点 */
        particleColors={['#ffffff', '#ffc98f', '#8ea4ff']}
        /* 颗粒：小、带随机大小、半透明 */
        particleBaseSize={90}
        sizeRandomness={1.1}
        cameraDistance={22}
        alphaParticles
        /* 互动：光标把粒子轻轻推开（不是吸附） */
        moveParticlesOnHover
        particleHoverFactor={0.6}
        hoverEffect="repel"
        hoverRadius={160}
        /* 星座连线：只在近距离粒子之间拉细线 */
        connections
        connectionDistance={130}
        /*
          光感：glow 是粒子自带的柔光；depthOfField 是"景深模糊"。
          注意 depthOfField 一旦开大，靠近镜头的粒子会被糊成整屏白光（实测过），
          这里必须留 0，柔和感交给 glow。
        */
        glow={0.25}
        twinkle={0.25}
        depthOfField={0}
        /* 点击不炸开，避免干扰浏览 */
        clickBurst={false}
        intro
        opacity={0.5}
        pixelRatio={1.5}
        /* 首屏期间冻结，滚下来再动 */
        paused={!on}
      />
    </div>
  )
}

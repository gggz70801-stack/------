import { lazy, Suspense, useEffect, useState } from 'react'
import subscribeViewport from '../lib/scrollFrame'
import './particles-layer.css'

const Particles = lazy(() => import('./Particles'))

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 减少动效、小屏或省流量模式都不初始化 WebGL。
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (window.matchMedia('(max-width: 720px)').matches) return undefined
    if (navigator.connection?.saveData) return undefined

    const measure = () => {
      const next = window.scrollY > window.innerHeight * REVEAL_AT
      setOn((current) => (current === next ? current : next))
      if (next) setMounted(true)
    }
    return subscribeViewport(measure)
  }, [])

  return (
    <div className={`page-particles${on ? ' is-on' : ''}`} aria-hidden="true">
      {mounted ? (
        <Suspense fallback={null}>
          <Particles
            /* 背景只做氛围：密度、倍率和帧率都压低，把资源留给正文。 */
            particleCount={110}
            particleSpread={11}
            speed={0.05}
            particleColors={['#ffffff', '#ffc98f', '#8ea4ff']}
            particleBaseSize={90}
            sizeRandomness={1.1}
            cameraDistance={22}
            alphaParticles
            moveParticlesOnHover
            particleHoverFactor={0.6}
            hoverEffect="repel"
            hoverRadius={160}
            connections
            connectionDistance={130}
            glow={0.25}
            twinkle={0.25}
            depthOfField={0}
            clickBurst={false}
            intro
            opacity={0.5}
            pixelRatio={1.25}
            frameRate={30}
            paused={!on}
          />
        </Suspense>
      ) : null}
    </div>
  )
}

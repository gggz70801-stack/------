import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import WorksIndex from './components/WorksIndex'
import WorkDetail from './components/WorkDetail'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import ParticleLayer from './components/ParticleLayer'
import { Grain, ScrollProgress, Spotlight, Toast } from './components/Decor'
import useRevealScan from './lib/useRevealScan'
import useHashRoute, { takeHomeScroll } from './lib/useHashRoute'
import useContent from './lib/content'

export default function App() {
  useRevealScan()
  const route = useHashRoute()
  const { c, t } = useContent()
  const isDetail = route.view === 'works' && Boolean(route.slug)
  const isWorksList = route.view === 'works' && !route.slug
  const marqueeItems = [...t(c.keywords), ...t(c.tools)]

  // 进作品列表页 / 详情页都回到顶部；返回首页时恢复原来的位置
  useEffect(() => {
    if (isDetail || isWorksList) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const y = takeHomeScroll()
    if (y) {
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'auto' }))
    }
  }, [isDetail, isWorksList, route.slug])

  return (
    <>
      <Intro name={t(c.profile.name)} nameEn={t(c.profile.brandSub)} />
      <Grain />
      <Spotlight />
      <ScrollProgress />
      <Navbar />

      <main>
        {/* 背景粒子场：压在正文之下，首屏不显示（见 ParticleLayer.jsx） */}
        <ParticleLayer />

        {isDetail ? (
          <WorkDetail slug={route.slug} />
        ) : isWorksList ? (
          <WorksIndex />
        ) : (
          <>
            <Hero />
            <About />
            <Works />

            <div className="band">
              <Marquee items={marqueeItems} />
              <Marquee items={[...marqueeItems].reverse()} reverse />
            </div>

            <Strengths />
            <Contact />
          </>
        )}
      </main>

      <Toast />
    </>
  )
}

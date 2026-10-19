import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import OtherProjects from './components/OtherProjects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import ParticleLayer from './components/ParticleLayer'
import { Grain, PageAtmosphere, ScrollProgress, Spotlight, Toast } from './components/Decor'
import useRevealScan from './lib/useRevealScan'
import useHashRoute, { takeHomeScroll } from './lib/useHashRoute'
import useContent from './lib/content'

const WorksIndex = lazy(() => import('./components/WorksIndex'))
const WorkDetail = lazy(() => import('./components/WorkDetail'))
const OtherIndex = lazy(() => import('./components/OtherIndex'))
const OtherProjectDetail = lazy(() => import('./components/OtherProjectDetail'))

export default function App() {
  useRevealScan()
  const route = useHashRoute()
  const { c, t } = useContent()
  const isDetail = route.view === 'works' && Boolean(route.slug)
  const isWorksList = route.view === 'works' && !route.slug
  const isOtherIndex = route.view === 'other' && !route.slug
  const isOtherDetail = route.view === 'other' && Boolean(route.slug)
  const isRoutedPage = isDetail || isWorksList || isOtherIndex || isOtherDetail
  const marqueeItems = [...t(c.keywords), ...t(c.tools)]

  // 进作品列表页 / 详情页 / 其他项目页都回到顶部；返回首页时恢复原来的位置
  useEffect(() => {
    if (isRoutedPage) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const y = takeHomeScroll()
    if (y) {
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'auto' }))
    }
  }, [isRoutedPage, route.view, route.slug, route.sub])

  useEffect(() => {
    document.body.dataset.page =
      route.view === 'other' && route.slug === 'illustration' ? 'illustration' : 'default'
  }, [route.view, route.slug])

  return (
    <>
      <Intro name={t(c.profile.name)} nameEn={t(c.profile.brandSub)} />
      <PageAtmosphere />
      <Grain />
      <Spotlight />
      <ScrollProgress />
      <Navbar route={route} />

      <main className="site-main">
        {/* 背景粒子场：压在正文之下，首屏不显示（见 ParticleLayer.jsx） */}
        <ParticleLayer />

        <Suspense
          fallback={
            <div className="route-loading mono" role="status" aria-live="polite">
              {t({ zh: '载入项目…', en: 'Loading project…' })}
            </div>
          }
        >
          {isDetail ? (
            <WorkDetail slug={route.slug} />
          ) : isOtherDetail ? (
            <OtherProjectDetail slug={route.slug} sub={route.sub} />
          ) : isOtherIndex ? (
            <OtherIndex />
          ) : isWorksList ? (
            <WorksIndex />
          ) : (
            <>
              <Hero />
              <About />
              <Works />
              <OtherProjects />

              <div className="band">
                <Marquee items={marqueeItems} />
                <Marquee items={[...marqueeItems].reverse()} reverse />
              </div>

              <Strengths />
              <Contact />
            </>
          )}
        </Suspense>
      </main>

      <Toast />
    </>
  )
}

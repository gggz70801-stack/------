import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import AnimatedContent from './AnimatedContent'
import SectionPlate from './SectionPlate'
import { getMisc } from '../lib/gallery'
import { copyText } from '../lib/toast'
import useContent from '../lib/content'
import { sections } from '../data/profile'
import aboutBg from '../assets/section-bg/about-ghost.webp'
import './about.css'

const HoloCard = lazy(() => import('./HoloCard'))

/** 大广赛获奖证书（图片放在 media-src/awards/，压缩后自动读取） */
const certificates = getMisc('awards')

function DeferredHoloCard(props) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setReady(true)
        observer.disconnect()
      },
      { rootMargin: '160px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="deferred-holo" ref={ref}>
      {ready ? (
        <Suspense fallback={null}>
          <HoloCard {...props} />
        </Suspense>
      ) : null}
    </div>
  )
}

function CopyButton({ value, label, title }) {
  return (
    <button
      type="button"
      className="about__copy"
      onClick={() => copyText(value, label)}
      aria-label={`${title} ${label}`}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10.5 3.6A1.6 1.6 0 0 0 8.9 2.5H3.6A1.6 1.6 0 0 0 2.5 4.1v5.3a1.6 1.6 0 0 0 1.1 1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  )
}

export default function About() {
  const { lang, c, t } = useContent()

  const contactItems = c.contactSection.rows.map((row) => ({
    key: row.key,
    cn: t(row.cn),
    label: t(row.cn) ? `${row.key} / ${t(row.cn)}` : row.key,
    short: t(row.cn) || row.key,
    value: row.value,
    href: row.href,
  }))

  const bio = t(c.profile.about)
  const focusTags = t(c.profile.focusTags)
  const skills = t(c.profile.skills)
  /*
    副标永远显示「另一种语言」，和左上角品牌区同一套规则。
    注意这里要取 name.zh / nameEn 这一对，不能写 t(c.profile.name)——
    英文模式下 t(name) 取到的就是 "Bingjun Yuan"，会和上面的名字重复一遍。
  */
  const altName = lang === 'zh' ? c.profile.nameEn : c.profile.name.zh

  return (
    <section className="section about" id="about">
      {/*
        「关于我」的章节背景：从《使命召唤》幽灵壁纸视频里截的一帧（冷蓝夜戏），
        压过色、压过暗、模糊过，再压到很低透明度当氛围用，
        目的是让 01 关于我 和下面 02 跨境电商项目 在观感上分开。
        · 想整体关掉：把 about.css 里 .about__bg 的 --plate-opacity 改成 0；
        · 想彻底删掉：删掉下面这段 <div className="about__bg"> 即可，没有任何其它代码依赖它；
        · 母版是视频本身，处理脚本是 scripts/make-section-plates.mjs（一次性脚本）。
      */}
      <SectionPlate className="about__bg" src={aboutBg} width={1280} height={552} />

      <div className="shell">
        <AnimatedContent className="sec-head" distance={40} blur={7} duration={0.95} threshold={0.15}>
          <div className="sec-head__left">
            <span className="sec-head__index">01</span>
            <h2 className="sec-head__title">
              <span className="sec-head__title-en">{t(sections.about.eyebrow)}</span>
              {t(sections.about.title)}
            </h2>
          </div>
          <p className="sec-head__desc">{t(sections.about.desc)}</p>
        </AnimatedContent>

        {/* 第一行：人像 + 自我介绍 */}
        <div className="about__top">
          {/*
            人像 + React Bits <HoloCard />：把证件照做成一张"镭射名片"。
            只有鼠标移上去、卡片随指针倾斜时箔面才会泛起彩光（idle=false 时 CPU/GPU 基本零占用）；
            这里刻意留着 idle，让它自己很慢地反光，像真卡片放在桌上。
          */}
          <AnimatedContent
            className="about__portrait"
            direction="horizontal"
            distance={64}
            blur={10}
            duration={1}
            threshold={0.12}
          >
            <DeferredHoloCard
              className="portrait-card"
              image={c.profile.portrait}
              alt={t(c.profile.name)}
              /*
                人像卡的三条底线：人像必须是原图、脸上不能有任何光斑、不要自己动。
                · intensity=0 → 画面上的彩色箔面完全关掉，人像保持原图，不做任何染色
                · glare=0     → 扫过画面的那团高光关掉（就是会在脸上游走的光团）
                · idle=false  → 不再自动漂移；只有鼠标移上去，卡片才倾斜、抬起、卡边反光
                想把卡边那点反光颗粒也去掉，把 edgeSparkle 改成 0 即可。
              */
              preset="glitter"
              foilColor="#d8cbb8"
              intensity={0}
              scale={1.6}
              /* 卡边只留一点点反光颗粒，凑近才看得到；色斑基本看不出来 */
              edgeSparkle={0.2}
              frame={3}
              glare={0}
              radius={20}
              tiltMax={8}
              hoverScale={1.025}
              idle={false}
              style={{ '--hc-w': '100%', '--hc-ratio': '0.75' }}
            />
          </AnimatedContent>

          <div className="about__intro">
            {/*
              左栏：名字 → 自我介绍。
              这两块必须挨着读，所以放在同一列里顺着排，
              不跟右栏去对齐行——一行对齐反而会把名字和正文顶开一大截。
              名字是这一块的「重音」：原来姓名只出现在左上角品牌区和首屏，
              滚到这儿反而没有主语，左半边就空着了。
            */}
            <div className="about__col">
              <AnimatedContent className="about__identity" distance={28} blur={5} duration={0.8}>
                <h3 className="about__name">{t(c.profile.name)}</h3>
                {/* 英文名单独一行、走海报字体：和首屏巨字是同一套字，等于在这儿签了个名 */}
                <p className="about__name-alt">{altName}</p>
                <p className="about__name-sub mono">{t(c.profile.brandSub)}</p>
              </AnimatedContent>

              <AnimatedContent
                className="about__bio"
                delay={0.1}
                stagger={0.09}
                distance={26}
                duration={0.75}
                blur={4}
              >
                {bio.map((text, i) => (
                  <p key={text} className={i === 0 ? 'about__bio-lead' : ''}>
                    {text}
                  </p>
                ))}
              </AnimatedContent>

              {/* 方向：跟着自我介绍走 —— 左栏说的是"我是谁、我做什么" */}
              <AnimatedContent className="about__rows" delay={0.16} distance={30} duration={0.8}>
                <div className="info-row">
                  <span className="info-row__label mono">{t(c.ui.focus)}</span>
                  <ul className="info-row__tags">
                    {focusTags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            </div>

            {/*
              右栏：学历（加重）→ 技能。
              学历是这一块唯一被"提亮"的硬信息：字号比正文大一档、亮度更高，
              和下面那些标签明显不是一个量级。
              注意：这里刻意不再用卡片框——卡里的字会比框再内缩一截，
              右栏就会多出一条左边界，和下面的 SKILLS、联系方式对不齐。
              右栏说的是"资历和工具"：一段学历 + 一组软件，正好是一份"硬信息"。
            */}
            <div className="about__col">
              <AnimatedContent
                className="about__edu"
                delay={0.06}
                distance={28}
                blur={5}
                duration={0.8}
              >
                <span className="about__edu-label mono">{t(c.ui.education)}</span>
                <p className="about__edu-school">{t(c.profile.school)}</p>
                <p className="about__edu-meta">
                  {t(c.profile.major)} · {t(c.profile.classOf)}
                </p>
              </AnimatedContent>

              <AnimatedContent className="about__rows" delay={0.16} distance={30} duration={0.8}>
                <div className="info-row">
                  <span className="info-row__label mono">{t(c.ui.skills)}</span>
                  <ul className="info-row__tags">
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>

        {/* 第二行：工作经历 ‖ 联系方式（合在一块） */}
        <div className="about__mid">
          <AnimatedContent className="about__exp" distance={38} blur={5} duration={0.9}>
            <div className="about__head">
              <h3>{t({ zh: '工作经历', en: 'Experience' })}</h3>
              <span className="mono">{t(c.ui.experienceNote)}</span>
            </div>
            <AnimatedContent as="ul" className="jobs" stagger={0.08} distance={30} duration={0.7}>
              {c.experience.map((job) => (
                <li className="job" key={t(job.company)}>
                  <span className="job__period mono">{job.period}</span>
                  <div className="job__main">
                    <div className="job__title">
                      <span className="job__company">{t(job.company)}</span>
                    </div>
                    {t(job.points).map((point) => (
                      <p className="job__point" key={point}>
                        {point}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </AnimatedContent>
          </AnimatedContent>

          <AnimatedContent className="about__contact" delay={0.12} distance={38} blur={5} duration={0.9}>
            <div className="about__head">
              <h3>{t({ zh: '联系方式', en: 'Contact' })}</h3>
              <span className="mono">{t(c.ui.contactNote)}</span>
            </div>
            <AnimatedContent as="ul" className="contact-list" stagger={0.06} distance={24} duration={0.65}>
              {contactItems.map((item) => (
                <li key={item.key} className="contact-list__item">
                  <span className="contact-list__label mono">{item.label}</span>
                  {item.href ? (
                    <a className="contact-list__value link-sweep" href={item.href}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-list__value">{item.value}</span>
                  )}
                  <CopyButton value={item.value} label={item.short} title={t(c.ui.copy)} />
                </li>
              ))}
            </AnimatedContent>
          </AnimatedContent>
        </div>

        {/* 第三行：获奖（一行带过） */}
        <AnimatedContent className="about__awards" distance={36} blur={6} duration={0.9}>
          <div className="about__head">
            <h3>{t({ zh: '获奖经历', en: 'Awards' })}</h3>
            <span className="mono">{t(c.ui.awardsNote)}</span>
            {certificates.length ? (
              <div className="awards__certs">
                {certificates.map((cert) => (
                  <a
                    className="cert-thumb"
                    key={cert.src}
                    href={cert.src}
                    target="_blank"
                    rel="noreferrer"
                    title={cert.name.replace(/^\d+-/, '')}
                  >
                    <img src={cert.src} alt={cert.name} loading="lazy" decoding="async" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <AnimatedContent as="ul" className="award-list" stagger={0.05} distance={22} duration={0.7}>
            {c.awards.map((award) => (
              <li className="award-row" key={t(award.work)}>
                <span className="award-row__year mono">{t(award.year)}</span>
                <span className="award-row__title">
                  {t(award.title)}
                  <em>{t(award.work)}</em>
                </span>
                <span className="award-row__prizes">
                  {t(award.prize).map((p) => (
                    <em key={p}>{p}</em>
                  ))}
                </span>
              </li>
            ))}
          </AnimatedContent>
        </AnimatedContent>
      </div>
    </section>
  )
}

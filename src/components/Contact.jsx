import AnimatedContent from './AnimatedContent'
import SectionPlate from './SectionPlate'
import { copyText } from '../lib/toast'
import useContent from '../lib/content'
import contactBg from '../assets/section-bg/contact-ghost.webp'
import './contact.css'

export default function Contact() {
  const { c, t } = useContent()
  const section = c.contactSection
  const titleLines = t(section.titleLines)

  const toTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true">
        {/*
          章节背景板：从《使命召唤》幽灵壁纸视频里截的一帧（火红那一段，
          和全站琥珀橙是同一个色温）。压在右侧，专门填「联系我」右半块那片空白。
          想整体关掉：把 contact.css 里 .contact__plate 的 --plate-opacity 改成 0。
        */}
        <SectionPlate className="contact__plate" src={contactBg} width={1280} height={566} />
        <span className="contact__glow" />
        <span className="contact__ring" />
        <div className="grid-lines" />
      </div>

      <div className="shell contact__inner">
        <div className="contact__head">
          {/*
            这里额外挂一个 data-reveal：标题是"逐行从下往上推"的遮罩动画（见 contact.css），
            它靠 [data-reveal].is-in 触发。AnimatedContent 只写内联样式、不加这个类，
            所以之前大标题一直停在遮罩外面（等于没显示）。挂上 data-reveal 后两个动画各管一层。
          */}
          <AnimatedContent
            className="contact__head-left"
            data-reveal="fade"
            distance={34}
            blur={6}
            duration={0.95}
          >
            <p className="kicker">{t(section.kicker)}</p>
            <h2 className="contact__title">
              {titleLines.map((line, i) => (
                <span className="contact__title-line" key={line}>
                  <span style={{ '--line-delay': `${180 + i * 120}ms` }}>{line}</span>
                </span>
              ))}
            </h2>
            <p className="contact__desc">{t(section.desc)}</p>
          </AnimatedContent>

          <AnimatedContent className="contact__cta-wrap" delay={0.14} distance={30} duration={0.8}>
            <a className="contact__cta" href={`mailto:${c.profile.contact.email}`}>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 10h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>{t(section.cta)}</span>
            </a>
          </AnimatedContent>
        </div>

        <AnimatedContent as="ul" className="contact__rows" stagger={0.08} distance={26} duration={0.7}>
          {section.rows.map((row, i) => (
            <li className="contact-row" key={row.key}>
              <span className="contact-row__index mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="contact-row__label mono">
                {row.key}
                {t(row.cn) ? <em>{t(row.cn)}</em> : null}
              </span>
              {row.href ? (
                <a className="contact-row__value" href={row.href}>
                  {row.value}
                </a>
              ) : (
                <span className="contact-row__value">{row.value}</span>
              )}
              <button
                type="button"
                className="contact-row__copy"
                onClick={() => copyText(row.value, t(row.cn) || row.key)}
              >
                {t(c.ui.copy)}
              </button>
            </li>
          ))}
        </AnimatedContent>

        <footer className="contact__foot">
          <span>
            © {c.footer.year} {t(c.profile.name)} · {t(c.profile.role)}
          </span>
          <span className="mono">{t(c.footer.note)}</span>
          <a className="contact__top" href="#hero" onClick={toTop}>
            {t(c.ui.toTop)}
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 13V3m0 0L3.6 7.4M8 3l4.4 4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </footer>
      </div>
    </section>
  )
}

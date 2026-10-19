import AnimatedContent from './AnimatedContent'
import { getOtherGallery } from '../lib/gallery'
import { navigate } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './illustration-project.css'

const assetFiles = {
  hero: '01-hero.webp',
  research: '02-research.webp',
  system: '03-system.webp',
  derivatives: '12-derivatives.webp',
  packaging: '13-packaging.webp',
  campaign: '14-campaign.webp',
}

const beastVolumes = [
  {
    id: 'gx-page-4',
    chapter: '04',
    eyebrow: { zh: '上卷 / 守护与辨明', en: 'Volume I / Guardians & judgement' },
    title: { zh: '四兽一屏，先看见性格', en: 'Four beasts, four distinct characters' },
    intro: {
      zh: '把四张竖幅主视觉并置后，重点不再是逐张翻阅，而是横向比较：谁来自屋脊、谁守门、谁辨是非。每只瑞兽保留独立的题签与动态，又共享云气、宫灯和鹤群的画面语法。',
      en: 'Placed side by side, the portraits become a comparison: roof guardians, gate keepers and the beast of justice. Each keeps its own lettering and pose while sharing clouds, lanterns and cranes.',
    },
    beasts: [
      {
        file: '04-甪端.webp',
        index: '01',
        name: { zh: '甪端', en: 'Luru' },
        meaning: { zh: '博学 · 通达', en: 'Wisdom · Clarity' },
        note: {
          zh: '以独角、狮身和远见意象建立神性，题签压低在画面下方，让角色先被看见。',
          en: 'A horned lion-shaped guardian conveys insight. The title sits low so the character reads first.',
        },
      },
      {
        file: '05-狻猊.webp',
        index: '02',
        name: { zh: '狻猊', en: 'Suanni' },
        meaning: { zh: '守护 · 镇守', en: 'Guardian · Protection' },
        note: {
          zh: '借龙子与香炉烟火的典故，把鬃毛、云气和宫灯串成向上的动势。',
          en: 'Inspired by the dragon son associated with incense burners, mane, smoke and lanterns form an upward rhythm.',
        },
      },
      {
        file: '06-獬豸.webp',
        index: '03',
        name: { zh: '獬豸', en: 'Xiezhi' },
        meaning: { zh: '公正 · 明辨', en: 'Justice · Discernment' },
        note: {
          zh: '用利落角形和直视目光强调判断力，朱红宫墙与冷色云带形成冲突。',
          en: 'Sharp horns and a direct gaze signal judgement, set against red walls and cool clouds.',
        },
      },
      {
        file: '07-行什.webp',
        index: '04',
        name: { zh: '行什', en: 'Xingshi' },
        meaning: { zh: '镇火 · 避雷', en: 'Fire warding · Safety' },
        note: {
          zh: '猴面、双翼与金刚杵构成最特殊的轮廓，也让“守护”有了更明确的动作。',
          en: 'Monkey face, wings and vajra create the most unusual silhouette and turn protection into an action.',
        },
      },
    ],
  },
  {
    id: 'gx-page-5',
    chapter: '05',
    eyebrow: { zh: '下卷 / 权威与祥瑞', en: 'Volume II / Power & auspiciousness' },
    title: { zh: '四兽展开，排满一幅长卷', en: 'Four more beasts complete the scroll' },
    intro: {
      zh: '下卷把金龙、凤凰、金狮与麒麟放进同一列，色彩更饱满，题材也更接近宫廷正典。横向排满后，金红主色连续贯穿，像一条被展开的长卷。',
      en: 'The second volume brings the dragon, phoenix, lion and qilin into one full-width sequence. Gold and vermilion form a continuous scroll.',
    },
    beasts: [
      {
        file: '08-金龙.webp',
        index: '05',
        name: { zh: '金龙', en: 'Golden Dragon' },
        meaning: { zh: '祥瑞 · 权威', en: 'Auspicious · Authority' },
        note: {
          zh: '以龙珠、云浪和殿顶作为稳定三角，正面构成让主体拥有最强存在感。',
          en: 'Dragon pearl, waves and roof form a stable triangle, with a frontal pose for maximum presence.',
        },
      },
      {
        file: '09-凤凰.webp',
        index: '06',
        name: { zh: '凤凰', en: 'Phoenix' },
        meaning: { zh: '瑞德 · 太平', en: 'Virtue · Harmony' },
        note: {
          zh: '展开的双翼承托整幅画，暖金羽色与宫殿红形成最明快的节奏。',
          en: 'Spread wings hold the composition together; warm gold feathers play against palace red.',
        },
      },
      {
        file: '10-金狮.webp',
        index: '07',
        name: { zh: '金狮', en: 'Golden Lion' },
        meaning: { zh: '威仪 · 护佑', en: 'Dignity · Protection' },
        note: {
          zh: '正对观者的巨大狮首建立威仪，莲花和鹤群把强硬形体重新拉回瑞意。',
          en: 'The frontal lion establishes authority, while lotus and cranes soften it back into auspiciousness.',
        },
      },
      {
        file: '11-麒麟.webp',
        index: '08',
        name: { zh: '麒麟', en: 'Qilin' },
        meaning: { zh: '仁兽 · 盛世', en: 'Benevolence · Prosperity' },
        note: {
          zh: '鳞甲、银角和轻盈回身构成最后的收束，把强盛转为温和、祥和的祝愿。',
          en: 'Scales, silver horns and a light turn close the sequence by turning power into benevolence.',
        },
      },
    ],
  },
]

function getAsset(gallery, file) {
  return gallery.find((image) => image.file === file) || null
}

function ImageBlock({ image, alt, eager = false, className = '' }) {
  if (!image) return null

  return (
    <img
      className={className}
      src={image.src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      width={image.w || undefined}
      height={image.h || undefined}
    />
  )
}

function BeastRail({ beasts, t }) {
  return (
    <div className="gx-beast-rail">
      {beasts.map((beast) => (
        <article className="gx-beast" key={beast.file}>
          <figure className="gx-beast__figure">
            <ImageBlock image={beast.image} alt={t(beast.name)} />
            <span className="gx-beast__number mono">{beast.index}</span>
          </figure>
          <div className="gx-beast__copy">
            <div className="gx-beast__title">
              <h3>{t(beast.name)}</h3>
              <span className="mono">{t(beast.meaning)}</span>
            </div>
            <p>{t(beast.note)}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function IllustrationProject({ project }) {
  const { t } = useContent()
  const gallery = getOtherGallery(project.coverGroup)
  const hero = getAsset(gallery, assetFiles.hero)
  const research = getAsset(gallery, assetFiles.research)
  const system = getAsset(gallery, assetFiles.system)
  const derivatives = getAsset(gallery, assetFiles.derivatives)
  const packaging = getAsset(gallery, assetFiles.packaging)
  const campaign = getAsset(gallery, assetFiles.campaign)
  const volumes = beastVolumes.map((volume) => ({
    ...volume,
    beasts: volume.beasts.map((beast) => ({ ...beast, image: getAsset(gallery, beast.file) })),
  }))

  return (
    <article className="gx">
      <header className="gx-hero" id="gx-page-1">
        <div className="gx-hero__mast">
          <div className="gx-shell gx-hero__top mono">
            <span>ORIGINAL ILLUSTRATION / 2026</span>
            <span>08 AUSPICIOUS BEASTS</span>
            <span>COMMERCIAL LANDING WORK</span>
          </div>
        </div>

        <figure className="gx-hero__visual">
          <ImageBlock
            image={hero}
            alt={t({ zh: '故宫祥瑞八大瑞兽主视觉', en: 'Auspicious Beasts of the Forbidden City key visual' })}
            eager
          />
          <figcaption className="mono">FORBIDDEN CITY · AUSPICIOUS BEASTS · CHINA</figcaption>
        </figure>

        <div className="gx-hero__copy">
          <div className="gx-shell gx-hero__grid">
            <AnimatedContent className="gx-hero__title" trigger="mount" distance={42} blur={6}>
              <p className="gx-kicker mono">PALACE AUSPICIOUS / 故宫祥瑞</p>
              <h1>{t(project.title)}</h1>
              <p className="gx-hero__subtitle">{t(project.subtitle)}</p>
            </AnimatedContent>

            <AnimatedContent className="gx-hero__intro" trigger="mount" delay={0.12} distance={28}>
              <p>{t(project.desc)}</p>
              <ul className="gx-tags">
                {t(project.tags).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </AnimatedContent>

            <div className="gx-hero__metrics">
              {t(project.metrics).map((metric) => (
                <div key={metric.k}>
                  <span className="mono">{metric.k}</span>
                  <strong>{metric.v}</strong>
                </div>
              ))}
              <div>
                <span className="mono">{t({ zh: '延展方向', en: 'Extensions' })}</span>
                <strong>03</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="gx-split gx-split--research" id="gx-page-2">
        <div className="gx-shell gx-split__grid">
          <AnimatedContent className="gx-copy gx-copy--sticky" distance={34} blur={4}>
            <p className="gx-chapter-no">02</p>
            <p className="gx-kicker mono">CULTURAL RESEARCH / 故宫语境</p>
            <h2>{t({ zh: '从屋脊，回到祥瑞的文化原点', en: 'Begin with the roof, return to the source' })}</h2>
            <p className="gx-copy__lead">
              {t({
                zh: '调研从故宫建筑本身开始：屋脊轮廓、石狮与瑞兽造像、红墙金瓦、云气和宫灯，共同搭起角色的“出生地”。',
                en: 'Research starts with the palace itself: roof lines, guardian sculptures, red walls, golden tiles, clouds and lanterns establish where the characters belong.',
              })}
            </p>
            <dl className="gx-research-list">
              <div>
                <dt className="mono">01 / {t({ zh: '建筑母题', en: 'Architecture' })}</dt>
                <dd>{t({ zh: '殿顶、屋脊、斗拱与宫墙，提供画面的纵深和秩序。', en: 'Roofs, ridges, brackets and walls provide depth and order.' })}</dd>
              </div>
              <div>
                <dt className="mono">02 / {t({ zh: '角色谱系', en: 'Characters' })}</dt>
                <dd>{t({ zh: '八只瑞兽各有形制、习性与寓意，不被处理成同一种“神兽”。', en: 'Each beast keeps its own form, lore and meaning.' })}</dd>
              </div>
              <div>
                <dt className="mono">03 / {t({ zh: '视觉转译', en: 'Translation' })}</dt>
                <dd>{t({ zh: '把建筑语言转成云气、灯笼、鹤群与中心式构图，让传统题材进入当代插画。', en: 'Architectural language becomes clouds, lanterns, cranes and frontal compositions.' })}</dd>
              </div>
            </dl>
          </AnimatedContent>

          <AnimatedContent className="gx-paper gx-paper--research" distance={44} blur={5}>
            <ImageBlock
              image={research}
              alt={t({ zh: '故宫建筑与瑞兽调研版面', en: 'Forbidden City architecture and beast research board' })}
            />
            <figcaption>
              <span className="mono">RESEARCH BOARD / 01</span>
              <span>{t({ zh: '建筑、造像与视觉语汇的整理', en: 'Architecture, sculpture and visual vocabulary' })}</span>
            </figcaption>
          </AnimatedContent>
        </div>
      </section>

      <section className="gx-split gx-split--system gx-split--reverse" id="gx-page-3">
        <div className="gx-shell gx-split__grid">
          <AnimatedContent className="gx-paper gx-paper--system" distance={44} blur={5}>
            <ImageBlock
              image={system}
              alt={t({ zh: '故宫祥瑞字体、线稿与色彩系统', en: 'Forbidden City type, line art and colour system' })}
            />
            <figcaption>
              <span className="mono">SYSTEM BOARD / 02</span>
              <span>{t({ zh: '题签、线稿与单体海报的创作过程', en: 'Lettering, line art and poster process' })}</span>
            </figcaption>
          </AnimatedContent>

          <AnimatedContent className="gx-copy gx-copy--sticky" distance={34} blur={4}>
            <p className="gx-chapter-no">03</p>
            <p className="gx-kicker mono">VISUAL SYSTEM / 创作系统</p>
            <h2>{t({ zh: '把手绘神兽，收进一套系统', en: 'Bring the hand-drawn beasts into one system' })}</h2>
            <p className="gx-copy__lead">
              {t({
                zh: '角色不是八张彼此孤立的海报。题签、印章、线稿、云气和宫廷色谱共同工作，让项目既能单张传播，也能继续进入贴纸、包装和户外画面。',
                en: 'These are not eight isolated posters. Lettering, seals, line art, clouds and a palace palette let the project work as singles or extend into stickers, packaging and outdoor media.',
              })}
            </p>

            <div className="gx-system-list">
              <div>
                <span className="gx-system-index mono">A</span>
                <h3>{t({ zh: '手写题签', en: 'Brush lettering' })}</h3>
                <p>{t({ zh: '每张画用一种专属字势定调，像给瑞兽落款。', en: 'Each image gets its own brush rhythm, like a signature.' })}</p>
              </div>
              <div>
                <span className="gx-system-index mono">B</span>
                <h3>{t({ zh: '线稿先行', en: 'Line first' })}</h3>
                <p>{t({ zh: '先确认轮廓和叙事，再进入色彩，保证每个角色可识别、可复刻。', en: 'Silhouette and story come before colour, keeping every character legible and reproducible.' })}</p>
              </div>
              <div>
                <span className="gx-system-index mono">C</span>
                <h3>{t({ zh: '共用母题', en: 'Shared motifs' })}</h3>
                <p>{t({ zh: '云气、仙鹤、宫灯、莲花在不同画面中反复出现，形成连续感。', en: 'Clouds, cranes, lanterns and lotus recur to create continuity.' })}</p>
              </div>
              <div>
                <span className="gx-system-index mono">D</span>
                <h3>{t({ zh: '宫廷色谱', en: 'Palace palette' })}</h3>
                <p>{t({ zh: '朱红、琥珀、鎏金与黛青构成主色，不靠高饱和荧光抢注意力。', en: 'Vermilion, amber, gold and slate blue lead without neon distraction.' })}</p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {volumes.map((volume, volumeIndex) => (
        <section
          className={`gx-volume ${volumeIndex === 1 ? 'gx-volume--full' : ''}`}
          id={volume.id}
          key={volume.id}
        >
          <div className="gx-shell">
            <header className="gx-volume__head">
              <div className="gx-volume__index">
                <span className="mono">{volume.chapter}</span>
                <i aria-hidden="true" />
              </div>
              <div className="gx-volume__title">
                <p className="gx-kicker mono">{t(volume.eyebrow)}</p>
                <h2>{t(volume.title)}</h2>
              </div>
              <p className="gx-volume__intro">{t(volume.intro)}</p>
            </header>

            <AnimatedContent className="gx-volume__rail-wrap" distance={38} blur={4}>
              <BeastRail beasts={volume.beasts} t={t} />
            </AnimatedContent>
          </div>
        </section>
      ))}

      <section className="gx-feature" id="gx-page-6">
        <div className="gx-shell">
          <header className="gx-feature__head">
            <div>
              <p className="gx-chapter-no">06</p>
              <p className="gx-kicker mono">CHARACTER DERIVATIVES / 角色衍生</p>
            </div>
            <h2>{t({ zh: '离开海报，角色才真正变得可触摸', en: 'Outside the poster, the characters become touchable' })}</h2>
            <p>
              {t({
                zh: '贴纸与亚克力挂件把完整画面拆成可收集的单体。轮廓、题签和道具仍然保持一致，观众可以从一只瑞兽开始认识整套系统。',
                en: 'Stickers and acrylic charms break the scenes into collectible characters. Silhouettes, lettering and props stay consistent, so one beast can lead into the whole system.',
              })}
            </p>
          </header>

          <AnimatedContent className="gx-sheet gx-sheet--derivatives" distance={44} blur={5}>
            <ImageBlock
              image={derivatives}
              alt={t({ zh: '故宫祥瑞贴纸与亚克力挂件', en: 'Palace auspicious sticker and acrylic charm sheet' })}
            />
            <div className="gx-sheet__marks" aria-hidden="true">
              <span className="mono">STICKER SHEET</span>
              <span className="mono">ACRYLIC CHARMS</span>
              <span className="mono">02 / APPLICATIONS</span>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="gx-split gx-split--packaging" id="gx-page-7">
        <div className="gx-shell gx-split__grid">
          <AnimatedContent className="gx-copy gx-copy--sticky" distance={34} blur={4}>
            <p className="gx-chapter-no">07</p>
            <p className="gx-kicker mono">BRAND APPLICATIONS / 品牌应用</p>
            <h2>{t({ zh: '从画面到物件，延续同一种气质', en: 'From image to object, keep the same presence' })}</h2>
            <p className="gx-copy__lead">
              {t({
                zh: '信封、票根、帆布袋、包装盒和手机长页使用同一套主视觉。无论距离远近，朱红、鎏金与龙鳞细节都能让人迅速认出“故宫祥瑞”。',
                en: 'Envelopes, tickets, totes, boxes and mobile pages share one key visual. At any distance, vermilion, gold and scales make the project recognisable.',
              })}
            </p>
            <ul className="gx-application-list">
              <li><span className="mono">01</span>{t({ zh: '纸品与信封', en: 'Stationery & envelopes' })}</li>
              <li><span className="mono">02</span>{t({ zh: '帆布袋与礼盒', en: 'Tote & gift box' })}</li>
              <li><span className="mono">03</span>{t({ zh: '移动端长页', en: 'Mobile long page' })}</li>
              <li><span className="mono">04</span>{t({ zh: '票根与收藏件', en: 'Tickets & collectibles' })}</li>
            </ul>
          </AnimatedContent>

          <AnimatedContent className="gx-paper gx-paper--packaging" distance={44} blur={5}>
            <ImageBlock
              image={packaging}
              alt={t({ zh: '故宫祥瑞包装与品牌物料应用', en: 'Palace auspicious packaging and brand applications' })}
            />
            <figcaption>
              <span className="mono">APPLICATION BOARD</span>
              <span>{t({ zh: '包装、纸品、帆布袋与移动端', en: 'Packaging, print, tote and mobile' })}</span>
            </figcaption>
          </AnimatedContent>
        </div>
      </section>

      <section className="gx-campaign" id="gx-page-8">
        <div className="gx-shell">
          <header className="gx-campaign__head">
            <p className="gx-chapter-no">08</p>
            <div>
              <p className="gx-kicker mono">SPATIAL CAMPAIGN / 空间应用</p>
              <h2>{t({ zh: '最后，让瑞兽占满整个现场', en: 'Finally, let the beasts take over the space' })}</h2>
            </div>
            <p>
              {t({
                zh: '当画面离开屏幕，进入灯箱、围挡与城市墙面，细碎纹样会退到远处，真正留下的是角色轮廓、金红反差和一句足够大的题签。',
                en: 'On lightboxes, hoardings and city walls, fine detail falls away. Silhouette, gold-red contrast and oversized lettering carry the image.',
              })}
            </p>
          </header>

          <AnimatedContent className="gx-campaign__image" distance={46} blur={5}>
            <ImageBlock
              image={campaign}
              alt={t({ zh: '故宫祥瑞海报、室内与户外空间应用', en: 'Palace auspicious poster and spatial campaign applications' })}
            />
            <div className="gx-campaign__caption">
              <span className="mono">CITY LIGHTBOX / INDOOR RUNWAY / POSTER WALL</span>
              <span>{t({ zh: '从单体角色，走到完整空间叙事', en: 'From individual characters to a complete spatial story' })}</span>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <footer className="gx-footer">
        <div className="gx-shell">
          <div>
            <p className="gx-kicker mono">END OF PROJECT / 08 BEASTS</p>
            <h2>{t({ zh: '瑞意，不止于画面', en: 'Auspiciousness beyond the frame' })}</h2>
          </div>
          <a
            href="#/other"
            onClick={(event) => {
              event.preventDefault()
              navigate('#/other')
            }}
          >
            {t({ zh: '返回其他项目', en: 'Back to other projects' })}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </article>
  )
}

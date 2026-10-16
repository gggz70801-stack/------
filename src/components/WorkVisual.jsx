/**
 * 作品占位图形：在没有真实作品图时，用排布好的图形语言占位。
 * 一旦在 data/profile.js 里给项目填上 cover 图片，就会自动改用真实图片。
 */

function Amazon() {
  return (
    <div className="wv wv--amazon">
      <div className="wv-am__main">
        <span className="wv-am__badge mono">MAIN IMAGE</span>
        <span className="wv-am__product" />
        <span className="wv-am__shadow" />
      </div>
      <div className="wv-am__side">
        <span className="wv-am__thumb" />
        <span className="wv-am__thumb" />
        <span className="wv-am__thumb" />
        <span className="wv-am__thumb" />
      </div>
      <div className="wv-am__plus">
        <span className="mono">A+ CONTENT</span>
        <span className="wv-am__plus-row">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  )
}

function Website() {
  return (
    <div className="wv wv--website">
      <div className="wv-site__bar">
        <i />
        <i />
        <i />
        <span className="wv-site__url mono">product / detail</span>
      </div>
      <div className="wv-site__hero">
        <span className="wv-site__title" />
        <span className="wv-site__title wv-site__title--short" />
        <span className="wv-site__text" />
        <span className="wv-site__cta" />
      </div>
      <div className="wv-site__grid">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function Campaign() {
  return (
    <div className="wv wv--campaign">
      <span className="wv-cmp__num">08</span>
      <span className="wv-cmp__logo" />
      <span className="wv-cmp__bar wv-cmp__bar--a" />
      <span className="wv-cmp__bar wv-cmp__bar--b" />
      <span className="wv-cmp__disc">
        <em className="mono">限时</em>
        <strong>52%</strong>
        <em className="mono">OFF</em>
      </span>
      <span className="wv-cmp__band" />
      <span className="wv-cmp__line" />
      <span className="wv-cmp__line wv-cmp__line--2" />
      <span className="wv-cmp__modules">
        <i />
        <i />
        <i />
      </span>
      <span className="wv-cmp__word mono">CAMPAIGN</span>
    </div>
  )
}

function Social() {
  return (
    <div className="wv wv--social">
      <span className="wv-soc wv-soc--1">
        <i className="mono">1:1</i>
      </span>
      <span className="wv-soc wv-soc--2">
        <i className="mono">4:5</i>
      </span>
      <span className="wv-soc wv-soc--3">
        <i className="mono">9:16</i>
      </span>
    </div>
  )
}

function Retouch() {
  return (
    <div className="wv wv--retouch">
      <div className="wv-rt__side">
        <span className="wv-rt__object" />
        <span className="wv-rt__label mono">BEFORE</span>
      </div>
      <div className="wv-rt__side wv-rt__side--after">
        <span className="wv-rt__object" />
        <span className="wv-rt__glow" />
        <span className="wv-rt__label mono">AFTER</span>
      </div>
      <span className="wv-rt__handle" />
    </div>
  )
}

function Offline() {
  return (
    <div className="wv wv--offline">
      <span className="wv-off wv-off--rollup">
        <i />
        <i />
      </span>
      <span className="wv-off wv-off--poster">
        <i />
      </span>
      <span className="wv-off wv-off--lightbox">
        <i />
        <i />
      </span>
      <span className="wv-off__floor" />
      <span className="wv-off__vi mono">VI SYSTEM · 多载体</span>
      <span className="wv-off__swatches">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  )
}

const MAP = {
  amazon: Amazon,
  website: Website,
  campaign: Campaign,
  social: Social,
  retouch: Retouch,
  offline: Offline,
}

export default function WorkVisual({ type }) {
  const Comp = MAP[type] || Campaign
  return <Comp />
}

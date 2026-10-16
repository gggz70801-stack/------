import './section-plate.css'

/**
 * 章节背景板
 * ---------------------------------------------------------------
 * 把「视频里截的一帧」铺满整个章节当底纹用，目的是让区块读起来
 * 有内容、不那么空，同时又绝对不能抢正文。
 *
 * 三条底线（默认值都在 section-plate.css 顶部，改一处全站生效）：
 *   1) 透明度压得很低 —— 它是"氛围"，不是"画面"；
 *   2) 边缘用羽化遮罩收干净 —— 看不见"贴上去的矩形边"；
 *   3) 叠一层极淡的扫描线 —— 让照片读起来像"屏幕里的画面"，
 *      这一点点质感就是全站战术风的来源，比加任何装饰都省事。
 *
 * 用法（参数全部走 CSS 变量，写在调用方自己的 css 里）：
 *   <SectionPlate className="about__bg" src={aboutBg} width={1280} height={552} />
 *
 *   .about__bg {
 *     --plate-opacity: 0.3;      // 开关就是它，改成 0 等于关掉整块背景
 *     --plate-mask: radial-gradient(...);  // 羽化遮罩
 *     --plate-focus: 62% 26%;    // 画面哪一块露在中间
 *   }
 */
export default function SectionPlate({ src, className = '', width, height }) {
  return (
    <div className={`plate ${className}`.trim()} aria-hidden="true">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        width={width || undefined}
        height={height || undefined}
      />
      {/* 扫描线：极淡，只负责"这是一块屏幕"的感觉 */}
      <span className="plate__scan" />
    </div>
  )
}

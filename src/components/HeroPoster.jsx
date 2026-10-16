/**
 * 首屏电影感海报（矢量绘制）
 * 层次：暗红天幕 → 地平线强光 → 三层荒漠山脊 → 破碎越野车 → 西装人物逆光剪影 → 悬浮碎石
 * 换成真实渲染图：在 data/profile.js 里填 hero.image
 */

const nf = (n) => Number(n.toFixed(1))

function seeded(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** 不规则岩石轮廓（固定种子，渲染稳定） */
function rockPath(cx, cy, r, seed, squash = 0.74) {
  const rnd = seeded(seed)
  const sides = 7
  const pts = []
  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2 + (rnd() - 0.5) * 0.75
    const rad = r * (0.5 + rnd() * 0.7)
    pts.push(`${nf(cx + Math.cos(angle) * rad)},${nf(cy + Math.sin(angle) * rad * squash)}`)
  }
  return `M${pts.join(' L')} Z`
}

/** 悬浮碎石：避开人物主体（中央 760–840 / 330–520） */
const ROCKS = [
  { x: 226, y: 352, r: 27, s: 11, o: 0.9, a: 'a' },
  { x: 366, y: 254, r: 13, s: 23, o: 0.6, a: 'b' },
  { x: 506, y: 476, r: 11, s: 37, o: 0.55, a: 'c' },
  { x: 556, y: 306, r: 20, s: 41, o: 0.82, a: 'a' },
  { x: 656, y: 224, r: 10, s: 53, o: 0.5, a: 'b' },
  { x: 918, y: 274, r: 17, s: 67, o: 0.78, a: 'c' },
  { x: 1058, y: 398, r: 25, s: 71, o: 0.88, a: 'a' },
  { x: 1184, y: 248, r: 12, s: 83, o: 0.52, a: 'b' },
  { x: 1318, y: 430, r: 21, s: 97, o: 0.8, a: 'c' },
  { x: 1444, y: 320, r: 10, s: 101, o: 0.46, a: 'a' },
  { x: 138, y: 478, r: 17, s: 113, o: 0.72, a: 'b' },
  { x: 436, y: 158, r: 8, s: 131, o: 0.38, a: 'b' },
  { x: 1246, y: 158, r: 8, s: 139, o: 0.34, a: 'c' },
  { x: 1096, y: 196, r: 11, s: 149, o: 0.42, a: 'a' },
]

/** 地面岩石（越靠下越黑越大，形成纵深） */
const GROUND_ROCKS = [
  { x: 148, y: 742, r: 46, s: 301, o: 0.95 },
  { x: 352, y: 700, r: 22, s: 307, o: 0.8 },
  { x: 604, y: 716, r: 16, s: 311, o: 0.7 },
  { x: 1010, y: 690, r: 18, s: 313, o: 0.72 },
  { x: 1272, y: 724, r: 30, s: 317, o: 0.85 },
  { x: 1476, y: 776, r: 54, s: 331, o: 0.95 },
  { x: 858, y: 806, r: 34, s: 337, o: 0.9 },
]

/** 空气中的尘粒（很淡，只做氛围） */
const DUST = (() => {
  const rnd = seeded(5)
  return Array.from({ length: 34 }, () => ({
    x: nf(rnd() * 1600),
    y: nf(200 + rnd() * 420),
    r: nf(0.6 + rnd() * 1.6),
    o: nf(0.1 + rnd() * 0.3),
  }))
})()

/** 地平线光柱（细、淡） */
const RAYS = (() => {
  const ox = 800
  const oy = 500
  const spans = [
    [-94, -90],
    [-112, -107],
    [-134, -128],
    [-74, -70],
    [-56, -51],
    [-156, -150],
  ]
  const pt = (deg, r) => [
    nf(ox + Math.cos((deg * Math.PI) / 180) * r),
    nf(oy + Math.sin((deg * Math.PI) / 180) * r * 0.92),
  ]
  return spans.map(([a1, a2]) => {
    const [x1, y1] = pt(a1, 60)
    const [x2, y2] = pt(a2, 60)
    const [x3, y3] = pt(a2, 840)
    const [x4, y4] = pt(a1, 840)
    return `M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} L${x4} ${y4} Z`
  })
})()

export default function HeroPoster() {
  return (
    <svg
      className="poster__art"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070101" />
          <stop offset="0.14" stopColor="#1d0402" />
          <stop offset="0.34" stopColor="#450c04" />
          <stop offset="0.5" stopColor="#781905" />
          <stop offset="0.6" stopColor="#a82d07" />
          <stop offset="0.67" stopColor="#dd5510" />
          <stop offset="0.71" stopColor="#f78825" />
          <stop offset="0.74" stopColor="#ffb960" />
          <stop offset="1" stopColor="#ffcd80" />
        </linearGradient>

        <radialGradient id="hp-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff8e2" stopOpacity="0.95" />
          <stop offset="0.26" stopColor="#ffc46f" stopOpacity="0.6" />
          <stop offset="0.58" stopColor="#e8550f" stopOpacity="0.24" />
          <stop offset="1" stopColor="#e8550f" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hp-ray" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffe0ad" stopOpacity="0.42" />
          <stop offset="0.5" stopColor="#ffb055" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffb055" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="hp-haze" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff9a34" stopOpacity="0.45" />
          <stop offset="0.55" stopColor="#d94f10" stopOpacity="0.14" />
          <stop offset="1" stopColor="#d94f10" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="hp-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d1105" />
          <stop offset="0.1" stopColor="#260603" />
          <stop offset="0.42" stopColor="#0f0201" />
          <stop offset="1" stopColor="#040101" />
        </linearGradient>

        <linearGradient id="hp-spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffab52" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffab52" stopOpacity="0" />
        </linearGradient>

        {/* 逆光轮廓光：下暖上亮 */}
        <linearGradient id="hp-rim" x1="0.1" y1="1" x2="0.5" y2="0">
          <stop offset="0" stopColor="#e8550f" stopOpacity="0.08" />
          <stop offset="0.42" stopColor="#ffbc6e" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* 天空 */}
      <rect width="1600" height="900" fill="url(#hp-sky)" />
      <g className="poster__rays">
        {RAYS.map((d, i) => (
          <path key={i} d={d} fill="url(#hp-ray)" opacity={i % 2 ? 0.6 : 0.85} />
        ))}
      </g>

      {/* 地平线主光 + 人物背光晕 */}
      <ellipse cx="800" cy="648" rx="520" ry="112" fill="url(#hp-core)" />
      <ellipse cx="800" cy="470" rx="190" ry="150" fill="url(#hp-core)" opacity="0.9" />

      {/* 三层荒漠山脊（越远越淡、越矮） */}
      <path
        d="M-20 612 L120 566 L232 594 L344 556 L438 588 L560 560 L676 592 L784 558 L900 590 L1012 558 L1128 588 L1246 556 L1352 590 L1466 560 L1576 592 L1620 574 L1620 660 L-20 660 Z"
        fill="#a8380d"
        opacity="0.5"
      />
      <rect x="-20" y="470" width="1640" height="200" fill="url(#hp-haze)" />

      <path
        d="M-20 646 L108 598 L214 630 L318 590 L430 626 L534 592 L652 630 L756 594 L868 628 L980 592 L1096 628 L1206 594 L1316 630 L1432 596 L1540 628 L1620 604 L1620 700 L-20 700 Z"
        fill="#641706"
        opacity="0.86"
      />
      <rect x="-20" y="560" width="1640" height="140" fill="url(#hp-haze)" opacity="0.7" />

      <path
        d="M-20 676 L96 640 L206 668 L306 634 L414 664 L520 636 L628 668 L738 638 L846 666 L956 636 L1064 666 L1174 638 L1284 668 L1392 640 L1504 668 L1620 644 L1620 740 L-20 740 Z"
        fill="#2c0803"
        opacity="0.95"
      />

      {/* 荒漠地面 + 地平线反光 */}
      <path
        d="M-20 690 Q 220 668 460 680 T 860 688 T 1260 676 T 1620 694 L1620 900 L-20 900 Z"
        fill="url(#hp-ground)"
      />
      <rect x="-20" y="662" width="1640" height="70" fill="url(#hp-spill)" opacity="0.5" />

      {/* 地面岩石 */}
      <g>
        {GROUND_ROCKS.map((rock) => (
          <path
            key={rock.s}
            d={rockPath(rock.x, rock.y, rock.r, rock.s, 0.42)}
            fill="#090101"
            opacity={rock.o}
            className="poster__rim"
          />
        ))}
      </g>

      {/* 破碎越野车 */}
      <g className="poster__wreck">
        {/* 车轮 */}
        <circle cx="704" cy="602" r="29" fill="#060101" />
        <circle cx="902" cy="592" r="26" fill="#060101" />
        <path d="M678 592 A29 29 0 0 1 722 578" fill="none" stroke="url(#hp-rim)" strokeWidth="2" opacity="0.5" />
        <path d="M879 580 A26 26 0 0 1 924 570" fill="none" stroke="url(#hp-rim)" strokeWidth="1.8" opacity="0.45" />
        {/* 车身 */}
        <path
          d="M640 566 L736 524 L862 516 L952 552 L958 592 L880 606 L664 610 L632 592 Z"
          fill="#120302"
          className="poster__rim"
        />
        {/* 座舱 + 破碎的 A 柱 */}
        <path d="M736 524 L862 516 L876 556 L730 564 Z" fill="#0c0201" className="poster__rim" />
        <path d="M876 556 L862 516 L902 528 L902 556 Z" fill="#150403" className="poster__rim" />
        {/* 车顶平台（人物站立处） */}
        <path d="M730 520 L866 512 L872 528 L724 536 Z" fill="#1d0503" className="poster__rim" />
        {/* 压塌的车头 */}
        <path d="M632 566 L704 542 L720 578 L646 602 Z" fill="#160403" className="poster__rim" />
        {/* 车门缝 / 内饰线 */}
        <path d="M790 534 L792 592" stroke="url(#hp-rim)" strokeWidth="1" opacity="0.28" fill="none" />
        <path d="M846 530 L850 588" stroke="url(#hp-rim)" strokeWidth="1" opacity="0.22" fill="none" />
        {/* 飞散的碎片 */}
        <path d="M672 620 L716 604 L734 628 L688 646 Z" fill="#0c0201" className="poster__rim" />
        <path d="M944 592 L992 574 L1006 596 L958 614 Z" fill="#0c0201" className="poster__rim" />
        {/* 脱落的轮胎 */}
        <circle cx="556" cy="646" r="22" fill="#060101" />
        <circle cx="556" cy="646" r="7.5" fill="#1b0503" opacity="0.65" />
        <path d="M584 668 L630 652 L642 670 L596 686 Z" fill="#0a0201" className="poster__rim" />
      </g>

      {/* 西装人物剪影（站在车顶） */}
      <g className="poster__figure">
        <circle cx="800" cy="392" r="8.2" />
        <path d="M795 400 L805 400 L806 410 L794 410 Z" />
        <path d="M783 412 L817 412 L813 448 L806 454 L794 454 L787 448 Z" />
        <path d="M783 414 L774 423 L770 456 L777 457 L784 426 Z" />
        <path d="M817 414 L826 423 L830 456 L823 457 L816 426 Z" />
        <path d="M790 454 L799 454 L797 500 L789 500 Z" />
        <path d="M801 454 L810 454 L811 500 L803 500 Z" />
      </g>

      {/* 悬浮碎石（三层不同漂浮速度） */}
      {['a', 'b', 'c'].map((group) => (
        <g key={group} className={`poster__float poster__float--${group}`}>
          {ROCKS.filter((rock) => rock.a === group).map((rock) => (
            <path
              key={rock.s}
              d={rockPath(rock.x, rock.y, rock.r, rock.s)}
              className="poster__rock"
              opacity={rock.o}
            />
          ))}
        </g>
      ))}

      {/* 尘粒 */}
      <g className="poster__dust">
        {DUST.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="#ffe3b0" opacity={dot.o} />
        ))}
      </g>

      {/* 前景剪影，强化纵深 */}
      <path
        d="M-20 838 L58 800 L148 824 L242 786 L330 828 L418 852 L470 900 L-20 900 Z"
        fill="#060101"
        className="poster__rim"
      />
      <path
        d="M1620 824 L1526 790 L1430 826 L1336 792 L1244 832 L1158 856 L1108 900 L1620 900 Z"
        fill="#060101"
        className="poster__rim"
      />
    </svg>
  )
}

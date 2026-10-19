/**
 * 站点内容数据源（中英双语）
 * ---------------------------------------------------------------
 * 文字有两种写法：
 *   1) 直接写字符串   → 两种语言下都一样（型号、邮箱、社媒名称这类）
 *   2) 写成 { zh, en } → 切换语言时按当前语言取；组件里用 t(...) 取值
 *
 * 图片素材不在这里登记：作品图放进 src/assets/works/<slug>/ 会自动被读到。
 * 想改文字只动这个文件，不用碰组件。
 */

export const hero = {
  /* 首屏海报是「画面」的一部分，中英两种语言下保持一致 */
  poster: {
    title: 'BINGJUN YUAN',
    name: 'BINGJUN YUAN',
    tagline: 'Craft Compelling Product Visuals',
  },
  image: '',
  video: './media/hero-loop.mp4',
  posterImage: './media/hero-poster.jpg',
}

export const profile = {
  name: { zh: '袁炳俊', en: 'Bingjun Yuan' },
  nameEn: 'BINGJUN YUAN',
  initials: 'YBJ',
  /* 左上角品牌区：大字 + 小字（小字永远是另一种语言的衬托） */
  brandMain: { zh: '袁炳俊', en: 'BINGJUN YUAN' },
  brandSub: { zh: 'E-COMMERCE VISUAL DESIGNER', en: '跨境电商视觉设计师' },
  role: { zh: '电商视觉设计师', en: 'E-commerce Visual Designer' },
  roleEn: 'E-COMMERCE VISUAL DESIGNER',
  focus: { zh: '跨境方向', en: 'Cross-border' },
  school: { zh: '广东科技学院', en: 'Guangdong University of Science and Technology' },
  major: { zh: '视觉传达设计 · 本科', en: 'Visual Communication Design · BA' },
  classOf: { zh: '23 届', en: 'Class of 2023' },
  portrait: './portrait/portrait.webp',
  about: {
    zh: [
      /* 学历单独摆在右边那张卡里了，这里就不再重复一遍「视觉传达设计本科」 */
      '2023 年入行，从线下品牌物料一路做到跨境与国内电商、平台店铺和品牌项目。',
      '现在能独立完成详情页、店装、主图与社媒的策划、排版和精修，也做故宫祥瑞插画、品牌画册折页与 3D 渲染；让画面既服务「被点击」，也经得起「被相信」。',
    ],
    en: [
      'In the industry since 2023 — from offline brand collateral to cross-border and domestic e-commerce, storefronts and brand projects.',
      'My work now spans cross-border and domestic e-commerce, marketplace storefronts, product pages and overseas social, alongside palace-inspired illustration, brand catalogues and 3D rendering. I can carry an idea from strategy and layout through retouching to a finished, usable delivery.',
    ],
  },
  focusTags: {
    zh: ['跨境电商视觉', '国内电商 / 平台店铺', '详情页 / 信息架构', '插画 / 品牌物料', '产品精修 / 3D 渲染'],
    en: [
      'Cross-border visual',
      'Domestic e-commerce & storefronts',
      'Product pages & IA',
      'Illustration & collateral',
      'Retouch & 3D',
    ],
  },
  /** 个人技能（AI 工具 + 主流设计软件） */
  skills: {
    zh: ['GPT', 'Midjourney', 'Flow', 'Photoshop', 'Illustrator', 'Blender', 'AI 视觉工具'],
    en: ['GPT', 'Midjourney', 'Flow', 'Photoshop', 'Illustrator', 'Blender', 'Visual AI tools'],
  },
  contact: {
    phone: '15007612180',
    wechat: 'zaiykx',
    email: '1214168160@qq.com',
  },
}

export const experience = [
  {
    period: '2025.02 — NOW',
    company: { zh: '深圳市纵邦科技有限公司', en: 'Shenzhen Zongbang Technology Co., Ltd.' },
    role: { zh: '中高级设计师', en: 'Mid–Senior Designer' },
    tags: { zh: ['跨境电商', '国内电商'], en: ['Cross-border', 'Domestic'] },
    points: {
      zh: [
        '独立完成亚马逊、独立站的产品主图与详情页视觉，从策划、排版到落地一手跑通。',
        '负责产品精修与场景渲染，并输出海外社媒物料，配合大促节点持续迭代。',
      ],
      en: [
        'Own the visuals for Amazon and DTC product listings — concept, layout and final delivery in one pass.',
        'Handle product retouching and scene rendering, and produce overseas social creatives along the promo calendar.',
      ],
    },
  },
  {
    period: '2024.04 — 2024.10',
    company: { zh: '惠州市环诺电子科技有限公司', en: 'Huizhou Huannuo Electronic Technology Co., Ltd.' },
    role: { zh: '平面设计师', en: 'Graphic Designer' },
    tags: { zh: ['品牌营销'], en: ['Brand marketing'] },
    points: {
      zh: ['承接品牌线上营销视觉，输出节日海报与线上线下宣传物料，并完成产品渲染与精修。'],
      en: [
        'Delivered online brand marketing visuals — holiday posters and print/digital collateral — plus product rendering and retouching.',
      ],
    },
  },
  {
    period: '2023.02 — 2024.02',
    company: { zh: '广东金橙文化传媒有限公司', en: 'Guangdong Jincheng Culture & Media Co., Ltd.' },
    role: { zh: '平面设计师', en: 'Graphic Designer' },
    tags: { zh: ['品牌代理', '中国移动'], en: ['Brand agency', 'China Mobile'] },
    points: {
      zh: [
        '服务中国移动东莞分公司品牌代理项目，交付单页、展架、电子屏、候车亭、地铁广告等多载体物料，严格遵循 VI 规范。',
      ],
      en: [
        'Worked on the China Mobile Dongguan brand-agency account: flyers, roll-ups, digital signage, bus shelters and metro ads, all delivered strictly to the VI guidelines.',
      ],
    },
  },
]

export const awards = [
  {
    year: { zh: '第 14 届 · 2022', en: '14th Edition · 2022' },
    title: {
      zh: '全国大学生广告艺术大赛',
      en: 'National College Student Advertising Art Competition',
    },
    prize: { zh: ['省级一等奖', '国家级二等奖'], en: ['Provincial 1st Prize', 'National 2nd Prize'] },
    work: { zh: '《非常时刻，非常可乐》', en: '“Extraordinary Times, Extraordinary Cola”' },
  },
  {
    year: { zh: '第 13 届 · 2021', en: '13th Edition · 2021' },
    title: {
      zh: '全国大学生广告艺术大赛',
      en: 'National College Student Advertising Art Competition',
    },
    prize: { zh: ['省级二等奖', '国家级优秀奖'], en: ['Provincial 2nd Prize', 'National Merit Award'] },
    work: { zh: '《0 卡 0 负担，轻松上阵》', en: '“0 Calories, 0 Burden — Light and Ready”' },
  },
]

/**
 * 作品数据（ACEBEAM 品牌项目）
 * ---------------------------------------------------------------
 * 每一项 = 一个作品；图片不用登记，放进 src/assets/works/<slug>/ 就会自动出现在详情页画廊里。
 *  · detail.gallery：'stack' 逐屏平铺（详情页长图用）／'grid' 杂志式多列（社媒海报用）
 *  · detail：详情页「项目信息」栏的内容（角色 / 周期 / 交付物），不填也能自动用分类和年份兜底
 *  · notes：详情页的「设计思路」——idea 是一段理念，points 是三条要点，flow 是页面模块顺序
 */
export const projects = [
  {
    index: '01',
    slug: 'x35-searchlight',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '手电', en: 'Flashlight' },
    title: { zh: 'X35 强光搜索手电', en: 'X35 Search Flashlight' },
    /* 副标永远显示「另一种语言」，做中文/英文的小字衬托 */
    subtitle: {
      zh: 'ACEBEAM X35 · 20,000 Lumen Search Light',
      en: 'ACEBEAM X35 · 两万流明搜索手电',
    },
    desc: {
      zh: '把 20,000 流明装进手机大小的机身。整页围绕「看得见」展开：先给一屏光墙，再拆结构、讲操作、落到真实场景。',
      en: '20,000 lumens in a body the size of a phone. The page is built around one question — can you actually see? A wall of light first, then structure, controls and real-world proof.',
    },
    tags: { zh: ['详情页', '中英双语', '产品精修'], en: ['Product page', 'Bilingual', 'Retouch'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '12 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '12 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 产品精修', en: 'Visual concept · Page design · Retouch' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 12 屏', '中英双语版本', '主视效 3 张'],
        en: ['12-screen product page', 'Bilingual version', '3 key visuals'],
      },
    },
    notes: {
      idea: {
        zh: '20,000 流明的卖点是「亮」，但页面不能只是亮。整页用黑底把光留住：先给一整屏光墙让你相信它够亮，再拆开三颗灯珠和双开关怎么控住这面光，最后用真实场景和参数表收口，把亮度变成可信的搜索能力。',
        en: 'The selling point is brightness, but a page cannot simply be bright. Everything sits on black so the light has somewhere to live: one full screen of light to make you believe it, then the three LEDs and dual switches that control it, and finally real scenes and specs — turning raw lumens into believable search capability.',
      },
      points: [
        {
          t: { zh: '先给结果，再讲原理', en: 'Show the result first' },
          d: {
            zh: '第一屏只放光墙和型号，第二屏才用 10000mAh / 20000LM / 458m 三个数字交代实力。',
            en: 'Screen one holds only the light and the model name; screen two brings in 10000mAh / 20000LM / 458m.',
          },
        },
        {
          t: { zh: '把操作画成一双手', en: 'Draw the controls as hands' },
          d: {
            zh: '双开关与手柄开关都用戴手套的手部特写演示，比画箭头更接近真实使用。',
            en: 'Dual switches and the handle switch are shown on gloved hands — closer to real use than arrows.',
          },
        },
        {
          t: { zh: '场景就是证据', en: 'Scenes are the proof' },
          d: {
            zh: '搜救、检修、营地各占一屏，让「亮」落在具体的人和事上。',
            en: 'Search and rescue, inspection and camp each get a screen, so brightness lands on real people.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', '实力总览', '结构与操作', '场景实证', '参数与包装'],
        en: ['Hero', 'Spec overview', 'Structure & controls', 'Field proof', 'Specs & packaging'],
      },
    },
  },
  {
    index: '02',
    slug: 'h18-headlamp',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '头灯', en: 'Headlamp' },
    title: { zh: 'H18 双光源拐角头灯', en: 'H18 Dual-Light Headlamp' },
    subtitle: {
      zh: 'ACEBEAM H18 · Dual-Light Right-Angle Headlamp',
      en: 'ACEBEAM H18 · 双光源拐角头灯',
    },
    desc: {
      zh: '头灯的难点不是参数，是「怎么戴」。整页用 180° 拐角旋转和三种佩戴方式回答佩戴问题，再补白光与红光的分工。',
      en: 'The hard part of a headlamp is not the specs, it is how you wear it. The page answers that with a 180° rotating head and three mounting options, then explains the split between white and red light.',
    },
    tags: { zh: ['详情页', '佩戴演示', '中英双语'], en: ['Product page', 'Wearing demo', 'Bilingual'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '15 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '15 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 场景合成', en: 'Visual concept · Page design · Scene compositing' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 15 屏', '中英双语版本', '动效分镜 1 段'],
        en: ['15-screen product page', 'Bilingual version', '1 animated sequence'],
      },
    },
    notes: {
      idea: {
        zh: '头灯真正的难点是「戴法」，不是亮度。所以整页先解决三个问题：怎么固定在头上、怎么挂在装备上、什么时候该用红光。拐角旋转和三种佩戴方式各给一屏，最后用重量、做工与防水把「愿意一直戴着」这件事讲完。',
        en: 'The real challenge of a headlamp is how it is worn, not how bright it is. The page answers three questions first: how it locks onto your head, how it clips to gear, and when red light is the right choice. The rotating head and mounting options each get a screen, and weight, build and water resistance close the loop.',
      },
      points: [
        {
          t: { zh: '佩戴先于参数', en: 'Mounting before numbers' },
          d: {
            zh: '三屏讲清头上、胸前、装备上的戴法，参数放在理解之后。',
            en: 'Three screens cover head, chest and gear mounting — specs come after understanding.',
          },
        },
        {
          t: { zh: '双光分工', en: 'Two lights, two jobs' },
          d: {
            zh: '白光负责搜救与巡检，红光负责夜视与不惊扰，两屏对照着讲。',
            en: 'White light for search and inspection, red light for night vision without startling — shown side by side.',
          },
        },
        {
          t: { zh: '用细节建立信任', en: 'Trust through details' },
          d: {
            zh: 'CNC 铝壳、IP68、2 米跌落，交给微距特写而不是文案。',
            en: 'CNC aluminium, IP68 and a 2-metre drop rating are carried by macro shots, not copy.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', '佩戴方式', '双光与场景', '轻量与做工', '包装清单'],
        en: ['Hero', 'Mounting options', 'Dual light & scenes', 'Weight & build', 'In the box'],
      },
    },
  },
  {
    index: '03',
    slug: 'm1-terminator',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '手电', en: 'Flashlight' },
    title: { zh: 'M1 双头变焦战术手电', en: 'M1 Dual-Head LEP Flashlight' },
    subtitle: {
      zh: 'ACEBEAM Terminator M1 2.0 · LEP + LED Dual Head',
      en: 'ACEBEAM Terminator M1 2.0 · 双头 LEP + LED',
    },
    desc: {
      zh: 'LEP 激光远射 + LED 泛光装进同一支手电。用分屏对照的视觉逻辑，把「一把灯当两把用」一眼讲明白。',
      en: 'LEP throw and LED flood in one body. A split-screen logic lets the page explain “two lights in one” at a glance.',
    },
    tags: { zh: ['详情页', '双头结构', '中英双语'], en: ['Product page', 'Dual-head structure', 'Bilingual'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '14 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '14 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 光效合成', en: 'Visual concept · Page design · Light compositing' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 14 屏', '中英双语版本', '光效示意 5 张'],
        en: ['14-screen product page', 'Bilingual version', '5 light renders'],
      },
    },
    notes: {
      idea: {
        zh: 'M1 2.0 的核心是「双头」：一头打远、一头铺近。页面因此用了分屏的视觉逻辑——白与红、远与近对照着出现，不用读参数也能明白为什么做两个灯头；中间把磁环调光交给手部特写，把「指尖一拧换五档」讲具体。',
        en: 'The core of M1 2.0 is its two heads: one throws far, one floods wide. That is why the layout works in split screens — white against red, throw against flood — so the reason for two heads reads without a single spec. The magnetic ring is explained through hands: one fingertip twist, five modes.',
      },
      points: [
        {
          t: { zh: '分屏对照', en: 'Split-screen comparison' },
          d: {
            zh: '同一屏里让白光／红光、远射／泛光互相参照，结构差异一目了然。',
            en: 'White vs red and throw vs flood sit in the same screen, so the structural difference is obvious.',
          },
        },
        {
          t: { zh: '数字可视化', en: 'Numbers made visible' },
          d: {
            zh: '3900LM、1620m、9.5 天续航，用尺度和曲线代替罗列。',
            en: '3900LM, 1620m and 9.5 days of runtime are shown as scale and curves, not lists.',
          },
        },
        {
          t: { zh: '手感即卖点', en: 'Feel is a selling point' },
          d: {
            zh: '磁环五档、双开关、握持尺寸，全部用戴手套的手真实演示。',
            en: 'Five-step ring, dual switches and grip size are all demonstrated on gloved hands.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', '双头结构', '光照表现', '操作与手感', '参数与包装'],
        en: ['Hero', 'Dual-head structure', 'Beam performance', 'Controls & feel', 'Specs & packaging'],
      },
    },
  },
  {
    index: '04',
    slug: 'p20-mini',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '手电', en: 'Flashlight' },
    title: { zh: 'P20 MINI 远射战术手电', en: 'P20 MINI Long-Range Flashlight' },
    subtitle: {
      zh: 'ACEBEAM P20 MINI · Long Distance Tactical',
      en: 'ACEBEAM P20 MINI · 远射战术手电',
    },
    desc: {
      zh: '把 1035 米射程做到巴掌大。整页用尺寸反差和真实光柱，把「小体积、大输出」讲成看得见的东西。',
      en: 'A 1,035-metre beam in a palm-sized body. Size contrast and real light beams turn “small but powerful” into something you can see.',
    },
    tags: { zh: ['详情页', '参数可视化', '中英双语'], en: ['Product page', 'Data visuals', 'Bilingual'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '13 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '13 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 产品精修', en: 'Visual concept · Page design · Retouch' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 13 屏', '中英双语版本', '参数图表 4 组'],
        en: ['13-screen product page', 'Bilingual version', '4 data charts'],
      },
    },
    notes: {
      idea: {
        zh: 'P20 MINI 最值钱的地方是反差：巴掌大的机身，4000 流明、1035 米射程。页面反复做同一件事——把它放进手掌、工具台和户外环境做尺寸对比，再用一束穿透烟尘的光柱把数字落地；耐久测试放到后半段，不抢产品的戏。',
        en: 'What P20 MINI is really worth is the contrast: a palm-sized body with 4,000 lumens and 1,035 metres of throw. The page keeps doing one thing — placing it in a hand, on a workbench, outdoors — and then lands the numbers with a beam cutting through dust. Durability waits until the second half, so it never steals the scene.',
      },
      points: [
        {
          t: { zh: '反差造冲击', en: 'Contrast creates impact' },
          d: {
            zh: '小机身与 4000LM／1035m 同框对比，先把惊讶建立起来。',
            en: 'The small body sits beside 4000LM / 1035m, so surprise comes first.',
          },
        },
        {
          t: { zh: '一束光的证据', en: 'One beam as evidence' },
          d: {
            zh: '光柱穿透烟尘的画面，比一整张参数表更能说明射程。',
            en: 'A beam through dust explains throw far better than a full spec table.',
          },
        },
        {
          t: { zh: '耐久放在后面', en: 'Durability comes later' },
          d: {
            zh: '先把产品讲明白，再用落水、跌落、踩踏收尾。',
            en: 'Explain the product first, then close with water, drops and being stepped on.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', '核心参数', '结构与电池', '尺寸与操作', '可靠性与参数'],
        en: ['Hero', 'Key specs', 'Structure & battery', 'Size & controls', 'Ruggedness & specs'],
      },
    },
  },
  {
    index: '05',
    slug: 'uc3a-edc',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: 'EDC', en: 'EDC' },
    title: { zh: 'UC3A 多色 EDC 信号灯', en: 'UC3A Multi-Color EDC Light' },
    subtitle: {
      zh: 'ACEBEAM UC3A · 270° RGB EDC Light',
      en: 'ACEBEAM UC3A · 270° RGB 随身信号灯',
    },
    desc: {
      zh: '900 流明主灯 + 270° RGB 侧灯。整页语气比战术款更轻，用生活化镜头把口袋里的灯讲成信号工具。',
      en: 'A 900-lumen main light plus a 270° RGB side light. The tone is lighter than the tactical models: everyday shots turn a pocket light into a signalling tool.',
    },
    tags: { zh: ['详情页', 'RGB 光源', '中英双语'], en: ['Product page', 'RGB light', 'Bilingual'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '13 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '13 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 场景合成', en: 'Visual concept · Page design · Scene compositing' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 13 屏', '中英双语版本', '色彩演示 1 段'],
        en: ['13-screen product page', 'Bilingual version', '1 colour sequence'],
      },
    },
    notes: {
      idea: {
        zh: 'UC3A 是随身物，所以整页的语气比战术款更轻：大量使用手持、口袋、挂扣、磁吸这些贴近日常的镜头，把 270° RGB 侧灯放在最前面当主角，让「氛围」和「信号」两个用途一眼可见，最后用 AAA 备用电池把续航焦虑收掉。',
        en: 'UC3A is something you carry, so the page speaks more lightly than the tactical models: hands, pockets, clips and magnetic mounts do most of the work. The 270° RGB side light takes the lead screen, so both moods and signals are obvious at a glance, and a AAA backup battery closes out the battery anxiety.',
      },
      points: [
        {
          t: { zh: '先让人想带走它', en: 'Make people want to carry it' },
          d: {
            zh: '手持、挂扣、吸附桌面的生活化镜头，降低专业装备的距离感。',
            en: 'Hands, clips and a light snapped onto a desk lower the distance of pro gear.',
          },
        },
        {
          t: { zh: '颜色就是功能', en: 'Colour is function' },
          d: {
            zh: 'RGB 不只做氛围，五种颜色分别对应警示、求助与氛围等具体用途。',
            en: 'RGB is not only a mood: five colours map to warning, help and ambience.',
          },
        },
        {
          t: { zh: '把续航讲成安心', en: 'Runtime as peace of mind' },
          d: {
            zh: 'USB-C 直充 + AAA 备用电池，用「没电」这个真实痛点收尾。',
            en: 'USB-C plus an AAA backup answers the real fear — running out of power.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', 'RGB 侧光', '佩戴方式', '使用场景', '参数与清单'],
        en: ['Hero', 'RGB side light', 'Carrying options', 'Use cases', 'Specs & in the box'],
      },
    },
  },
  {
    index: '06',
    slug: 'battery-6400',
    visual: 'retouch',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '配件', en: 'Battery' },
    title: { zh: '6400 21700 高倍率电池', en: '6400 21700 High-Drain Battery' },
    subtitle: {
      zh: 'ACEBEAM 21700 6400mAh 25A · USB-C Rechargeable',
      en: 'ACEBEAM 21700 6400mAh 25A · USB-C 直充',
    },
    desc: {
      zh: '电池没有形态，最难做出画面感。整页用能量光轨把电荷做成主角，再用同框对比把 6400mAh 讲清楚。',
      en: 'A battery has no shape, which makes it the hardest thing to visualise. Energy trails turn the charge itself into the subject, and side-by-side comparison makes 6400mAh clear.',
    },
    tags: { zh: ['详情页', '参数对比', '中英双语'], en: ['Product page', 'Spec comparison', 'Bilingual'] },
    metrics: {
      zh: [
        { k: '页面屏数', v: '7 屏' },
        { k: '输出规格', v: '中英双语' },
      ],
      en: [
        { k: 'Sections', v: '7 screens' },
        { k: 'Output', v: 'Bilingual' },
      ],
    },
    detail: {
      role: { zh: '视觉策划 · 详情页设计 · 光效合成', en: 'Visual concept · Page design · Light compositing' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['详情页 7 屏', '中英双语版本', '对比图表 3 组'],
        en: ['7-screen product page', 'Bilingual version', '3 comparison charts'],
      },
    },
    notes: {
      idea: {
        zh: '电池没有形态，所以整页先解决「画面」：用旋转的能量环和红色光轨，把容量、放电这些看不见的东西做成主角；再解决「说服」——和常见的 5000mAh 电池同框对比，把 28% 的提升、25A 的放电能力和内置保护电路画成一眼能懂的信息图。',
        en: 'Because a battery has no shape, the page solves the picture first: rotating energy rings and red light trails make capacity and discharge the subject. Then it solves persuasion — a side-by-side with the common 5000mAh cell turns a 28% gain, 25A discharge and the built-in protection circuit into one-glance infographics.',
      },
      points: [
        {
          t: { zh: '把不可见变成可见', en: 'Make the invisible visible' },
          d: {
            zh: '能量环与光轨承担视觉叙事，让一节电池也有主角感。',
            en: 'Energy rings and trails carry the story, so even a battery can lead a frame.',
          },
        },
        {
          t: { zh: '对比出价值', en: 'Value through comparison' },
          d: {
            zh: '与 5000mAh 机型同框，6400mAh 与 25A 的优势一眼可见。',
            en: 'Beside a 5000mAh cell, the 6400mAh capacity and 25A rating speak for themselves.',
          },
        },
        {
          t: { zh: '安全是核心卖点', en: 'Safety is the core claim' },
          d: {
            zh: '内置保护电路与防爆结构用示意图讲透，比只写参数更让人放心。',
            en: 'Protection circuits and burst-proof structure are diagrammed — more reassuring than specs alone.',
          },
        },
      ],
      flow: {
        zh: ['主视觉', '容量与倍率', '安全结构', '充电与适配', '规格表'],
        en: ['Hero', 'Capacity & discharge', 'Safety structure', 'Charging & compatibility', 'Specifications'],
      },
    },
  },
  {
    index: '07',
    slug: 'acebeam-social',
    visual: 'social',
    year: '2025 — 2026',
    cover: '',
    category: { zh: '社媒', en: 'Social' },
    title: { zh: 'ACEBEAM 海外社媒物料', en: 'ACEBEAM Overseas Social Creatives' },
    subtitle: {
      zh: 'Social & Campaign Creatives',
      en: 'ACEBEAM · 海外社媒与活动物料',
    },
    desc: {
      zh: '新品发布、促销、抽奖、节日营销：一整套能持续复用的海外社媒视觉，让不同活动看起来像同一个品牌。',
      en: 'Launches, promotions, giveaways and holiday campaigns: one reusable social system that keeps every activity sounding like the same brand.',
    },
    tags: { zh: ['海外社媒', '模板体系', '多规格投放'], en: ['Overseas social', 'Template system', 'Multi-format'] },
    metrics: {
      zh: [
        { k: '物料张数', v: '46 张' },
        { k: '投放规格', v: '1:1 / 4:5 / 16:9' },
      ],
      en: [
        { k: 'Creatives', v: '46 assets' },
        { k: 'Formats', v: '1:1 / 4:5 / 16:9' },
      ],
    },
    detail: {
      role: { zh: '社媒视觉设计 · 版式模板', en: 'Social visual design · Layout system' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['社媒物料 46 张', '版式模板 3 套', '中英双语'],
        en: ['46 social creatives', '3 layout templates', 'Bilingual'],
      },
      gallery: 'grid',
    },
    notes: {
      idea: {
        zh: '社媒物料的价值不在单张好看，而在「一眼认出」。整套物料只做一件事：把品牌橙、粗黑体标题和产品实拍固定成骨架——新品用同一种版式，促销用同一种折扣标签，抽奖用同一种互动语气，跨活动保持连贯，后续物料也能快速复用。',
        en: 'The value of social work is not one good-looking post, it is being recognised at a glance. The whole set does one thing: brand orange, heavy black headlines and product photography become a fixed skeleton — the same layout for launches, the same discount tag for promos, the same tone for giveaways, so everything stays consistent and the next asset is quick to build.',
      },
      points: [
        {
          t: { zh: '固定视觉骨架', en: 'A fixed visual skeleton' },
          d: {
            zh: '统一的品牌橙、字体层级与标题位置，让不同活动像同一个品牌在说话。',
            en: 'One brand orange, one type hierarchy, one headline position — different campaigns, one voice.',
          },
        },
        {
          t: { zh: '按目的分版式', en: 'Layouts by purpose' },
          d: {
            zh: '新品讲卖点、促销讲折扣、抽奖讲参与，三种版式各司其职。',
            en: 'Launches sell features, promos sell discounts, giveaways invite participation — three jobs, three layouts.',
          },
        },
        {
          t: { zh: '多规格同步', en: 'Every format at once' },
          d: {
            zh: '1:1 主帖、4:5 信息流、16:9 横幅一次产出，直接进投放。',
            en: '1:1 feed posts, 4:5 stories and 16:9 banners produced together, ready to run.',
          },
        },
      ],
      flow: {
        zh: ['新品发布', '促销活动', '互动抽奖', '节日营销'],
        en: ['New releases', 'Promotions', 'Giveaways', 'Holiday campaigns'],
      },
    },
  },
]

/**
 * 其他项目：五个独立入口，每个入口都可以继续点进子项目。
 * 图片通过 other-gallery.json + import.meta.glob 自动读取。
 */
const otherProjectsSource = [
  {
    index: '01',
    slug: 'domestic-ecommerce',
    coverGroup: 'domestic-creative',
    covers: [
      {
        gallery: 'domestic-creative',
        file: '34-X75-可以当封面.webp',
        label: { zh: '创意型', en: 'Creative' },
      },
      {
        gallery: 'domestic-consistent',
        file: '51-x35-可以当封面.webp',
        label: { zh: '统一型', en: 'Consistent' },
      },
    ],
    year: '2026',
    category: { zh: '国内电商', en: 'Domestic E-commerce' },
    title: { zh: '双店铺 · 双风格运营实验', en: 'Two Stores · Two Visual Systems' },
    subtitle: {
      zh: 'Creative vs. Consistent · Data-led A/B testing',
      en: '创意型 vs. 统一型 · 数据驱动的 A/B 测试',
    },
    desc: {
      zh: '用两个独立店铺并行测试两套主图策略：创意型争取注意力，统一型承接搜索与快速比较。最终不靠审美偏好下结论，而用点击率、转化率、加购与投放回报持续复盘。',
      en: 'Two independent stores test two listing-image strategies in parallel: creative visuals compete for attention, while a consistent system supports search traffic and fast comparison. Decisions are made with CTR, conversion, add-to-cart and return data, not taste alone.',
    },
    tags: {
      zh: ['双店铺', 'A/B 测试', '主图策略'],
      en: ['Two stores', 'A/B testing', 'Listing strategy'],
    },
    metrics: {
      zh: [
        { k: '独立店铺', v: '02' },
        { k: '主图样本', v: '85' },
      ],
      en: [
        { k: 'Stores', v: '02' },
        { k: 'Listing samples', v: '85' },
      ],
    },
    children: [
      {
        slug: 'consistent',
        gallery: 'domestic-consistent',
        coverFile: '51-x35-可以当封面.webp',
        title: { zh: '统一风格主图', en: 'Consistent Listing System' },
        subtitle: { zh: '稳定识别 · 支持快速比较', en: 'Recognisable · Easy to compare' },
        desc: {
          zh: '固定版式、标题区、参数区与品牌落款，让多型号商品形成稳定货架。适合承接搜索流量，降低用户比较成本，并支持运营快速扩品。',
          en: 'A fixed layout, headline zone, specs and brand lockup create a stable product shelf. Built for search traffic, faster comparison and scalable operations.',
        },
        tags: { zh: ['统一版式', '搜索承接', '规模化'], en: ['Consistent layout', 'Search', 'Scalable'] },
      },
      {
        slug: 'creative',
        gallery: 'domestic-creative',
        coverFile: '34-X75-可以当封面.webp',
        title: { zh: '创意型主图', en: 'Creative Listing System' },
        subtitle: { zh: '抢占注意力 · 放大场景张力', en: 'Stop the scroll · Amplify the scene' },
        desc: {
          zh: '用强场景、戏剧化光效与更自由的产品构图争夺点击。适合拉新、测试新品视觉上限，以及探索更具冲击力的内容表达。',
          en: 'Strong scenes, dramatic light and freer product composition compete for the click. Built for acquisition, new-product exploration and finding the upper limit of visual impact.',
        },
        tags: { zh: ['创意主图', '场景张力', '拉新'], en: ['Creative', 'Scene tension', 'Acquisition'] },
      },
    ],
    strategy: {
      eyebrow: { zh: 'Strategy / 运营策略', en: '运营策略 / Strategy' },
      title: { zh: '不是两套审美，而是两条转化路径', en: 'Not two looks — two conversion paths' },
      lead: {
        zh: '两个独立店铺，分别对应两种截然不同的视觉风格。把同一产品池放进不同店铺环境，是为了隔离变量：创意型负责探索流量获取能力，统一型负责验证稳定承接和规模化复制的效率。',
        en: 'Two independent stores use two deliberately different visual systems. Putting the same product pool into separate store environments isolates the variables: the creative system explores traffic acquisition, while the consistent system tests stable conversion and scalable duplication.',
      },
      points: [
        {
          title: { zh: '01 / 独立经营，隔离变量', en: '01 / Separate stores, clean variables' },
          desc: {
            zh: '两个店铺独立运营、独立承接流量，避免同一店铺内的风格切换互相干扰，让主图策略的差异可以被单独观察。',
            en: 'The stores operate independently so a change in visual direction does not contaminate the other test. Each image strategy can be observed on its own.',
          },
        },
        {
          title: { zh: '02 / 创意型：先赢得点击', en: '02 / Creative: win the click first' },
          desc: {
            zh: '通过场景冲突、光效和产品尺度制造视觉停顿，适合探索更高的点击率，也为新品建立更强的第一眼记忆。',
            en: 'Scene contrast, light and scale create a visual pause. This path explores higher CTR and gives new products a stronger first impression.',
          },
        },
        {
          title: { zh: '03 / 统一型：再把理解变短', en: '03 / Consistent: shorten the decision' },
          desc: {
            zh: '统一标题、产品占位和信息顺序，让用户跨型号比较时不用重新学习版式；对搜索流量而言，熟悉感会直接降低决策成本。',
            en: 'Shared headlines, product placement and information order remove relearning when comparing models. For search traffic, familiarity directly lowers decision cost.',
          },
        },
        {
          title: { zh: '04 / 用经营数据做裁决', en: '04 / Let operating data decide' },
          desc: {
            zh: '持续观察点击率、转化率、加购率、客单价与投放回报。哪种风格更优并不是固定答案，而会随品类、价位、流量来源和活动阶段变化。',
            en: 'CTR, conversion, add-to-cart, AOV and ad return are reviewed continuously. There is no permanent winner; the better system changes with category, price, traffic source and campaign stage.',
          },
        },
      ],
    },
  },
  {
    index: '02',
    slug: 'web-design',
    coverGroup: 'web-amazon',
    covers: [
      { gallery: 'web-amazon', file: '01-主视觉-E75.webp' },
    ],
    year: '2025 — 2026',
    category: { zh: '网页设计', en: 'Web Design' },
    title: { zh: '平台店铺视觉系统', en: 'Platform Storefront Systems' },
    subtitle: {
      zh: 'Amazon A+ / AliExpress Storefront',
      en: '亚马逊 A+ / 速卖通店铺',
    },
    desc: {
      zh: '针对亚马逊与速卖通两套平台规则，分别组织品牌故事、产品层级、卖点模块与收口路径。页面不是把图片排整齐，而是让用户按经营目标完成浏览。',
      en: 'Brand story, product hierarchy, selling-point modules and exit paths are organised around the rules of Amazon and AliExpress. The page is not an image stack; it is a guided commercial journey.',
    },
    tags: { zh: ['店铺首页', '信息架构', '双平台'], en: ['Storefront', 'Information architecture', 'Two platforms'] },
    metrics: {
      zh: [
        { k: '平台', v: '02' },
        { k: '页面模块', v: '46' },
      ],
      en: [
        { k: 'Platforms', v: '02' },
        { k: 'Page assets', v: '46' },
      ],
    },
    children: [
      {
        slug: 'amazon',
        gallery: 'web-amazon',
        coverFile: '01-主视觉-E75.webp',
        title: { zh: '亚马逊店铺视觉', en: 'Amazon Storefront' },
        subtitle: { zh: '品牌背书 · 选择理由 · 热卖转场', en: 'Trust · Reasons to choose · Bestsellers' },
        desc: {
          zh: '以 A+ 页面的阅读逻辑组织内容：先建立品牌可信度，再解释为什么选择，最后把用户带到具体产品。模块之间用统一的光效、留白和品牌橙保持连贯。',
          en: 'Content follows A+ reading logic: establish brand trust, explain the reasons to choose, then move users into specific products. Consistent light, whitespace and brand orange connect the modules.',
        },
        tags: { zh: ['Amazon', '品牌故事', 'A+'], en: ['Amazon', 'Brand story', 'A+'] },
      },
      {
        slug: 'aliexpress',
        gallery: 'web-aliexpress',
        coverFile: '18-品牌视觉主视觉.webp',
        title: { zh: '速卖通店铺视觉', en: 'AliExpress Storefront' },
        subtitle: { zh: '快速分类 · 产品矩阵 · 轮播转化', en: 'Fast categories · Product matrix · Carousels' },
        desc: {
          zh: '速卖通用户更依赖快速扫描与即时比较，因此页面先给品类入口和高识别轮播，再用热卖产品和品牌信息完成承接。统一的红色促销语言与产品摄影形成节奏。',
          en: 'AliExpress users scan and compare quickly, so the page opens with category access and recognisable carousels, then supports them with bestsellers and brand information. Promotional red and product photography create the rhythm.',
        },
        tags: { zh: ['AliExpress', '分类导航', '轮播'], en: ['AliExpress', 'Category nav', 'Carousels'] },
      },
    ],
  },
  {
    index: '03',
    slug: 'illustration',
    coverGroup: 'illustration',
    covers: [
      { gallery: 'illustration-card', file: '01-故宫祥瑞-封面.webp' },
    ],
    year: '2026',
    category: { zh: '手绘插画', en: 'Hand-drawn illustration' },
    title: { zh: '故宫祥瑞 · 八大瑞兽', en: 'Auspicious Beasts of the Forbidden City' },
    subtitle: {
      zh: 'Palace-inspired illustration & brand storytelling',
      en: '故宫祥瑞插画与品牌延展',
    },
    desc: {
      zh: '以故宫屋脊瑞兽为叙事核心，把金龙、凤凰、麒麟等传统意象重新组织成当代视觉系统。保留原有瑞兽角色、题签和印章，重做长页节奏、字体层级与样机叙事。',
      en: 'Roof beasts of the Forbidden City become the narrative core in a contemporary visual system. The original characters, title labels and seals stay; the long-form pacing, type hierarchy and mockup story are rebuilt.',
    },
    tags: { zh: ['故宫祥瑞', '东方插画', '品牌延展'], en: ['Palace auspiciousness', 'Eastern illustration', 'Brand system'] },
    metrics: {
      zh: [
        { k: '瑞兽', v: '08' },
        { k: '画册页', v: '08' },
      ],
      en: [
        { k: 'Beasts', v: '08' },
        { k: 'Book pages', v: '08' },
      ],
    },
    conservation: {
      keep: {
        title: { zh: '保留', en: 'Keep' },
        items: {
          zh: ['八大瑞兽的角色设定与画面叙事', '中文题签、印章与故宫色彩关系', '样机场景作为品牌延展证据'],
          en: ['The eight characters and their visual story', 'Chinese title labels, seals and palace colour relationships', 'Mockups as evidence of brand extension'],
        },
      },
      improve: {
        title: { zh: '优化', en: 'Improve' },
        items: {
          zh: ['把长页拆成“总览—角色—细节—应用”四段', '重新统一字号、行距与留白节奏', '减少信息平均用力，让每只瑞兽有独立主视觉'],
          en: ['Split the long page into overview, characters, details and applications', 'Unify type scale, leading and whitespace', 'Stop giving every fact equal weight; give each beast a distinct key visual'],
        },
      },
    },
    beasts: [
      { name: '金龙', en: 'Golden Dragon', meaning: { zh: '祥瑞 · 权威', en: 'Auspicious · Authority' } },
      { name: '凤凰', en: 'Phoenix', meaning: { zh: '瑞德 · 太平', en: 'Virtue · Harmony' } },
      { name: '金狮', en: 'Golden Lion', meaning: { zh: '守护 · 威仪', en: 'Guardian · Dignity' } },
      { name: '麒麟', en: 'Qilin', meaning: { zh: '仁兽 · 盛世', en: 'Benevolence · Prosperity' } },
      { name: '甪瑞', en: 'Luru', meaning: { zh: '明达 · 通达', en: 'Wisdom · Clarity' } },
      { name: '狻貌', en: 'Suanni', meaning: { zh: '辟邪 · 镇守', en: 'Protection · Warding' } },
      { name: '懈豸', en: 'Xiezhi', meaning: { zh: '公正 · 辨是非', en: 'Justice · Discernment' } },
      { name: '行什', en: 'Xingshi', meaning: { zh: '镇火 · 避雷', en: 'Fire protection · Safety' } },
    ],
  },
  {
    index: '04',
    slug: 'materials',
    coverGroup: 'materials',
    covers: [
      { gallery: 'materials', file: '05-05.webp' },
    ],
    year: '2026',
    category: { zh: '物料', en: 'Print & Collateral' },
    title: { zh: '品牌画册与展会折页', en: 'Product Catalogue & Exhibition Foldouts' },
    subtitle: {
      zh: '2026 ACEBEAM catalogue system',
      en: '2026 ACEBEAM 产品画册体系',
    },
    desc: {
      zh: '一本 28 页产品画册与中英双语展会折页。画册负责完整产品矩阵，折页负责在展会现场用最短时间建立品牌印象、给出系列入口并完成询盘承接。',
      en: 'A 28-page product catalogue plus bilingual exhibition foldouts. The catalogue carries the full range; the foldouts build an impression fast, surface the series and create a clear inquiry path on site.',
    },
    tags: { zh: ['28 页画册', '中英折页', '印刷设计'], en: ['28-page catalogue', 'Bilingual foldouts', 'Print design'] },
    metrics: {
      zh: [
        { k: '画册页数', v: '28' },
        { k: '折页版本', v: '02' },
      ],
      en: [
        { k: 'Catalogue pages', v: '28' },
        { k: 'Foldout editions', v: '02' },
      ],
    },
  },
  {
    index: '05',
    slug: '3d-rendering',
    coverGroup: '3d-rendering',
    covers: [
      { gallery: '3d-rendering', file: '01-机械场景-主视觉.webp' },
    ],
    year: '2024 — 2026',
    category: { zh: '3D 建模渲染', en: '3D Modeling & Rendering' },
    title: { zh: '基础建模与渲染练习', en: 'Modeling & Rendering Practice' },
    subtitle: {
      zh: 'Blender · Lighting · AI-assisted look development',
      en: 'Blender · 灯光 · AI 辅助视觉开发',
    },
    desc: {
      zh: '具备基础建模、材质、灯光与渲染能力，能够处理结构清晰的产品和道具；在更复杂的场景中，也能结合 AI 生成与后期合成推进视觉开发。',
      en: 'Practical modeling, material, lighting and rendering skills for clear product and prop forms. For more complex scenes, AI generation and post-compositing extend the look-development process.',
    },
    tags: { zh: ['Blender', '基础建模', 'AI 辅助'], en: ['Blender', 'Basic modeling', 'AI-assisted'] },
    metrics: {
      zh: [
        { k: '主要工具', v: 'Blender' },
        { k: '精选画面', v: '07' },
      ],
      en: [
        { k: 'Main tool', v: 'Blender' },
        { k: 'Selected frames', v: '07' },
      ],
    },
  },
]

/*
  首页与「其他项目」总览共用这一份顺序：
  双店铺 → 故宫祥瑞 → 平台店铺 → 品牌画册 → 建模渲染。

  详情页、序号和悬浮菜单都从这里读取，所以只改这一处就不会出现
  “卡片换了位置，但 02 / 03 还停在旧项目上”的错位。
*/
const otherProjectMenuLabels = {
  'domestic-ecommerce': { zh: '双店铺', en: 'Two stores' },
  illustration: { zh: '故宫祥瑞', en: 'Palace auspiciousness' },
  'web-design': { zh: '平台店铺', en: 'Platform storefronts' },
  materials: { zh: '品牌画册', en: 'Brand catalogue' },
  '3d-rendering': { zh: '建模渲染', en: '3D modeling' },
}

const otherProjectOrder = [
  'domestic-ecommerce',
  'illustration',
  'web-design',
  'materials',
  '3d-rendering',
]

const otherProjectsBySlug = new Map(otherProjectsSource.map((project) => [project.slug, project]))

export const otherProjects = otherProjectOrder.map((slug, index) => {
  const project = otherProjectsBySlug.get(slug)
  return {
    ...project,
    index: String(index + 1).padStart(2, '0'),
    menuLabel: otherProjectMenuLabels[slug],
  }
})

export const otherProjectsPage = {
  kicker: 'Other Projects',
  title: { zh: '其他项目', en: 'Other Projects' },
  titleEn: { zh: 'Beyond Cross-border · 05 Categories', en: '跨境电商之外 · 05 类' },
  desc: {
    zh: '国内电商、故宫祥瑞插画、平台网页、品牌印刷物料与 3D 渲染。五个入口分别展开，每个类别都能继续进入独立项目页。',
    en: 'Domestic e-commerce, palace-inspired illustration, platform storefronts, print collateral and 3D rendering. Five entries, each opening into dedicated project pages.',
  },
}

export const otherProjectUi = {
  backOther: { zh: '返回其他项目', en: 'Back to other projects' },
  backCategory: { zh: '返回类别', en: 'Back to category' },
  explore: { zh: '进入项目', en: 'Explore project' },
  openSeries: { zh: '查看这一组', en: 'View the series' },
  gallery: { zh: '项目图库', en: 'Project gallery' },
  overview: { zh: '项目概览', en: 'Overview' },
  viewAllOther: { zh: '查看其他项目', en: 'View other projects' },
}

export const projectFilters = {
  zh: ['全部', '手电', '头灯', 'EDC', '配件', '社媒'],
  en: ['All', 'Flashlight', 'Headlamp', 'EDC', 'Battery', 'Social'],
}

/**
 * 作品列表页（#/works）开头那段文字
 */
export const worksPage = {
  kicker: 'All Works',
  title: { zh: '作品集', en: 'Works' },
  titleEn: { zh: 'Selected Projects · 2025 — 2026', en: '作品集 · 2025 — 2026' },
    desc: {
      zh: '以 ACEBEAM 跨境项目为主：6 个产品详情页 + 1 套海外社媒物料。每个作品都写了设计思路，点开可以看到完整页面。',
      en: 'Mostly ACEBEAM cross-border work: six product detail pages and one overseas social kit, each with design notes.',
    },
  stats: {
    projects: 'Projects',
    directions: { zh: '方向', en: 'Directions' },
    years: { zh: '时间跨度', en: 'Years' },
  },
  ctaTitle: { zh: '想看看别的？', en: 'Anything else in mind?' },
  ctaText: {
    zh: '完整作品集之外，也可以直接聊聊你的项目：平台、品类、想要的视觉方向。',
    en: 'Beyond this portfolio, we can simply talk about your project: the platform, the category, the direction you want.',
  },
}

export const strengths = [
  {
    id: 'commerce',
    title: { zh: '全渠道电商视觉', en: 'Omnichannel e-commerce' },
    en: { zh: 'E-commerce', en: '全渠道电商' },
    desc: {
      zh: '熟悉亚马逊、速卖通和独立站的展示逻辑；能用国内双店铺 A/B 测试不同主图策略，再按点击、转化与加购数据持续迭代。',
      en: 'Fluent across Amazon, AliExpress and DTC storefronts. I also test listing systems through dual domestic stores, then refine them with CTR, conversion and add-to-cart data.',
    },
  },
  {
    id: 'systems',
    title: { zh: '页面系统与信息架构', en: 'Page systems & IA' },
    en: { zh: 'Page systems', en: '页面系统' },
    desc: {
      zh: '把品牌故事、产品层级、卖点模块与收口路径组织成可浏览的页面；A+、店铺首页、详情页和落地页共用一套清晰结构。',
      en: 'I organise brand story, product hierarchy, selling points and exit paths into browsable pages; A+, storefronts, product pages and landing pages share one clear structure.',
    },
  },
  {
    id: 'product',
    title: { zh: '产品精修与 3D 渲染', en: 'Product retouch & 3D' },
    en: { zh: 'Product visual', en: '产品视觉' },
    desc: {
      zh: '从光效、材质和场景合成，到 Blender 基础建模与渲染，让产品在不同媒介保持一致质感；复杂画面可结合 AI 与后期继续推进。',
      en: 'From light, material and scene compositing to foundational Blender modelling and rendering, I keep product quality consistent across media, extending complex scenes with AI and post.',
    },
  },
  {
    id: 'story',
    title: { zh: '插画叙事与品牌延展', en: 'Illustration & brand storytelling' },
    en: { zh: 'Storytelling', en: '插画叙事' },
    desc: {
      zh: '故宫祥瑞项目把传统瑞兽重组为当代品牌语言；能处理角色视觉、题签印章、长页节奏与样机应用。',
      en: 'The Forbidden City project recasts traditional roof beasts as a contemporary brand language — character direction, title labels, seals, long-form pacing and mockup applications.',
    },
  },
  {
    id: 'multi',
    title: { zh: '多载体品牌落地', en: 'Multi-format delivery' },
    en: { zh: 'Multi-format', en: '多载体落地' },
    desc: {
      zh: '海外社媒、活动视觉、28 页产品画册、中英双语展会折页与线下广告统一交付，保证不同尺寸和材质下识别一致。',
      en: 'Overseas social, campaign visuals, a 28-page catalogue, bilingual exhibition foldouts and offline advertising — one recognisable system across sizes and substrates.',
    },
  },
  {
    id: 'strategy',
    title: { zh: '策略到交付闭环', en: 'Strategy-to-delivery' },
    en: { zh: 'End-to-end', en: '完整闭环' },
    desc: {
      zh: '能从项目目标、平台规则和大促节奏出发，独立推进策划、版式、精修、渲染与交付，再用经营数据复盘调整。',
      en: 'I start from business goals, platform rules and promo calendars, then carry concept, layout, retouch, rendering and delivery through, refining with operating data.',
    },
  },
]

/** 关键词跑马灯（只保留真实做过的方向） */
export const keywords = {
  zh: [
    '产品详情页',
    '独立站视觉',
    '手电详情页',
    '头灯详情页',
    '跨境品牌视觉',
    '产品精修',
    '光效合成',
    '场景合成',
    '海外社媒海报',
    '新品发布物料',
    '促销活动视觉',
    '国内电商主图',
    '亚马逊店铺',
    '速卖通店铺',
    'A/B 主图测试',
    '故宫祥瑞插画',
    '品牌画册',
    '双语展会折页',
    '3D 建模渲染',
    '品牌视觉延展',
    '参数可视化',
    '中英双语排版',
    '包装与说明书',
  ],
  en: [
    'Product detail pages',
    'DTC visuals',
    'Flashlight pages',
    'Headlamp pages',
    'Cross-border branding',
    'Product retouching',
    'Light compositing',
    'Scene compositing',
    'Overseas social posters',
    'Launch creatives',
    'Promo visuals',
    'Domestic listing visuals',
    'Amazon storefronts',
    'AliExpress storefronts',
    'Listing A/B testing',
    'Palace-inspired illustration',
    'Brand catalogues',
    'Bilingual exhibition foldouts',
    '3D modelling & rendering',
    'Brand extensions',
    'Data visualisation',
    'Bilingual layout',
    'Packaging & manuals',
  ],
}

/** 如需要，可在此补上软件技能（会自动加到关键词跑马灯后面） */
export const tools = { zh: [], en: [] }

/** 顶部导航（显示顺序）：导航项只切换语言、不做双行，保持极简 */
export const nav = [
  { id: 'hero', label: { zh: '主页', en: 'Home' } },
  { id: 'about', label: { zh: '关于我', en: 'About' } },
  { id: 'works', label: { zh: '作品集', en: 'Works' } },
]

/** 页面里章节的先后顺序，用于滚动时高亮当前导航项 */
export const sectionOrder = ['hero', 'about', 'works', 'other', 'strengths', 'contact']

/** 各章节标题：大字用当前语言，眉标（小字）用另一种语言 */
export const sections = {
  about: {
    eyebrow: { zh: 'About / Profile', en: '关于我' },
    title: { zh: '关于我', en: 'About Me' },
    desc: {
      zh: '从线下品牌物料，到跨境与国内电商、平台店铺、插画和多载体品牌项目，把「好看」落到能浏览、能转化的版面上。',
      en: 'From offline brand collateral to cross-border and domestic e-commerce, storefronts, illustration and multi-format brand projects — making work that gets browsed, clicked and trusted.',
    },
  },
  works: {
    eyebrow: { zh: 'Cross-border Projects', en: '跨境电商项目' },
    title: { zh: '跨境电商项目', en: 'Cross-border Projects' },
    desc: {
      zh: '6 个 ACEBEAM 产品详情页 + 1 套海外社媒物料，每个都附了设计思路。',
      en: 'Six ACEBEAM product detail pages plus one overseas social kit — each with design notes.',
    },
  },
  other: {
    eyebrow: { zh: 'Other Projects', en: '其他项目' },
    title: { zh: '其他项目', en: 'Other Projects' },
    desc: {
      zh: '国内电商双风格测试、亚马逊与速卖通店铺、故宫祥瑞插画、品牌画册折页与 3D 渲染。',
      en: 'A dual-style domestic e-commerce test, Amazon and AliExpress storefronts, palace-inspired illustration, print collateral and 3D rendering.',
    },
  },
  strengths: {
    eyebrow: { zh: 'Capabilities', en: '个人优势' },
    title: { zh: '个人优势', en: 'Capabilities' },
    desc: {
      zh: '跨境电商详情页与店装、国内双店铺 A/B、故宫祥瑞插画、28 页品牌画册与 3D 渲染——能独立完成从策略、视觉到交付的完整闭环。',
      en: 'Marketplace pages and storefronts, dual-store domestic e-commerce tests, palace-inspired illustration, a 28-page catalogue and 3D rendering — a complete path from strategy and visuals to final delivery.',
    },
  },
}

export const contactSection = {
  kicker: { zh: 'Contact / 联系我', en: '联系我 / Contact' },
  titleLines: {
    zh: ['有项目要落地，', '我们从视觉开始聊。'],
    en: ['Got a project to ship?', 'Let’s start with the visuals.'],
  },
  desc: {
    zh: '跨境与国内电商主图 / 平台店铺 / 详情页 / 大促活动 / 插画与品牌物料 / 产品精修与 3D 渲染，都可以直接找我。',
    en: 'Cross-border and domestic listing visuals, storefronts, product pages, campaigns, illustration and brand collateral, retouching and 3D rendering — all of it, straight to me.',
  },
  cta: { zh: '发邮件', en: 'Send email' },
  rows: [
    { key: 'PHONE', cn: { zh: '电话', en: '' }, value: profile.contact.phone, href: `tel:${profile.contact.phone}` },
    { key: 'WECHAT', cn: { zh: '微信', en: '' }, value: profile.contact.wechat, href: null },
    { key: 'EMAIL', cn: { zh: '邮箱', en: '' }, value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  ],
}

/** 通用界面词（按钮 / 标签 / 提示） */
export const ui = {
  backToWorks: { zh: '返回作品集', en: 'Back to works' },
  allWorks: { zh: '全部作品', en: 'All works' },
  viewAllWorks: { zh: '查看全部作品', en: 'View all works' },
  viewProject: { zh: '查看完整作品', en: 'View full project' },
  designNotesKicker: { zh: 'Design Notes', en: '设计说明' },
  designNotesTitle: { zh: '设计思路', en: 'Design notes' },
  pageFlow: { zh: '页面顺序', en: 'Page flow' },
  gallery: 'Gallery',
  galleryUnit: { zh: '张作品图', en: 'images' },
  prev: { zh: '← 上一个', en: '← Previous' },
  next: { zh: '下一个 →', en: 'Next →' },
  toTop: { zh: '回到顶部', en: 'Back to top' },
  copy: { zh: '复制', en: 'Copy' },
  contactMe: { zh: '联系我', en: 'Contact me' },
  backHome: { zh: '回到首页', en: 'Back to home' },
  factType: { zh: '项目类型', en: 'Category' },
  factTime: { zh: '时间', en: 'Timeline' },
  factRole: { zh: '我的角色', en: 'My role' },
  factDeliver: { zh: '交付内容', en: 'Deliverables' },
  notFound: { zh: '没有找到这个作品', en: 'Project not found' },
  notFoundOther: { zh: '没有找到这个项目', en: 'Project not found' },
  backToOther: { zh: '返回其他项目', en: 'Back to other projects' },
  experienceNote: { zh: 'Experience · 2023 — NOW', en: '工作经历 · 2023 至今' },
  contactNote: { zh: 'Contact · 点右侧复制', en: '联系方式 · 点右侧复制' },
  awardsNote: { zh: 'Awards · 全国大学生广告艺术大赛', en: '获奖 · 全国大学生广告艺术大赛' },
  focus: { zh: 'Focus', en: '方向' },
  skills: { zh: 'Skills', en: '技能' },
  education: { zh: 'Education', en: '院校' },
  langButton: { zh: 'EN', en: '中' },
  langButtonLabel: { zh: 'Switch to English', en: '切换到中文' },
}

export const footer = {
  note: { zh: '本作品集使用 React + Vite 构建', en: 'Built with React + Vite' },
  year: '2026',
}

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
    title: 'VISION IS COMING',
    name: 'BINGJUN YUAN',
    tagline: 'Craft Compelling Product Visuals',
  },
  image: '',
  video: '/media/hero-loop.mp4',
  posterImage: '/media/hero-poster.jpg',
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
  portrait: '/portrait/portrait.webp',
  about: {
    zh: [
      /* 学历单独摆在右边那张卡里了，这里就不再重复一遍「视觉传达设计本科」 */
      '2023 年入行，从线下品牌物料一路做到跨境电商全链路视觉。',
      '现在专注跨境方向：独立完成产品详情页、主图与海外社媒物料的视觉策划、排版落地与产品精修，让每一张图都服务于「被点击」和「被相信」。',
    ],
    en: [
      'In the industry since 2023 — from offline brand collateral to full-stack cross-border e-commerce visuals.',
      'Today I focus on cross-border: I plan, lay out and retouch product detail pages, listing images and overseas social creatives on my own — every image serves one of two goals, getting clicked or getting trusted.',
    ],
  },
  focusTags: {
    zh: ['跨境电商视觉', '产品详情页', '主图 / 社媒物料', '产品精修渲染'],
    en: ['Cross-border visual', 'Product detail pages', 'Listing & social creatives', 'Retouch & rendering'],
  },
  /** 个人技能（AI 工具 + 主流设计软件） */
  skills: {
    zh: ['GPT', 'Midjourney', 'Flow', 'Photoshop', 'Illustrator', 'AI 视觉工具'],
    en: ['GPT', 'Midjourney', 'Flow', 'Photoshop', 'Illustrator', 'Visual AI tools'],
  },
  contact: {
    phone: '15007612180',
    wechat: 'YBJSZSD',
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
        { k: '物料张数', v: '31 张' },
        { k: '投放规格', v: '1:1 / 4:5 / 16:9' },
      ],
      en: [
        { k: 'Creatives', v: '31 assets' },
        { k: 'Formats', v: '1:1 / 4:5 / 16:9' },
      ],
    },
    detail: {
      role: { zh: '社媒视觉设计 · 版式模板', en: 'Social visual design · Layout system' },
      period: '2025 — 2026',
      deliverables: {
        zh: ['社媒物料 31 张', '版式模板 3 套', '中英双语'],
        en: ['31 social creatives', '3 layout templates', 'Bilingual'],
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
    id: 'cross-border',
    title: { zh: '跨境视觉落地', en: 'Cross-border delivery' },
    en: { zh: 'Cross-border', en: '跨境视觉' },
    desc: {
      zh: '熟悉亚马逊与独立站的展示规则与版面逻辑，主图、A+、详情页一次成型，不用来回返工。',
      en: 'Familiar with Amazon and DTC display rules and layout logic — listings, A+ and detail pages land right the first time.',
    },
  },
  {
    id: 'retouch',
    title: { zh: '产品精修与渲染', en: 'Retouch & rendering' },
    en: { zh: 'Retouch', en: '产品精修' },
    desc: {
      zh: '质感调色、材质还原、场景渲染，让产品在图上立得住，也让卖点看得见。',
      en: 'Tone, material and scene work that make a product stand up in the frame — and its selling points visible.',
    },
  },
  {
    id: 'layout',
    title: { zh: '版式与信息层级', en: 'Layout & hierarchy' },
    en: { zh: 'Layout', en: '版式层级' },
    desc: {
      zh: '把复杂参数拆成清晰的阅读顺序，让用户在 3 秒内抓住核心卖点。',
      en: 'Complex specs broken into a clear reading order, so the core point lands within three seconds.',
    },
  },
  {
    id: 'multi',
    title: { zh: '多载体交付', en: 'Multi-format delivery' },
    en: { zh: 'Multi-format', en: '多载体' },
    desc: {
      zh: '从线上社媒海报到线下候车亭、地铁广告，多尺寸、多材质一次交付不出错。',
      en: 'From social posts to bus shelters and metro ads — many sizes and materials delivered without errors.',
    },
  },
  {
    id: 'vi',
    title: { zh: '品牌 VI 规范', en: 'Brand VI system' },
    en: { zh: 'Brand system', en: '品牌规范' },
    desc: {
      zh: '服务中国移动等品牌代理项目，严格遵循 VI 规范，保证规模化交付的一致性。',
      en: 'On brand-agency accounts such as China Mobile, following VI guidelines strictly to keep large volumes consistent.',
    },
  },
  {
    id: 'collab',
    title: { zh: '与运营同频', en: 'Working with operations' },
    en: { zh: 'Collaboration', en: '配合运营' },
    desc: {
      zh: '理解大促节奏与投放需求，快速响应日常更新与活动迭代，视觉跟着业务走。',
      en: 'I understand promo cycles and ad requirements, respond fast to daily updates, and let the visuals follow the business.',
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
export const sectionOrder = ['hero', 'about', 'works', 'strengths', 'contact']

/** 各章节标题：大字用当前语言，眉标（小字）用另一种语言 */
export const sections = {
  about: {
    eyebrow: { zh: 'About / Profile', en: '关于我' },
    title: { zh: '关于我', en: 'About Me' },
    desc: {
      zh: '从线下品牌物料做到跨境电商全链路视觉，把「好看」落到能被点击、能被转化的版面上。',
      en: 'From offline brand collateral to full-stack cross-border visuals — making work that gets clicked and trusted.',
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
  strengths: {
    eyebrow: { zh: 'Capabilities', en: '个人优势' },
    title: { zh: '个人优势', en: 'Capabilities' },
    desc: {
      zh: '能独立扛下跨境与国内电商的视觉全流程，也能和运营一起把节奏跑起来。',
      en: 'Able to run the full visual process for cross-border and domestic e-commerce, and to keep pace with the operations team.',
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
    zh: '亚马逊主图 / 独立站详情页 / 大促活动页 / 产品精修与场景渲染 / 品牌物料，都可以直接找我。',
    en: 'Listing images, DTC detail pages, campaign pages, retouching and scene rendering, brand collateral — all of it, straight to me.',
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

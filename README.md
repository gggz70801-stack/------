# 袁炳俊 · 个人作品集网站

跨境电商视觉设计师个人作品集，React + Vite 实现。暗色系、克制、带一点科技感，版心 1700px，面向 PC 展示。

## 运行

```bash
pnpm install     # 或 npm install
pnpm dev         # 本地预览 http://127.0.0.1:5173
pnpm build       # 打包到 dist/
pnpm preview     # 预览打包结果 http://127.0.0.1:4173
```

> 本机没有全局 `npm`，已使用随环境提供的 `pnpm`。

## 页面结构

| 模块 | 组件 | 说明 |
| --- | --- | --- |
| 全屏首页 Hero | `src/components/Hero.jsx` | 视频/canvas 极光背景、大标题、导航、联系按钮 |
| 个人经历 | `src/components/About.jsx` | 三段式：① 人像 + 自我介绍 + 方向标签 ② 工作经历 ‖ 联系方式（可一键复制）③ 获奖一行带过（证书小图可点开大图） |
| 精选项目 | `src/components/Works.jsx` | 首页上的 6 组大卡片预览，支持分类筛选；右上角「查看全部作品」进列表页 |
| 作品列表页 | `src/components/WorksIndex.jsx` | `#/works`，全部作品三列网格 + 分类筛选 + 页尾联系入口 |
| 作品详情页 | `src/components/WorkDetail.jsx` | `#/works/<slug>`，项目信息栏 + 长图画廊 + 上一个 / 下一个（带缩略图） |
| 关键词带 | `src/components/Marquee.jsx` | 双向跑马灯 |
| 个人优势 | `src/components/Strengths.jsx` | 6 张能力卡片 |
| 整屏收尾 | `src/components/Contact.jsx` | 大标题 + 圆形邮件按钮 + 联系方式 + 页脚 |

中英切换：`src/lib/lang.js`（语言状态）+ `src/lib/content.js`（取文案），按钮在导航栏右上角。

### 其他项目页面

首页「其他项目」和作品列表页里的分类切换都可以进入 `#/other`。里面分成五个类别：

| 类别 | 入口 | 子页面 |
| --- | --- | --- |
| 国内电商 | `#/other/domestic-ecommerce` | 创意型 `#/other/domestic-ecommerce/creative` / 统一风格 `#/other/domestic-ecommerce/consistent` |
| 网页设计 | `#/other/web-design` | 亚马逊 `#/other/web-design/amazon` / 速卖通 `#/other/web-design/aliexpress` |
| 插画 | `#/other/illustration` | 故宫祥瑞专题长页 |
| 物料 | `#/other/materials` | 28 页产品画册 + 中英双语展会折页 |
| 3D 建模渲染 | `#/other/3d-rendering` | Blender 基础建模与渲染练习 |

素材流程：

```bash
pnpm media:social   # 同步“社交媒体”新增图并压缩
pnpm media:other    # 渲染参考 PDF，再生成其他项目 WebP 与尺寸清单
```

“其他项目”的网页图在 `src/assets/other/`，尺寸清单在 `src/data/other-gallery.json`；
原始 PDF、PSD 和大图仍留在 `E:\作品集\作品集素材\`，不会进入构建产物。

### 作品列表页 / 详情页怎么走

```
首页「精选项目」 ──点卡片──→ 作品详情页 ──「返回作品集」──→ 回到来的地方
       └─「查看全部作品」──→ 作品列表页 #/works ──点卡片──→ 作品详情页
导航「作品集」 ──────────────────→ 作品列表页 #/works
```

详情页从上到下四段，都有真实数据兜底，没填也不会空着：

1. **标题区**：序号 / 分类 / 年份、标题、英文副标题、一句话介绍、能力标签；
2. **项目信息栏**：项目类型、时间、交付内容（自动取项目数据里的 `metrics`）；
3. **画廊**：图片按文件名排序自动展示，图注取文件名里 `-` 后面的字（`03-详情页排版.webp` → 详情页排版）；
4. **上一个 / 下一个**：带封面缩略图，点一下直接翻到相邻作品。

想补「我的角色 / 项目周期 / 工具」，在 `projects` 里给对应项目加一段 `detail` 就行（写法见 `src/data/profile.js` 里的注释）。

## 怎么改内容（不用动组件）

所有文案、数据、联系方式都在 **`src/data/profile.js`**：

- `worksPage`：作品列表页的标题、说明、页尾 CTA；
- `projects`：每个作品的标题、分类、年份、介绍、标签、交付数据，以及可选的 `detail`（角色 / 周期 / 交付物 / 工具）。

## 中英双语怎么工作

导航栏**右上角**有一个圆形按钮：中文界面显示 `EN`，英文界面显示 `中`，点一下整体切换。
选择记在浏览器本地（localStorage），刷新、换页都保持；**同一个作品详情页的网址不变**，图片素材完全不动，只换文字。

文案在 `src/data/profile.js` 里有两种写法：

| 写法 | 什么时候用 |
| --- | --- |
| `'ACEBEAM X35'` | 两种语言下都一样（型号、邮箱、社媒名称） |
| `{ zh: '中文', en: 'English' }` | 需要翻译的文字，按当前语言自动取 |

界面上分两种待遇：

- **并置（主语言 + 另一种语言小字）**：章节大标题 / 眉标、品牌区、作品名 + 副标、能力卡、项目信息栏标签。
  也就是说——中文界面下看到的是「关于我 / About Me」；英文界面下看到的是「About Me / 关于我」。
  注意作品副标这一类字段，`zh` 里放的是**英文**、`en` 里放的是**中文**（因为它永远是"另一种语言"）。
- **切换（只显示当前语言）**：自我介绍、工作经历要点、作品描述、设计思路正文、联系区大标题。
  长段落并排会让版面翻倍、可读性变差，所以这里只显示当前语言。

首屏海报「VISION IS COMING」属于画面的一部分，两种语言下保持一致。

## 排版与字号体系

所有字号集中在 `src/styles/global.css` 顶部的 CSS 变量里，改一处全站生效：

| 变量 | 用途 | 中文 | 英文 |
| --- | --- | --- | --- |
| `--fs-micro` | mono 微标签（眉标 / 图注 / 卡片元信息） | 12px | 12px |
| `--fs-caption` | 序号、小标题辅助行 | 13px | 13px |
| `--fs-small` | 次要正文（经历要点、说明） | 14.5px | 14.5px |
| `--fs-body` | 正文 | 16px | 16px |
| `--fs-lead` | 导语（自我介绍首段） | 17–19px | 16–18px |
| `--fs-item` | 条目标题（公司名、要点标题） | 18px | 18px |
| `--fs-block` | 小节标题（设计思路 / 工作经历） | 22–28px | 20–26px |
| `--fs-section` | 章节大标题 | 30–42px | 26–36px |
| `--fs-page` | 页面主标题（作品集 / 详情页） | 34–54px | 30–48px |
| `--fs-display` | 收尾大标题 | 32–56px | 28–48px |

两条硬规矩（改的时候别破）：

1. **正文不小于 16px，任何可见文字不小于 12px**。之前站里出现过 9px / 9.5px 的小字，在 1920 屏幕上几乎看不见，已经全部抬到 12px 以上；`scripts` 之外如果新加样式，也守这条线。
2. **相邻层级差控制在 1.25–1.5 倍**。原来章节标题 58px 配 11px 眉标（差 5 倍多），现在 42px 配 12.5px（3.4 倍），大小关系更稳。

英文排版专项（`global.css` 末尾）：标题自动转大写、字距放松到 0.005em；英文正文行高收到 1.72（中文需要更松的行距才好读）；mono 小字字距收到 0.14em，避免大写英文被拉得太散。

## 自己看一眼（截图自检）

改完页面不用手工开浏览器对尺寸，一条命令出图，顺便把控制台报错列出来：

```bash
node scripts/screenshot.mjs "#/works"                 # 作品列表页，1920×1080 首屏
node scripts/screenshot.mjs "#/works" 1440x900        # 换个尺寸
node scripts/screenshot.mjs "#/works/amazon-listing" 1920x1080 full   # 详情页整页长截图
node scripts/screenshot.mjs "!works"                  # 首页滚到「作品集」区块
```

图片输出到 `.shots/`（不进仓库、不参与构建）。脚本借用本机已装的 Chrome，不额外下载浏览器内核。

## 素材与体积规则（自动化）

**规则文件：根目录 `AGENTS.md`（AI 每次进入项目都会先读）+ `docs/media-pipeline.md`。**
只要往项目里放图片或视频，默认按"先压缩、原始母版留在项目外"的方式处理，不需要每次交代。

```bash
pnpm media:image    # 图片：media-src/ → src/assets/works（自动压缩 + 生成尺寸清单）
pnpm media:video    # 视频：原片 → public/media（1080p、≤12MB）+ 静帧 poster
pnpm media:backdrops # 项目详情页战术背景：压暗、柔化并转 WebP
pnpm size           # 体检：单文件与整站 dist 超预算都会报警
```

**当前作品素材**：6 个 ACEBEAM 产品详情页 + 1 套 46 张海外社媒物料，共 **121 张 WebP / 约 14.1MB**
（原图约 40.6MB）；其中 H18 与 UC3A 各有一段 **4 帧动画 WebP**（GIF 转换而来，动画保留）。
人物照片 56KB、3 张获奖证书共 228KB。压缩前后对照见 `pnpm media:image` 的输出。

压图脚本的几个细节（都在 `scripts/optimize-images.mjs` 里）：

- `--only <作品名>` 只处理一个作品；也支持 `--only awards`、`--only portrait` 这类分组；
- GIF / 动图 WebP 会自动识别并输出**动画 WebP**（不会只剩第一帧）；
- 尺寸清单 `src/data/gallery.json` 按作品合并写入，处理一个作品不会清掉别的记录；
- 其它分组的图会保留子目录（`media-src/awards/x.jpg` → `src/assets/misc/awards/x.webp`）。

**当前首屏视频**：原片 38.2s / 1920×1080 / 92.9MB → 10s / 1920×1080 / H.264 / **5.25MB**（分辨率未降），
另生成 150KB 静帧。页面先显示静帧，浏览器空闲后再加载视频。

**作品图怎么加**：把原图放进 `media-src/works/<slug>/`（文件名 `01-封面.jpg`、`02-详情.jpg` 排顺序），
执行 `pnpm media:image`，图片会自动压缩进 `src/assets/works/<slug>/` 并在列表页、详情页自动出现，不需要改代码。

### 1. 换 / 加作品图（现在都是真实素材）

作品图不用登记文件名，放进 `media-src/works/<作品名>/` 按 `01-`、`02-` 排好顺序，跑一次 `pnpm media:image` 就行：

- 列表页封面 = 该作品文件夹里的**第一张**（`01-主视觉`）；
- 详情页画廊 = 文件夹里的**全部图片**，按文件名顺序平铺；
- 图注取文件名里 `-` 后面的文字（`03-详情页排版.webp` → 图注「详情页排版」），不写就不显示图注。

### 2. 换真人照片

照片放在 `media-src/portrait/`（文件名随意），跑 `pnpm media:image --only portrait`，
会自动生成 `public/portrait/portrait.webp`，页面直接读这个路径（`profile.portrait`）。
建议竖构图 3:4，宽度 1200px 以内。

### 3. 加获奖证书

证书图放进 `media-src/awards/`，文件名用 `01-第13届省级二等奖.jpg` 这种（`-` 后面的字会显示在证书下面），
跑 `pnpm media:image --only awards`，会自动出现在「关于我」的获奖经历下面。

### 4. 首屏背景：矢量海报 / 视频

**当前状态：首屏使用循环视频 `hero-loop.mp4`（5.25MB）与静帧 `hero-poster.jpg`（150KB）；**
视频加载完成前或失败时，`HeroPoster.jsx` 的矢量海报会自动兜底。原始 92.94MB 视频不进入项目。

**重新启用视频背景：**

1. 视频放进 `public/media/`，例如 `public/media/hero-loop.mp4`；
2. 在 `hero.video` 里填路径：

```js
video: '/media/hero-loop.mp4',
```

建议先压到 **8–15 秒、1600×900 以上、10MB 以内**（H.264、无声）再放进来。视频加载完成前或加载失败时，会自动回落到矢量海报，不会黑屏或破图。

> 注意：`public/media/` 已在 `vite.config.js` 里排除文件监听（大视频会触发 Windows 下 EBUSY 崩溃）；新加的静态素材需要重启 `pnpm dev` 才会被识别——Vite 只在启动时扫描一次 `public/`。

### 5. 改数据统计

`stats` 数组里的 `value / suffix / unit / label / note` 全部可以直接改，数字进入视口时会跳动增长。

## 目录结构

```
media-src/             原始母版（不进仓库、不参与构建）
  works/<作品名>/      产品详情页分段图（01- 排顺序）
  portrait/me.jpg      人物照片原图
  awards/              获奖证书原图
public/                压缩后的静态资源（人像 / 首屏视频 / 静帧）
  portrait/portrait.webp
  media/hero-loop.mp4
  media/hero-poster.jpg
src/
  App.jsx              页面组装（首页 / #/works 列表页 / #/works/<slug> 详情页）
  main.jsx             入口
  data/profile.js      ← 所有内容数据（作品、设计思路、经历、获奖）
  data/gallery.json    图片尺寸清单（压图时自动生成）
  assets/works/<作品名>/  压缩后的作品图（自动读取，不用登记）
  assets/misc/awards/     压缩后的获奖证书
  lib/                 滚动出现、滚动监听、复制提示、hash 路由、图片收集
  styles/global.css    设计令牌 + 通用样式
  components/          各模块组件与样式
```

## 设计说明

- 配色：暖调近黑底 `#0a0705` + 暖白文字 `#f5f0ea` + 主色琥珀橙 `#ff7a18`（只用在序号、发丝线、小标签、按钮这类"点"上，不铺面、不做正文颜色）+ 冷蓝 `#5c7cfa` 与香槟金 `#d6b280` 两个点缀色（只进光晕、渐变和奖章细节）；
- 字体：系统字体栈（Inter / Segoe UI / 微软雅黑），英文标签统一等宽字体 + 宽字距；
- 动效：滚动出现、数字增长、大卡片悬停缩放与扫光、指针柔光、全屏开场动画，全部在 `prefers-reduced-motion` 下自动关闭；
- 交互：导航滚动高亮、平滑锚点、联系方式一键复制、项目分类筛选。

## 体积预算（重要）

加入“其他项目”后，网页图库新增约 **19.5 MB**（179 个素材视图），全部按页面懒加载；原始 PDF、PSD 与大图仍留在项目外。

本次实测 `dist/` 约 **39.8 MB**，其中首屏视频为 5.25 MB，其余主要是作品图与其他项目图库。
所有单文件都在预算内，但整站比 30 MB 参考线高约 9.8 MB；
若要严格压到 30 MB，优先把完整图库或视频迁到 CDN，不建议继续牺牲画面质量。

## 部署上线

项目已配置 GitHub Pages 自动部署。推送到 `master` 后，GitHub Actions 会安装依赖、运行生产构建，
再把 `dist/` 发布到 Pages；也可以在仓库的 Actions 页面手动触发。

首次上线时，在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
页面使用 Hash 路由，作品详情不需要额外的服务器重写规则；静态资源使用相对路径，
因此既能放在 `https://<用户名>.github.io/<仓库名>/`，也能直接绑定独立域名。

### 该守的三条线

| 范围 | 预算 | 说明 |
| --- | --- | --- |
| 首屏资源（HTML+CSS+JS+首屏媒体） | **≤ 2–3 MB** | 决定打开速度，超过 3 MB 手机上会有明显等待 |
| 单个文件 | **≤ 8–10 MB** | 超了就压，或挪到 CDN |
| 整站 `dist/` | **≤ 20–30 MB** | 6–8 个项目图（WebP，每张 300–600KB）约 2–5 MB，加上视频仍很宽裕 |

### 为什么以前会"动不动超限"

把 92.94 MB 的原片放进 `public/` 会连带产生一串问题（不只是占空间）：

1. `vite build` 会把 `public/` 整个复制进 `dist/`，构建产物从 0.3 MB 涨到 93 MB；
2. Vite 的 dev server 监听这个文件时在 Windows 下报 `EBUSY`（文件被占用），直接崩溃；
3. Vite 只在启动时扫描一次 `public/`，新放大文件后必须重启 dev server 才认；
4. 每次做视觉检查（无头浏览器截图）都要先缓冲近百 MB 的视频，等待变长、偶尔超时；
5. GitHub 对单文件 > 100 MB 直接拒绝推送（> 50 MB 就会有警告），Cloudflare Pages 单文件上限约 25 MB——各家数字以官方文档为准。

### 解决办法（推荐顺序）

1. **原始大文件永远不要放进项目**：留在素材盘（如 `E:\作品集\ACEBEAM\封面\`），项目里只放网页版；
2. **进项目前先过一遍预算**：视频 8–15 秒 / ≤ 10 MB，图片 WebP / ≤ 500 KB；
3. **超大素材走外部托管**：CDN / 对象存储（OSS、COS、R2 等）放原片，`hero.video` 直接填完整 URL；
4. **随手体检**：`pnpm size` 会列出最重的文件，并对超预算的单文件和整站 `dist` 报警（`pnpm build` 结束也会自动跑一次，只提示不阻塞）。

# Crimson Desert 首页重构文档

> 游戏：Crimson Desert
> 域名：crimsondesertwiki.wiki
> 页面：`src/app/[locale]/page.tsx`
> 文案：`src/locales/en.json`

## 目标

本次首页不是做通用游戏门户，而是做一个围绕《Crimson Desert》的英文资料首页。
核心目标有 4 个：

1. 保留现有广告组件与现有 `page.tsx` 文件路径，不做“删光重写成简版”的偷工做法。
2. 清除旧主题 `Slayerbound` 的所有首页残留文案，改成完整的 `Crimson Desert` 语义。
3. 在视频模块下方放置可滑动跳转的模块导航，直达 10+ 个首页模块。
4. 首页所有卡片和按钮只保留站内锚点跳转与外部官方/社区链接，不再出现旧的站内工具页链接。

## 设计方向

### 视觉基调

- 视觉主题采用 `Crimson Desert` 现有全局主题色：
  - `hsl(var(--nav-theme))`
  - `hsl(var(--nav-theme-light))`
- 页面氛围走“暗红、铁灰、余烬高光”的中世纪奇幻方向。
- 使用大面积渐变、边框发光、磨砂卡片和纵向节奏分区，避免普通模板站质感。

### 布局顺序

1. Hero
2. 数据概览条
3. 官方视频区
4. 模块导航区
5. 12 个首页信息模块
6. FAQ
7. 官方资源 CTA

### 交互约束

- 模块导航使用页内锚点跳转。
- 每个模块设置独立 `id`，保证从视频下方导航可以平滑定位。
- 所有模块卡片图标使用 `lucide-react`，且同一页不重复图标。
- 文本和图标强调色统一来自全局主题变量，不写死红色/橙色十六进制。

## 模块范围

本次首页实现以下 12 个核心模块，标题统一采用 `Crimson Desert + xxx` 格式：

1. Crimson Desert Release Date and Platforms
2. Crimson Desert Trailer Hub
3. Crimson Desert Beginner Guide
4. Crimson Desert Story Explained
5. Crimson Desert Characters
6. Crimson Desert Open World and Regions
7. Crimson Desert Combat Guide
8. Crimson Desert Weapons and Skills
9. Crimson Desert Boss Guide
10. Crimson Desert Multiplayer and Offline
11. Crimson Desert System Requirements and Performance
12. Crimson Desert Patch Notes and Known Issues

这些模块覆盖了 `00首页信息-1.md` 的前 4 个重点模块，同时满足 `00首页信息.md` 中“视频下方继续导航到十几个模块”的结构要求。

## 文案策略

### 必须保留的信息

- 已于 2026-03-19 发售
- 单机开放世界动作冒险
- 平台、离线、跨存档、手柄支持
- Kliff、Greymanes、Black Bears、Pywel、Abyss 等核心名词
- 官方 Trailer、官方播放列表、官方公告、官方 FAQ、官方 Discord、官方 X

### 必须避免的信息

- 旧主题 `Slayerbound`
- `codes`、`reroll`、`tier list` 等偏 Roblox/手游化表述
- `reliability`、`unverified`、`disputed` 等会暴露“信息可信度”的措辞
- 站内详情页链接

### FAQ 约束

- FAQ 问答必须显式包含 `Crimson Desert`
- 回答语气直接，不加“可能”“大概”“未证实”等弱化表达

## 代码实现策略

### `src/locales/en.json`

- 重写首页所需英文文案数据。
- 新增统一的 `homepage` 数据结构，按模块数组驱动页面渲染。
- 保留 `common`、`nav`、`seo` 等站点级基础字段。

### `src/app/[locale]/page.tsx`

- 在现有文件上直接改造。
- 使用服务端组件读取 `next-intl` messages。
- 引入 `lucide-react` 图标并在文件内完成首页布局。
- 保留 `NativeBannerAd` 与 `AdBanner` 的展示位。
- 不创建新的替代版 `page.tsx`。

## 验证标准

1. `src/locales/en.json` 不再出现 `Slayerbound`
2. `src/app/[locale]/page.tsx` 存在 `lucide-react` 引用
3. `src/app/[locale]/page.tsx` 中存在 `hsl(var(--nav-theme))`
4. 首页模块导航可跳转到 10+ 个模块
5. 广告组件仍然保留
6. `npm run typecheck` 通过
7. `npm run build` 通过

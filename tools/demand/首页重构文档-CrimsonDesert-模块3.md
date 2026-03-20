# Crimson Desert 首页重构文档（部分6：模块3）

> 游戏：Crimson Desert  
> 域名：crimsondesertwiki.wiki  
> 范围：`src/locales/en.json`、`src/app/[locale]/page.tsx`  
> 参考：`00基础信息.md`、`00首页信息-3.md`

## 本次目标

本次只推进首页模块 3（模块 9-12），并继续在现有首页文件上迭代，不新建替代页面：

1. 完整实现 `00首页信息-3.md` 的 4 个模块：
   - Crimson Desert Boss Guide
   - Crimson Desert Multiplayer and Offline
   - Crimson Desert System Requirements and Performance
   - Crimson Desert Editions and Bonuses
2. 视频区下方导航继续包含并可跳转到新模块。
3. 模块标题保持 `Crimson Desert + xxx` 命名，满足 SEO 语义一致性。
4. 样式继续使用全局主题变量（`--nav-theme` / `--nav-theme-light`），不引入硬编码颜色。
5. 保持 `lucide-react` 图标体系且模块图标不重复，不使用 emoji。
6. 继续保留页面中的广告组件（`NativeBannerAd`、`AdBanner`）。

## 数据映射策略

`00首页信息-3.md` 每个模块包含 `summary`、`quickFacts`、`panels`、`cta`。为兼容现有 `homepage.modules` 结构并减少破坏性改动，采用如下映射：

- `summary` -> `modules[].summary`
- `quickFacts` -> `modules[].cards[]`
  - `label` -> `title`
  - `value` -> `value`
  - 增补 `detail` 用于解释该指标在首页的阅读价值
- `panels` -> `modules[].panels[]`
  - `title` -> `title`
  - `subtitle` -> `subtitle`
  - `details[]` -> `details[]`
- `cta` -> `modules[].ctaLabel`
- `references` 选最匹配官方入口 -> `modules[].ctaHref`

## 渲染策略

当前 `page.tsx` 只支持 `cards/items`，无法完整承载 `panels` 的分段信息。为保证模块 9-12 信息不丢失，本次在现有组件中扩展：

1. 新增 `ModulePanel` 类型，支持 `title/subtitle/details[]`。
2. 在模块类型中加入 `panels?: ModulePanel[]`。
3. 新增两个布局类型：
   - `comparison`：用于系统需求与性能模块，采用更结构化的双列对比卡片。
   - `editions`：用于版本与奖励模块，强调版本差异与附加内容。
4. 保留现有布局不回归，避免影响模块 1-8。

## 约束检查清单

1. 仅修改既有 `src/app/[locale]/page.tsx`，不创建新的 `page.tsx`。
2. 仅更新英文文案 `src/locales/en.json`，不改其他语言文件。
3. 不删除任何广告相关代码。
4. 不出现 `reliability` / `unverified` / `disputed` / `tough` 等禁用词。
5. 第 9-12 模块标题全部保留 `Crimson Desert` 前缀。

## 执行后验证

1. `jq '.homepage.modules | length' src/locales/en.json` 仍为 12。
2. `jq '.homepage.modules[8:12][] | {id,title,layout,hasPanels:(.panels!=null)}' src/locales/en.json` 检查模块 9-12 完整存在。
3. `npm run typecheck` 通过。
4. `npm run lint` 通过。
5. `npm run build` 通过。
6. 本地 `npm run dev` 后 `curl -I /` 与 `/pt` 返回 200。

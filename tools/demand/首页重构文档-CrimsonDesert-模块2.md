# Crimson Desert 首页重构文档（部分5：模块2）

> 游戏：Crimson Desert  
> 域名：crimsondesertwiki.wiki  
> 范围：`src/locales/en.json`、`src/app/[locale]/page.tsx`  
> 参考：`00基础信息.md`、`00首页信息-2.md`

## 本次目标

本次只推进首页模块 2（模块 5-8），并在现有首页结构上继续增强，不新建简化页面文件：

1. 完整实现 `00首页信息-2.md` 的 4 个模块：Characters / Open World and Regions / Combat Guide / Weapons and Skills。
2. 保持视频下方导航可跳转到这些模块，并确保标题继续采用 `Crimson Desert + xxx` 命名。
3. 维持统一主题色方案，颜色来自全局 CSS 变量，避免硬编码。
4. 继续使用 `lucide-react` 图标体系，不使用 emoji，不删除广告组件。

## 数据映射策略

`00首页信息-2.md` 的每个模块都包含 `summary`、`dataPoints`、`featuredEntries`、`cta`。  
为了和现有 `homepage.modules` 结构对齐，采用以下映射：

- `summary` -> `modules[].summary`
- `dataPoints` -> `modules[].cards[]`
  - `label` -> `title`
  - `value` -> `value`
  - 新增 `detail`，用于补充上下文说明
- `featuredEntries` -> `modules[].items[]`
  - `name` -> `title`
  - `details` -> `detail`
  - `tag` -> `tag`
- `cta` -> `modules[].ctaLabel`
- `references` 中选择最匹配入口 -> `modules[].ctaHref`

## 页面渲染策略

当前 `page.tsx` 对 `profiles/regions/guide/weapons/bosses` 仅渲染 `items`，会导致模块 5-8 的 `cards` 无法展示。  
因此在 `renderSectionBody` 中调整这些布局类型：

- 先渲染 `cards`（数据点）
- 再渲染 `items`（特征条目）
- 两者都保留统一风格边框、阴影、主题色高亮

这样既不破坏已有模块布局，也能完整承接 `00首页信息-2.md` 的信息密度。

## 约束检查清单

1. 仅修改既有 `page.tsx`，不创建替代文件。
2. 保留 `NativeBannerAd` 与 `AdBanner` 代码。
3. 首页文案不出现 `reliability` / `unverified` / `disputed` / `tough` 等词。
4. FAQ 问答继续包含 `Crimson Desert`。
5. 所有模块标题继续保留 `Crimson Desert` 前缀。

## 执行后验证

1. `jq '.homepage.modules | length' src/locales/en.json` 仍为 12。
2. `jq` 检查模块 5-8 的 `cards` 与 `items` 均存在且内容已更新。
3. `npm run typecheck` 通过。
4. `npm run lint` 通过。
5. `npm run build` 通过。
6. 本地 `npm run dev` + `curl -I /` 与 `/pt` 返回 200。

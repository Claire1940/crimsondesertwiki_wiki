# Crimson Desert 首页重构文档（部分7：模块4）

> 游戏：Crimson Desert  
> 域名：crimsondesertwiki.wiki  
> 范围：`src/locales/en.json`、`src/app/[locale]/page.tsx`  
> 参考：`00基础信息.md`、`00首页信息-4.md`

## 本次目标

本次在既有首页基础上继续扩展模块 13-16，不创建替代页面文件：

1. 完整实现 `00首页信息-4.md` 的 4 个新模块：
   - Crimson Desert Crafting and Cooking
   - Crimson Desert Greymane Camp Guide
   - Crimson Desert Side Activities and Exploration
   - Crimson Desert Patch Notes and Known Issues
2. 视频区域下方导航同步包含新模块，并可跳转到对应锚点。
3. 模块标题保持 `Crimson Desert + xxx` 命名，统一 SEO 语义。
4. 样式继续使用全局主题变量（`--nav-theme` / `--nav-theme-light`），禁止硬编码颜色。
5. 图标继续采用 `lucide-react`，模块图标不重复，不使用 emoji。
6. 保持并保留首页广告组件代码（`NativeBannerAd`、`AdBanner`）。

## 数据映射策略

`00首页信息-4.md` 每个模块包含 `summary`、`highlights`、`cta`、`references`。为复用当前 `homepage.modules` 结构并保留信息密度，采用以下映射：

- `summary` -> `modules[].summary`
- `highlights[]` -> 按模块语义拆分到 `cards[]` / `items[]` / `panels[]`
  - 强结构化数值与结论 -> `cards[]`
  - 流程步骤/时间顺序 -> `items[]`（配合 `timeline` 或 `patches`）
  - 分组条目说明 -> `panels[]`
- `cta` -> `modules[].ctaLabel`
- `references` 选最合适官方入口 -> `modules[].ctaHref`

## 页面渲染策略

当前页面已支持 `facts/timeline/guide/specs/patches` 等布局。为减少破坏性改动并快速承接模块 13-16：

1. `Crimson Desert Crafting and Cooking` 使用 `specs`  
   组合 `cards + panels + items`，匹配“系统概览 + 供应来源 + 配方样例”。
2. `Crimson Desert Greymane Camp Guide` 使用 `timeline`  
   以阶段化结构表达营地解锁、扩建、派遣和奖励循环。
3. `Crimson Desert Side Activities and Exploration` 使用 `guide`  
   使用特征卡片和活动条目展示探索广度与玩法入口。
4. `Crimson Desert Patch Notes and Known Issues` 使用 `patches`  
   通过时间线和状态卡突出版本、问题数量、更新时间和变更范围。

## 结构改造点

首页当前将模块固定切为 3 组（总 12 个），无法自然承接第 4 组新模块。  
本次改造为“按 4 个模块自动分组”的动态切片渲染：

1. `homepage.modules` 自动按 4 个分组。
2. 导航区保持 `homepage.modules.map(...)`，自动覆盖新增模块。
3. 正文区按分组渲染，不删除任何广告组件；组间保留广告位，新增分组按可用广告键位顺序复用。

## 约束检查清单

1. 仅修改现有 `src/app/[locale]/page.tsx`，不创建替代 `page.tsx`。
2. 仅更新 `src/locales/en.json`，不修改其他语言文件。
3. 不删除任何广告相关组件和代码。
4. 文案中不出现 `可信度`、`tough` 及同类暴露性词汇。
5. 模块 13-16 标题均保持 `Crimson Desert` 前缀。
6. 模块图标总数 16 个且不重复。

## 执行后验证

1. `jq '.homepage.modules | length' src/locales/en.json` 应为 `16`。
2. `jq '.homepage.modules[12:16][] | {id,title,layout,icon}' src/locales/en.json` 检查新增模块完整性。
3. `npm run typecheck` 通过。
4. `npm run lint` 通过。
5. `npm run build` 通过。
6. `npm run dev` 后 `curl -I /` 与 `/pt` 返回 200。

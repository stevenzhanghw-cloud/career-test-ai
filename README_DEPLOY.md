# 部署与配置（V4）

本项目支持两种部署：**Vercel** 或 **Netlify**，均可隐藏你的 OpenAI API Key，并提供本地兜底逻辑。

## 一、环境变量（两平台都需要）
- `OPENAI_API_KEY`：你的 OpenAI 密钥
- `OPENAI_MODEL`（可选）：默认 `gpt-4o-mini`
- `ACCESS_CODE_SHA256`（可选）：访问码的 SHA256 十六进制哈希，用于解锁无限对话

> 生成哈希示例：在终端运行（Mac/Linux）  
> `echo -n "YOUR_CODE" | shasum -a 256`  
> 复制输出的前一段十六进制字符串设置为环境变量。

## 二、Vercel 部署
1. 安装 Vercel CLI（可选）：`npm i -g vercel`
2. 将本目录上传到 Git（GitHub/GitLab/Bitbucket）
3. 在 Vercel 新建项目 → 连接仓库
4. 在 Project Settings → Environment Variables 中新增上面的环境变量
5. 部署后接口：
   - `/api/health` 检查是否配置了密钥
   - `/api/chat` 调用真实大模型
   - `/api/validate` 校验访问码（如配置）
6. 前端会自动检测 `/api/health`，若不可用则使用本地兜底。

## 三、Netlify 部署
1. 安装 Netlify CLI（可选）：`npm i -g netlify-cli`
2. 在 Netlify 新建站点，选择本目录
3. 在 Site Settings → Environment Variables 配置变量
4. 部署后函数映射：
   - `/.netlify/functions/chat` ←→ `/api/chat`
   - `/.netlify/functions/health` ←→ `/api/health`
   - `/.netlify/functions/validate` ←→ `/api/validate`

## 四、收费与访问码
- 访问码：给少量种子用户使用。将其 SHA256 存入 `ACCESS_CODE_SHA256`。用户在弹窗输入明文访问码即可解锁。  
- Stripe 收费：在 `/api/checkout` 中接入 Stripe SDK 创建 Checkout Session，然后把链接返回给前端。

## 五、本地测试
- 直接打开 `index.html` 可以跑前端（若跨域限制，可用 `npx serve` 起本地静态服务）。
- Vercel 本地：`vercel dev`  
- Netlify 本地：`netlify dev`

## 六、可自定义项
- `app.js`：题库、分组、职业库、对话次数与本地兜底规则。
- `style.css`：样式与配色。
- `/api/*` 与 `netlify/functions/*`：服务端代理与校验逻辑。

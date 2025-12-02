# Chat Proxy (示例)

这是一个非常简单的 Node/Express 示例代理，用于把前端的聊天消息转发到 OpenAI Chat Completions API，并把回复返回给前端。建议用于本地开发或作为自托管代理（请谨慎管理 API Key）。

快速使用说明：

1. 进入 server 目录并安装依赖：

```powershell
cd server
npm install
```

2. 复制 `.env.example` 为 `.env` 并填入 `OPENAI_API_KEY`：

```powershell
copy .env.example .env
# 然后编辑 .env，填入你的 OpenAI API key
```

3. 启动服务：

```powershell
npm start
```

服务默认运行在 `http://localhost:5000`，对外提供接口：

- `POST /api/chat` 接收 JSON `{ "message": "..." }`，返回 `{ "reply": "..." }`。

前端集成：在前端项目根目录的 `.env` 或 Vite 环境变量中添加：

```
VITE_AI_PROXY_URL=http://localhost:5000/api/chat
```

然后 `ChatWidget` 组件会自动读取 `import.meta.env.VITE_AI_PROXY_URL` 并向该地址发起请求。

注意：不要将 `.env` 提交到版本控制；请妥善保管你的 API Key。

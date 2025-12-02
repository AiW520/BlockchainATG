# BlockchainATG
Blockchain-All Things Grow（万物生）是中文区块链领域顶级学习与资源聚合 GitHub 仓库，专为开发者与初学者打造一站式导航。内容涵盖基础理论、智能合约（Solidity）、联盟链（Fabric / FISCO BCOS）、DeFi / NFT 等前沿领域，整合开发工具、示例代码、在线课程与社区资源。

## 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/zh-cn)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

- 安装依赖

```powershell
pnpm install
```

- 启动开发服务器

```powershell
pnpm run dev
```

- 在浏览器访问 http://localhost:3000

## 部署到 GitHub Pages (自动化)

本仓库包含一个 GitHub Actions workflow（`.github/workflows/pages.yml`），在 `main` 分支 push 时会自动：

- 安装依赖并运行构建（Vite），构建会使用 `SITE_BASE` 环境变量来设置 `base`，确保静态 HTML 文件和资源路径正确；
- 将 `dist` 目录的构建产物发布到 GitHub Pages。

如果你的仓库路径不是 `https://github.com/AiW520/BlockchainATG`，请在 workflow 中或在 Actions 运行时调整 `SITE_BASE` 为 `/<your-repo-name>/`。

---

更多文档和贡献指南请参见仓库内容。

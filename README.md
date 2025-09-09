# 现代化个人博客系统

基于 Next.js 14 + TypeScript + Tailwind CSS 构建的功能完整的个人博客系统。

## ✨ 特色功能

### 🎯 核心功能（MVP）
- ✅ **Markdown/MDX 写作** - 支持标题、粗体、表格、代码块等
- ✅ **文章元数据** - 标题、日期、标签/分类、摘要、slug
- ✅ **全文搜索** - 支持中文搜索，标题>内容>标签权重排序
- ✅ **草稿/发布状态** - 草稿不公开显示
- ✅ **代码高亮** - 美观的代码展示
- ✅ **目录自动生成** - 侧边栏目录导航
- ✅ **暗色模式** - 优雅的主题切换
- ✅ **RSS & Sitemap** - 自动生成订阅和站点地图

### 🎨 写作与组织
- ✅ **文档结构** - `/posts/{yyyy}/{slug}/index.md` 按年份组织
- ✅ **标签/分类** - 灵活的内容分类系统
- ✅ **系列/专栏** - 支持系列文章导航
- ✅ **文章推荐** - 相关文章推荐算法

### 🔍 搜索与信息检索
- ✅ **即时搜索** - 基于 Fuse.js 的智能搜索
- ✅ **中文优化** - 友好的中文搜索体验
- ✅ **标签过滤** - 按标签筛选文章

### 🎪 展示与交互
- ✅ **响应式设计** - 完美适配各种设备
- ✅ **阅读进度** - 显示阅读时间和字数
- ✅ **文章置顶** - 推荐文章功能

### ⚡ 性能与可访问性
- ✅ **静态化输出** - SSG 预生成，CDN 友好
- ✅ **图片优化** - Next.js Image 优化
- ✅ **语义化** - 良好的可访问性

### 🔧 SEO 与分发
- ✅ **Open Graph** - 社媒分享卡片
- ✅ **结构化数据** - JSON-LD 支持
- ✅ **自动 Sitemap** - 搜索引擎友好

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: Markdown/MDX
- **搜索**: Fuse.js
- **图标**: Lucide React
- **主题**: next-themes
- **部署**: Vercel/Netlify

## 📦 安装与使用

### 1. 克隆项目

```bash
git clone https://github.com/your-username/blog.git
cd blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制示例文件并填写敏感信息（不会被提交到 Git）：

```bash
cp .env.example .env.local
```

在 `.env.local` 中填写站点与后台登录配置（示例见 `.env.example`）。

### 4. 修改站点配置

编辑 `src/lib/config.ts`：

```typescript
export const siteConfig: SiteConfig = {
  name: '你的博客名称',
  description: '你的博客描述',
  url: 'https://yourdomain.com',
  author: {
    name: '你的名字',
    email: 'your.email@example.com',
    bio: '你的简介',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
    },
  },
  // ...其他配置
};
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

## 📝 写作指南

### 文章结构

文章存放在 `content/posts/{年份}/{slug}/index.md`：

```
content/
└── posts/
    └── 2024/
        └── my-first-post/
            ├── index.md
            └── images/
                └── cover.jpg
```

### 文章元数据

每篇文章需要包含 frontmatter：

```markdown
---
title: "文章标题"
date: "2024-01-15"
tags: ["标签1", "标签2"]
categories: ["分类"]
summary: "文章摘要"
slug: "article-slug"
draft: false
featured: true
series: "系列名称"
seriesOrder: 1
---

# 文章内容

这里写文章正文...
```

### 支持的元数据字段

- `title`: 文章标题（必需）
- `date`: 发布日期（必需）
- `tags`: 标签数组
- `categories`: 分类数组
- `summary`: 文章摘要（必需）
- `slug`: URL slug（必需）
- `draft`: 是否为草稿
- `featured`: 是否为推荐文章
- `series`: 系列名称
- `seriesOrder`: 系列中的顺序
- `author`: 作者名称

## 🎨 自定义

### 主题配置

在 `tailwind.config.js` 中自定义颜色：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      },
    },
  },
},
```

### 组件自定义

所有组件都在 `src/components/` 目录下，可以根据需要进行修改。

## 🚀 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量
4. 部署完成

### Netlify 部署

1. 将代码推送到 GitHub
2. 在 Netlify 中连接仓库
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`

## 📊 性能优化

- ✅ 静态生成（SSG）
- ✅ 图片优化
- ✅ 代码分割
- ✅ 懒加载
- ✅ CDN 缓存

## 🔧 开发命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

## 📁 项目结构

```
blog/
├── content/                 # 文章内容
│   └── posts/              # 博客文章
├── public/                 # 静态资源
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React 组件
│   ├── lib/                # 工具函数
│   └── types/              # TypeScript 类型
├── .env.local              # 环境变量
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🔐 版本控制与隐私

- 已添加 `.gitignore`，会忽略 `node_modules/`、`.next/`、`.vercel/`、日志与 `.env*.local` 等敏感/生成文件。
- 请仅提交 `.env.example`，切勿提交 `.env.local` 或任何真实密钥。
- 若曾误提交过敏感文件，请立刻从历史记录中移除并轮换密钥。

## 📄 许可证

MIT License

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com/)
- [Fuse.js 文档](https://fusejs.io/)

---

✨ 如果这个项目对你有帮助，请给一个 ⭐️！

## 🔐 管理后台访问保护（登录）

项目内置登录系统保护 `/admin`：

1) 在 `.env.local` 设置管理员与密钥（不要提交到仓库）

```env
ADMIN_USER=your-admin-username
ADMIN_PASS=a-strong-password
AUTH_SECRET=a-very-strong-random-secret
```

2) 重启后访问 `/login`，输入账号密码；登录成功将跳转到 `/admin`（或回到跳转前的页面）。

3) 退出：向 `/api/logout` 发送 `POST`（可在管理界面放一个退出按钮）。

说明
- 未配置任一环境变量时，中间件会对 `/admin` 返回 500，避免后台误暴露。
- 登录状态通过 `auth_token` 的 HTTP-only Cookie 维持，过期需重新登录。
- 仅你拥有凭证即可进入；如需 OAuth/邮箱白名单，可后续接入 NextAuth。

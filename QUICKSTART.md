# 快速开始

本指南将帮助你在 5 分钟内启动并运行你的博客。

## ⚡ 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看你的博客！

## 🎯 第一次使用

### 1. 个性化配置

编辑 `src/lib/config.ts`：

```typescript
export const siteConfig = {
  name: "你的博客名称",
  description: "你的博客描述",
  url: "https://yourdomain.com",
  author: {
    name: "你的姓名",
    email: "your@email.com",
    url: "https://yourwebsite.com"
  },
  social: {
    twitter: "your_twitter",
    github: "your_github"
  }
};
```

### 2. 创建你的第一篇文章

```bash
# 创建文章目录
mkdir -p content/posts/2024/my-first-post

# 创建文章文件
cat > content/posts/2024/my-first-post/index.md << EOF
---
title: "我的第一篇博客文章"
date: "2024-01-15"
tags: ["博客", "开始"]
categories: ["随笔"]
summary: "这是我的第一篇博客文章，记录我的博客之旅的开始。"
slug: "my-first-post"
draft: false
featured: true
---

# 欢迎来到我的博客

这是我的第一篇博客文章！我很兴奋能够开始分享我的想法和经验。

## 为什么要写博客？

- 记录学习和成长
- 分享知识和经验
- 建立个人品牌
- 连接志同道合的人

## 接下来的计划

我计划定期更新博客，分享关于：

- 技术学习心得
- 项目开发经验
- 生活感悟
- 读书笔记

期待与大家一起成长！
EOF
```

### 3. 查看效果

重新加载页面，你会看到新文章出现在首页的推荐文章中。

## 🚀 部署到线上

### 选项 1: Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 选项 2: Netlify

```bash
# 构建
npm run build

# 将 dist 文件夹内容上传到 Netlify
```

### 选项 3: 自有服务器

```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

## 📝 日常使用

### 创建新文章

```bash
# 使用当前日期创建文章
mkdir -p content/posts/$(date +%Y)/my-new-post
```

### 预览草稿

```markdown
---
draft: true
---
```

设置 `draft: true` 在开发环境预览，生产环境不显示。

### 推荐文章

```markdown
---
featured: true
---
```

设置 `featured: true` 让文章出现在首页推荐区域。

## 🔧 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 代码质量
npm run lint         # 代码检查
npm run lint:fix     # 自动修复问题
npm run format       # 格式化代码

# 类型检查
npm run type-check   # TypeScript 类型检查
```

## 📁 重要文件

```
src/
├── app/                 # 页面和路由
├── components/          # 可复用组件
├── lib/
│   ├── config.ts       # ⭐ 站点配置
│   └── posts.ts        # 文章处理逻辑
└── styles/             # 样式文件

content/
└── posts/              # ⭐ 文章内容
    └── YYYY/
        └── slug/
            └── index.md

public/                 # 静态资源
```

## 🎨 自定义样式

编辑 `src/styles/globals.css` 来自定义外观：

```css
/* 自定义主色调 */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #f59e0b;
}

/* 自定义字体 */
body {
  font-family: 'Inter', sans-serif;
}
```

## 🔍 SEO 优化

博客已经内置了 SEO 优化：

- 自动生成 sitemap
- RSS 订阅源
- 结构化数据
- Open Graph 标签
- 响应式设计

## 📧 联系和支持

如果遇到问题：

1. 查看 `README.md` 的详细文档
2. 查看 `USAGE.md` 的使用教程
3. 查看 `DEPLOYMENT.md` 的部署指南

---

🎉 恭喜！你的博客已经准备就绪。开始创作吧！

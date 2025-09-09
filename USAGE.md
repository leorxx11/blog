# 使用教程

本教程将帮助你快速掌握博客系统的使用方法。

## 📝 创建你的第一篇文章

### 1. 文件结构

文章存放在 `content/posts/` 目录下，按年份组织：

```
content/posts/
├── 2024/
│   ├── hello-world/
│   │   └── index.md
│   └── my-second-post/
│       ├── index.md
│       └── images/
│           └── cover.jpg
└── 2025/
    └── new-year-post/
        └── index.md
```

### 2. 创建文章

```bash
# 创建新文章目录
mkdir -p content/posts/2024/my-awesome-post

# 创建文章文件
touch content/posts/2024/my-awesome-post/index.md
```

### 3. 文章模板

```markdown
---
title: "我的精彩文章"
date: "2024-01-15"
tags: ["技术", "教程", "前端"]
categories: ["技术分享"]
summary: "这是一篇关于前端技术的精彩文章，介绍了最新的开发技巧和最佳实践。"
slug: "my-awesome-post"
draft: false
featured: true
series: "前端开发系列"
seriesOrder: 1
author: "作者名字"
---

# 文章标题

这里开始写你的文章内容...

## 二级标题

### 三级标题

这是段落内容。你可以使用 **粗体** 和 *斜体* 文字。

### 代码示例

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

### 列表

- 项目 1
- 项目 2
- 项目 3

### 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

### 引用

> 这是一段引用文字。
> 可以跨越多行。

### 链接

[链接文字](https://example.com)

### 图片

![图片描述](./images/example.jpg)
```

## 🏷️ Frontmatter 字段说明

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `date` | string | ✅ | 发布日期 (YYYY-MM-DD) |
| `summary` | string | ✅ | 文章摘要 |
| `slug` | string | ✅ | URL 标识符 |
| `tags` | array | ⭐ | 标签列表 |
| `categories` | array | ⭐ | 分类列表 |
| `draft` | boolean | ⭐ | 是否为草稿，默认 false |
| `featured` | boolean | ❌ | 是否推荐，默认 false |
| `series` | string | ❌ | 系列名称 |
| `seriesOrder` | number | ❌ | 系列中的顺序 |
| `author` | string | ❌ | 作者名称 |

## 🎨 Markdown 语法支持

### 基础语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*
~~删除线~~

[链接](https://example.com)
![图片](image.jpg)

- 无序列表
- 项目 2

1. 有序列表
2. 项目 2

> 引用块
> 多行引用

`行内代码`

\```javascript
// 代码块
const hello = 'world';
\```
```

### 表格

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容   |   内容   |   内容 |
```

### 任务列表

```markdown
- [x] 已完成任务
- [ ] 待完成任务
```

## 🖼️ 图片处理

### 1. 图片存放

将图片放在文章同级的 `images` 目录下：

```
my-post/
├── index.md
└── images/
    ├── cover.jpg
    ├── screenshot1.png
    └── diagram.svg
```

### 2. 图片引用

```markdown
![图片描述](./images/cover.jpg)

<!-- 带链接的图片 -->
[![图片描述](./images/cover.jpg)](https://example.com)
```

### 3. 图片优化建议

- 使用 WebP 格式以获得更好的压缩率
- 图片宽度不超过 1200px
- 文件大小控制在 500KB 以内
- 提供有意义的 alt 文字

## 🔍 SEO 优化

### 1. 标题优化

```markdown
---
title: "如何使用 React Hooks 提升开发效率 - 完全指南"
---
```

### 2. 摘要编写

```markdown
---
summary: "详细介绍 React Hooks 的使用方法，包含 useState、useEffect 等常用 Hook 的最佳实践，帮助开发者写出更优雅的 React 代码。"
---
```

### 3. 标签选择

```markdown
---
tags: ["React", "JavaScript", "前端开发", "Hooks", "最佳实践"]
---
```

## 📂 内容组织

### 1. 分类建议

- **技术分享** - 技术教程、经验总结
- **项目实战** - 项目开发记录
- **工具推荐** - 开发工具介绍
- **学习笔记** - 学习心得体会
- **生活感悟** - 个人思考

### 2. 标签策略

- 使用具体的技术名称：React、Vue、TypeScript
- 包含技能级别：入门、进阶、高级
- 添加主题分类：教程、总结、评测

### 3. 系列文章

```markdown
---
series: "React 进阶系列"
seriesOrder: 1
---
```

## 🚀 发布流程

### 1. 草稿模式

```markdown
---
draft: true
---
```

设置 `draft: true` 的文章不会在生产环境显示。

### 2. 预览文章

```bash
npm run dev
```

访问 `http://localhost:3000/blog/your-slug` 预览文章。

### 3. 发布文章

1. 将 `draft` 设置为 `false`
2. 检查文章格式和内容
3. 提交代码并部署

```bash
git add .
git commit -m "Add new post: 文章标题"
git push origin main
```

## 🎯 写作技巧

### 1. 文章结构

```markdown
# 引人入胜的标题

## 问题背景
介绍要解决的问题

## 解决方案
详细说明解决方法

### 步骤一
具体操作步骤

### 步骤二
继续下一步

## 示例代码
提供可运行的代码

## 总结
总结要点和收获

## 参考资料
相关链接和资源
```

### 2. 代码示例

```markdown
```javascript
// 好的代码示例：
// 1. 包含注释
// 2. 可以直接运行
// 3. 展示最佳实践

function createBlogPost(title, content) {
  return {
    title,
    content,
    createdAt: new Date(),
    published: false
  };
}
\```
```

### 3. 文章长度

- **短文章** (500-1000字) - 快速技巧、工具介绍
- **中等文章** (1000-3000字) - 教程、经验分享
- **长文章** (3000+字) - 深度分析、完整指南

## 🔧 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 💡 高级技巧

### 1. 内容复用

创建可复用的内容片段：

```markdown
<!-- 在 content/snippets/installation.md -->
## 安装

\```bash
npm install package-name
\```
```

### 2. 交叉引用

```markdown
相关文章：[React Hooks 入门](./react-hooks-basics)
```

### 3. 目录生成

文章会自动生成目录，基于 H2-H6 标题：

```markdown
## 这会出现在目录中
### 这也会出现
#### 以及这个
```

## 🎨 自定义样式

### 1. 代码高亮

支持多种编程语言：

```markdown
\```python
def hello_world():
    print("Hello, World!")
\```

\```css
.custom-style {
  color: #333;
  font-size: 16px;
}
\```
```

### 2. 特殊容器

```markdown
> 💡 **提示**: 这是一个有用的提示

> ⚠️ **注意**: 这是一个警告信息

> ❌ **错误**: 这是错误信息
```

## 🤝 协作写作

### 1. 多作者支持

```markdown
---
author: "客座作者"
---
```

### 2. 审稿流程

1. 创建草稿 (`draft: true`)
2. 请其他人审阅
3. 修改完善
4. 发布 (`draft: false`)

## 📊 内容分析

### 1. 阅读时间

系统会自动计算阅读时间，基于平均阅读速度。

### 2. 字数统计

文章字数会自动统计并显示。

### 3. 相关文章

系统会根据标签和分类推荐相关文章。

---

🎉 现在你已经掌握了博客系统的基本使用方法！开始创作你的第一篇文章吧！

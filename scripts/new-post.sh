#!/bin/bash

# 新建文章脚本
# 使用方法: ./scripts/new-post.sh "文章标题" [分类]

set -e

# 检查参数
if [ $# -eq 0 ]; then
    echo "使用方法: $0 \"文章标题\" [分类]"
    echo "示例: $0 \"我的第一篇文章\" \"技术分享\""
    exit 1
fi

TITLE="$1"
CATEGORY="${2:-随笔}"

# 生成 slug (将中文标题转换为拼音或使用时间戳)
TIMESTAMP=$(date +%s)
SLUG=$(echo "$TITLE" | sed 's/[^a-zA-Z0-9\u4e00-\u9fa5]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
if [ -z "$SLUG" ] || [ ${#SLUG} -lt 3 ]; then
    SLUG="post-$TIMESTAMP"
fi

# 获取当前年份
YEAR=$(date +%Y)

# 获取当前日期
DATE=$(date +%Y-%m-%d)

# 创建文章目录
POST_DIR="content/posts/$YEAR/$SLUG"
mkdir -p "$POST_DIR"

# 创建文章文件
cat > "$POST_DIR/index.md" << EOF
---
title: "$TITLE"
date: "$DATE"
tags: ["标签1", "标签2"]
categories: ["$CATEGORY"]
summary: "这里填写文章摘要，简要描述文章内容。"
slug: "$SLUG"
draft: true
featured: false
author: "作者姓名"
---

# $TITLE

在这里开始写你的文章内容...

## 介绍

简要介绍文章要讨论的主题。

## 主要内容

### 小节标题

详细内容...

### 代码示例

\`\`\`javascript
// 在这里添加代码示例
console.log('Hello, World!');
\`\`\`

### 图片示例

![图片描述](./images/example.jpg)

## 总结

总结文章的要点和收获。

## 参考资料

- [链接1](https://example.com)
- [链接2](https://example.com)
EOF

# 创建图片目录
mkdir -p "$POST_DIR/images"

echo "✅ 文章创建成功！"
echo "📁 文章路径: $POST_DIR"
echo "📝 文章文件: $POST_DIR/index.md"
echo "🖼️  图片目录: $POST_DIR/images"
echo ""
echo "📋 接下来的步骤:"
echo "1. 编辑 $POST_DIR/index.md"
echo "2. 添加图片到 $POST_DIR/images/"
echo "3. 将 draft 设置为 false 来发布文章"
echo "4. 运行 npm run dev 来预览"
echo ""
echo "🎯 快速编辑:"
echo "code $POST_DIR/index.md"

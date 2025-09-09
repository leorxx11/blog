#!/bin/bash

# 博客项目初始化脚本

echo "🚀 初始化个人博客项目..."

# 检查 Node.js 版本
node_version=$(node -v 2>/dev/null)
if [[ -z "$node_version" ]]; then
    echo "❌ 请先安装 Node.js (推荐版本 18+)"
    exit 1
fi

echo "✅ Node.js 版本: $node_version"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 创建环境变量文件
if [[ ! -f ".env.local" ]]; then
    echo "⚙️ 创建环境变量文件..."
    cat > .env.local << EOF
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=个人博客
NEXT_PUBLIC_GA_ID=
EOF
    echo "✅ 已创建 .env.local 文件"
else
    echo "✅ .env.local 文件已存在"
fi

# 创建示例文章目录
echo "📝 检查内容目录..."
if [[ ! -d "content/posts" ]]; then
    mkdir -p content/posts/2024
    echo "✅ 已创建内容目录"
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

if [[ $? -eq 0 ]]; then
    echo "✅ 项目构建成功！"
    echo ""
    echo "🎉 初始化完成！"
    echo ""
    echo "📖 接下来你可以："
    echo "   1. 运行 'npm run dev' 启动开发服务器"
    echo "   2. 访问 http://localhost:3000 查看博客"
    echo "   3. 在 content/posts/ 目录下添加你的文章"
    echo "   4. 修改 src/lib/config.ts 配置站点信息"
    echo ""
    echo "📚 更多信息请查看 README.md"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

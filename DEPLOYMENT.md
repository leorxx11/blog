# 部署指南

## 🚀 快速部署

### 1. Vercel 部署（推荐）

Vercel 是 Next.js 的官方托管平台，部署最简单：

1. **准备代码**
   ```bash
   git add .
   git commit -m "Initial blog setup"
   git push origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 选择你的博客仓库
   - 保持默认配置，点击 "Deploy"

3. **配置环境变量**
   在 Vercel 项目设置中添加：
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **自定义域名（可选）**
   - 在项目设置中添加自定义域名
   - 配置 DNS 记录指向 Vercel

### 2. Netlify 部署

1. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

2. **环境变量**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   ```

### 3. 自托管部署

1. **Docker 部署**
   
   创建 `Dockerfile`：
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nextjs -u 1001
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["npm", "start"]
   ```

   构建和运行：
   ```bash
   docker build -t my-blog .
   docker run -p 3000:3000 my-blog
   ```

2. **PM2 部署**
   ```bash
   npm install -g pm2
   npm run build
   pm2 start npm --name "blog" -- start
   ```

## 🔧 生产环境配置

### 1. 环境变量

创建 `.env.production`：
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=你的博客名称
NEXT_PUBLIC_GA_ID=你的 Google Analytics ID
AUTH_SECRET=用于后台登录 JWT 的密钥
ADMIN_USER=后台用户名
ADMIN_PASS=后台密码
```

### 2. SEO 优化

1. **Google Search Console**
   - 验证站点所有权
   - 提交 sitemap: `https://yourdomain.com/sitemap.xml`

2. **Google Analytics**
   - 创建 GA4 属性
   - 将 ID 添加到环境变量

### 3. 性能优化

1. **图片优化**
   - 使用 WebP 格式
   - 配置 CDN（Cloudflare/AWS CloudFront）

2. **缓存策略**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, s-maxage=1200, stale-while-revalidate=600',
             },
           ],
         },
       ];
     },
   };
   ```

## 📊 监控和分析

### 1. 错误监控
集成 Sentry：
```bash
npm install @sentry/nextjs
```

### 2. 性能监控
- Web Vitals 监控
- Lighthouse 定期检查
- Real User Monitoring (RUM)

### 3. 访问分析
- Google Analytics
- Plausible Analytics（隐私友好）
- Umami（自托管）

## 🔄 CI/CD 工作流

GitHub Actions 配置 (`.github/workflows/deploy.yml`)：

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build project
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔐 安全配置

### 1. HTTPS 配置
- 使用 Let's Encrypt 免费证书
- 配置 HSTS 头部
- 实施 CSP 策略

### 2. 安全头部
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 3. 远程图片域名

Next.js 14 建议使用 `images.remotePatterns` 配置远程图片白名单：

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
      { protocol: 'https', hostname: 'lxx211.icu' },
    ],
  },
};
```

> 如果仍使用 `images.domains` 会有弃用警告，不影响功能但建议迁移。

### 4. 后台“关于我”上传

- 上传接口：`POST /api/upload`，文件保存到 `public/uploads`
- 若平台无持久化文件系统（如 Vercel Serverless），上传文件不会长期保留，推荐直接使用远程图片 URL 或改用对象存储（S3 / COS / OSS）

## 📱 PWA 配置（可选）

1. **安装依赖**
   ```bash
   npm install next-pwa
   ```

2. **配置 next.config.js**
   ```javascript
   const withPWA = require('next-pwa')({
     dest: 'public',
     disable: process.env.NODE_ENV === 'development',
   });

   module.exports = withPWA({
     // 其他配置
   });
   ```

## 🎯 部署检查清单

- [ ] 环境变量配置正确
- [ ] DNS 记录配置
- [ ] SSL 证书生效
- [ ] sitemap.xml 可访问
- [ ] robots.txt 配置
- [ ] Google Analytics 跟踪
- [ ] 社交媒体卡片测试
- [ ] 性能测试通过
- [ ] 移动端适配检查
- [ ] 错误监控配置

## 🔧 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   rm -rf .next
   npm run build
   ```

2. **图片不显示**
   - 检查 Next.js Image 域名配置
   - 验证图片路径正确性

3. **样式加载问题**
   - 确认 Tailwind CSS 配置
   - 检查 PostCSS 设置

4. **搜索功能异常**
   - 验证文章 frontmatter 格式
   - 检查文件路径结构

需要帮助？查看 [故障排除指南](./TROUBLESHOOTING.md) 或提交 Issue。

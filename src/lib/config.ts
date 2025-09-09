import { SiteConfig } from '@/types/blog';

export const siteConfig: SiteConfig = {
  name: '个人博客',
  description: '分享技术、思考与生活的个人博客',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  author: {
    name: '您的名字',
    email: 'zhao2233198920@gmail.com',
    avatar: '/avatar.jpg',
    bio: '热爱技术，分享知识',
    social: {
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
    },
  },
  locale: 'zh-CN',
  theme: {
    defaultTheme: 'system',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
    },
  },
  features: {
    search: true,
    comments: true,
    analytics: false,
    rss: true,
    sitemap: true,
  },
};

export const navigationItems = [
  { title: '首页', href: '/' },
  { title: '博客', href: '/blog' },
  { title: '标签', href: '/tags' },
  { title: '分类', href: '/categories' },
  { title: '系列', href: '/series' },
  { title: '关于', href: '/about' },
  { title: '管理', href: '/admin' },
];

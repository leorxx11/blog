import fs from 'fs';
import path from 'path';
import { AboutData } from '@/types/about';
import { siteConfig } from '@/lib/config';

const contentDir = path.join(process.cwd(), 'content');
const aboutFile = path.join(contentDir, 'about.json');

function getDefaultAboutData(): AboutData {
  const a = siteConfig.author;
  return {
    name: a.name,
    email: a.email,
    avatar: a.avatar,
    bio: a.bio,
    about:
      `你好！我是 ${a.name}，一名热爱技术的开发者。这个博客是我分享技术经验、学习心得和生活感悟的地方。\n\n` +
      `我相信技术的力量可以改变世界，也相信知识的分享能够帮助更多的人成长。在这里，你会看到我对前端开发、后端技术、工程实践的思考和总结。\n\n` +
      `除了技术文章，我也会分享一些关于职业发展、学习方法和生活感悟的内容。希望这些内容能够对你有所帮助。`,
    header: {
      gradientFrom: '#f43f5e',
      gradientTo: '#f59e0b',
    },
    social: a.social,
  };
}

export function getAboutData(): AboutData {
  try {
    if (fs.existsSync(aboutFile)) {
      const raw = fs.readFileSync(aboutFile, 'utf-8');
      const data = JSON.parse(raw) as AboutData;
      // Merge with defaults to ensure keys exist; ensure 'about' falls back when empty
      const base = getDefaultAboutData();
      return {
        ...base,
        ...data,
        name: data.name && String(data.name).trim() ? data.name : base.name,
        email: data.email && String(data.email).trim() ? data.email : base.email,
        avatar: data.avatar && String(data.avatar).trim() ? data.avatar : base.avatar,
        bio: data.bio && String(data.bio).trim() ? data.bio : base.bio,
        about: data.about && String(data.about).trim() ? data.about : base.about,
        social: { ...base.social, ...(data.social || {}) },
        header: { ...base.header, ...(data.header || {}) },
      };
    }
  } catch (e) {
    // fall back to defaults on parse/read error
  }
  return getDefaultAboutData();
}

export function saveAboutData(data: AboutData): AboutData {
  const merged: AboutData = {
    ...getDefaultAboutData(),
    ...data,
    social: { ...getDefaultAboutData().social, ...(data.social || {}) },
    header: { ...getDefaultAboutData().header, ...(data.header || {}) },
  };
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  fs.writeFileSync(aboutFile, JSON.stringify(merged, null, 2), 'utf-8');
  return merged;
}

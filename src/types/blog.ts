export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  summary: string;
  slug: string;
  draft: boolean;
  featured?: boolean;
  series?: string;
  seriesOrder?: number;
  author?: string;
  readingTime?: number;
  wordCount?: number;
  lastModified?: string;
}

export interface Post extends PostMeta {
  content: string;
  excerpt: string;
  toc: TableOfContent[];
}

export interface TableOfContent {
  id: string;
  title: string;
  level: number;
  children?: TableOfContent[];
}

export interface SearchResult {
  title: string;
  slug: string;
  content: string;
  summary: string;
  tags: string[];
  score: number;
  highlights: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    social?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
    };
  };
  locale: string;
  theme: {
    defaultTheme: 'light' | 'dark' | 'system';
    colors: {
      primary: string;
      secondary: string;
    };
  };
  features: {
    search: boolean;
    comments: boolean;
    analytics: boolean;
    rss: boolean;
    sitemap: boolean;
  };
}

export interface NavigationItem {
  title: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface Series {
  name: string;
  description: string;
  posts: Post[];
  slug: string;
}

export interface Tag {
  name: string;
  count: number;
  slug: string;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
  description?: string;
}

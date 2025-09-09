import Fuse from 'fuse.js';
import { Post, SearchResult } from '@/types/blog';

export class SearchService {
  private fuse: Fuse<Post>;

  constructor(posts: Post[]) {
    this.fuse = new Fuse(posts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'content', weight: 0.3 },
        { name: 'summary', weight: 0.2 },
        { name: 'tags', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }

  search(query: string, limit = 10): SearchResult[] {
    if (!query.trim()) return [];

    const results = this.fuse.search(query, { limit });

    return results.map((result) => {
      const post = result.item;
      const score = 1 - (result.score || 0);
      
      // Extract highlights from matches
      const highlights: string[] = [];
      if (result.matches) {
        result.matches.forEach((match) => {
          if (match.indices && match.value) {
            match.indices.forEach(([start, end]) => {
              const highlight = match.value!.substring(
                Math.max(0, start - 20),
                Math.min(match.value!.length, end + 20)
              );
              highlights.push(highlight);
            });
          }
        });
      }

      return {
        title: post.title,
        slug: post.slug,
        content: post.content.substring(0, 200) + '...',
        summary: post.summary,
        tags: post.tags,
        score,
        highlights: highlights.slice(0, 3), // Limit to 3 highlights
      };
    });
  }

  searchByTag(tag: string, posts: Post[]): Post[] {
    return posts.filter((post) => 
      post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  searchByCategory(category: string, posts: Post[]): Post[] {
    return posts.filter((post) => 
      post.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
    );
  }

  static highlightText(text: string, query: string): string {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }
}

// 中文搜索优化
export function normalizeSearchQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    // 移除特殊字符但保留中文
    .replace(/[^\u4e00-\u9fa5a-z0-9\s]/g, '')
    // 压缩空格
    .replace(/\s+/g, ' ');
}

// 创建搜索索引（用于客户端搜索）
export function createSearchIndex(posts: Post[]) {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    content: post.content.substring(0, 500), // 限制内容长度
    summary: post.summary,
    tags: post.tags.join(' '),
    categories: post.categories.join(' '),
  }));
}

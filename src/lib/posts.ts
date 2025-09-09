import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, TableOfContent } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPostSlugs(): string[] {
  const years = fs.readdirSync(postsDirectory);
  const slugs: string[] = [];

  years.forEach((year) => {
    const yearPath = path.join(postsDirectory, year);
    if (fs.statSync(yearPath).isDirectory()) {
      const posts = fs.readdirSync(yearPath);
      posts.forEach((post) => {
        const postPath = path.join(yearPath, post);
        if (fs.statSync(postPath).isDirectory()) {
          slugs.push(post);
        }
      });
    }
  });

  return slugs;
}

export function getPostBySlug(slug: string, includeDrafts = false): Post | null {
  const years = fs.readdirSync(postsDirectory);
  
  for (const year of years) {
    const yearPath = path.join(postsDirectory, year);
    if (fs.statSync(yearPath).isDirectory()) {
      const postPath = path.join(yearPath, slug);
      const mdxPath = path.join(postPath, 'index.md');
      
      if (fs.existsSync(mdxPath)) {
        const fileContents = fs.readFileSync(mdxPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        if (!includeDrafts && data.draft) {
          return null;
        }

        const stats = readingTime(content);
        
        return {
          ...data,
          slug,
          content,
          excerpt: data.summary || content.slice(0, 200) + '...',
          readingTime: Math.ceil(stats.minutes),
          wordCount: stats.words,
          toc: generateTableOfContents(content),
        } as Post;
      }
    }
  }
  
  return null;
}

export function getAllPosts(includeDrafts = false): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, includeDrafts))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostsByTag(tag: string, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  return posts.filter((post) => post.categories.includes(category));
}

export function getPostsBySeries(series: string, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  return posts
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

export function getAllTags(includeDrafts = false): { name: string; count: number; slug: string }[] {
  const posts = getAllPosts(includeDrafts);
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(includeDrafts = false): { name: string; count: number; slug: string }[] {
  const posts = getAllPosts(includeDrafts);
  const categoryCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getAllSeries(includeDrafts = false): { name: string; count: number; slug: string }[] {
  const posts = getAllPosts(includeDrafts);
  const seriesCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.series) {
      seriesCounts[post.series] = (seriesCounts[post.series] || 0) + 1;
    }
  });

  return Object.entries(seriesCounts)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))
    .sort((a, b) => b.count - a.count);
}

function generateTableOfContents(content: string): TableOfContent[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TableOfContent[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({
      id,
      title,
      level,
    });
  }

  return toc;
}

export function getFeaturedPosts(limit = 3, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  return posts.filter((post) => post.featured).slice(0, limit);
}

export function getRecentPosts(limit = 5, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  return posts.slice(0, limit);
}

export function getRelatedPosts(currentPost: Post, limit = 3, includeDrafts = false): Post[] {
  const posts = getAllPosts(includeDrafts);
  
  // Calculate similarity based on tags and categories
  const relatedPosts = posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      const commonCategories = post.categories.filter((cat) => currentPost.categories.includes(cat));
      const similarity = commonTags.length * 2 + commonCategories.length;
      
      return { post, similarity };
    })
    .filter(({ similarity }) => similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(({ post }) => post);

  return relatedPosts;
}

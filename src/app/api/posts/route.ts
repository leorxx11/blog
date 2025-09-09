import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    const year = new Date(postData.date).getFullYear();
    const slug = postData.slug || generateSlug(postData.title);
    
    // 创建年份目录
    const yearDir = path.join(postsDirectory, year.toString());
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true });
    }
    
    // 创建文章目录
    const postDir = path.join(yearDir, slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    
    // 生成文章内容
    const frontMatter = {
      title: postData.title,
      date: postData.date,
      tags: postData.tags,
      categories: postData.categories,
      summary: postData.summary,
      slug: slug,
      draft: postData.draft,
      featured: postData.featured,
      author: postData.author,
      ...(postData.series && { series: postData.series }),
      ...(postData.seriesOrder && { seriesOrder: postData.seriesOrder }),
    };
    
    const fileContent = matter.stringify(postData.content, frontMatter);
    const filePath = path.join(postDir, 'index.md');
    
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const postData = await request.json();
    const { originalSlug } = postData;
    
    if (!originalSlug) {
      return NextResponse.json({ error: 'Original slug is required' }, { status: 400 });
    }
    
    // 查找原文章文件
    const years = fs.readdirSync(postsDirectory);
    let originalFilePath = '';
    
    for (const year of years) {
      const yearPath = path.join(postsDirectory, year);
      if (fs.statSync(yearPath).isDirectory()) {
        const postPath = path.join(yearPath, originalSlug, 'index.md');
        if (fs.existsSync(postPath)) {
          originalFilePath = postPath;
          break;
        }
      }
    }
    
    if (!originalFilePath) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // 更新文章内容
    const frontMatter = {
      title: postData.title,
      date: postData.date,
      tags: postData.tags,
      categories: postData.categories,
      summary: postData.summary,
      slug: postData.slug,
      draft: postData.draft,
      featured: postData.featured,
      author: postData.author,
      lastModified: new Date().toISOString().split('T')[0],
      ...(postData.series && { series: postData.series }),
      ...(postData.seriesOrder && { seriesOrder: postData.seriesOrder }),
    };
    
    const fileContent = matter.stringify(postData.content, frontMatter);
    
    // 如果slug改变了，需要重命名目录
    if (postData.slug !== originalSlug) {
      const originalDir = path.dirname(originalFilePath);
      const year = new Date(postData.date).getFullYear();
      const newDir = path.join(postsDirectory, year.toString(), postData.slug);
      
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }
      
      const newFilePath = path.join(newDir, 'index.md');
      fs.writeFileSync(newFilePath, fileContent, 'utf-8');
      
      // 删除原文件和目录
      fs.unlinkSync(originalFilePath);
      try {
        fs.rmdirSync(originalDir);
      } catch (e) {
        // 目录可能不为空，忽略错误
      }
    } else {
      fs.writeFileSync(originalFilePath, fileContent, 'utf-8');
    }
    
    return NextResponse.json({ success: true, slug: postData.slug });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

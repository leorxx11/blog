import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getPostBySlug(params.slug, true); // 包含草稿
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error loading post:', error);
    return NextResponse.json({ error: 'Failed to load post' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // 查找文章文件
    const years = fs.readdirSync(postsDirectory);
    let filePath = '';
    let dirPath = '';
    
    for (const year of years) {
      const yearPath = path.join(postsDirectory, year);
      if (fs.statSync(yearPath).isDirectory()) {
        const postDir = path.join(yearPath, slug);
        const postFile = path.join(postDir, 'index.md');
        if (fs.existsSync(postFile)) {
          filePath = postFile;
          dirPath = postDir;
          break;
        }
      }
    }
    
    if (!filePath) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // 删除文件和目录
    fs.unlinkSync(filePath);
    try {
      fs.rmdirSync(dirPath);
    } catch (e) {
      // 目录可能不为空，忽略错误
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

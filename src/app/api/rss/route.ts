import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/config';

export async function GET() {
  try {
    const posts = getAllPosts();

    const feed = new Feed({
      title: siteConfig.name,
      description: siteConfig.description,
      id: siteConfig.url,
      link: siteConfig.url,
      language: 'zh-CN',
      image: `${siteConfig.url}/favicon.ico`,
      favicon: `${siteConfig.url}/favicon.ico`,
      copyright: `© ${new Date().getFullYear()} ${siteConfig.author.name}`,
      updated: new Date(posts[0]?.date || new Date()),
      generator: 'Next.js',
      feedLinks: {
        rss2: `${siteConfig.url}/rss.xml`,
      },
      author: {
        name: siteConfig.author.name,
        email: siteConfig.author.email,
        link: siteConfig.url,
      },
    });

    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${siteConfig.url}/blog/${post.slug}`,
        link: `${siteConfig.url}/blog/${post.slug}`,
        description: post.summary,
        content: post.excerpt,
        author: [
          {
            name: post.author || siteConfig.author.name,
            email: siteConfig.author.email,
            link: siteConfig.url,
          },
        ],
        date: new Date(post.date),
        category: post.categories.map((cat) => ({ name: cat })),
      });
    });

    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('RSS generation failed:', error);
    return new NextResponse('RSS generation failed', { status: 500 });
  }
}

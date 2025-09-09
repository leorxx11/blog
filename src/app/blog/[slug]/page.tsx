import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { MDXContent } from '@/components/mdx-content';
import { TableOfContents } from '@/components/table-of-contents';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '文章不存在',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: post.author || '博主' }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);
  
  // 生成 JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      '@type': 'Person',
      name: post.author || '博主',
    },
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* 返回按钮 */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回博客列表
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* 主内容 */}
              <main className="flex-1 lg:pr-80">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* 文章头部 */}
                  <header className="p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
                    {/* 标题 */}
                    <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                      {post.title}
                    </h1>

                    {/* 元信息 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      
                      {post.readingTime && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readingTime} 分钟阅读
                        </div>
                      )}

                      {post.wordCount && (
                        <div className="flex items-center">
                          <span>{post.wordCount} 字</span>
                        </div>
                      )}

                      {post.author && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                      )}
                    </div>

                    {/* 摘要 */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {post.summary}
                    </p>

                    {/* 标签 */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 系列信息 */}
                    {post.series && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <span className="font-medium">系列文章：</span>
                          <Link
                            href={`/series/${post.series.toLowerCase().replace(/\s+/g, '-')}`}
                            className="hover:underline"
                          >
                            {post.series}
                          </Link>
                          {post.seriesOrder && (
                            <span className="ml-2">（第 {post.seriesOrder} 篇）</span>
                          )}
                        </p>
                      </div>
                    )}
                  </header>

                  {/* 文章内容 */}
                  <div className="prose prose-lg prose-custom max-w-none p-6 lg:p-8 dark:prose-dark">
                    <MDXContent content={post.content} />
                  </div>

                  {/* 文章底部 */}
                  <footer className="p-6 lg:p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {post.lastModified && post.lastModified !== post.date && (
                          <p>最后更新：{new Date(post.lastModified).toLocaleDateString('zh-CN')}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">分享到：</span>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          Twitter
                        </a>
                      </div>
                    </div>
                  </footer>
                </article>

                {/* 相关文章 */}
                {relatedPosts.length > 0 && (
                  <section className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      相关文章
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <article
                          key={relatedPost.slug}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                              <Link
                                href={`/blog/${relatedPost.slug}`}
                                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              >
                                {relatedPost.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {relatedPost.summary}
                            </p>
                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                              {new Date(relatedPost.date).toLocaleDateString('zh-CN')}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                )}
              </main>
            </div>

            {/* 固定定位的目录 */}
            {post.toc && post.toc.length > 0 && (
              <TableOfContents toc={post.toc} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

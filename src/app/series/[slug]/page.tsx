import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface SeriesPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const seriesName = decodeURIComponent(params.slug);
  
  return {
    title: `${seriesName} - 系列文章 - 个人博客`,
    description: `浏览 ${seriesName} 系列的所有文章`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const series = new Set<string>();
  
  posts.forEach(post => {
    if (post.series) {
      series.add(post.series);
    }
  });
  
  return Array.from(series).map(seriesName => ({
    slug: encodeURIComponent(seriesName),
  }));
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const seriesName = decodeURIComponent(params.slug);
  const posts = await getAllPosts();
  
  const seriesPosts = posts.filter(post => post.series === seriesName);
  
  if (seriesPosts.length === 0) {
    notFound();
  }

  // 按 seriesOrder 排序
  const sortedPosts = seriesPosts.sort((a, b) => {
    const orderA = a.seriesOrder || 999;
    const orderB = b.seriesOrder || 999;
    return orderA - orderB;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  首页
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/series" className="text-blue-600 dark:text-blue-400 hover:underline">
                  系列文章
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 dark:text-white">{seriesName}</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {seriesName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            共 {seriesPosts.length} 篇文章
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            系列目录
          </h2>
          
          <div className="space-y-4">
            {sortedPosts.map((post, index) => (
              <div key={post.slug} className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  {post.seriesOrder || index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <time>
                        {new Date(post.date).toLocaleDateString('zh-CN')}
                      </time>
                      {post.readingTime && (
                        <span>预计阅读 {post.readingTime} 分钟</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 系列导航 */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            快速导航
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                  {post.seriesOrder || index + 1}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

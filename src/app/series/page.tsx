import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '系列文章 - 个人博客',
  description: '浏览所有文章系列',
};

export default async function SeriesPage() {
  const posts = await getAllPosts();
  
  // 统计系列
  const seriesMap = new Map<string, { count: number; posts: any[] }>();
  
  posts.forEach(post => {
    if (post.series) {
      if (!seriesMap.has(post.series)) {
        seriesMap.set(post.series, { count: 0, posts: [] });
      }
      const seriesData = seriesMap.get(post.series)!;
      seriesData.count++;
      seriesData.posts.push(post);
    }
  });
  
  // 按系列名称排序
  const series = Array.from(seriesMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            系列文章
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            共 {series.length} 个系列，{posts.filter(p => p.series).length} 篇文章
          </p>
        </div>

        <div className="space-y-6">
          {series.map(([seriesName, { count, posts: seriesPosts }]) => {
            // 按 seriesOrder 排序
            const sortedPosts = seriesPosts.sort((a, b) => {
              const orderA = a.seriesOrder || 999;
              const orderB = b.seriesOrder || 999;
              return orderA - orderB;
            });

            return (
              <div
                key={seriesName}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seriesName}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {count} 篇
                  </span>
                </div>
                
                <div className="space-y-3">
                  {sortedPosts.map((post, index) => (
                    <div key={post.slug} className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {post.seriesOrder || index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                          {post.summary}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString('zh-CN')}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {series.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              暂无系列文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

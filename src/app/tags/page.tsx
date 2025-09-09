import { Metadata } from 'next';
import Link from 'next/link';
import { Tag, Hash } from 'lucide-react';
import { getAllTags, getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '标签',
  description: '浏览所有文章标签，按主题探索内容',
};

export default function TagsPage() {
  const tags = getAllTags();
  const totalPosts = getAllPosts().length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
              <Tag className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              文章标签
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              共 {tags.length} 个标签，覆盖 {totalPosts} 篇文章
            </p>
          </div>

          {/* 标签云 */}
          {tags.length === 0 ? (
            <div className="text-center py-12">
              <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无标签
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                标签将在添加文章后显示
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => {
                  // 根据文章数量计算标签大小
                  const maxCount = Math.max(...tags.map(t => t.count));
                  const minCount = Math.min(...tags.map(t => t.count));
                  const normalizedSize = minCount === maxCount 
                    ? 1 
                    : (tag.count - minCount) / (maxCount - minCount);
                  
                  const fontSize = 0.875 + normalizedSize * 0.5; // 0.875rem 到 1.375rem
                  const opacity = 0.7 + normalizedSize * 0.3; // 70% 到 100% 透明度

                  return (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-md transition-all duration-200 border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
                      style={{ opacity }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                          <Tag className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 
                            className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                            style={{ fontSize: `${fontSize}rem` }}
                          >
                            {tag.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {tag.count} 篇文章
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 opacity-50 group-hover:opacity-70 transition-opacity">
                        #
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 统计信息 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {tags.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">总标签数</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {totalPosts}
              </div>
              <div className="text-gray-600 dark:text-gray-400">总文章数</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {tags.length > 0 ? Math.round(totalPosts / tags.length * 10) / 10 : 0}
              </div>
              <div className="text-gray-600 dark:text-gray-400">平均文章/标签</div>
            </div>
          </div>

          {/* 热门标签 */}
          {tags.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                热门标签
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-wrap gap-3">
                  {tags
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 10)
                    .map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/tags/${tag.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors text-sm font-medium"
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        {tag.name}
                        <span className="ml-2 bg-primary-200 dark:bg-primary-800 text-primary-900 dark:text-primary-100 px-2 py-0.5 rounded-full text-xs">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

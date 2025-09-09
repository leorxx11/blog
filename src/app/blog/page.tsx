import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Tag, Search } from 'lucide-react';
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts';

export const metadata: Metadata = {
  title: '博客文章',
  description: '浏览所有博客文章，探索技术分享和经验总结',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags().slice(0, 15);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容区 */}
          <main className="flex-1">
            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                博客文章
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                共 {posts.length} 篇文章，分享技术经验和思考
              </p>
            </div>

            {/* 文章列表 */}
            <div className="space-y-8">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    暂无文章
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    文章正在创作中，敬请期待...
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* 文章元信息 */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                        {post.categories.length > 0 && (
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-1">分类:</span>
                            {post.categories.map((category, index) => (
                              <span key={category}>
                                <Link
                                  href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                  {category}
                                </Link>
                                {index < post.categories.length - 1 && (
                                  <span className="mx-1">,</span>
                                )}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 文章标题 */}
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* 文章摘要 */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>

                      {/* 标签 */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* 阅读更多 */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                        >
                          阅读全文
                          <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>

                        {post.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            推荐
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>

          {/* 侧边栏 */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* 分类 */}
              {categories.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    分类
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 热门标签 */}
              {tags.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    热门标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/tags/${tag.slug}`}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                      >
                        {tag.name}
                        <span className="ml-1.5 text-xs bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">
                          {tag.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      href="/tags"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                    >
                      查看所有标签 →
                    </Link>
                  </div>
                </div>
              )}

              {/* 文章统计 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  博客统计
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">总文章数</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {posts.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">标签数</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {getAllTags().length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">分类数</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {categories.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

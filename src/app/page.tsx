import Link from 'next/link';
import { ArrowRight, Calendar, Coffee, Heart, Smile } from 'lucide-react';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);
  const featuredPosts = getFeaturedPosts(3);
  // 标签页已移除：不再在首页展示标签入口

  return (
    <div className="min-h-screen">
      {/* Hero Section - 更温馨的个人风格 */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center space-x-2">
              <Coffee className="h-8 w-8 text-orange-500 animate-bounce" />
              <Heart className="h-8 w-8 text-red-500 animate-pulse" />
              <Smile className="h-8 w-8 text-yellow-500 animate-bounce delay-100" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              嗨，我是 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Leo</span> 👋
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
              欢迎来到我的小天地 ✨
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              在这里，我分享 <span className="text-blue-600 dark:text-blue-400 font-medium">技术思考</span>、
              <span className="text-green-600 dark:text-green-400 font-medium">生活感悟</span> 和 
              <span className="text-purple-600 dark:text-purple-400 font-medium">有趣发现</span>。
              希望我的文字能给你带来一些启发和快乐 🌈
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium rounded-full hover:from-rose-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                开始阅读 📚
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300"
              >
                认识我 🙋‍♂️
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts - 精选好文 */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                ✨ 精选好文 ✨
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                这些是我觉得还不错的文章，希望你也会喜欢 😊
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-rose-200 dark:hover:border-rose-800 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('zh-CN')}
                      </div>
                      <div className="text-2xl">
                        {index === 0 ? '🔥' : index === 1 ? '💎' : '⭐'}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-rose-100 to-orange-100 text-rose-700 dark:from-rose-900/30 dark:to-orange-900/30 dark:text-rose-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts - 最新动态 */}
      <section className="py-16 bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                📝 最新动态
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                看看我最近都在思考什么 🤔
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
            >
              查看全部 📚
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('zh-CN')}
                    </div>
                    <div className="text-lg">
                      {index < 2 ? '🆕' : '📖'}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-teal-100 text-green-700 dark:from-green-900/30 dark:to-teal-900/30 dark:text-green-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 移除标签页后，隐藏标签星空与跳转入口 */}
    </div>
  );
}

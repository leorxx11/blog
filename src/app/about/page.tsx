import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  MapPin, 
  Calendar,
  Code,
  BookOpen,
  Coffee,
  Heart
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: '关于我',
  description: `了解更多关于 ${siteConfig.author.name} 的信息`,
};

export default function AboutPage() {
  const posts = getAllPosts();
  const totalPosts = posts.length;
  // 写作天数从今天开始计时（2025年9月9日）
  const startDate = new Date('2025-09-09');
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-orange-50/50 to-yellow-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 个人简介卡片 */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-400 h-40 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
              <div className="absolute top-4 right-4 text-white/80 text-4xl">✨</div>
              <div className="absolute bottom-4 left-4 text-white/80 text-2xl">🌈</div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-20 sm:-mt-16">
                {/* 头像 */}
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-rose-200 to-orange-200 dark:from-rose-800 dark:to-orange-800 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-xl">
                    {siteConfig.author.avatar ? (
                      <Image
                        src={siteConfig.author.avatar}
                        alt={siteConfig.author.name}
                        width={144}
                        height={144}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl sm:text-5xl font-bold text-rose-600 dark:text-rose-400">
                        {siteConfig.author.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <span className="text-white text-sm">👋</span>
                  </div>
                </div>

                {/* 基本信息 */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {siteConfig.author.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {siteConfig.author.bio || '热爱技术，分享知识'}
                  </p>
                  
                  {/* 联系方式 */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${siteConfig.author.email}`}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      邮箱
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 关于我 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  关于我
                </h2>
                <div className="prose prose-gray dark:prose-dark max-w-none">
                  <p>
                    你好！我是 {siteConfig.author.name}，一名热爱技术的开发者。
                    这个博客是我分享技术经验、学习心得和生活感悟的地方。
                  </p>
                  <p>
                    我相信技术的力量可以改变世界，也相信知识的分享能够帮助更多的人成长。
                    在这里，你会看到我对前端开发、后端技术、工程实践的思考和总结。
                  </p>
                  <p>
                    除了技术文章，我也会分享一些关于职业发展、学习方法和生活感悟的内容。
                    希望这些内容能够对你有所帮助。
                  </p>
                </div>
              </div>

              {/* 博客历程 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  博客历程
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      开始写博客 (2025 年)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      已发布 {totalPosts} 篇文章
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      坚持写作 {daysSinceStart} 天
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-8">
              {/* 统计数据 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  博客统计
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">文章总数</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{totalPosts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">写作天数</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{daysSinceStart}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">平均每月</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {Math.round(totalPosts / Math.max(1, daysSinceStart / 30))} 篇
                    </span>
                  </div>
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  兴趣爱好
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">编程 & 技术</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">阅读 & 学习</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coffee className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">咖啡 & 思考</span>
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  联系我
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  如果你对我的文章有任何问题或建议，欢迎与我联系！
                </p>
                <Link
                  href={`mailto:${siteConfig.author.email}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  发送邮件
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

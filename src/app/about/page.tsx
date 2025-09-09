import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  Calendar,
  BookOpen,
  Heart
} from 'lucide-react';
import { getAboutData } from '@/lib/about';
import { getAllPosts } from '@/lib/posts';
import { MDXContent } from '@/components/mdx-content';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const about = getAboutData();
  return {
    title: '关于我',
    description: `了解更多关于 ${about.name} 的信息`,
  };
}

export default function AboutPage() {
  const posts = getAllPosts();
  const about = getAboutData();
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
            <div
              className="h-40 sm:h-48 md:h-56 relative"
              style={{
                backgroundImage: about.header?.image
                  ? `url(${about.header.image})`
                  : about.header?.gradientFrom && about.header?.gradientTo
                  ? `linear-gradient(90deg, ${about.header.gradientFrom}, ${about.header.gradientTo})`
                  : undefined,
                backgroundColor: !about.header?.image && !(about.header?.gradientFrom && about.header?.gradientTo)
                  ? about.header?.color || undefined
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="px-6 pt-6 pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* 头像 */}
                <div className="relative -mt-16 sm:-mt-20 lg:-mt-24">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-rose-200 to-orange-200 dark:from-rose-800 dark:to-orange-800 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-xl">
                    {about.avatar ? (
                      <Image
                        src={about.avatar}
                        alt={about.name}
                        width={144}
                        height={144}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl sm:text-5xl font-bold text-rose-600 dark:text-rose-400">
                        {about.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* 基本信息 */}
                <div className="flex-1 min-w-0 mt-10 sm:mt-16 lg:mt-20">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
                    {about.name}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                    {about.bio || '热爱技术，分享知识'}
                  </p>
                  
                  {/* 联系方式 */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${about.email}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 关于我 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-500" />
                  关于我
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {about.about ? (
                    <MDXContent content={about.about} />
                  ) : (
                    <>
                      <p>
                        你好！我是 {about.name}，一名热爱技术的开发者。这个博客是我分享技术经验、学习心得和生活感悟的地方。
                      </p>
                      <p>
                        我相信技术的力量可以改变世界，也相信知识的分享能够帮助更多的人成长。在这里，你会看到我对前端开发、后端技术、工程实践的思考和总结。
                      </p>
                      <p>
                        除了技术文章，我也会分享一些关于职业发展、学习方法和生活感悟的内容。希望这些内容能够对你有所帮助。
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* 博客历程 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  博客历程
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mr-3"></span>
                    开始写博客（2025 年）
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                    已发布 {totalPosts} 篇文章
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                    坚持写作 {daysSinceStart} 天
                  </li>
                </ul>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-8">
              {/* 统计数据 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                  博客统计
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{totalPosts}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">文章</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{daysSinceStart}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">写作天数</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {Math.round(totalPosts / Math.max(1, daysSinceStart / 30))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">篇/月</div>
                  </div>
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-gray-500" />
                  兴趣爱好
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">编程 · 技术</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">阅读 · 学习</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">咖啡 · 思考</span>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  联系我
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  如果你对我的文章有任何问题或建议，欢迎与我联系！
                </p>
                <Link
                  href={`mailto:${about.email}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

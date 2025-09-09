import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-rose-50/50 via-orange-50/50 to-yellow-50/50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 border-t border-rose-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                ✨ {siteConfig.name}
              </h3>
              <span className="text-2xl animate-bounce-gentle">💖</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {siteConfig.description}
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                用 ❤️ 和 ☕ 制作 | 感谢你的阅读 🙏
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 dark:border-gray-700/50">
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🚀</span>
              快速传送门
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300 group"
                >
                  <span className="mr-2 group-hover:animate-bounce-gentle">📚</span>
                  所有文章
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 group"
                >
                  <span className="mr-2 group-hover:animate-wiggle">🏷️</span>
                  标签
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 group"
                >
                  <span className="mr-2 group-hover:animate-bounce-gentle">📂</span>
                  分类
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 group"
                >
                  <span className="mr-2 group-hover:animate-wiggle">🙋‍♂️</span>
                  关于我
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-rose-200/50 dark:border-gray-700/50">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center space-x-2">
              <span>© {currentYear} {siteConfig.author.name}</span>
              <span className="animate-pulse">•</span>
              <span>用心写作</span>
              <span className="animate-bounce-gentle">💝</span>
              <span>分享快乐</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              愿你在这里找到有用的内容和快乐的时光 🌟
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

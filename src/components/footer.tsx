import Link from 'next/link';
import { siteConfig, navigationItems } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Site Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navigationItems.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {nav.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              联系：
              <a href={`mailto:${siteConfig.author.email}`} className="hover:underline">
                {siteConfig.author.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row items-center justify-between">
          <div>© {currentYear} {siteConfig.author.name}</div>
          <div className="mt-2 md:mt-0 text-xs text-gray-500 dark:text-gray-500">
            由 Next.js 驱动 · 保持好奇与分享
          </div>
        </div>
      </div>
    </footer>
  );
}

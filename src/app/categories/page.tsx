import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '分类 - 个人博客',
  description: '浏览所有文章分类',
};

export default async function CategoriesPage() {
  const posts = await getAllPosts();
  
  // 统计分类
  const categoryCount = new Map<string, number>();
  
  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(category => {
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
      });
    }
  });
  
  const categories = Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1]); // 按文章数量排序

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            文章分类
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            共 {categories.length} 个分类，{posts.length} 篇文章
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, count]) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category}
                </h2>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                  {count} 篇
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                浏览 {category} 分类下的所有文章
              </p>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              暂无分类
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.slug);
  
  return {
    title: `${category} - 分类 - 个人博客`,
    description: `浏览 ${category} 分类下的所有文章`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = new Set<string>();
  
  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(category => {
        categories.add(category);
      });
    }
  });
  
  return Array.from(categories).map(category => ({
    slug: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug);
  const posts = await getAllPosts();
  
  const categoryPosts = posts.filter(post => 
    post.categories?.includes(category)
  );
  
  if (categoryPosts.length === 0) {
    notFound();
  }

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
                <Link href="/categories" className="text-blue-600 dark:text-blue-400 hover:underline">
                  分类
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 dark:text-white">{category}</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            共 {categoryPosts.length} 篇文章
          </p>
        </div>

        <div className="space-y-8">
          {categoryPosts.map((post) => (
            <article key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </time>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {post.tags?.map((tag) => (
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
              
              <h2 className="text-2xl font-bold mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {post.readingTime && (
                    <span>预计阅读 {post.readingTime} 分钟</span>
                  )}
                </div>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  阅读更多 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

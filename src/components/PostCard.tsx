import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Post } from '@/types/blog';

interface PostCardProps {
  post: Post;
  variant?: 'featured' | 'default';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-2xl border transition-all',
        'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md',
        'border-gray-200/80 dark:border-gray-800/80',
        'hover:-translate-y-1 hover:shadow-lg hover:border-primary-200/70 dark:hover:border-primary-800/60',
        isFeatured ? 'p-6 md:p-7' : 'p-5',
      ].join(' ')}
    >
      {/* subtle gradient bar */}
      <div
        className={[
          'absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400',
          'opacity-80',
        ].join(' ')}
      />

      <div className={isFeatured ? 'space-y-4' : 'space-y-3'}>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5" />
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </div>
          {post.readingTime ? (
            <span>{post.readingTime} 分钟阅读</span>
          ) : null}
        </div>

        <h3 className={[
          'font-bold text-gray-900 dark:text-white',
          isFeatured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl',
          'leading-snug',
        ].join(' ')}>
          <Link
            href={`/blog/${post.slug}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-sm"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-orange-500 transition-colors">
              {post.title}
            </span>
          </Link>
        </h3>

        <p className={[
          'text-gray-600 dark:text-gray-300',
          'leading-relaxed',
          isFeatured ? 'line-clamp-3' : 'line-clamp-2',
        ].join(' ')}>
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, isFeatured ? 4 : 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        阅读全文 <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </article>
  );
}


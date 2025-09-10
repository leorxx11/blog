import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { siteConfig } from '@/lib/config';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);
  const featuredPosts = getFeaturedPosts(3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-28">
        {/* soft radial gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-500/10" />
          <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-sm text-gray-700 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-900/50 dark:text-gray-300">
              <Sparkles className="h-4 w-4 text-amber-500" />
              欢迎来到我的个人博客
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
              嗨，我是
              <span className="mx-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {siteConfig.author.name}
              </span>
              👋
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              分享关于技术、产品与生活的小发现，用更简洁的方式记录、交流与成长。
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-white shadow-sm transition hover:brightness-110 dark:bg-white dark:text-gray-900"
              >
                开始阅读
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
              >
                认识我
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredPosts.length > 0 && (
        <section className="py-12 md:py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">精选文章</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">挑几篇我最想推荐给你的内容</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">最新文章</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">最近在写与思考的主题</p>
            </div>
            <Link
              href="/blog"
              className="hidden rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 md:inline-flex"
            >
              查看全部
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

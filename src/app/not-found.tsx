'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { useState } from 'react';

export default function NotFound() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 动画 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce-gentle">
            404
          </div>
          <div className="text-6xl mt-4 animate-wiggle" onClick={handleClick}>
            {clicked ? '😵' : '🤔'}
          </div>
        </div>

        {/* 错误信息 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            哎呀！页面走丢了 😅
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            你要找的页面可能被小仙女偷走了，或者它去咖啡店打工了 ☕
            <br />
            不过别担心，我们有很多其他有趣的内容！
          </p>
        </div>

        {/* 浮动卡片 */}
        <div className="space-y-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 dark:border-purple-800 hover-lift">
            <div className="flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400">
              <Search className="h-5 w-5" />
              <span className="font-medium">也许你想搜索点什么？</span>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-200 dark:border-pink-800 hover-lift">
            <div className="flex items-center justify-center space-x-2 text-pink-600 dark:text-pink-400">
              <Home className="h-5 w-5" />
              <span className="font-medium">或者回到温暖的首页？</span>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2 h-4 w-4" />
            回到首页 🏠
          </Link>
          
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 font-medium rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            去看文章 📚
          </Link>
        </div>

        {/* 有趣的提示 */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="animate-float">
            💡 小贴士：试试按一下上面的表情符号！
          </p>
        </div>

        {/* 装饰性元素 */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce-gentle opacity-30">
          ✨
        </div>
        <div className="absolute top-40 right-10 text-3xl animate-float opacity-30">
          🌟
        </div>
        <div className="absolute bottom-20 left-20 text-2xl animate-wiggle opacity-30">
          🎈
        </div>
        <div className="absolute bottom-40 right-20 text-3xl animate-bounce-gentle opacity-30">
          🌈
        </div>
      </div>
    </div>
  );
}

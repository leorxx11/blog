'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { SearchResult } from '@/types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 模拟搜索数据 - 在实际应用中这应该从 API 获取
const mockSearchData = [
  {
    title: 'Hello World - 我的第一篇博客文章',
    slug: 'hello-world',
    content: '欢迎来到我的个人博客！这是我的第一篇文章，让我们一起开始这段技术分享之旅。',
    summary: '欢迎来到我的个人博客！这是我的第一篇文章，让我们一起开始这段技术分享之旅。',
    tags: ['博客', '技术', '开始'],
    score: 1,
    highlights: [],
  },
  {
    title: '使用 Next.js 搭建现代化博客系统',
    slug: 'nextjs-blog-setup',
    content: '详细介绍如何使用 Next.js 14、TypeScript 和 Tailwind CSS 搭建一个功能完整的现代化博客系统',
    summary: '详细介绍如何使用 Next.js 14、TypeScript 和 Tailwind CSS 搭建一个功能完整的现代化博客系统',
    tags: ['Next.js', 'React', '博客', 'TypeScript'],
    score: 1,
    highlights: [],
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // 简单的搜索逻辑
    const timeoutId = setTimeout(() => {
      const searchResults = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-x-4 top-20 mx-auto max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800">
          {/* Search Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索文章..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500">
                搜索中...
              </div>
            ) : query.trim() && results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                未找到相关文章
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/blog/${result.slug}`}
                    onClick={onClose}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {result.summary}
                        </p>
                        {result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>输入关键词搜索文章</p>
                <p className="text-sm mt-1">支持标题、内容、标签搜索</p>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {!query.trim() && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500">
              <p>搜索技巧：输入文章标题、内容关键词或标签</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

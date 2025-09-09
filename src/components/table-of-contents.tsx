'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { TableOfContent } from '@/types/blog';

interface TableOfContentsProps {
  toc: TableOfContent[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0.1,
      }
    );

    // 观察所有标题元素
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-6 z-40 hidden lg:block" style={{ top: '152px' }}>
      <nav className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-72 shadow-lg" 
           style={{ 
             height: 'calc(100vh - 184px)',
             minHeight: '400px'
           }}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            目录
          </h3>
        </div>
        <div className="overflow-y-auto" 
             style={{ 
               height: 'calc(100vh - 264px)',
               scrollbarWidth: 'thin',
               scrollbarColor: '#d1d5db transparent'
             }}>
          <div className="p-4">
            <ul className="space-y-1">
            {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  w-full text-left block px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${item.level === 1 ? 'font-semibold' : 'font-normal'}
                  ${item.level === 2 ? 'ml-2' : ''}
                  ${item.level === 3 ? 'ml-4' : ''}
                  ${item.level >= 4 ? 'ml-6' : ''}
                  ${
                    activeId === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  }
                `}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

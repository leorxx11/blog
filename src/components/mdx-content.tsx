import React from 'react';
import hljs from 'highlight.js';

interface MDXContentProps {
  content: string;
}

const generateId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-');
};

const parseMarkdown = (markdown: string): string => {
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // 1) Extract fenced code blocks first to avoid interfering with inline formatting
  const codeBlocks: string[] = [];
  const placeholder = (i: number) => `__CODE_BLOCK_${i}__`;
  const fenceRegex = /```[ \t]*([a-zA-Z0-9_+-]*)[^\n]*\r?\n([\s\S]*?)```/g; // ```lang [meta]\n...```
  const tildeFenceRegex = /~~~[ \t]*([a-zA-Z0-9_+-]*)[^\n]*\r?\n([\s\S]*?)~~~/g; // ~~~lang [meta]\n...~~~

  let preprocessed = markdown
    // backtick fences
    .replace(fenceRegex, (_m, lang, code) => {
      const i = codeBlocks.length;
      const language = (lang || '').trim();
      let highlighted = '';
      try {
        if (language && hljs.getLanguage(language)) {
          highlighted = hljs.highlight(code, { language }).value;
        } else {
          highlighted = hljs.highlightAuto(code).value;
        }
      } catch {
        highlighted = escapeHtml(code);
      }
      const langClass = language ? ` language-${language}` : '';
      codeBlocks.push(
        `<pre class="overflow-x-auto my-4"><code class="hljs text-sm${langClass}">${highlighted}</code></pre>`
      );
      return placeholder(i);
    })
    // tilde fences
    .replace(tildeFenceRegex, (_m, lang, code) => {
      const i = codeBlocks.length;
      const language = (lang || '').trim();
      let highlighted = '';
      try {
        if (language && hljs.getLanguage(language)) {
          highlighted = hljs.highlight(code, { language }).value;
        } else {
          highlighted = hljs.highlightAuto(code).value;
        }
      } catch {
        highlighted = escapeHtml(code);
      }
      const langClass = language ? ` language-${language}` : '';
      codeBlocks.push(
        `<pre class="overflow-x-auto my-4"><code class="hljs text-sm${langClass}">${highlighted}</code></pre>`
      );
      return placeholder(i);
    });

  // 2) Headings with stable IDs (to match TOC)
  preprocessed = preprocessed.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const level = (hashes as string).length;
    const id = generateId((title as string).trim());
    const classes = {
      1: 'text-3xl font-bold mb-6 mt-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2',
      2: 'text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100',
      3: 'text-xl font-semibold mb-3 mt-5 text-gray-900 dark:text-gray-100',
      4: 'text-lg font-semibold mb-3 mt-4 text-gray-900 dark:text-gray-100',
      5: 'text-base font-semibold mb-2 mt-3 text-gray-900 dark:text-gray-100',
      6: 'text-sm font-semibold mb-2 mt-3 text-gray-900 dark:text-gray-100',
    } as const;
    return `<h${level} id="${id}" class="${(classes as any)[level] || classes[6]}">${(title as string).trim()}</h${level}>`;
  });

  // 3) Inline code (outside code blocks)
  preprocessed = preprocessed.replace(
    /`([^`]+)`/g,
    (_m, code) => `<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400">${escapeHtml(code)}</code>`
  );

  // 4) Bold and italic (outside code blocks)
  preprocessed = preprocessed
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // 5) Links
  preprocessed = preprocessed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors">$1</a>'
  );

  // 6) Blockquotes
  preprocessed = preprocessed.replace(
    /^>\s*(.+)$/gm,
    '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-gray-50 dark:bg-gray-800 py-2">$1</blockquote>'
  );

  // 7) Lists
  // Unordered
  preprocessed = preprocessed.replace(
    /^\s*[-*+]\s+(.+)$/gm,
    '<li class="mb-2 text-gray-700 dark:text-gray-300">$1</li>'
  );
  preprocessed = preprocessed.replace(
    /(<li[^>]*>.*?<\/li>\s*)+/gs,
    '<ul class="list-disc list-inside mb-4 space-y-2">$1</ul>'
  );
  // Ordered
  preprocessed = preprocessed.replace(
    /^\s*\d+\.\s+(.+)$/gm,
    '<oli class="mb-2 text-gray-700 dark:text-gray-300">$1</oli>'
  );
  preprocessed = preprocessed.replace(/(<oli[^>]*>.*?<\/oli>\s*)+/gs, (match) => {
    const listItems = match.replace(/<oli/g, '<li').replace(/<\/oli>/g, '</li>');
    return `<ol class="list-decimal list-inside mb-4 space-y-2">${listItems}</ol>`;
  });

  // 8) Paragraphs (avoid wrapping already processed elements)
  preprocessed = preprocessed.replace(
    /^(?!<h[1-6]|<ul|<ol|<li|<blockquote|<pre|<code)([^<\n][^\n]*?)$/gm,
    '<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">$1</p>'
  );

  // 9) Restore code blocks
  let html = preprocessed;
  codeBlocks.forEach((block, i) => {
    html = html.replace(placeholder(i), block);
  });

  // Cleanup
  html = html.replace(/\n\s*\n/g, '\n').trim();

  return html;
};

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const processedContent = parseMarkdown(content);

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default MDXContent;

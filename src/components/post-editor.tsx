'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft, FileText, Calendar, Tag, User } from 'lucide-react';

interface PostData {
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  summary: string;
  slug: string;
  draft: boolean;
  featured: boolean;
  author: string;
  content: string;
  series?: string;
  seriesOrder?: number;
}

interface PostEditorProps {
  slug?: string;
  initialData?: PostData;
}

export default function PostEditor({ slug, initialData }: PostEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);
  
  const [postData, setPostData] = useState<PostData>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
    categories: [],
    summary: '',
    slug: '',
    draft: true,
    featured: false,
    author: 'Leo',
    content: '',
    ...initialData
  });

  const [tagInput, setTagInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  useEffect(() => {
    if (slug && !initialData) {
      loadPost(slug);
    }
  }, [slug, initialData]);

  const loadPost = async (postSlug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${postSlug}`);
      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePost = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/posts', {
        method: slug ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...postData, originalSlug: slug }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!slug) {
          router.push(`/admin/editor/${result.slug}`);
        }
        alert('文章保存成功！');
      } else {
        alert('保存失败，请重试');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCategory = () => {
    if (categoryInput.trim() && !postData.categories.includes(categoryInput.trim())) {
      setPostData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setPostData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部工具栏 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </button>
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-500" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {slug ? '编辑文章' : '新建文章'}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={savePost}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto p-6">
        {/* 文章设置区域 - 移到顶部 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* 发布设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">发布设置</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="draft"
                  checked={postData.draft}
                  onChange={(e) => setPostData(prev => ({ ...prev, draft: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="draft" className="text-sm text-gray-700 dark:text-gray-300">
                  保存为草稿
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={postData.featured}
                  onChange={(e) => setPostData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
                  设为精选文章
                </label>
              </div>
            </div>
          </div>

          {/* 文章信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">文章信息</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  发布日期
                </label>
                <input
                  type="date"
                  value={postData.date}
                  onChange={(e) => setPostData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  作者
                </label>
                <input
                  type="text"
                  value={postData.author}
                  onChange={(e) => setPostData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={postData.slug}
                  onChange={(e) => setPostData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* 标签管理 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <Tag className="w-5 h-5 inline mr-2" />
              标签
            </h3>
            
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="添加标签..."
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 text-sm"
                >
                  添加
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {postData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 分类管理 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">分类</h3>
            
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="添加分类..."
                />
                <button
                  onClick={addCategory}
                  className="px-3 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 text-sm"
                >
                  添加
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {postData.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  >
                    {category}
                    <button
                      onClick={() => removeCategory(category)}
                      className="ml-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 主编辑区域 - 分为两列：编辑器和预览 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 编辑器区域 */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">编辑器</h3>
              <div className="space-y-6">
                {/* 标题 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    文章标题
                  </label>
                  <input
                    type="text"
                    value={postData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="输入文章标题..."
                  />
                </div>

                {/* 摘要 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    文章摘要
                  </label>
                  <textarea
                    value={postData.summary}
                    onChange={(e) => setPostData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="输入文章摘要..."
                  />
                </div>

                {/* 内容编辑器 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    文章内容 (Markdown)
                  </label>
                  <textarea
                    value={postData.content}
                    onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
                    rows={25}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                    placeholder="使用 Markdown 格式编写文章内容..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 实时预览区域 */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">实时预览</h3>
              <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4 h-full overflow-auto bg-gray-50 dark:bg-gray-900">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {postData.title && <h1 className="text-2xl font-bold mb-4">{postData.title}</h1>}
                  {postData.summary && (
                    <p className="text-gray-600 dark:text-gray-400 mb-6 border-l-4 border-blue-500 pl-4 italic">
                      {postData.summary}
                    </p>
                  )}
                  {postData.content ? (
                    <div dangerouslySetInnerHTML={{ __html: parseMarkdown(postData.content) }} />
                  ) : (
                    <p className="text-gray-400 italic">开始输入内容以查看预览...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 辅助函数：解析Markdown为HTML（简化版）
function parseMarkdown(markdown: string): string {
  // 这里使用简化版的Markdown解析，实际项目中建议使用专业的Markdown解析库
  let html = markdown
    // 标题
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-3 mt-5">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-4 mt-6">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // 代码块
    .replace(/```([^`]+)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$1</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400">$1</code>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
    // 引用
    .replace(/^> (.+$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">$1</blockquote>')
    // 列表
    .replace(/^\* (.+$)/gm, '<li class="ml-4">• $1</li>')
    .replace(/^\d+\. (.+$)/gm, '<li class="ml-4">$1</li>')
    // 段落
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // 换行
    .replace(/\n/g, '<br>');

  return `<p class="mb-4">${html}</p>`;
}

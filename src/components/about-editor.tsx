'use client';

import { useEffect, useState } from 'react';
import { AboutData } from '@/types/about';
import { Save, User, Mail, Image as ImageIcon, Link as LinkIcon, Upload, Palette } from 'lucide-react';

interface AboutEditorProps {
  initialData?: AboutData;
}

export default function AboutEditor({ initialData }: AboutEditorProps) {
  const [data, setData] = useState<AboutData>(
    initialData || { name: '', email: '', avatar: '', bio: '', about: '', header: {}, social: {} }
  );
  const [loading, setLoading] = useState(!initialData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initialData) {
      (async () => {
        try {
          const res = await fetch('/api/about');
          if (res.ok) {
            const json = await res.json();
            setData(json);
          }
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [initialData]);

  const onSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const saved = await res.json();
        setData(saved);
        alert('已保存关于信息');
      } else if (res.status === 401) {
        alert('未授权，请重新登录');
      } else {
        alert('保存失败');
      }
    } catch (e) {
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">加载中...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">关于信息</h2>
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? '保存中...' : '保存'}
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <User className="inline w-4 h-4 mr-1" /> 姓名
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Mail className="inline w-4 h-4 mr-1" /> 邮箱
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <ImageIcon className="inline w-4 h-4 mr-1" /> 头像 URL
            </label>
            <input
              type="text"
              value={data.avatar || ''}
              onChange={(e) => setData({ ...data, avatar: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="例如 /avatar.jpg 或 https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              简介
            </label>
            <textarea
              rows={4}
              value={data.bio || ''}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="写点关于你的介绍..."
            />
          </div>

          {/* 头图背景设置 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <ImageIcon className="w-4 h-4 mr-1" /> 页面头图背景
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={data.header?.image || ''}
                  onChange={(e) => setData({ ...data, header: { ...data.header, image: e.target.value } })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="背景图片 URL（填写后优先生效）"
                />
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Upload className="w-4 h-4 mr-2" /> 上传
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append('file', file);
                      const res = await fetch('/api/upload', { method: 'POST', body: fd });
                      if (res.ok) {
                        const json = await res.json();
                        setData({ ...data, header: { ...data.header, image: json.url } });
                      } else if (res.status === 401) {
                        alert('未授权，请重新登录');
                      } else {
                        alert('上传失败');
                      }
                      e.currentTarget.value = '';
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    <Palette className="inline w-3 h-3 mr-1" /> 纯色背景
                  </label>
                  <input
                    type="color"
                    value={data.header?.color || '#ffffff'}
                    onChange={(e) => setData({ ...data, header: { ...data.header, color: e.target.value } })}
                    className="w-full h-9 p-0 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">渐变 From</label>
                  <input
                    type="color"
                    value={data.header?.gradientFrom || '#f43f5e'}
                    onChange={(e) => setData({ ...data, header: { ...data.header, gradientFrom: e.target.value } })}
                    className="w-full h-9 p-0 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">渐变 To</label>
                  <input
                    type="color"
                    value={data.header?.gradientTo || '#f59e0b'}
                    onChange={(e) => setData({ ...data, header: { ...data.header, gradientTo: e.target.value } })}
                    className="w-full h-9 p-0 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">优先级：图片 &gt; 渐变 &gt; 纯色</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              关于我内容（Markdown）
            </label>
            <textarea
              rows={10}
              value={data.about || ''}
              onChange={(e) => setData({ ...data, about: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              placeholder={`支持 Markdown。示例：\n\n你好！我是 ${data.name || '你的名字'}，一名热爱技术的开发者。\n这里是我分享技术、学习与生活感悟的地方。`}
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">留空则使用默认介绍段落</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
              <LinkIcon className="w-4 h-4 mr-1" /> 社交链接
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={data.social?.github || ''}
                onChange={(e) => setData({ ...data, social: { ...data.social, github: e.target.value } })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="GitHub 链接"
              />
              <input
                type="text"
                value={data.social?.twitter || ''}
                onChange={(e) => setData({ ...data, social: { ...data.social, twitter: e.target.value } })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Twitter 链接"
              />
              <input
                type="text"
                value={data.social?.linkedin || ''}
                onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value } })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="LinkedIn 链接"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

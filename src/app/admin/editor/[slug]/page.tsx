import PostEditor from '@/components/post-editor';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { assertAdminOrRedirect } from '@/lib/auth-server';
import { siteConfig } from '@/lib/config';

interface EditPostPageProps {
  params: {
    slug: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  await assertAdminOrRedirect(`/admin/editor/${params.slug}`);
  const post = getPostBySlug(params.slug, true); // 包含草稿
  
  if (!post) {
    notFound();
  }
  
  const initialData = {
    title: post.title,
    date: post.date,
    tags: post.tags || [],
    categories: post.categories || [],
    summary: post.summary || '',
    slug: post.slug,
    draft: post.draft || false,
    featured: post.featured || false,
    author: post.author || siteConfig.author.name,
    content: post.content,
    series: post.series,
    seriesOrder: post.seriesOrder,
  };
  
  return <PostEditor slug={params.slug} initialData={initialData} />;
}

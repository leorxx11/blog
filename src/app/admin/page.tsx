import { getAllPosts } from '@/lib/posts';
import AdminDashboard from '@/components/admin-dashboard';
import { assertAdminOrRedirect } from '@/lib/auth-server';

export default async function AdminPage() {
  await assertAdminOrRedirect('/admin');
  const posts = getAllPosts(true); // 包含草稿，在服务器端获取
  
  return <AdminDashboard initialPosts={posts} />;
}

import PostEditor from '@/components/post-editor';
import { assertAdminOrRedirect } from '@/lib/auth-server';

export default async function NewPostPage() {
  await assertAdminOrRedirect('/admin/editor');
  return <PostEditor />;
}

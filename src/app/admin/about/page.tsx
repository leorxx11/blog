import AboutEditor from '@/components/about-editor';
import { assertAdminOrRedirect } from '@/lib/auth-server';
import { getAboutData } from '@/lib/about';

export default async function AdminAboutPage() {
  await assertAdminOrRedirect('/admin/about');
  const initial = getAboutData();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">关于页面设置</h1>
        <AboutEditor initialData={initial} />
      </div>
    </div>
  );
}


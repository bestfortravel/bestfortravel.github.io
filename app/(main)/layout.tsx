'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';

import AuthGuard from '@/components/AuthGuard/AuthGuard';

const fullWidthRoutes = ['/map', '/albums', '/insights'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidth = fullWidthRoutes.some((r) => pathname.startsWith(r));

  return (
    <>
      {pathname !== '/' && <Header fullWidth={isFullWidth} />}
      <div className='page-content'>
        <AuthGuard>{children}</AuthGuard>;
      </div>
    </>
  );
}

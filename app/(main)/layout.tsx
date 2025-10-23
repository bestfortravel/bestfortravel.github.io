'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';

const fullWidthRoutes = ['/map', '/albums', '/insights'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullWidth = fullWidthRoutes.some((r) => pathname.startsWith(r));

  return (
    <>
      {pathname !== '/' && <Header fullWidth={isFullWidth} />}
      <div className='page-content'>{children}</div>
    </>
  );
}

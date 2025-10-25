'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const publicRoutes = ['/', '/login'];

    // If route is not public and token is missing → redirect to home
    if (!token && !publicRoutes.includes(pathname)) {
      router.replace('/');
    } else {
      setIsReady(true);
    }
  }, [pathname, router]);

  // Prevent flicker or content flash before auth check finishes
  if (!isReady) return null;

  return <>{children}</>;
}

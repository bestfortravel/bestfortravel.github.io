'use client';

import './Header.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  fullWidth?: boolean;
}

export default function Header({ fullWidth = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function for active link highlighting
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className={fullWidth ? 'wrapper-full-width' : 'wrapper'}>
        <header>
          <div className='header-inner'>
            {/* Logo */}
            <div className='logo-wrapper'>
              <Link className='header-link' href='/feed'>
                <img src='/icons/LogoFull.svg' alt='Feed' />
              </Link>
            </div>

            {/* Navigation links */}
            <div className='header-links-wrapper'>
              <Link
                href='/feed'
                className={`header-link ${isActive('/feed') ? 'active' : ''}`}
              >
                Posts
              </Link>
              <Link
                href='/albums'
                className={`header-link ${isActive('/albums') ? 'active' : ''}`}
              >
                Albums
              </Link>
              <Link
                href='/profile'
                className={`header-link ${isActive('/profile') ? 'active' : ''}`}
              >
                Profile
              </Link>
              <Link
                href='/insights'
                className={`header-link ${isActive('/insights') ? 'active' : ''}`}
              >
                Insights
              </Link>
            </div>

            {/* Avatar */}
            <div className='avatar-wrapper'>
              <Link className='profile' href='/profile'>
                <img
                  className='avatar-small'
                  src='/images/avatar.png'
                  alt='Profile'
                />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

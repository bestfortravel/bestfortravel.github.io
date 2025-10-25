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
  const header = document.querySelector('.header-wrapper');
  if (!header) return;

  const HEADER_HEIGHT = 153;
  const FADE_TRIGGER_OFFSET = 130; // fade only when ~130px of section remains visible

  const handleScroll = () => {
    const sticky = window.scrollY > 0;
    setIsSticky(sticky);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.section-to-fade')
    );

    if (!sticky) {
      sections.forEach((s) => (s.style.opacity = '1'));
      return;
    }

    const headerRect = header.getBoundingClientRect();

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Section fully below viewport? reset
      if (sectionTop > windowHeight) {
        section.style.opacity = '1';
        return;
      }

      // Compute how much of the section remains visible
      const visiblePart = sectionBottom - HEADER_HEIGHT;

      // Fade only when the section is nearly scrolled out (130px visible or less)
      const shouldFade = visiblePart <= FADE_TRIGGER_OFFSET && sectionBottom > 0;

      section.style.transition = 'opacity 0.25s ease';
      section.style.opacity = shouldFade ? '0.7' : '1';
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


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

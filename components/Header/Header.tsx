'use client';

import './Header.scss';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UsersMenu from '../UsersMenu/UsersMenu';
import MegaMenu from '../MegaMenu/MegaMenu';

interface HeaderProps {
  fullWidth?: boolean;
}

export default function Header({ fullWidth = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);


  useEffect(() => {
    const HEADER_HEIGHT = 153;
    const FADE_TRIGGER_OFFSET = 130;

    const handleScroll = () => {
      const sticky = window.scrollY > 0;
      setIsSticky(sticky);

      const sections = document.querySelectorAll<HTMLElement>('.section-to-fade');

      if (!sticky) {
        sections.forEach((s) => (s.style.opacity = '1'));
        return;
      }

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visiblePart = rect.bottom - HEADER_HEIGHT;
        const shouldFade =
          visiblePart <= FADE_TRIGGER_OFFSET && rect.bottom > 0;

        section.style.transition = 'opacity 0.25s ease';
        section.style.opacity = shouldFade ? '0.7' : '1';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname.startsWith(path);

  /** ✅ Toggle logic with mutual close */
  const toggleUsersMenu = () => {
    setIsUsersMenuOpen((prev) => {
      if (!prev) setIsMegaMenuOpen(false);
      return !prev;
    });
  };

  const toggleMegaMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMegaMenuOpen((prev) => {
      if (!prev) setIsUsersMenuOpen(false);
      return !prev;
    });
  };

  return (
    <div className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className={fullWidth ? 'wrapper-full-width' : 'wrapper'}>
        <header>
          <div
            className={`header-inner ${isMegaMenuOpen ? 'mega-menu-active' : ''}`}
          >

            {/* Logo */}
            <div className='logo-wrapper'>
              <Link className='header-link' href='/feed'>
                <img src='/icons/LogoFull.svg' alt='Logo' />
              </Link>
            </div>

            {/* Navigation */}
            <div className='header-links-wrapper'>
              <Link href='/feed' className={`header-link ${isActive('/feed') ? 'active' : ''}`}>
                Posts
              </Link>
              <Link href='/albums' className={`header-link ${isActive('/albums') ? 'active' : ''}`}>
                Albums
              </Link>
              <Link href='/profile' className={`header-link ${isActive('/profile') ? 'active' : ''}`}>
                Profile
              </Link>
              <Link href='/insights' className={`header-link ${isActive('/insights') ? 'active' : ''}`}>
                Insights
              </Link>
            </div>

            {/* Avatar + Hamburger */}
            <div className='header-right'>
              <button
                type='button'
                className='avatar-trigger'
                onClick={toggleUsersMenu}
                aria-label='Open user menu'
              >
                <img className='avatar-small' src='/images/avatar.png' alt='Profile' />
              </button>

              <button
                type='button'
                ref={hamburgerRef}
                className={`hamburger-trigger ${isMegaMenuOpen ? 'open' : ''}`}
                onClick={(e) => toggleMegaMenu(e)}
                aria-label={isMegaMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <img
                  src={
                    isMegaMenuOpen
                      ? '/icons/close-grey.svg'
                      : '/icons/hamburger.svg'
                  }
                  alt='Menu toggle'
                />
              </button>
            </div>

            {/* Users Menu Overlay */}
            <UsersMenu
              open={isUsersMenuOpen}
              onClose={() => setIsUsersMenuOpen(false)}
            />

            {/* Mega Menu Overlay */}
            <MegaMenu
              open={isMegaMenuOpen}
              onClose={() => setIsMegaMenuOpen(false)}
            />
          </div>
        </header>
      </div>
    </div>
  );
}

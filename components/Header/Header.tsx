'use client';

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
    <div
      className={[
        'fixed top-0 left-0 w-full transition-all',
        isSticky
          ? 'h-[120px] z-50 bg-gradient-to-b from-[#6884F4] to-transparent'
          : 'h-[110px] z-50',
      ].join(' ')}
    >
      <div className={fullWidth ? 'wrapper-full-width' : 'wrapper'}>
        <header>
          <div
            className={[
              'flex items-center justify-between px-8 py-4 mt-4 rounded-[20px] bg-white relative',
              'shadow-[0_0_120px_rgba(71,85,105,0.07)]',
              'max-[640px]:px-5',
              isMegaMenuOpen ? 'rounded-b-none' : '',
            ].join(' ')}
          >
            {/* Logo */}
            <div className='flex items-center'>
              <Link className='block' href='/feed'>
                <img src='/icons/LogoFull.svg' alt='Logo' className='h-10 w-auto' />
              </Link>
            </div>

            {/* Navigation */}
            <div className='flex max-[640px]:hidden'>
              <Link
                href='/feed'
                className='relative px-3 pt-2 pb-4 text-[14px] leading-[22px] text-[#1E293B]'
              >
                Posts
                {isActive('/feed') && (
                  <span className='absolute left-1/2 -translate-x-1/2 bottom-[7px] w-[6px] h-[6px] rounded-full bg-[#002FFF]' />
                )}
              </Link>
              <Link
                href='/albums'
                className='relative px-3 pt-2 pb-4 text-[14px] leading-[22px] text-[#1E293B]'
              >
                Albums
                {isActive('/albums') && (
                  <span className='absolute left-1/2 -translate-x-1/2 bottom-[7px] w-[6px] h-[6px] rounded-full bg-[#002FFF]' />
                )}
              </Link>
              <Link
                href='/profile'
                className='relative px-3 pt-2 pb-4 text-[14px] leading-[22px] text-[#1E293B]'
              >
                Profile
                {isActive('/profile') && (
                  <span className='absolute left-1/2 -translate-x-1/2 bottom-[7px] w-[6px] h-[6px] rounded-full bg-[#002FFF]' />
                )}
              </Link>
              <Link
                href='/insights'
                className='relative px-3 pt-2 pb-4 text-[14px] leading-[22px] text-[#1E293B]'
              >
                Insights
                {isActive('/insights') && (
                  <span className='absolute left-1/2 -translate-x-1/2 bottom-[7px] w-[6px] h-[6px] rounded-full bg-[#002FFF]' />
                )}
              </Link>
            </div>

            {/* Right side */}
            <div className='flex items-center gap-4'>
              <button
                type='button'
                onClick={toggleUsersMenu}
                className='w-10 h-10 rounded-full overflow-hidden border-0 bg-transparent cursor-pointer'
                aria-label='Open user menu'
              >
                <img
                  src='/images/avatar.png'
                  alt='Profile'
                  className='w-10 h-10 rounded-full object-cover'
                />
              </button>

              <button
                type='button'
                ref={hamburgerRef}
                onClick={(e) => toggleMegaMenu(e)}
                className={[
                  'w-10 h-10 grid place-items-center rounded-full transition',
                  isMegaMenuOpen ? 'bg-[#F8FAFC]' : 'bg-transparent',
                ].join(' ')}
                aria-label={isMegaMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <img
                  src={
                    isMegaMenuOpen
                      ? '/icons/close-grey.svg'
                      : '/icons/hamburger.svg'
                  }
                  alt='Menu toggle'
                  className={isMegaMenuOpen ? 'w-4 h-4' : 'w-6 h-6'}
                />
              </button>
            </div>

            {/* Users Menu */}
            <UsersMenu
              open={isUsersMenuOpen}
              onClose={() => setIsUsersMenuOpen(false)}
            />

            {/* Mega Menu */}
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

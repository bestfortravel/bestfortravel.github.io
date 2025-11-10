'use client';

import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import Link from 'next/link';

type Props = {
  open: boolean;
  onClose: () => void;
};

type UserAccount = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isBusiness?: boolean;
  showSwitch?: boolean;
};

export default function UsersMenu({ open, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('user1');

  const users: UserAccount[] = [
    {
      id: 'user1',
      name: 'Ralph Edwards',
      email: 'r.edwards2000@gmail.com',
      avatar: '/images/avatar.png',
      showSwitch: true,
    },
    {
      id: 'user2',
      name: 'Villa De `Marco',
      email: 'villademarco@gmail.com',
      avatar: '/images/VillaDeMarco.png',
      isBusiness: true,
    },
    {
      id: 'user3',
      name: 'BestForTravel',
      email: 'bf@travel.com',
      avatar: '/images/Logo 200x200.png',
      isBusiness: true,
    },
  ];

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  return (
    <div
      className={[
        'absolute top-[85px] right-[69px] z-50 transition-all duration-200',
        open
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none',
      ].join(' ')}
      aria-hidden={!open}
    >
      <div
        ref={cardRef}
        role='dialog'
        aria-modal='true'
        className='w-[363px] max-h-[480px] overflow-y-auto bg-white rounded-[32px] p-4 shadow-[0_0_120px_rgba(71,85,105,0.07)] box-border'
      >
        <div className='flex flex-col'>
          {users.map((user, idx) => {
            const selected = selectedUser === user.id;
            return (
              <label
                key={user.id}
                className={[
                  'flex items-center justify-between gap-3 px-4 py-4 cursor-pointer bg-[#F8FAFC] box-border',
                  idx === 0 ? 'rounded-t-[24px]' : '',
                  idx === users.length - 1 ? 'rounded-b-[24px]' : '',
                  selected ? 'bg-[#EFF6FF]' : '',
                ].join(' ')}
              >
                <input
                  type='radio'
                  name='userAccount'
                  checked={selected}
                  onChange={() => setSelectedUser(user.id)}
                  className='absolute opacity-0 pointer-events-none'
                />

                <div className='flex items-center gap-3 min-w-0'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='w-9 h-9 rounded-full object-cover'
                  />
                  <div className='flex flex-col min-w-0'>
                    <div className='text-[#1E293B] text-[16px] font-medium leading-[22px]'>
                      {user.name}
                    </div>
                    <div className='text-[#475569] text-[12px] leading-5 truncate max-w-[190px]'>
                      {user.email}
                    </div>
                    {user.showSwitch && (
                      <button
                        type='button'
                        className='mt-1 text-[#002FFF] text-[12px] leading-5 text-left'
                      >
                        Switch to Business
                      </button>
                    )}
                  </div>
                </div>

                {/* ✅ radio visual exactly like old SCSS */}
                <span
                  className={
                    selected
                      ? // selected: 16x16, 4px white border, blue center
                        'shrink-0 w-4 h-4 rounded-full bg-[#002FFF] border-[4px] border-white'
                      : // idle: 16x16, 1px gray border, white bg
                        'shrink-0 w-4 h-4 rounded-full bg-white border border-[#E2E8F0]'
                  }
                  aria-hidden
                />
              </label>
            );
          })}
        </div>

        <div className='flex flex-col gap-1 mt-4 mb-4'>
          <Button color='primary' type='button' className='gap-3'>
            <span
              className='w-[18px] h-[18px] bg-[url("/icons/plus-white.svg")] bg-center bg-no-repeat bg-cover inline-block'
              aria-hidden
            />
            Add account
          </Button>

          <Button color='secondary' type='button'>
            Logout
          </Button>
        </div>

        <div className='flex justify-center gap-4'>
          <Link
            href='/privacy'
            className='text-[#94A3B8] text-[12px] leading-5 text-center underline hover:no-underline'
          >
            Privacy policy
          </Link>
          <Link
            href='/terms'
            className='text-[#94A3B8] text-[12px] leading-5 text-center underline hover:no-underline'
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    </div>
  );
}

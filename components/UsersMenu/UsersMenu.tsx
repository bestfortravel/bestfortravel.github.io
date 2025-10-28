'use client';

import React, { useEffect, useRef, useState } from 'react';
import './UsersMenu.scss';
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

  // ✅ Centralized list for backend integration
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
    }
  ];

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  return (
    <div className={`usersmenu-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className='usersmenu-card' ref={cardRef} role='dialog' aria-modal='true'>

        {/* ✅ Dynamic users list */}
        {users.map((user) => (
          <label
            key={user.id}
            className={`usersmenu-user ${selectedUser === user.id ? 'selected' : ''}`}
          >
            <input
              type='radio'
              name='userAccount'
              checked={selectedUser === user.id}
              onChange={() => setSelectedUser(user.id)}
              className='usersmenu-radio-input'
            />

            <div className='usersmenu-user-left'>
              <img className='usersmenu-avatar' src={user.avatar} alt={user.name} />
              <div className='usersmenu-user-meta'>
                <div className='usersmenu-name'>{user.name}</div>
                <div className='usersmenu-email'>{user.email}</div>

                {user.showSwitch && (
                  <button className='usersmenu-switch'>Switch to Business</button>
                )}
              </div>
            </div>

            <span className='usersmenu-radio-visual' />
          </label>
        ))}

        {/* Buttons */}
        <div className='usermenu-buttons'>
          <Button color='primary' type='button'>
            <span className='usersmenu-btn-plus'></span> Add account
          </Button>

          <Button color='secondary' type='button'>
            Logout
          </Button>
        </div>

        {/* Footer links */}
        <div className='usermenu-footer-links'>
          <Link href='/privacy' className='usermenu-footer-link'>
            Privacy policy
          </Link>
          <Link href='/terms' className='usermenu-footer-link'>
            Terms and conditions
          </Link>
        </div>

      </div>
    </div>
  );
}

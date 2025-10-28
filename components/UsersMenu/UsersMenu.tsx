'use client';

import React, { useEffect, useRef, useState } from 'react';
import './UsersMenu.scss';
import Button from '@/components/Button/Button';
import Link from 'next/link';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function UsersMenu({ open, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [selectedUser, setSelectedUser] = useState<'user1' | 'user2'>('user1');

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
    <div className={`usersmenu-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className='usersmenu-card' ref={cardRef} role='dialog' aria-modal='true'>

        {/* User 1 */}
        <label className={`usersmenu-user ${selectedUser === 'user1' ? 'selected' : ''}`}>
          <input
            type='radio'
            name='userAccount'
            checked={selectedUser === 'user1'}
            onChange={() => setSelectedUser('user1')}
            className='usersmenu-radio-input'
          />
          <div className='usersmenu-user-left'>
            <img className='usersmenu-avatar' src='/images/avatar.png' alt='' />
            <div className='usersmenu-user-meta'>
              <div className='usersmenu-name'>Ralph Edwards</div>
              <div className='usersmenu-email'>r.edwards2000@gmail.com</div>
              <button className='usersmenu-switch'>Switch to Business</button>
            </div>
          </div>
          <span className='usersmenu-radio-visual' />
        </label>

        {/* User 2 */}
        <label className={`usersmenu-user ${selectedUser === 'user2' ? 'selected' : ''}`}>
          <input
            type='radio'
            name='userAccount'
            checked={selectedUser === 'user2'}
            onChange={() => setSelectedUser('user2')}
            className='usersmenu-radio-input'
          />
          <div className='usersmenu-user-left'>
            <img className='usersmenu-avatar' src='/images/VillaDeMarco.png' alt='' />
            <div className='usersmenu-user-meta'>
              <div className='usersmenu-name'>Villa De `Marco</div>
              <div className='usersmenu-email'>villademarco@gmail.com</div>
            </div>
          </div>
          <span className='usersmenu-radio-visual' />
        </label>

				<div className='usermenu-buttons'>
					<Button color='primary' type='submit'>
						<span className='usersmenu-btn-plus'></span> Add account
					</Button>
					<Button color='secondary' type='submit'>
						Logout
					</Button>
				</div>

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

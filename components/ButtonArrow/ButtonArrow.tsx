'use client';

import React from 'react';

interface ButtonArrowProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ButtonArrow({ children, onClick, disabled }: ButtonArrowProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className='inline-flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <span className='text-[#002FFF] text-[14px] font-medium leading-none'>
        {children}
      </span>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-6 h-6'
      >
        <path
          d='M13.75 7.25L19.25 12.5L13.75 17.75M19 12.5H4.75'
          stroke='#002FFF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
}

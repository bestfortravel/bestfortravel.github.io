'use client';

import React from 'react';
import '@/components/Tab.scss';

interface TabProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Tab({ children, isSelected = false, onClick }: TabProps) {
  return (
    <div
      className={`tab ${isSelected ? 'tab-selected' : 'tab-default'}`}
      onClick={onClick}
    >
      <div className='tab-label'>{children}</div>
    </div>
  );
}

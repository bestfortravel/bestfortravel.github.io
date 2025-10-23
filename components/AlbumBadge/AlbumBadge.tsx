'use client';

import React from 'react';
import '@/components/AlbumBadge/AlbumBadge.scss';

interface AlbumBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function AlbumBadge({ children, className = '' }: AlbumBadgeProps) {
  return (
    <div className={`album-badge ${className}`}>
      <div className='album-badge-wrap'>
        <div className='album-badge-label'>{children}</div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import '@/components/AlbumCard/AlbumCard.scss';
import AlbumBadge from '@/components/AlbumBadge/AlbumBadge';
import { useRouter } from 'next/navigation';

interface Album {
  id: number;
  img: string;
  title: string;
  date: string;
  place: string;
}

interface AlbumCardProps {
  album: Album;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function AlbumCard({
  album,
  isActive = false,
  onHover,
  onLeave,
}: AlbumCardProps) {
  const router = useRouter();

  return (
    <div
      className={`album-card ${isActive ? 'active' : ''}`}
      data-album-id={album.id}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => router.push(`/albums/${album.id}`)}
    >
      <img src={album.img} alt={album.title} className='album-image' />
      <AlbumBadge>{album.place}</AlbumBadge>
      <div className='album-info'>
        <h4 className='album-title'>{album.title}</h4>
        <p className='album-date'>{album.date}</p>
      </div>
    </div>
  );
}

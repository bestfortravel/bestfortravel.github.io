import React from 'react';
import Link from 'next/link';
import albumsData from '@/data/albumsData.json';
import '@/styles/AlbumDetails.scss';

interface AlbumPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return albumsData.map((album) => ({
    id: album.id.toString(),
  }));
}

export default function AlbumDetailsPage({ params }: AlbumPageProps) {
  const album = albumsData.find((a) => a.id.toString() === params.id);

  if (!album) {
    return (
      <div className='album-details not-found'>
        <Link href='/albums' className='back-btn'>
          Back to albums
        </Link>
        <h2 className='album-details-title'>Album not found</h2>
      </div>
    );
  }

  // Temporary — until you add real photos per album
  const photos = Array(6).fill(album.img);

  return (
    <div className='wrapper-full-width album-details-page'>
      <div className='back-btn-container'>
        <Link href='/albums' className='back-btn'>
          Back to albums
        </Link>
      </div>

      <div className='album-header'>
        <div className='album-info'>
          <h2 className='album-details-title'>
            {album.place}: {album.title}
          </h2>
          <p className='album-date'>
            {album.date} - 20.05.2025
          </p>
        </div>
      </div>

      <div className='photos-grid'>
        {photos.map((photo, idx) => (
          <div key={idx} className='photo-card'>
            <img
              className='photo-card-image'
              src={photo}
              alt={`${album.title} ${idx}`}
            />
            <button className='photo-card-eye-btn' />
            <div className='photo-footer'>
              <div className='stats'>
                <img
                  className='photo-icon'
                  src='/icons/like.svg'
                  alt='like'
                />
                <span>78</span>
                <img
                  className='photo-icon'
                  src='/icons/comments.svg'
                  alt='comment'
                />
                <span>12</span>
              </div>
              <button className='save-btn'>
                <img
                  className='photo-icon'
                  src='/icons/notes.svg'
                  alt='notes'
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

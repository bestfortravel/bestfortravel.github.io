'use client';

import React from 'react';
import './MapModal.scss';

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  mediaUrl: string | null;
  isVideo?: boolean;
  caption?: string;
  user?: string;
}

export default function MapModal({ open, onClose, mediaUrl, isVideo, caption, user }: MapModalProps) {
  if (!open || !mediaUrl) return null;

  return (
    <div className='map-modal-overlay' onClick={onClose}>
      <div className='map-modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='map-modal-close' onClick={onClose}>
          ✕
        </button>

        {isVideo ? (
          <video controls autoPlay playsInline className='map-modal-media'>
            <source src={mediaUrl} type='video/mp4' />
          </video>
        ) : (
          <img src={mediaUrl} alt={caption || 'Travel photo'} className='map-modal-media' />
        )}

        {caption && (
          <div className='map-modal-caption'>
            <div className='caption-user'>{user}</div>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}

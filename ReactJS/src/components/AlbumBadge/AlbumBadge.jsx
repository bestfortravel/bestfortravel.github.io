import React from 'react';
import './AlbumBadge.scss';

function AlbumBadge({ children, className = '' }) {
  return (
    <div className={`album-badge ${className}`}>
      <div className='album-badge-wrap'>
        <div className='album-badge-label'>{children}</div>
      </div>
    </div>
  );
}

export default AlbumBadge;

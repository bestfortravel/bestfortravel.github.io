import React from 'react'
import './AlbumCard.scss'
import Badge from '../Badge';

function AlbumCard({ album, isActive, onHover, onLeave }) {
  return (
		<div
			className={`album-card ${isActive ? 'active' : ''}`}
			data-album-id={album.id}
			onMouseEnter={onHover}
			onMouseLeave={onLeave}
			onClick={() => window.location.href = `/albums/${album.id}`}
		>
			<img src={album.img} alt={album.title} className='album-image' />
			<Badge>{album.place}</Badge>
			<div className='album-info'>
				<h4 className='album-title'>{album.title}</h4>
				<p className='album-date'>
					{album.date}
				</p>
			</div>
		</div>
  )
}

export default AlbumCard

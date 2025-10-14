import React from 'react'
import { useParams, Link } from 'react-router-dom'
import albumsData from '../Albums/albumsData.json'
import './AlbumDetails.scss'

function AlbumDetails() {
  const { id } = useParams()
  const album = albumsData.find((a) => a.id.toString() === id)

  if (!album) {
    return (
      <div className='album-details not-found'>
        <Link to='/albums' className='back-btn'>Back to albums</Link>
        <h2 className='album-details-title'>Album not found</h2>
      </div>
    )
  }

  // Example — you can later load real images per album
  const photos = Array(6).fill(album.img)

  return (
    <div className='wrapper-full-width album-details-page'>
    <div className='back-btn-container'>
			<Link to='/albums' className='back-btn'>Back to albums</Link>
    </div>
      <div className='album-header'>
        <div className='album-info'>
          <h2 className='album-details-title'>{album.place}: {album.title}</h2>
          <p className='album-date'>{album.date} - 20.05.2025</p>
        </div>
      </div>

      <div className='photos-grid'>
        {photos.map((photo, idx) => (
          <div key={idx} className='photo-card'>
            <img className='photo-card-image' src={photo} alt={`${album.title} ${idx}`} />
            <button className='photo-card-eye-btn'></button>
            <div className='photo-footer'>
              <div className='stats'>
                <img className='photo-icon' src='/icons/like.svg' alt='like' /><span>78</span>
								<img className='photo-icon' src='/icons/comments.svg' alt='comment' /><span>12</span>
              </div>
              <button className='save-btn'><img className='photo-icon' src='/icons/notes.svg' alt='notes' /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumDetails

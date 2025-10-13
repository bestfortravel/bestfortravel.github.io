import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Albums.scss'
import AlbumCard from '../../components/AlbumCard'
import albumsData from './albumsData.json'

function Albums() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [drawerY, setDrawerY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const startY = useRef(0)

  // 🆕 album modal state
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const albums = albumsData
  const filteredAlbums =
    activeFilter === 'All'
      ? albums
      : albums.filter((a) => a.category === activeFilter)

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize map
  useEffect(() => {
    if (map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [10, 45],
      zoom: 3,
    })

    map.current.on('load', () => {
      if (map.current.getLayer('building')) {
        map.current.setPaintProperty('building', 'fill-color', '#f4f0e6')
      }
      if (map.current.getLayer('background')) {
        map.current.setPaintProperty('background', 'background-color', '#faf5ee')
      }

      const waterLayers = ['water', 'water_shadow']
      waterLayers.forEach((layer) => {
        if (map.current.getLayer(layer)) {
          map.current.setPaintProperty(layer, 'fill-color', '#b8dff2')
        }
      })

      if (map.current.getLayer('boundary_state')) {
        map.current.setPaintProperty('boundary_state', 'line-color', '#272a2d')
      }
      if (map.current.getLayer('boundary_country_outline')) {
        map.current.setPaintProperty('boundary_country_outline', 'line-color', '#272a2d')
      }

      addMarkers(albums)
    })
  }, [albums])

  // Add markers
  const addMarkers = (points) => {
    markersRef.current.forEach((m) => m.marker.remove())
    markersRef.current = []

    points.forEach((point) => {
      const el = document.createElement('div')
      el.className = 'photo-marker'
      el.style.backgroundImage = `url(${point.img})`
      el.dataset.id = point.id

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(point.coords)
        .addTo(map.current)

      el.addEventListener('mouseenter', () => setHoveredId(point.id))
      el.addEventListener('mouseleave', () => setHoveredId(null))

      // 🆕 On click → show album modal on mobile or scroll on desktop
      el.addEventListener('click', () => {
        if (isMobile) {
          setSelectedAlbum(point)
          setDrawerOpen(false)
        } else {
          const albumEl = document.querySelector(`[data-album-id='${point.id}']`)
          if (albumEl) {
            albumEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
            albumEl.classList.add('highlighted')
            setTimeout(() => albumEl.classList.remove('highlighted'), 1200)
          }
        }
      })

      markersRef.current.push({ id: point.id, marker })
    })
  }

  useEffect(() => {
    if (map.current) addMarkers(filteredAlbums)
  }, [activeFilter])

  useEffect(() => {
    markersRef.current.forEach(({ id, marker }) => {
      const el = marker.getElement()
      el.classList.toggle('highlight', id === hoveredId)
    })
  }, [hoveredId])

  const handleAlbumHover = (album) => {
    setHoveredId(album.id)
    map.current?.easeTo({ center: album.coords, zoom: 6, duration: 800 })
  }
  const handleAlbumLeave = () => setHoveredId(null)

  // Drawer touch controls
  const handleTouchStart = (e) => {
    setIsDragging(true)
    startY.current = e.touches[0].clientY - drawerY
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    let newY = e.touches[0].clientY - startY.current
    newY = Math.max(0, Math.min(window.innerHeight * 0.6, newY))
    setDrawerY(newY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (drawerY > window.innerHeight * 0.3) {
      setDrawerOpen(false)
      setDrawerY(window.innerHeight * 0.6)
    } else {
      setDrawerOpen(true)
      setDrawerY(0)
    }
  }

  const filters = [
    'All',
    'Countries',
    'Cities',
    'Food',
    'Stays',
    'Sights',
    'Activities',
  ]

  return (
    <div className='wrapper-full-width albums-page'>
      {/* Desktop */}
      {!isMobile && (
        <div className='albums-left'>
          <div className='back-btn-container'>
              <Link to='/profile' className='back-btn'>Back to profile</Link>
          </div>
          <div className='albums-header'>
            <h2 className='albums-title'>Leslie’s albums</h2>
            <div className='sort-section'>
              <span>Sort by</span>
              <button className='sort-button'>
                <img className='sort-icon' src='./icons/sort.svg' alt='sort'></img>
              </button>
            </div>
          </div>

          <div className='albums-filters'>
            {filters.map((f) => (
              <button
                key={f}
                className={`filter ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className='album-section'>
            <div className='album-grid'>
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onHover={() => handleAlbumHover(album)}
                  onLeave={handleAlbumLeave}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map + Mobile */}
      <div className='albums-map'>
        <div ref={mapContainer} className='map-container'></div>

        {isMobile && (
          <>
            {/* Drawer */}
            <div
              className={`mobile-drawer ${drawerOpen ? 'open' : 'closed'}`}
              style={{
                transform: `translateY(${drawerY > 0 ? drawerY + 'px' : '50%'})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className='drawer-handle'></div>
              <div className='drawer-content'>
                <div className='back-btn-container'>
                    <Link to='/profile' className='back-btn'>Back to profile</Link>
                </div>
                <div className='albums-header mobile'>
                  <h2 className='albums-title'>Leslie’s albums</h2>
                </div>

                <div className='albums-filters mobile'>
                  {filters.map((f) => (
                    <button
                      key={f}
                      className={`filter ${activeFilter === f ? 'active' : ''}`}
                      onClick={() => setActiveFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className='album-grid'>
                  {filteredAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onHover={() => handleAlbumHover(album)}
                      onLeave={handleAlbumLeave}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 🆕 Album Modal */}
            {selectedAlbum && (
              <div className='album-modal-overlay' onClick={() => setSelectedAlbum(null)}>
                <div
                  className='album-modal'
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className='close-modal'
                    onClick={() => setSelectedAlbum(null)}
                  >
                    ✕
                  </button>
                  <img src={selectedAlbum.img} alt={selectedAlbum.title} />
                  <a
                    href={`/albums/${selectedAlbum.id}`}
                    className='view-link'
                  >
                    <div className='album-modal-info'>
                      <h3 className='album-title'>{selectedAlbum.title}</h3>
                      <p>{selectedAlbum.place}</p>
                      <p className='album-date'>
                        {selectedAlbum.date}
                      </p>
                      <div className='link-icon'></div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Albums

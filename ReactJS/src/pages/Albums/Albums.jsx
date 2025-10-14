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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const [drawerY, setDrawerY] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const startY = useRef(0)
  const drawerRef = useRef(null)
  const dragStartFromHeader = useRef(false)

  const albums = albumsData
  const filters = ['All', 'Countries', 'Cities', 'Food', 'Stays', 'Sights', 'Activities']

  const visibleCategories =
    activeFilter === 'All'
      ? [...new Set(albums.map((a) => a.category))]
      : [activeFilter]

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900)
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

      el.addEventListener('click', () => {
        if (isMobile) {
          setSelectedAlbum(point)
          setDrawerY(95)
        } else {
          const albumEl = document.querySelector(`[data-album-id='${point.id}']`)
          const container = document.querySelector('.albums-left')

          if (albumEl && container) {
            albumEl.scrollIntoView({ behavior: 'smooth', block: 'center' })

            const rect = albumEl.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            const offset =
              container.scrollTop +
              (rect.top - containerRect.top) -
              container.clientHeight / 2 +
              rect.height / 2
            container.scrollTo({ top: offset, behavior: 'smooth' })

            albumEl.classList.add('highlighted')
            setTimeout(() => albumEl.classList.remove('highlighted'), 1200)
          }
        }
      })

      markersRef.current.push({ id: point.id, marker })
    })
  }

  useEffect(() => {
    if (map.current) addMarkers(albums)
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

  // ---------------- Drawer touch controls ----------------
  const handleTouchStart = (e) => {
    const target = e.target

    // 🟢 Only allow dragging from handle or header (not scrollable content)
    if (target.closest('.drawer-handle') || target.closest('.drawer-header')) {
      dragStartFromHeader.current = true
      setIsDragging(true)
      startY.current = e.touches[0].clientY
      document.body.style.overflow = 'hidden'
    } else {
      dragStartFromHeader.current = false
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !dragStartFromHeader.current) return

    const deltaY = e.touches[0].clientY - startY.current
    const vh = window.innerHeight
    const movePercent = (deltaY / vh) * 100

    let newDrawerY = Math.min(95, Math.max(0, drawerY + movePercent))
    setDrawerY(newDrawerY)
    startY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    if (!dragStartFromHeader.current) return

    setIsDragging(false)
    document.body.style.overflow = ''
    dragStartFromHeader.current = false

    if (drawerY > 70) setDrawerY(95)
    else if (drawerY < 25) setDrawerY(0)
    else setDrawerY(50)
  }

  // Collapse on map move
  useEffect(() => {
    if (!map.current) return
    const handleMoveStart = () => {
      if (isMobile) setDrawerY(95)
    }
    map.current.on('movestart', handleMoveStart)
    return () => map.current.off('movestart', handleMoveStart)
  }, [isMobile])

  return (
    <div className='wrapper-full-width albums-page'>
      {/* 🖥 Desktop */}
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
                <img className='sort-icon' src='./icons/sort.svg' alt='sort' />
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

          {visibleCategories.map((cat) => {
            const catAlbums = albums.filter((a) => a.category === cat)
            return (
              <div key={cat} className='album-category-section'>
                <div className='category-header'>
                  <h3 className='category-title'>{cat}</h3>
                  <Link to={`/albums?category=${cat}`} className='see-all'>
                    See all <span className='see-all-icon'></span>
                  </Link>
                </div>
                <div className='album-row'>
                  {catAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      data-album-id={album.id}
                      onHover={() => handleAlbumHover(album)}
                      onLeave={handleAlbumLeave}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 📱 Mobile */}
      <div className='albums-map'>
        <div ref={mapContainer} className='map-container'></div>

        {isMobile && (
          <>
            <div
              ref={drawerRef}
              className={`mobile-drawer ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translateY(${drawerY}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 🟢 Drawer Header Area (used for drag) */}
              <div className='drawer-header'>
                <div className='drawer-handle'></div>
                <h2 className='albums-title'>Leslie’s albums</h2>
              </div>

              <div
                className='drawer-content'
                style={{
                  overflowY: isDragging ? 'hidden' : 'auto',
                  touchAction: isDragging ? 'none' : 'auto',
                }}
              >
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

                {visibleCategories.map((cat) => {
                  const catAlbums = albums.filter((a) => a.category === cat)
                  return (
                    <div key={cat} className='album-category-section mobile'>
                      <div className='category-header'>
                        <h3 className='category-title'>{cat}</h3>
                        <Link to={`/albums?category=${cat}`} className='see-all'>
                          See all <span className='see-all-icon'></span>
                        </Link>
                      </div>
                      <div className='album-row'>
                        {catAlbums.map((album) => (
                          <AlbumCard
                            key={album.id}
                            album={album}
                            onHover={() => handleAlbumHover(album)}
                            onLeave={handleAlbumLeave}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {selectedAlbum && (
              <div className='album-modal-overlay' onClick={() => setSelectedAlbum(null)}>
                <div
                  className='album-modal'
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className='close-modal' onClick={() => setSelectedAlbum(null)}>✕</button>
                  <img src={selectedAlbum.img} alt={selectedAlbum.title} />
                  <Link to={`/albums/${selectedAlbum.id}`} className='view-link'>
                    <div className='album-modal-info'>
                      <h3 className='album-title'>{selectedAlbum.title}</h3>
                      <p>{selectedAlbum.place}</p>
                      <p className='album-date'>{selectedAlbum.date}</p>
                    </div>
                  </Link>
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

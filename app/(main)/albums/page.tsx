'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Link from 'next/link';
import AlbumCard from '@/components/AlbumCard/AlbumCard';
import albumsData from '@/data/albumsData.json';
import '@/styles/Albums.scss';

export default function AlbumsPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ id: number; marker: maplibregl.Marker }[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerY, setDrawerY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const startY = useRef(0);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const dragStartFromHeader = useRef(false);

  const albums = albumsData;
  const filters = ['All', 'Countries', 'Cities', 'Food', 'Stays', 'Sights', 'Activities'];

  const visibleCategories =
    activeFilter === 'All'
      ? [...new Set(albums.map((a) => a.category))]
      : [activeFilter];

  // ✅ Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Initialize map safely
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [10, 45],
      zoom: 3,
    });

    map.current = mapInstance;

    mapInstance.on('load', () => {
      const layersToStyle: Record<string, any> = {
        building: { 'fill-color': '#f4f0e6' },
        background: { 'background-color': '#faf5ee' },
        water: { 'fill-color': '#b8dff2' },
        water_shadow: { 'fill-color': '#b8dff2' },
        boundary_state: { 'line-color': '#272a2d' },
        boundary_country_outline: { 'line-color': '#272a2d' },
      };

      Object.entries(layersToStyle).forEach(([layer, style]) => {
        if (mapInstance.getLayer(layer)) {
          const [prop, value] = Object.entries(style)[0];
          mapInstance.setPaintProperty(layer, prop, value);
        }
      });

      addMarkers(albums);
    });

    // ✅ Proper cleanup
    return () => {
      mapInstance.remove();
      map.current = null;
    };
  }, [albums]);

  // ✅ Add markers
  const addMarkers = (points: any[]) => {
    markersRef.current.forEach((m) => m.marker.remove());
    markersRef.current = [];

    points.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'photo-marker';
      el.style.backgroundImage = `url(${point.img})`;
      el.dataset.id = point.id.toString();

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(point.coords)
        .addTo(map.current!);

      el.addEventListener('mouseenter', () => setHoveredId(point.id));
      el.addEventListener('mouseleave', () => setHoveredId(null));

      el.addEventListener('click', () => {
        if (isMobile) {
          setSelectedAlbum(point);
          setDrawerY(95);
        } else {
          const albumEl = document.querySelector(`[data-album-id='${point.id}']`);
          const container = document.querySelector('.albums-left');
          if (albumEl && container) {
            albumEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });

      markersRef.current.push({ id: point.id, marker });
    });
  };

  // ✅ Refresh markers when filter changes
  useEffect(() => {
    if (map.current) addMarkers(albums);
  }, [activeFilter]);

  // ✅ Highlight hovered markers
  useEffect(() => {
    markersRef.current.forEach(({ id, marker }) => {
      const el = marker.getElement();
      el.classList.toggle('highlight', id === hoveredId);
    });
  }, [hoveredId]);

  const handleAlbumHover = (album: any) => {
    setHoveredId(album.id);
    map.current?.easeTo({ center: album.coords, zoom: 6, duration: 800 });
  };
  const handleAlbumLeave = () => setHoveredId(null);

  // ✅ Drawer controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.drawer-handle') || target.closest('.drawer-header')) {
      dragStartFromHeader.current = true;
      setIsDragging(true);
      startY.current = e.touches[0].clientY;
      document.body.style.overflow = 'hidden';
    } else {
      dragStartFromHeader.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartFromHeader.current) return;
    const deltaY = e.touches[0].clientY - startY.current;
    const vh = window.innerHeight;
    const movePercent = (deltaY / vh) * 100;
    const newDrawerY = Math.min(95, Math.max(0, drawerY + movePercent));
    setDrawerY(newDrawerY);
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!dragStartFromHeader.current) return;
    setIsDragging(false);
    document.body.style.overflow = '';
    dragStartFromHeader.current = false;

    if (drawerY > 70) setDrawerY(95);
    else if (drawerY < 25) setDrawerY(0);
    else setDrawerY(50);
  };

  // ✅ Collapse drawer when map moves
  useEffect(() => {
    if (!map.current) return;
    const handleMoveStart = () => {
      if (isMobile) setDrawerY(95);
    };
    map.current.on('movestart', handleMoveStart);
    return () => {
      map.current?.off('movestart', handleMoveStart);
    };
  }, [isMobile]);

  return (
    <div className='wrapper-full-width albums-page'>
      {!isMobile && (
        <div className='albums-left'>
          <div className='back-btn-container'>
            <Link href='/profile' className='back-btn'>
              Back to profile
            </Link>
          </div>

          <div className='albums-header'>
            <h2 className='albums-title'>Leslie’s albums</h2>
            <div className='sort-section'>
              <span>Sort by</span>
              <button className='sort-button'>
                <img className='sort-icon' src='/icons/sort.svg' alt='sort' />
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
            const catAlbums = albums.filter((a) => a.category === cat);
            return (
              <div key={cat} className='album-category-section'>
                <div className='category-header'>
                  <h3 className='category-title'>{cat}</h3>
                  <Link href={`/albums?category=${cat}`} className='see-all'>
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
            );
          })}
        </div>
      )}

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
                  const catAlbums = albums.filter((a) => a.category === cat);
                  return (
                    <div key={cat} className='album-category-section mobile'>
                      <div className='category-header'>
                        <h3 className='category-title'>{cat}</h3>
                        <Link href={`/albums?category=${cat}`} className='see-all'>
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
                  );
                })}
              </div>
            </div>

            {selectedAlbum && (
              <div className='album-modal-overlay' onClick={() => setSelectedAlbum(null)}>
                <div className='album-modal' onClick={(e) => e.stopPropagation()}>
                  <button className='close-modal' onClick={() => setSelectedAlbum(null)}>
                    ✕
                  </button>
                  <img src={selectedAlbum.img} alt={selectedAlbum.title} />
                  <Link href={`/albums/${selectedAlbum.id}`} className='view-link'>
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
  );
}

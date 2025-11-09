'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapModal from './MapModal';
import '@/components/TravelMap/TravelMap.scss';
import './MapPlaces.scss';

type PlacePhoto = {
  id: string;
  url: string;
  user: string;
  userAvatar?: string;
  title?: string;
  location?: string;
  date: string;
  rating: number;
};

type Place = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  likes: number;
  cover: string;
  photos: PlacePhoto[];
};

const FALLBACK_PLACES: Place[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    likes: 2000,
    cover: '/images/places/paris.jpg',
    photos: [
      {
        id: 'p1',
        url: '/images/places/paris-1.jpg',
        user: 'Leslie Alexander',
        userAvatar: '/images/users/leslie.png',
        title: 'Eiffel Tower tour',
        location: 'Paris, France',
        date: '2025-05-01',
        rating: 4.9
      },
      {
        id: 'p2',
        url: '/images/places/paris-2.jpg',
        user: 'Leslie Alexander',
        userAvatar: '/images/users/leslie.png',
        title: 'Sunset over Seine',
        location: 'Paris, France',
        date: '2025-04-28',
        rating: 4.7
      },
      {
        id: 'p3',
        url: '/images/places/paris-3.jpg',
        user: 'Michael Chen',
        userAvatar: '/images/users/michael.png',
        title: 'Hotel French Theory',
        location: 'Paris, France',
        date: '2025-04-27',
        rating: 4.9
      },
      {
        id: 'p4',
        url: '/images/places/paris-4.jpg',
        user: 'Emily Davis',
        userAvatar: '/images/users/emily.png',
        title: 'City from above',
        location: 'Paris, France',
        date: '2025-04-20',
        rating: 4.5
      }
    ]
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    lat: 41.9028,
    lng: 12.4964,
    likes: 1500,
    cover: '/images/places/rome.jpg',
    photos: [
      {
        id: 'r1',
        url: '/images/places/rome-1.jpg',
        user: 'Jacob Jones',
        date: '2025-04-30',
        rating: 4.6,
        title: 'Colosseum morning',
        location: 'Rome, Italy'
      },
      {
        id: 'r2',
        url: '/images/places/rome-2.jpg',
        user: 'Jacob Jones',
        date: '2025-04-21',
        rating: 4.4,
        title: 'Italian streets',
        location: 'Rome, Italy'
      }
    ]
  },
  {
    id: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    lat: 55.6761,
    lng: 12.5683,
    likes: 1500,
    cover: '/images/places/copenhagen.jpg',
    photos: []
  },
  {
    id: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    lat: 50.0647,
    lng: 19.945,
    likes: 470,
    cover: '/images/places/krakow.jpg',
    photos: []
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    lat: 38.7223,
    lng: -9.1393,
    likes: 1500,
    cover: '/images/places/lisbon.jpg',
    photos: []
  }
];

export default function MapPlaces() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [places, setPlaces] = useState<Place[]>(FALLBACK_PLACES);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState('');
  const [modalUser, setModalUser] = useState('');

  // load data (same pattern as MapPeople, but with fallback) :contentReference[oaicite:4]{index=4}
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const resp = await fetch('/data/places.json');
        if (resp.ok) {
          const json = await resp.json();
          setPlaces(json);
        }
      } catch (e) {
        // fallback stays
      }
    };
    loadPlaces();
  }, []);

  // init map
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [12, 50],
      zoom: 3.4
    });

    map.current.on('load', () => {
      // water color to match people map
      const waterLayers = ['water', 'water_shadow'];
      waterLayers.forEach((l) => {
        if (map.current?.getLayer(l)) {
          map.current.setPaintProperty(l, 'fill-color', '#b8dff2');
        }
      });
      renderMarkers(places);
    });
  }, [places]);

  // re-render markers if places change
  useEffect(() => {
    if (!map.current) return;
    renderMarkers(places);
  }, [places]);

  // resize map when panel is toggled
  useEffect(() => {
    if (!map.current) return;
    setTimeout(() => {
      map.current?.resize();
    }, 260);
  }, [panelOpen]);

  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  };

  const renderMarkers = (list: Place[]) => {
    if (!map.current) return;
    clearMarkers();

    list.forEach((place) => {
      const el = document.createElement('div');
      el.className = 'place-marker';
      el.style.backgroundImage = `url(${place.cover})`;

      const likes = document.createElement('div');
      likes.className = 'place-marker-likes';
      likes.innerHTML = `
        <div class='place-marker-likeicon'>
          <svg width='14' height='13' viewBox='0 0 14 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M7 12L6.0705 11.1576C2.38 7.78458 0 5.60117 0 3.00586C0 1.00156 1.582 0 3.29 0C4.35 0 5.3675 0.490234 6.0375 1.26953C6.7075 0.490234 7.725 0 8.785 0C10.493 0 12.075 1.00156 12.075 3.00586C12.075 5.60117 9.695 7.78458 6.0045 11.1633L7 12Z' fill='#F43F5E'/>
          </svg>
        </div>
        <span>${place.likes}</span>
      `;
      el.appendChild(likes);

      el.addEventListener('click', () => handlePlaceClick(place));

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.lng, place.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  };

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setPanelOpen(true);
    if (map.current) {
      map.current.flyTo({
        center: [place.lng, place.lat],
        zoom: 4.8,
        essential: true
      });
    }
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    const term = searchValue.trim().toLowerCase();
    const found = places.find(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.country.toLowerCase().includes(term)
    );
    if (found) {
      handlePlaceClick(found);
    }
  };

  const handleExpandBack = () => {
    setPanelOpen(false);
    setSelectedPlace(null);
    if (map.current) {
      map.current.flyTo({
        center: [12, 50],
        zoom: 3.4,
        essential: true
      });
    }
  };

  const currentPhotos = React.useMemo(() => {
    if (!selectedPlace) return [];
    const photos = [...selectedPlace.photos];

    if (sortBy === 'date') {
      photos.sort((a, b) => (a.date > b.date ? -1 : 1));
    } else {
      photos.sort((a, b) => b.rating - a.rating);
    }
    return photos;
  }, [selectedPlace, sortBy]);

  const openPhoto = (photo: PlacePhoto) => {
    setModalMedia(photo.url);
    setModalCaption(photo.title || photo.location || '');
    setModalUser(photo.user);
    setModalOpen(true);
  };

  return (
    <>
      <div className={`places-map-shell ${panelOpen ? 'places-map-shell--with-panel' : ''}`}>
        <div ref={mapContainer} className='places-map-canvas'>
          <div className='places-map-search'>
            <input
              className='places-map-search-input'
              placeholder='Search for a location'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className='places-map-search-btn' onClick={handleSearch}>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M7.5 13C10.2614 13 12.5 10.7614 12.5 8C12.5 5.23858 10.2614 3 7.5 3C4.73858 3 2.5 5.23858 2.5 8C2.5 10.7614 4.73858 13 7.5 13Z' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                <path d='M11 11L14 14' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
              </svg>
            </button>
          </div>

          <button className='places-map-expand' onClick={handleExpandBack} aria-label='Expand map'>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M7.5 3.75H3.75V7.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
              <path d='M3.75 12.5V16.25H7.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
              <path d='M12.5 16.25H16.25V12.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
              <path d='M16.25 7.5V3.75H12.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
          </button>
        </div>

        <div className={`places-side-panel ${panelOpen ? 'places-side-panel--open' : ''}`}>
          <div className='places-panel-header'>
            <div className='places-panel-title'>More photos from the area</div>
            <div className='places-panel-sorting'>
              <span className='places-panel-sorting-label'>Sort by</span>
              <button
                className={`places-sort-btn ${sortBy === 'date' ? 'is-active' : ''}`}
                onClick={() => setSortBy('date')}
              >
                By date
              </button>
              <button
                className={`places-sort-btn ${sortBy === 'rating' ? 'is-active' : ''}`}
                onClick={() => setSortBy('rating')}
              >
                By rating
              </button>
            </div>
          </div>

          <div className='places-list-scroll'>
            {selectedPlace && currentPhotos.length === 0 && (
              <div className='places-empty'>No photos yet for this place.</div>
            )}

            {selectedPlace &&
              currentPhotos.map((photo, index) => (
                <React.Fragment key={photo.id}>
                  <div className='places-photo-card' onClick={() => openPhoto(photo)}>
                    <div
                      className='places-photo-media'
                      style={{ backgroundImage: `url(${photo.url})` }}
                    >
                      <div className='places-photo-tag'>
                        {photo.location || `${selectedPlace.name}, ${selectedPlace.country}`}
                      </div>
                    </div>
                    <div className='places-photo-meta'>
                      <div className='places-photo-title'>{photo.title || selectedPlace.name}</div>
                      <div className='places-photo-bottom'>
                        <div className='places-photo-user'>
                          {photo.userAvatar && (
                            <span
                              className='places-photo-avatar'
                              style={{ backgroundImage: `url(${photo.userAvatar})` }}
                            />
                          )}
                          <span className='places-photo-username'>{photo.user}</span>
                        </div>
                        <div className='places-photo-rating'>
                          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M7.99967 1.33334L10.0597 5.50668L14.6663 6.18001L11.333 9.42668L12.1197 14.0133L7.99967 11.8467L3.87967 14.0133L4.66634 9.42668L1.33301 6.18001L5.93967 5.50668L7.99967 1.33334Z' fill='#FACC15'/>
                          </svg>
                          <span>{photo.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(index === 1 || (index > 1 && (index + 1) % 4 === 0)) && (
                    <div className='places-sponsored'>
                      <div className='places-sponsored-tag'>Sponsored</div>
                      <div className='places-sponsored-body'>
                        <div className='places-sponsored-title'>Hotel French Theory</div>
                        <div className='places-sponsored-desc'>18 Rue Cujas, 75005 Paris</div>
                        <div className='places-sponsored-rating'>
                          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M7.99967 1.33334L10.0597 5.50668L14.6663 6.18001L11.333 9.42668L12.1197 14.0133L7.99967 11.8467L3.87967 14.0133L4.66634 9.42668L1.33301 6.18001L5.93967 5.50668L7.99967 1.33334Z' fill='#FACC15'/>
                          </svg>
                          <span>4.9</span>
                        </div>
                      </div>
                      <div className='places-sponsored-thumb' />
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      <MapModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mediaUrl={modalMedia}
        caption={modalCaption}
        user={modalUser}
      />
    </>
  );
}

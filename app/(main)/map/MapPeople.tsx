'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapPeople.scss';

type RawUser = {
  id: string;
  name: string;
  avatar: string;
  photo: string;
  caption?: string;
  likes: number;
  lat: number;
  lng: number;
  country?: string;
  city?: string;
  friends?: boolean;
};

type Album = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  cover: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  likes: number;
  createdAt: string;
};

function formatDMY(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function isTodayOrYesterday(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return (
    d.toDateString() === today.toDateString() ||
    d.toDateString() === yesterday.toDateString()
  );
}

async function geocodePlace(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      { headers: { 'Accept-Language': 'en' } }
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } catch (err) {
    console.error('geocode failed', err);
    return null;
  }
}

export default function MapPeople({ showFriends }: { showFriends: boolean }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const albumsRef = useRef<Album[]>([]);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});
  const suppressNextViewportUpdate = useRef(false);

  // UI state
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);
  const [useViewportList, setUseViewportList] = useState(false); // <— key flag
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'country' | 'date'>('date');
	const [isSortOpen, setIsSortOpen] = useState(false);

  const sortAlbums = useCallback(
    (list: Album[], type: typeof sortBy) => {
      const arr = [...list];
      if (type === 'popular') {
        arr.sort((a, b) => b.likes - a.likes);
      } else if (type === 'country') {
        arr.sort((a, b) => (a.country || '').localeCompare(b.country || ''));
      } else {
        arr.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      }
      return arr;
    },
    [sortBy]
  );

  const updateVisibleFromViewport = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // if we just did a search, skip this auto-update once
    if (suppressNextViewportUpdate.current) {
      suppressNextViewportUpdate.current = false;
      return;
    }

    const bounds = map.getBounds();
    const inView = albumsRef.current.filter(
      (a) => bounds.contains([a.lng, a.lat]) && isTodayOrYesterday(a.createdAt)
    );
    setVisibleAlbums(sortAlbums(inView, sortBy));
    setUseViewportList(true); // now list is driven by viewport (even if empty)
  }, [sortAlbums, sortBy]);

	const createMarkersOnce = useCallback(() => {
		const map = mapRef.current;
		const mapContainer = mapContainerRef.current;
		if (!map || !mapContainer) return;

		// remove old markers
		Object.values(markersRef.current).forEach((m) => m.remove());
		markersRef.current = {};

		albumsRef.current.forEach((album) => {
			// marker (avatar)
			const el = document.createElement('div');
			el.className = 'people-marker';
			el.style.backgroundImage = `url(${album.userAvatar})`;

			// likes pill
			const likes = document.createElement('div');
			likes.className = 'people-marker-likes';
			likes.innerHTML = `
				<span class='people-marker-likes-icon'>
					<svg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M12 21s-5.5-3.2-8.5-6.7C1.6 11.6 2.1 7.4 4.9 5.4 7.2 3.7 10.1 4.3 12 6.5c1.9-2.2 4.8-2.8 7.1-1.1 2.8 2 3.3 6.2 1.4 8.9C17.5 17.8 12 21 12 21z' fill='#94A3B8'/>
					</svg>
				</span>
				<span class='people-marker-likes-num'>${album.likes}</span>
			`;
			el.appendChild(likes);

			// maplibre marker
			const marker = new maplibregl.Marker({
				element: el,
				anchor: 'bottom',
				offset: [0, 4]
			})
				.setLngLat([album.lng, album.lat])
				.addTo(map);

			// tooltip — EXACT same structure as in TravelMap
			const tooltip = document.createElement('div');
			tooltip.className = 'marker-tooltip';
			tooltip.innerHTML = `
				<div class='tooltip-card'>
					<div class='tooltip-photo' data-photo='${album.userAvatar}'></div>
					<div class='tooltip-content'>
						<div class='tooltip-title'>${album.userName}</div>
					</div>
				</div>
			`;
			(tooltip.querySelector('.tooltip-photo') as HTMLElement)?.style.setProperty(
				'--photo-url',
				`url('${album.userAvatar}')`
			);

			// put tooltip in the same container as in TravelMap
			mapContainer.appendChild(tooltip);

			// hover positioning (same idea).
			let hideTimer: number | undefined;
			const showTooltip = () => {
				const containerRect = mapContainer.getBoundingClientRect();
				const markerRect = el.getBoundingClientRect();

				// estimate tooltip size (same as in your tooltip styles)
				const tooltipWidth = 250;  // adjust if your tooltip is wider
				const tooltipHeight = 185; // adjust if your tooltip is taller

				const left =
					markerRect.left -
					containerRect.left -
					tooltipWidth / 2 +
					markerRect.width / 2;

				const top =
					markerRect.top -
					containerRect.top -
					tooltipHeight -
					14; // small gap

				tooltip.style.left = `${left}px`;
				tooltip.style.top = `${top}px`;
				tooltip.classList.add('visible');

				// add active class to marker
				el.classList.add('active');
			};
			const hideTooltip = () => {
				tooltip.classList.remove('visible');
				el.classList.remove('active');
			};

			el.addEventListener('mouseenter', () => {
				if (hideTimer) window.clearTimeout(hideTimer);
				showTooltip();
			});
			el.addEventListener('mouseleave', () => {
				hideTimer = window.setTimeout(hideTooltip, 120);
			});

			el.addEventListener('click', () => {
				window.location.href = `/users/${album.userId}`;
			});

			markersRef.current[album.id] = marker;
		});
	}, [sortAlbums, sortBy]);

  // 1) init map once
  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [12, 50],
      zoom: 0
    });

    mapRef.current = map;

    map.on('load', () => {
      const waterLayers = ['water', 'water_shadow'];
      waterLayers.forEach((l) => {
        if (map.getLayer(l)) {
          map.setPaintProperty(l, 'fill-color', '#b8dff2');
        }
      });
      // we don't call updateVisibleFromViewport here
      // because on first load we want the "all recent" list
      if (albumsRef.current.length) {
        createMarkersOnce();
      }
    });

    map.on('moveend', updateVisibleFromViewport);
    map.on('zoomend', updateVisibleFromViewport);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [createMarkersOnce, updateVisibleFromViewport]);

  // 2) load users -> build albums
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const resp = await fetch('/data/users.json');
        if (!resp.ok) return;
        const users: RawUser[] = await resp.json();
        const filtered = showFriends ? users.filter((u) => u.friends) : users;

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const albums: Album[] = filtered.map((u, idx) => {
          const createdAt =
            idx % 2 === 0 ? today.toISOString() : yesterday.toISOString();
          return {
            id: `${u.id}-album`,
            userId: u.id,
            userName: u.name,
            userAvatar: u.avatar,
            title: u.caption || `${u.name} trip`,
            cover: u.photo,
            country: u.country || '',
            city: u.city || '',
            lat: u.lat,
            lng: u.lng,
            likes: u.likes,
            createdAt
          };
        });

        albumsRef.current = albums;
        setAllAlbums(albums);

        // initial list = all recent
        const recent = albums.filter((a) => isTodayOrYesterday(a.createdAt));
        setVisibleAlbums(sortAlbums(recent, sortBy));
        setUseViewportList(false);

        if (mapRef.current) {
          createMarkersOnce();
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, [showFriends, createMarkersOnce, sortAlbums, sortBy]);

  // 3) re-sort when sortBy changes
  useEffect(() => {
    if (useViewportList) {
      // re-sort what is in the viewport
      updateVisibleFromViewport();
    } else {
      // re-sort initial list
      const recent = allAlbums.filter((a) => isTodayOrYesterday(a.createdAt));
      setVisibleAlbums(sortAlbums(recent, sortBy));
    }
  }, [sortBy, useViewportList, allAlbums, updateVisibleFromViewport, sortAlbums]);

  // --- search ---
  const handleSearch = async () => {
    const term = searchValue.trim();
    if (!term) return;

    const lc = term.toLowerCase();
    const albums = albumsRef.current;

    // 1) albums search first
    const albumsFound = albums.filter(
      (a) =>
        (a.city && a.city.toLowerCase().includes(lc)) ||
        (a.country && a.country.toLowerCase().includes(lc)) ||
        a.title.toLowerCase().includes(lc)
    );

    if (albumsFound.length > 0) {
      suppressNextViewportUpdate.current = true;
      const first = albumsFound[0];
      mapRef.current?.flyTo({
        center: [first.lng, first.lat],
        zoom: 5.4,
        essential: true
      });
      setVisibleAlbums(sortAlbums(albumsFound, sortBy));
      setUseViewportList(true);
      setIsExpanded(false);
      return;
    }

    // 2) no albums -> geocode real world place
    const geo = await geocodePlace(term);
    if (geo && mapRef.current) {
      suppressNextViewportUpdate.current = true;
      mapRef.current.flyTo({
        center: [geo.lng, geo.lat],
        zoom: 6,
        essential: true
      });
      // show empty list (because no albums there)
      setVisibleAlbums([]);
      setUseViewportList(true);
      setIsExpanded(false);
    }
  };

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
    setTimeout(() => {
      mapRef.current?.resize();
    }, 250);
  };

  const zoomIn = () => {
    if (!mapRef.current) return;
    mapRef.current.setZoom(mapRef.current.getZoom() + 1);
  };

  const zoomOut = () => {
    if (!mapRef.current) return;
    mapRef.current.setZoom(mapRef.current.getZoom() - 1);
  };

  return (
    <div className={`people-shell ${isExpanded ? 'people-shell--expanded' : ''}`}>
      {/* LEFT LIST */}
      <div className='people-list-panel'>
        <div className='people-list-header'>
          <div className='people-list-title'>Users Trips</div>
					<div className='people-sort'>
						<span className='people-sort-label'>Sort by</span>
						<div className='dropdown-header'>
							<button
								type='button'
								className='people-sort-trigger'
								onClick={() => setIsSortOpen((p) => !p)}
							>
								{sortBy === 'popular'
									? 'Most popular'
									: sortBy === 'country'
										? 'Alphabetical'
										: 'By date'}
								<span className='people-sort-caret'>▾</span>
							</button>

							{isSortOpen && (
								<div className='dropdown-menu'>
									<div
										className={`dropdown-item ${sortBy === 'popular' ? 'active' : ''}`}
										onClick={() => {
											setSortBy('popular');
											setIsSortOpen(false);
										}}
									>
										Most popular
									</div>
									<div
										className={`dropdown-item ${sortBy === 'country' ? 'active' : ''}`}
										onClick={() => {
											setSortBy('country');
											setIsSortOpen(false);
										}}
									>
										Alphabetical
									</div>
									<div
										className={`dropdown-item ${sortBy === 'date' ? 'active' : ''}`}
										onClick={() => {
											setSortBy('date');
											setIsSortOpen(false);
										}}
									>
										By date
									</div>
								</div>
							)}
						</div>
					</div>


        </div>

        <div className='people-list-scroll'>
          {visibleAlbums.map((al) => (
            <a key={al.id} href={`/albums/${al.id}`} className='people-album-card'>
              <div
                className='people-album-cover'
                style={{ backgroundImage: `url(${al.cover})` }}
              >
                {(al.country || al.city) && (
                  <div className='people-album-tag'>{al.country || al.city}</div>
                )}
              </div>
              <div className='people-album-content'>
                <div className='people-album-title'>{al.title}</div>
                <div className='people-album-date'>
                  <span className='people-album-date-icon'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.66699 6.00008H13.3337'
                        stroke='#0F172A'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M11.9997 2.66675H3.99967C3.26329 2.66675 2.66634 3.2637 2.66634 4.00008V12.0001C2.66634 12.7365 3.26329 13.3334 3.99967 13.3334H11.9997C12.736 13.3334 13.333 12.7365 13.333 12.0001V4.00008C13.333 3.2637 12.736 2.66675 11.9997 2.66675Z'
                        stroke='#0F172A'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.666 1.33325V3.33325'
                        stroke='#0F172A'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.33301 1.33325V3.33325'
                        stroke='#0F172A'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                  {formatDMY(new Date(al.createdAt))}
                </div>
              </div>
            </a>
          ))}

          {visibleAlbums.length === 0 && (
            <div className='people-empty'>No recent trips in this area.</div>
          )}
        </div>
      </div>

      {/* RIGHT MAP */}
      <div className='people-map-panel'>
        <div className='people-map-topbar'>
          <div className='people-map-search'>
            <input
              className='people-map-search-input'
              placeholder='Search for a location to see the activities'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className='people-map-search-btn' onClick={handleSearch}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.5 13C10.2614 13 12.5 10.7614 12.5 8C12.5 5.23858 10.2614 3 7.5 3C4.73858 3 2.5 5.23858 2.5 8C2.5 10.7614 4.73858 13 7.5 13Z'
                  stroke='#0F172A'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11 11L14 14'
                  stroke='#0F172A'
                  strokeWidth='1.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <div className='people-map-rightcontrols'>
            <button className='people-map-expand' onClick={handleExpandToggle}>
              {isExpanded ? (
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7.5 7.5L3.75 3.75' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M12.5 7.5L16.25 3.75' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M7.5 12.5L3.75 16.25' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M12.5 12.5L16.25 16.25' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              ) : (
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7.5 3.75H3.75V7.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M3.75 12.5V16.25H7.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M12.5 16.25H16.25V12.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                  <path d='M16.25 7.5V3.75H12.5' stroke='#0F172A' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              )}
            </button>

            <div className='people-map-zoom'>
              <button onClick={zoomIn} className='people-map-zoom-btn'>+</button>
              <button onClick={zoomOut} className='people-map-zoom-btn'>−</button>
            </div>
          </div>
        </div>

        <div ref={mapContainerRef} className='people-map-canvas' />
      </div>
    </div>
  );
}

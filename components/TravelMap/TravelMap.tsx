'use client';

import React, { useEffect, useRef } from 'react';
import type { Feature, LineString, GeoJsonProperties } from 'geojson';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './TravelMap.scss';
import '@/styles/mapTooltip.scss';

const TravelMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    const container = mapContainer.current as HTMLElement;
    interface Point {
      name: string;
      coords: [number, number]; // ✅ tuple
      img: string;
      card: {
        photo: string;
        title: string;
        date: string;
      };
    }


    map.current = new maplibregl.Map({
      container: container,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [10, 50],
      zoom: 4,
    });

    map.current.on('load', () => {
      // ✅ Custom map colors
      if (map.current?.getLayer('building')) {
        map.current.setPaintProperty('building', 'fill-color', '#f4f0e6');
      }
      if (map.current?.getLayer('background')) {
        map.current.setPaintProperty('background', 'background-color', '#faf5ee');
      }

      const waterLayers = ['water', 'water_shadow'];
      waterLayers.forEach((layer) => {
        if (map.current?.getLayer(layer)) {
          map.current.setPaintProperty(layer, 'fill-color', '#b8dff2');
        }
      });

      if (map.current?.getLayer('boundary_state')) {
        map.current.setPaintProperty('boundary_state', 'line-color', '#272a2d');
      }
      if (map.current?.getLayer('boundary_country_outline')) {
        map.current.setPaintProperty('boundary_country_outline', 'line-color', '#272a2d');
      }

      // ✅ City points with tooltip info
      const points = [
        {
          name: 'Hamburg',
          coords: [10, 53.55],
          img: '/icons/hamburg.jpg',
          card: {
            photo: '/icons/hamburg.jpg',
            title: 'Hamburg by the Harbor',
            date: '02.05.2025',
          },
        },
        {
          name: 'Paris',
          coords: [2.35, 48.85],
          img: '/icons/paris.jpg',
          card: {
            photo: '/icons/paris.jpg',
            title: 'Paris in Little Moments',
            date: '13.05.2025',
          },
        },
        {
          name: 'Zagreb',
          coords: [15.98, 45.81],
          img: '/icons/zagreb.jpg',
          card: {
            photo: '/icons/zagreb.jpg',
            title: 'Old Town Charm',
            date: '20.04.2025',
          },
        },
      ];

      // ✅ Generate smooth Bézier curves
      function generateBezierCurve(
        start: [number, number],
        end: [number, number],
        curvature = 0.2,
        numPoints = 80
      ): [number, number][] {
        const [lon1, lat1] = start;
        const [lon2, lat2] = end;
        const curveOffset = curvature * Math.hypot(lon2 - lon1, lat2 - lat1);
        const midLon = (lon1 + lon2) / 2;
        const midLat = (lat1 + lat2) / 2 + curveOffset;

        const coords: [number, number][] = [];
        for (let t = 0; t <= 1; t += 1 / numPoints) {
          const lon =
            (1 - t) ** 2 * lon1 + 2 * (1 - t) * t * midLon + t ** 2 * lon2;
          const lat =
            (1 - t) ** 2 * lat1 + 2 * (1 - t) * t * midLat + t ** 2 * lat2;
          coords.push([lon, lat]);
        }
        return coords;
      }

      const curvedSegments: [number, number][] = [];
      for (let i = 0; i < points.length - 1; i++) {
        curvedSegments.push(
          ...generateBezierCurve(
            points[i].coords as [number, number],
            points[i + 1].coords as [number, number],
            0.25
          )
        );
      }

      const route: Feature<LineString, GeoJsonProperties> = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: curvedSegments,
        },
        properties: {}, // ✅ required by the GeoJSON spec
      };

      map.current?.addSource('route', { type: 'geojson', data: route });
      map.current?.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#F83F3F',
          'line-width': 3,
          'line-dasharray': [0.5, 2.5],
        },
      });

      // ✅ Add circular photo markers with hover tooltips
      points.forEach((point) => {
        const el = document.createElement('div');
        el.className = 'photo-marker';
        el.style.backgroundImage = `url(${point.img})`;

        const tooltip = document.createElement('div');
        tooltip.className = 'marker-tooltip';
        tooltip.innerHTML = `
          <div class='tooltip-card'>
            <div class='tooltip-photo' data-photo='${point.card.photo}'></div>
            <div class='tooltip-content'>
              <div class='tooltip-city'>${point.name}</div>
              <div class='tooltip-title'>${point.card.title}</div>
              <div class='tooltip-date'>
                <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'><path d='M11 1H9.5V0.5C9.5 0.367392 9.44732 0.240215 9.35355 0.146447C9.25979 0.0526784 9.13261 0 9 0C8.86739 0 8.74021 0.0526784 8.64645 0.146447C8.55268 0.240215 8.5 0.367392 8.5 0.5V1H3.5V0.5C3.5 0.367392 3.44732 0.240215 3.35355 0.146447C3.25979 0.0526784 3.13261 0 3 0C2.86739 0 2.74021 0.0526784 2.64645 0.146447C2.55268 0.240215 2.5 0.367392 2.5 0.5V1H1C0.734784 1 0.48043 1.10536 0.292893 1.29289C0.105357 1.48043 0 1.73478 0 2V12C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H11C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1ZM2.5 2V2.5C2.5 2.63261 2.55268 2.75979 2.64645 2.85355C2.74021 2.94732 2.86739 3 3 3C3.13261 3 3.25979 2.94732 3.35355 2.85355C3.44732 2.75979 3.5 2.63261 3.5 2.5V2H8.5V2.5C8.5 2.63261 8.55268 2.75979 8.64645 2.85355C8.74021 2.94732 8.86739 3 9 3C9.13261 3 9.25979 2.94732 9.35355 2.85355C9.44732 2.75979 9.5 2.63261 9.5 2.5V2H11V4H1V2H2.5ZM11 12H1V5H11V12Z' fill='#475569'/></svg>
                <span>${point.card.date}</span>
                <span class='tooltip-link' href='/albums'></span>
              </div>
            </div>
          </div>
        `;
        (tooltip.querySelector('.tooltip-photo') as HTMLElement)?.style.setProperty(
          '--photo-url',
          `url('${point.card.photo}')`
        );

        el.addEventListener('click', () => {
          window.location.href = '/albums'
        })

        mapContainer.current?.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
          const pixel = map.current?.project(point.coords as [number, number]);
          if (!pixel) return;
          tooltip.style.left = `${pixel.x - 125}px`;
          tooltip.style.top = `${pixel.y - 235}px`;
          tooltip.classList.add('visible');
          el.classList.add('active');
        });
        el.addEventListener('mouseleave', (e) => {
          tooltip.classList.remove('visible');
          el.classList.remove('active');
        });

        new maplibregl.Marker({ element: el })
          .setLngLat(point.coords as [number, number])
          .addTo(map.current!);

      });

      // ✅ Fullscreen button
      const fsControl = document.createElement('div');
      fsControl.className = 'fullscreen-btn';
      fsControl.innerHTML = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill='none'
             stroke='#1e293b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <polyline points='15 3 21 3 21 9'></polyline>
          <polyline points='9 21 3 21 3 15'></polyline>
          <line x1='21' y1='3' x2='14' y2='10'></line>
          <line x1='3' y1='21' x2='10' y2='14'></line>
        </svg>`;
      fsControl.onclick = () => {
        const el = mapContainer.current;
        if (!document.fullscreenElement) el?.requestFullscreen();
        else document.exitFullscreen();
      };
      mapContainer.current?.appendChild(fsControl);
    });
  }, []);

  return <div ref={mapContainer} className='wrapper travel-map-container section-to-fade' />;
};

export default TravelMap;

'use client';

import React from 'react';
import '@/components/Insights/DestinationsStats.scss';

export default function DestinationsStats() {
  const gapDeg = 6; // space between arcs (in degrees)
  const ringRadius = 88; // radius of the ring in px
  const ringWidth = 4; // stroke width
  const globeSize = 160; // globe diameter
  const ringSize = (ringRadius + ringWidth) * 2; // svg viewBox size

  const continents = [
    { name: 'Asia', percent: 64, color: 'var(--asia-color)' },
    { name: 'Africa', percent: 12, color: 'var(--africa-color)' },
    { name: 'Europe', percent: 8, color: 'var(--europe-color)' },
    { name: 'South America', percent: 5, color: 'var(--southamerica-color)' },
    { name: 'North America', percent: 6, color: 'var(--northamerica-color)' },
    { name: 'Australia', percent: 3, color: 'var(--australia-color)' },
    { name: 'Antarctica', percent: 2, color: 'var(--antarctica-color)' },
  ];

  let cumulative = 0;

  const toRadians = (deg: number): number => (deg * Math.PI) / 180;

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = {
      x: x + radius * Math.cos(toRadians(startAngle)),
      y: y + radius * Math.sin(toRadians(startAngle)),
    };
    const end = {
      x: x + radius * Math.cos(toRadians(endAngle)),
      y: y + radius * Math.sin(toRadians(endAngle)),
    };
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className='destinations-card'>
      <div className='header'>
        <h3>Destinations</h3>
      </div>

      <div className='globe-wrapper'>
        <div className='globe-container'>
          <img
            src='/images/globe.svg'
            alt='Globe'
            className='globe-image'
            style={{
              width: `${globeSize}px`,
              height: `${globeSize}px`,
            }}
          />

          <svg
            className='globe-ring'
            width={ringSize}
            height={ringSize}
            viewBox={`0 0 ${ringSize} ${ringSize}`}
          >
            {continents.map((c, i) => {
              const startAngle = (cumulative / 100) * 360;
              const endAngle = ((cumulative + c.percent) / 100) * 360 - gapDeg;
              cumulative += c.percent;

              return (
                <path
                  key={i}
                  d={describeArc(ringSize / 2, ringSize / 2, ringRadius, startAngle, endAngle)}
                  stroke={c.color}
                  strokeWidth={ringWidth}
                  strokeLinecap='round'
                  fill='none'
                />
              );
            })}
          </svg>
        </div>

        <div className='continents-list'>
          {continents.map((c) => (
            <div className='continent-item' key={c.name}>
              <span className='dot' style={{ backgroundColor: c.color }}></span>
              <span className='label'>
                {c.name} <span className='percent'>{c.percent}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

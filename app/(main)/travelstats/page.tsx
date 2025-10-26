'use client';

import React, { ReactElement } from 'react';
import Link from 'next/link';
import '@/styles/TravelStats.scss';

interface TravelStat {
  icon: string;
  label: string;
  value?: string;
  subIcon?: string;
  subIconClassName?: string;
  isFull?: boolean;          // full-width row
  isMulti?: boolean;         // shows multiple avatars or companion data
  isTags?: boolean;          // value contains tag-style chips
  tags?: string[];           // list of tag strings
  companions?: string[];     // array of avatar image URLs
  companionText?: string;    // top line text
  companionSubText?: string; // "Top 3 companions" line
}

export default function TravelStatsPage(): ReactElement {
  const stats: TravelStat[] = [
    // Compact stats
    { icon: '/icons/current-residence.svg', label: 'Current Residence', value: 'Barcelona, Spain' },
    { icon: '/icons/travel-status.svg', label: 'Travel Status', value: 'Planning next trip', subIcon: '/icons/search.png', subIconClassName: 'planning-next-trip-icon' },
    { icon: '/icons/next-planned-destination.svg', label: 'Next Planned Destination', value: 'Morocco (February 2025)' },
    { icon: '/icons/globe.svg', label: 'Countries Visited', value: '118' },
    { icon: '/icons/cities-visited.svg', label: 'Cities Visited', value: '243' },
    { icon: '/icons/aeroplane.svg', label: 'Total Flights', value: '734' },
    { icon: '/icons/train-journeys.svg', label: 'Train Journeys', value: '428' },
    { icon: '/icons/reception-bell.svg', label: 'Hotels Stayed', value: '945' },
    { icon: '/icons/sights-visited.svg', label: 'Sights Visited', value: '2167' },
    { icon: '/icons/sparkles.svg', label: 'Wonders of the World Visited', value: '2/7' },
    { icon: '/icons/museums-visited.svg', label: 'Museums Visited', value: '934' },

    // Full-width: Travel Companion
    {
      icon: '/icons/travel-companion.svg',
      label: 'Travel Companion',
      isFull: true,
      isMulti: true,
      companionText: 'With friends 47%',
      companionSubText: 'Top 3 companions',
      companions: [
        '/images/LiliEdwards.png',
        '/images/CodyFisher.png',
        '/images/GuyHawkins.png',
      ],
    },

    // Full-width: Languages
    {
      icon: '/icons/languages-spoken.svg',
      label: 'Languages Spoken',
      value: 'Korean, English, Japanese',
      isFull: true,
    },

    // Full-width: Interests (tags)
    {
      icon: '/icons/travel-interests.svg',
      label: 'Travel Interests',
      isFull: true,
      isTags: true,
      tags: ['📖 History', '🗼 Architecture', '🍷 Wine', '🎨 Art'],
    },

    // The rest (all full-width)
    { icon: '/icons/travel-style.svg', label: 'Travel Style', value: 'Cultural immersion', isFull: true },
    { icon: '/icons/travel-frequency.svg', label: 'Travel Frequency', value: 'Every 6–8 weeks', isFull: true },
    { icon: '/icons/favorite-destination.svg', label: 'Favorite Destination', value: 'Singapore', isFull: true },
    { icon: '/icons/preferred-transport.svg', label: 'Preferred Transport', value: 'Trains 55%', isFull: true },
    { icon: '/icons/bucket-list.svg', label: 'Bucket List', value: 'New Zealand', isFull: true },
    { icon: '/icons/booking-style.svg', label: 'Booking Style', value: 'Mix (some spontaneous)', isFull: true },
    { icon: '/icons/favorite-airline.svg', label: 'Favorite Airline', value: 'Lufthansa (Star Alliance)', isFull: true },
  ];

  return (
    <div className='wrapper travel-stats-page page-wrapper-card'>
      <Link className='page-back-link' href='/insights'>
        <img src='/icons/arrow-left.svg' alt='Back' />
        <h2 className='page-title'>Travel Stats</h2>
      </Link>

      <div className='travel-stats-inner'>
        <div className='travel-stats-grid'>
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`travel-stats-row ${item.isFull ? ' full' : ''}`}
            >
              {/* Left side — icon + label */}
              <div className='travel-stats-label'>
                <img src={item.icon} alt={item.label} className='travel-stats-icon' />
                <span>{item.label}</span>
              </div>

              {/* Right side — value / multi / tags */}
              <div className={`travel-stats-value ${item.isTags ? ' tags' : ''} ${item.isMulti ? ' multi' : ''}`}>
                {/* Subicon (like search icon) */}
                {item.subIcon && (
                  <span
                    className={`subicon ${item.subIconClassName ? item.subIconClassName : ''}`}
                  >
                    <img src={item.subIcon} alt='status' />
                  </span>
                )}

                {/* Regular text value */}
                {item.value && !item.isMulti && !item.isTags && <span>{item.value}</span>}

                {/* Multi (companions) */}
                {item.isMulti && item.companions && (
                  <>
                    <span>{item.companionText}</span>
                    <div className='companions'>
                      <span>{item.companionSubText}</span>
                      <div className='travel-stats-avatars'>
                        {item.companions.map((avatar, i) => (
                          <img key={i} src={avatar} alt={`companion-${i}`} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Tags */}
                {item.isTags && item.tags && (
                  <>
                    {item.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

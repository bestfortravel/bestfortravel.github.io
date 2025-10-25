'use client';

import React from 'react';
import '@/components/Insights/RecentTrips.scss';

interface Trip {
  img: string;
  title: string;
  date: string;
  tags: string[];
}

export default function RecentTrips() {
  const trips: Trip[] = [
    {
      img: '/images/tokyo.jpg',
      title: 'Tokyo, Japan',
      date: 'Dec 15–22, 2024',
      tags: ['7 days', 'Solo', 'Culture'],
    },
    {
      img: '/images/seoul.jpg',
      title: 'Seoul, South Korea',
      date: 'Nov 8–15, 2024',
      tags: ['7 days', 'Friends', 'Photography'],
    },
    {
      img: '/images/singapore.jpg',
      title: 'Singapore',
      date: 'Oct 20–24, 2024',
      tags: ['5 days', 'Business', 'Conference'],
    },
    {
      img: '/images/amsterdam.jpg',
      title: 'Amsterdam, Netherlands',
      date: 'Aug 5–12, 2024',
      tags: ['7 days', 'Friends', 'Leisure'],
    },
  ];

  return (
    <div className='recent-trips-card section-to-fade'>
      <div className='header'>
        <h3>Recent Trips</h3>
      </div>

      <div className='trip-list'>
        {trips.map((trip, i) => (
          <React.Fragment key={trip.title}>
            <div className='trip-item'>
              <div className='trip-left'>
                <img src={trip.img} alt={trip.title} className='trip-image' />
                <div className='trip-info'>
                  <h4 className='trip-title'>{trip.title}</h4>
                  <p className='trip-date'>{trip.date}</p>
                </div>
              </div>

              <div className='trip-tags'>
                {trip.tags.map((tag) => (
                  <span key={tag} className='tag'>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {i < trips.length - 1 && <div className='divider' />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import './Recommendations.scss';

import Button from '@/components/Button/Button';
import ButtonArrow from '@/components/ButtonArrow/ButtonArrow';

export default function Recommendations() {
  const recommendations = [
    {
      id: 1,
      name: 'Ralph Edwards',
      location: 'Paris, France',
      avatar: '/images/RalphEdwards.png',
      description:
        'On a mission to explore every corner of the world — and share the beauty I find along the way.',
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      location: 'Tokyo, Japan',
      avatar: '/images/GuyHawkins.png',
      description:
        'Solo traveler with a passion for nature, culture, and meaningful stories. 27 countries and counting.',
    },
    {
      id: 3,
      name: 'Brooklyn Simmons',
      location: 'Rio de Janeiro, Brazil',
      avatar: '/images/BrooklynSimmons.png',
      description:
        'Collecting memories across continents. Always chasing sunsets, new flavors, and kind strangers.',
    },
    {
      id: 4,
      name: 'Lili Edwards',
      location: 'Paris, France',
      avatar: '/images/LiliEdwards.png',
      description:
        'On a mission to explore every corner of the world — and share the beauty I find along the way.',
    },
  ];

  return (
    <div className='wrapper recommendations-container'>
      <div className='recommendations-header'>
        <h2 className='recommendations-title'>
          Other travellers you might be interested in
        </h2>
        <ButtonArrow>See more recommendations</ButtonArrow>
      </div>

      <div className='recommendations-grid'>
        {recommendations.map((person) => (
          <div key={person.id} className='recommendation-card'>
            <div className='card-user-info'>
              <img
                src={person.avatar}
                alt={`${person.name} avatar`}
                className='user-avatar-image'
              />
              <div className='user-info'>
                <h3 className='user-name'>{person.name}</h3>
                <p className='user-location'>
                  📍 Currently in{' '}
                  <span className='location-highlight'>{person.location}</span>
                </p>
              </div>
            </div>

            <div className='card-content'>
              <p className='user-description'>{person.description}</p>
              <Button color='primary' className='add-button'>Add</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

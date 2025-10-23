'use client';

import React from 'react';
import './ProfileBanner.scss';
import Button from '@/components/Button/Button';

export default function ProfileBanner() {
  return (
    <div className='wrapper profile-container'>
      <div className='profile-background'>
        <img
          className='profile-background-image'
          src='/images/profileBackground.png'
          alt='profile background'
        />
      </div>

      <div className='profile-content'>
        {/* === Avatar Section === */}
        <div className='avatar-container'>
          <div className='avatar-wrapper'>
            <img className='avatar-image' src='/images/avatar.png' alt='avatar' />
          </div>
          <div className='status-emoji'>
            <div className='emoji-text'>✈️</div>
          </div>
        </div>

        {/* === Profile Info === */}
        <div className='profile-info'>
          <div className='user-details'>
            <div className='user-name'>Leslie Alexander 🥇</div>

            <div className='location-row'>
              <div className='location-text'>
                <span className='location-prefix'>📍 Currently in the </span>
                <span className='location-highlight'>South of France</span>
              </div>

              <div className='joined-badge'>
                <svg
                  className='calendar-icon'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.33329 3.1665V5.49984M10.6666 3.1665V5.49984M5.16663 7.1665H10.8333M4.49996 12.8332H11.5C12.2363 12.8332 12.8333 12.2362 12.8333 11.4998V5.83317C12.8333 5.09679 12.2363 4.49984 11.5 4.49984H4.49996C3.76358 4.49984 3.16663 5.09679 3.16663 5.83317V11.4998C3.16663 12.2362 3.76358 12.8332 4.49996 12.8332Z'
                    stroke='#0075AD'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <div className='badge-content'>
                  <div className='badge-label'>Joined in 2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* === Buttons === */}
          <div className='profile-actions'>
            <Button color='secondary'>Message</Button>
            <Button color='primary'>Follow</Button>
          </div>

          {/* === Bio + Stats === */}
          <div className='description-section'>
            <div className='bio-text'>
              Wandering the world one city at a time. Lover of local food, hidden gems, and slow
              mornings in new places.
            </div>

            <div className='stats-row'>
              {[
                { number: 55, label: 'Countries' },
                { number: 100, label: 'Cities' },
                { number: 333, label: 'Sights' },
                { number: 500, label: 'Stays' },
              ].map((stat, index) => (
                <div key={index} className='stat-item'>
                  <span className='stat-number'>{stat.number}</span>
                  <span className='stat-label'>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import '@/components/Insights/InsightsHeader.scss';

interface User {
  name: string;
  avatar: string;
  flag: string;
  country: string;
  age: number;
  badges: string[];
}

interface TravelStat {
  icon: string;
  value: string | number;
  label: string;
}

interface Props {
  user: User;
  travelStats: TravelStat[];
}

export default function InsightsHeader({ user, travelStats }: Props) {
  return (
    <>
      <Link className='page-back-link' href='/profile'>
        <img src='/icons/arrow-left.svg' alt='Back' />
        <h2 className='page-title'>Insights</h2>
      </Link>

      <div className='insights-header-container section-to-fade'>
        <div className='header-left'>
          <div className='user-info'>
            <div className='avatar-wrapper'>
              <img src={user.avatar} alt={user.name} className='avatar' />
              <button className='avatar-emoji'>
                <img src='/icons/search.png' alt='Looking for a companion' />
              </button>
            </div>

            <div className='user-details'>
              <h2>{user.name}</h2>
              <p>
                <span className='flag'>{user.flag}</span> {user.country} · {user.age} years old
              </p>

              <div className='badges'>
                {user.badges.map((badge, index) => (
                  <img key={index} src={badge} alt={`Badge ${index}`} className='badge' />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='header-right'>
          <div className='insights-stats'>
            {travelStats.map((stat, index) => (
              <div key={index} className='insights-stat-item'>
                <img src={stat.icon} alt={stat.label} className='stat-icon' />
                <div className='stat-text'>
                  <span className='value'>{stat.value}</span>
                  <span className='label'>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

        	<Link className='next-button' href='/travelstats'>
            <img src='/icons/arrow-right.svg' alt='Next' />
          </Link>
        </div>
      </div>
    </>
  );
}

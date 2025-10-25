import React from 'react';
import './ProfileInsights.scss';
import Link from 'next/link';

interface ProfileInsightsProps {
  visitedCountries: number;
  nextRankAt: number;
  insights: {
    countries: number;
    cities: number;
    trips: number;
    flights: number;
    nights: number;
    photos: number;
  };
}

export default function ProfileInsights({
  visitedCountries,
  nextRankAt,
  insights,
}: ProfileInsightsProps) {
  const progress = (visitedCountries / nextRankAt) * 100;

  const insightsArray = [
    { value: insights.countries, label: 'Countries' },
    { value: insights.cities, label: 'Cities' },
    { value: insights.trips, label: 'Trips' },
    { value: insights.flights, label: 'Flights' },
    { value: insights.nights, label: 'Nights' },
    { value: insights.photos, label: 'Photos' },
  ];

  return (
    <div className='wrapper profile-insights section-to-fade'>
      <div className='insights-left'>
        <img
          src='/icons/badge-green.svg'
          alt='Rank Badge Green'
          className='rank-badge'
        />
        <div className='rank-info'>
          <h3>You have visited {visitedCountries} countries</h3>
          <p>
            Visit {nextRankAt - visitedCountries} more countries to get{' '}
            <span className='highlight'>Explorer Rank</span>
          </p>
          <div className='progress-bar'>
            <div className='progress-fill' style={{ width: `${progress}%` }} />
          </div>
        </div>
        <img
          src='/icons/badge-blue.svg'
          alt='Rank Badge Blue'
          className='rank-badge'
        />
      </div>

      <div className='insights-right'>
        <div className='insights-grid'>
          {insightsArray.map((item, i) => (
            <div key={i} className='insight-item'>
              <div className='insight-value'>{item.value}</div>
              <div className='insight-label'>{item.label}</div>
            </div>
          ))}
        </div>
        <Link className='view-all-button' href='/insights'>
          <div className='arrow'>
            <img src='/icons/arrow-right.svg' alt='More' />
          </div>
        </Link>
      </div>
    </div>
  );
}

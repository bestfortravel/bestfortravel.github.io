import React from 'react'
import './ProfileInsights.scss'
import { Link } from 'react-router-dom'

export default function ProfileInsights() {
  const insights = [
    { value: 24, label: 'Countries' },
    { value: 67, label: 'Cities' },
    { value: 45, label: 'Trips' },
    { value: 42, label: 'Flights' },
    { value: 234, label: 'Nights' },
    { value: 1247, label: 'Photos' },
  ]

  const visitedCountries = 9
  const nextRankAt = 15
  const progress = (visitedCountries / nextRankAt) * 100

  return (
    <div className='wrapper profile-insights'>
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
          {insights.map((item, i) => (
            <div key={i} className='insight-item'>
              <div className='insight-value'>{item.value}</div>
              <div className='insight-label'>{item.label}</div>
            </div>
          ))}
        </div>
        <Link className='view-all-button' to='/insights'>
          <div className='arrow'>
            <img src='/icons/arrow-right.svg' alt='More' />
          </div>
        </Link>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import './InsightsHeader.scss'

export default function InsightsHeader({ user, travelStats }) {
  return (
    <>
    <Link className='page-back-link' to='/profile'>
        <img src='/icons/arrow-left.svg' alt='Back' />
        <h2 className='page-title'>Insights</h2>
    </Link>
    <div className='insights-header-container'>
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

			<button className='next-button'>
				<img src='/icons/arrow-right.svg' alt='Next' />
			</button>
    </div>
    </div>
    </>
  )
}

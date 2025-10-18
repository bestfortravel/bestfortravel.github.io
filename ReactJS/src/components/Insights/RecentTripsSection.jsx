import React from 'react'
import RecentTrips from './RecentTrips'
import DestinationsStats from './DestinationsStats'
import './RecentTripsSection.scss'

export default function RecentTripsSection() {
  return (
    <div className="recent-trips-section">
      <RecentTrips />
      <DestinationsStats />
    </div>
  )
}

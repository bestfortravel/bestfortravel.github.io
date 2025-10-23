'use client';

import React from 'react';
import '@/components/Insights/RecentTripsSection.scss';
import RecentTrips from '@/components/Insights/RecentTrips';
import DestinationsStats from '@/components/Insights/DestinationsStats';

export default function RecentTripsSection() {
  return (
    <div className='recent-trips-section'>
      <RecentTrips />
      <DestinationsStats />
    </div>
  );
}

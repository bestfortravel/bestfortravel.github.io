'use client';

import React from 'react';
import '@/styles/Insights.scss';
import '@/styles/dropdown.scss';

import InsightsHeader from '@/components/Insights/InsightsHeader';
import TravelCharts from '@/components/Insights/TravelCharts';
import RecentTripsSection from '@/components/Insights/RecentTripsSection';
import CountriesCitiesSection from '@/components/Insights/CountriesCitiesSection';
import TravelInsightsAchievementsSection from '@/components/Insights/TravelInsightsAchievementsSection';

export default function InsightsPage() {
  const user = {
    name: 'Ralph Edwards',
    avatar: '/images/avatar.png',
    flag: '🇪🇸',
    country: 'Spain',
    age: 28,
    badges: [
      '/icons/badge1.svg',
      '/icons/badge2.svg',
      '/icons/badge3.svg',
      '/icons/badge4.svg',
      '/icons/badge5.svg',
    ],
  };

  const travelStats = [
    { icon: '/icons/globe.svg', value: '24', label: 'Countries' },
    { icon: '/icons/building.svg', value: '67', label: 'Cities' },
    { icon: '/icons/baggage-claim.svg', value: '45', label: 'Trips' },
    { icon: '/icons/aeroplane.svg', value: '42', label: 'Flights' },
    { icon: '/icons/reception-bell.svg', value: '234', label: 'Nights' },
    { icon: '/icons/image.svg', value: '1247', label: 'Photos' },
  ];

  const countries = [
    { flag: '🇦🇺', name: 'Australia', cities: '3 cities', visits: '2 visits', lastVisit: 'Dec 2023' },
    { flag: '🇨🇦', name: 'Canada', cities: '2 cities', visits: '1 visit', lastVisit: 'Jan 2024' },
    { flag: '🇨🇳', name: 'China', cities: '4 cities', visits: '3 visits', lastVisit: 'May 2022' },
    { flag: '🇫🇷', name: 'France', cities: '5 cities', visits: '4 visits', lastVisit: 'Sep 2023' },
  ];

  const cities = [
    {
      name: 'Tokyo, Japan',
      flag: '🇯🇵',
      image: '/images/Japan.png',
      date: 'Dec 15–22, 2024',
      badges: ['7 days', 'Solo', 'Culture'],
      visits: 3,
    },
    {
      name: 'Seoul, South Korea',
      flag: '🇰🇷',
      image: '/images/PostImage1.png',
      date: 'Nov 8–15, 2024',
      badges: ['7 days', 'Friends', 'Photography'],
      visits: 2,
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      image: '/images/PostImage2.png',
      date: 'Oct 20–24, 2024',
      badges: ['5 days', 'Business', 'Conference'],
      visits: 1,
    },
    {
      name: 'Amsterdam, Netherlands',
      flag: '🇳🇱',
      image: '/images/PostImage3.png',
      date: 'Aug 5–12, 2024',
      badges: ['7 days', 'Friends', 'Leisure'],
      visits: 4,
    },
  ];

  const achievements = [
    { icon: '/icons/badge-gold.svg', title: 'Globe Trotter Earned', description: '20+ countries visited', status: 'Earned' },
    { icon: '/icons/badge-blue.svg', title: 'City Explorer Earned', description: '50+ cities visited', status: 'Earned' },
    { icon: '/icons/badge5.svg', title: 'Frequent Flyer Earned', description: '75+ flights taken', status: 'Earned' },
    { icon: '/icons/badge4.svg', title: 'Adventure Seeker', description: '10+ outdoor activities', status: 'Earned' },
  ];

  const travelInsights = [
    { emoji: '🧳', title: 'Peak Travel Season', description: 'You travel most in summer months (June–August)' },
    { emoji: '🌏️', title: 'Favorite Region', description: 'Asia accounts for 40% of your trips' },
    { emoji: '✈️', title: 'Frequent Flyer', description: 'You fly 65% more than average travelers' },
    { emoji: '👥', title: 'Travel Buddy', description: 'You prefer traveling with friends (45% of trips)' },
  ];

  return (
    <div className='wrapper-full-width insights-container'>
      <div className='insights-content'>
        <InsightsHeader user={user} travelStats={travelStats} />
        <TravelCharts />
        <RecentTripsSection />
        <CountriesCitiesSection countries={countries} cities={cities} />
        <TravelInsightsAchievementsSection insights={travelInsights} achievements={achievements} />
      </div>
    </div>
  );
}

'use client';

import React from 'react';
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
  const progress = Math.min(100, (visitedCountries / nextRankAt) * 100);

  const insightsArray = [
    { value: insights.countries, label: 'Countries' },
    { value: insights.cities, label: 'Cities' },
    { value: insights.trips, label: 'Trips' },
    { value: insights.flights, label: 'Flights' },
    { value: insights.nights, label: 'Nights' },
    { value: insights.photos, label: 'Photos' },
  ];

  return (
    <div
      className='wrapper section-to-fade
                 flex flex-wrap items-center justify-between gap-16
                 bg-white rounded-[32px] shadow-[0_0_120px_rgba(71,85,105,0.07)]
                 px-6 py-6
                 max-[900px]:flex-col max-[600px]:px-5'
    >
      {/* left */}
      <div className='flex items-center gap-4 flex-1 max-w-[334px]'>
        <img src='/icons/badge-green.svg' alt='Rank Badge Green' className='w-12 h-12' />

        <div className='whitespace-nowrap max-[480px]:whitespace-normal'>
          <h3 className='text-[#1E293B] text-[16px] font-semibold leading-5 m-0'>
            You have visited {visitedCountries} countries
          </h3>
          <p className='text-[#475569] text-[10px] leading-[22px] m-0 text-left'>
            Visit {nextRankAt - visitedCountries} more countries to get{' '}
            <span className='text-[#475569] font-semibold'>Explorer Rank</span>
          </p>
          <div className='w-full h-[5px] bg-[#E5E7EB] rounded-[3px] mt-[6px] overflow-hidden'>
            <div
              className='h-full bg-[#2563EB] transition-[width] duration-400'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <img src='/icons/badge-blue.svg' alt='Rank Badge Blue' className='w-12 h-12' />
      </div>

      {/* right */}
      <div
        className='flex items-center gap-4 justify-around
                   w-[calc(100%-398px)]
                   max-[1024px]:w-[calc(100%-360px)]
                   max-[900px]:w-[70%]
                   max-[700px]:w-[90%]
                   max-[600px]:w-full max-[600px]:gap-2'
      >
        <div
          className='flex items-center justify-around w-[calc(100%-40px)]
                     max-[500px]:gap-0'
        >
          {insightsArray.map((item, i) => (
            <div key={i} className='text-center px-4 min-w-[83px] max-[1024px]:px-0 max-[1024px]:min-w-[64px]'>
              <div className='text-[#1E293B] text-[16px] font-semibold leading-5'>
                {item.value}
              </div>
              <div className='text-[#475569] text-[14px] leading-[22px]'>{item.label}</div>
            </div>
          ))}
        </div>

        <Link href='/insights' className='shrink-0'>
          <div className='w-5 h-5 transition-transform duration-150 hover:scale-110'>
            <img src='/icons/arrow-right.svg' alt='More' className='w-5 h-5' />
          </div>
        </Link>
      </div>
    </div>
  );
}

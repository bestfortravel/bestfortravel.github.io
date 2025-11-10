'use client';

import React from 'react';
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
    <div
      className='wrapper section-to-fade
                 flex flex-col gap-8
                 bg-white rounded-[32px]
                 shadow-[0_0_120px_rgba(71,85,105,0.07)]
                 px-8 py-8 mb-4
                 max-[991px]:px-5 max-[991px]:py-6 max-[640px]:px-4 max-[640px]:rounded-[24px]'
    >
      {/* header */}
      <div
        className='flex w-full max-w-[1328px] items-center justify-between gap-10 flex-wrap
                   max-[991px]:items-start max-[991px]:gap-4'
      >
        <h2 className='text-[#1E293B] text-[24px] font-semibold m-0 max-[991px]:text-[20px] max-[640px]:text-[18px]'>
          Other travellers you might be interested in
        </h2>
        <ButtonArrow>See more recommendations</ButtonArrow>
      </div>

      {/* cards */}
      <div
        className='flex w-full items-center justify-start gap-3
                   max-[991px]:flex-nowrap max-[991px]:overflow-x-auto max-[991px]:scroll-smooth
                   max-[991px]:[scroll-snap-type:x_mandatory]
                   max-[991px]:[&::-webkit-scrollbar]:hidden'
      >
        {/* padding “spacers” for mobile like before */}
        <div className='hidden max-[991px]:block flex-[0_0_20px]' />
        {recommendations.map((person) => (
          <div
            key={person.id}
            className='border border-[#E2E8F0] rounded-[24px]
                       transition duration-200 ease-out
                       px-6 py-5
                       w-[calc((100%-60px)/4)] max-w-[300px]
                       hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]
                       max-[991px]:flex-[0_0_80%] max-[991px]:min-w-[260px] max-[991px]:px-5 max-[991px]:py-4
                       max-[768px]:w-full max-[768px]:max-w-[400px] max-[640px]:w-[260px] max-[640px]:max-w-[260px]
                       [scroll-snap-align:start]'
          >
            <div className='flex flex-col items-center'>
              <img
                src={person.avatar}
                alt={`${person.name} avatar`}
                className='w-[60px] h-[60px] rounded-full object-cover'
              />
              <div className='flex flex-col items-center justify-start mt-3'>
                <h3 className='text-[#1E293B] text-[18px] font-semibold leading-[2] m-0 max-[640px]:text-[16px]'>
                  {person.name}
                </h3>
                <p
                  className='text-[#475569] text-[12px] leading-[2] mt-[6px] text-center
                             line-clamp-1'
                >
                  📍 Currently in <span className='font-medium'>{person.location}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-col items-stretch text-center justify-start mt-6 max-[640px]:mt-5'>
              <p
                className='text-[#1E293B] text-[14px] leading-[22px] m-0
                           line-clamp-2 max-[640px]:text-[13px] max-[640px]:leading-5'
              >
                {person.description}
              </p>
              <Button color='primary' className='self-center mt-4'>
                Add
              </Button>
            </div>
          </div>
        ))}
        <div className='hidden max-[991px]:block flex-[0_0_20px]' />
      </div>
    </div>
  );
}

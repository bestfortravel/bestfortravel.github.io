'use client';

import React from 'react';

export default function InterestsSection() {
  const interestsBadges: string[] = [
    '🎵 Music & Concerts',
    '🎬 Movies & Filming Locations',
    '🏯 History & Temples',
    '🍣 Food & Culinary Tours',
    '🛍️ Shopping & Fashion',
    '🌸 Nature & Parks',
    '🎨 Art & Museums',
    '+241',
  ];

  const movieBadges: string[] = [
    "Harry Potter and the Philosopher's Stone (2001)",
    'The Wolf of Wall Street (2013)',
    'Ottolenghi and the Cakes of Versailles (2020)',
    'Bill & Ted Face the Music (2020)',
    '+1654',
  ];

  const musicBadges: string[] = [
    'Rock',
    'Metalica',
    'Hip-Hop',
    'Jay-Z',
    'Latino',
    'Eza',
    'Ty Dollar Sign',
    'Tyler the Creator',
    'Marlon Craft',
    'Curren$y',
    'Japanese',
    'Space vibes',
    'City Pop',
    'Lofi bests',
    '+144',
  ];

  const renderBadges = (badges: string[]) =>
    badges.map((badge, index) => (
      <div
        key={index}
        className='flex items-center bg-[#F7F7F8] rounded-[8px] px-2 py-1'
      >
        <div className='text-[#3F3F50] text-[14px] leading-5'>{badge}</div>
      </div>
    ));

  return (
    <div
      className='wrapper section-to-fade
                 flex items-start gap-4
                 max-[991px]:flex-col max-[991px]:gap-6 max-[640px]:gap-5'
    >
      {/* Interests */}
      <div
        className='flex flex-col gap-8 bg-white rounded-[32px] shadow-[0_0_120px_rgba(71,85,105,0.07)]
                   px-8 py-[34px] flex-1
                   max-[991px]:w-full max-[991px]:max-w-[600px] max-[991px]:mx-auto
                   max-[640px]:px-5 max-[640px]:py-6 max-[640px]:rounded-[24px]'
      >
        <div className='flex items-start justify-between w-full'>
          <div className='text-[#1E293B] text-[18px] font-medium'>
            Interests
          </div>
          <button
            type='button'
            className='text-[#002FFF] text-[18px] leading-none hover:underline'
          >
            All
          </button>
        </div>
        <div className='flex flex-wrap gap-2 w-full'>{renderBadges(interestsBadges)}</div>
      </div>

      {/* Favorite Movie */}
      <div
        className='flex flex-col gap-8 bg-white rounded-[32px] shadow-[0_0_120px_rgba(71,85,105,0.07)]
                   px-8 py-[34px] flex-1
                   max-[991px]:w-full max-[991px]:max-w-[600px] max-[991px]:mx-auto
                   max-[640px]:px-5 max-[640px]:py-6 max-[640px]:rounded-[24px]'
      >
        <div className='flex items-start justify-between w-full'>
          <div className='text-[#1E293B] text-[18px] font-medium'>
            Favorite Movie
          </div>
          <button
            type='button'
            className='text-[#002FFF] text-[18px] leading-none hover:underline'
          >
            All
          </button>
        </div>
        <div className='flex flex-wrap gap-2 w-full'>{renderBadges(movieBadges)}</div>
      </div>

      {/* Favorite Music */}
      <div
        className='flex flex-col gap-8 bg-white rounded-[32px] shadow-[0_0_120px_rgba(71,85,105,0.07)]
                   px-8 py-[34px] flex-1
                   max-[991px]:w-full max-[991px]:max-w-[600px] max-[991px]:mx-auto
                   max-[640px]:px-5 max-[640px]:py-6 max-[640px]:rounded-[24px]'
      >
        <div className='flex items-start justify-between w-full'>
          <div className='text-[#1E293B] text-[18px] font-medium'>
            Favorite Music or Music Band
          </div>
          <button
            type='button'
            className='text-[#002FFF] text-[18px] leading-none hover:underline'
          >
            All
          </button>
        </div>
        <div className='flex flex-wrap gap-2 w-full'>{renderBadges(musicBadges)}</div>
      </div>
    </div>
  );
}

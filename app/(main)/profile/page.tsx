'use client';

import React from 'react';

import ProfileBanner from '@/components/ProfileBanner/ProfileBanner';
import InterestsSection from '@/components/InterestsSection/InterestsSection';
import TravelHighlights from '@/components/TravelHighlights/TravelHighlights';
import AlbumsSection from '@/components/AlbumsSection/AlbumsSection';
import Post from '@/components/Post/Post';
import Monuments from '@/components/Monuments/Monuments';
import Recommendations from '@/components/Recommendations/Recommendations';
import TravelMap from '@/components/TravelMap/TravelMap';
import ProfileInsights from '@/components/ProfileInsights/ProfileInsights';

import { userVideos } from '@/data/userVideos';

export default function ProfilePage() {
  return (
    <>
      <ProfileBanner />

      <ProfileInsights
        visitedCountries={9}
        nextRankAt={15}
        insights={{
          countries: 24,
          cities: 67,
          trips: 45,
          flights: 42,
          nights: 234,
          photos: 1247
        }}
      />

      <TravelMap />
      <InterestsSection />
      <TravelHighlights videos={userVideos} />
      <AlbumsSection />
      <Post />
      <Monuments />
      <Recommendations />
    </>
  );
}

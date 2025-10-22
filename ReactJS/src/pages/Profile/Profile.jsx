import React from 'react';
import './Profile.scss';

import ProfileBanner from '../../components/ProfileBanner';
import InterestsSection from '../../components/InterestsSection';
import TravelHighlights from '../../components/TravelHighlights';
import Albums from '../../components/AlbumsSection';
import Post from '../../components/Post';
import Monuments from '../../components/Monuments';
import Recommendations from '../../components/Recommendations';
import TravelMap from '../../components/TravelMap';
import ProfileInsights from '../../components/ProfileInsights';

import { userVideos } from './userVideos';

const Profile = () => {
  return (
      <>
        <ProfileBanner />

        <ProfileInsights
          visitedCountries={9}
          nextRankAt={15}
          insights={{ countries: 24, cities: 67, trips: 45 }}
        />

        <TravelMap />
        <InterestsSection />
        <TravelHighlights videos={userVideos} />
        <Albums />
        <Post />
        <Monuments />
        <Recommendations />
      </>
  );
};

export default Profile;

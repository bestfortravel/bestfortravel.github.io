import React from "react";
import "./Profile.scss";

import ProfileBanner from '../../components/ProfileBanner';
import InterestsSection from '../../components/InterestsSection';
import TravelHighlights from '../../components/TravelHighlights';
import Albums from '../../components/Albums';
import Post from '../../components/Post';
import Monuments from '../../components/Monuments';
import Recommendations from '../../components/Recommendations';
import TravelMap from "../../components/TravelMap";

const Profile = () => {
  return (
      <>
        <ProfileBanner />
        <TravelMap />
        <InterestsSection />
        <TravelHighlights />
        <Albums />
        <Post />
        <Monuments />
        <Recommendations />
      </>
  );
};

export default Profile;

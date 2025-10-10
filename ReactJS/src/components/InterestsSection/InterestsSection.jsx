import "./InterestsSection.scss";
import React from "react";

function InterestsSection() {
  const interestsBadges = [
    "🎵 Music & Concerts",
    "🎬 Movies & Filming Locations",
    "🏯 History & Temples",
    "🍣 Food & Culinary Tours",
    "🛍️ Shopping & Fashion",
    "🌸 Nature & Parks",
    "🎨 Art & Museums",
    "+241"
  ];

  const movieBadges = [
    "Harry Potter and the Philosopher's Stone (2001)",
    "The Wolf of Wall Street (2013)",
    "Ottolenghi and the Cakes of Versailles (2020)",
    "Bill & Ted Face the Music (2020)",
    "+1654"
  ];

  const musicBadges = [
    "Rock",
    "Metalica",
    "Hip-Hop", 
    "Jay-Z",
    "Latino",
    "Eza",
    "Ty Dollar Sign",
    "Tyler the Creator",
    "Marlon Craft",
    "Curren$y",
    "Japanese",
    "Space vibes",
    "City Pop",
    "Lofi bests",
    "+144"
  ];

  const renderBadges = (badges) => {
    return badges.map((badge, index) => (
      <div key={index} className="interest-badge">
        <div className="badge-wrap">
          <div className="badge-label">{badge}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="wrapper interests-section">
      <div className="interests-card">
        <div className="card-header">
          <div className="section-title">Interests</div>
          <div className="view-all-link">All</div>
        </div>
        <div className="badges-container">
          {renderBadges(interestsBadges)}
        </div>
      </div>

      <div className="interests-card">
        <div className="card-header">
          <div className="section-title">Favorite Movie</div>
          <div className="view-all-link">All</div>
        </div>
        <div className="badges-container">
          {renderBadges(movieBadges)}
        </div>
      </div>

      <div className="interests-card">
        <div className="card-header">
          <div className="section-title">Favorite Music or Music Band</div>
          <div className="view-all-link">All</div>
        </div>
        <div className="badges-container">
          {renderBadges(musicBadges)}
        </div>
      </div>
    </div>
  );
}

export default InterestsSection;

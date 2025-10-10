import "./TravelHighlights.scss";
import React from "react";

import Button from '../Button';

function TravelHighlights() {
  return (
    <div className="wrapper highlights-wrapper">
      <div className="highlights-container">
        <div className="highlights-content">
          <div className="text-content">
            <div className="text-section">
              <h2 className="highlights-title">Travel higlights</h2>
              <p className="highlights-description">
                From mountain sunrises to night markets, these are the trips
                that I still dreams about.
              </p>
            </div>
            <Button color="secondary">All highlights</Button>
          </div>

          <div className="cards-container">
            <div className="travel-card">
              <div className="card-background" />
                <img
                  src="./images/italyBackground.png"
                  alt="Italy travel destination"
                  className="card-image italy-image"
                />
              <div className="card-info">
                <h3 className="card-title">Italy</h3>
                <p className="card-description">
                  Wander through Italy's timeless cities, coastal villages, and
                  rolling vineyards. Experience art, history, and cuisine that
                  have shaped the world.
                </p>
              </div>
            </div>

            <div className="travel-card">
              <div className="card-background" />
                <img
                  src="./images/franceBackground.png"
                  alt="France travel destination"
                  className="card-image france-image"
                />
              <div className="card-info">
                <h3 className="card-title">France</h3>
                <p className="card-description">
                  Indulge in France's elegant charm, from Parisian streets to
                  Riviera shores. Savor world-class wines, fashion, and culture
                  at every turn.
                </p>
              </div>
            </div>

            <div className="travel-card">
              <div className="card-background" />
                <img
                  src="./images/japanBackground.png"
                  alt="Japan travel destination"
                  className="card-image japan-image"
                />

              <div className="card-info">
                <h3 className="card-title">Japan</h3>
                <p className="card-description">
                  Explore Japan's harmonious blend of ancient tradition and
                  futuristic wonders. From serene temples to neon-lit cities,
                  every moment is unforgettable.
                </p>
              </div>
            </div>
          </div>

          <div className="fade-overlay" />
        </div>
      </div>
    </div>
  );
}

export default TravelHighlights;

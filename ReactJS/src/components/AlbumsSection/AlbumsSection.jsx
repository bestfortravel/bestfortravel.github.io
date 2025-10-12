import "./AlbumsSection.scss";
import React from "react";

function AlbumsSection() {
  return (
    <div className="wrapper albums-section-wrapper">
      <div className="albums-section-container">
        <div className="albums-section-header">
          <h2 className="albums-section-title">Albums</h2>
          <div className="view-all-button">
            <span className="button-text">Check all posts</span>
            <div className="arrow-icon">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 7.25L19.25 12.5L13.75 17.75M19 12.5H4.75" stroke="#002FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="albums-section-grid">
          <div className="album-section-card large-card">
            <img
              src="./images/Australia.png"
              alt="Australia travel album"
              className="album-section-image"
            />
            <div className="album-section-overlay">
              <h3 className="destination-title">Australia</h3>
              <div className="posts-badge">
                <span className="posts-count">12 posts</span>
              </div>
            </div>
          </div>

          <div className="album-section-card">
            <img
              src="./images/FaroeIslands.png"
              alt="Faroe Islands"
              className="album-section-image"
            />

            <div className="album-section-overlay bottom-overlay">
              <h3 className="destination-title">Faroe Islands</h3>
              <div className="posts-badge">
                <span className="posts-count">12 posts</span>
              </div>
            </div>
          </div>

          <div className="album-section-card">
            <img
              src="./images/Japan.png"
              alt="Japan travel album"
              className="album-section-image"
            />

            <div className="album-section-overlay bottom-overlay">
              <h3 className="destination-title">Japan</h3>
              <div className="posts-badge">
                <span className="posts-count">20 posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumsSection;

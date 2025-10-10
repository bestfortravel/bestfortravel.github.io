import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="home-link">Go back home</Link>
    </div>
  );
};

export default NotFound;

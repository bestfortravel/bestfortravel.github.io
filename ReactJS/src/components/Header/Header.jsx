import "./Header.scss";
import React from "react";
import { Link } from 'react-router-dom';

function template() {
  return (
    <React.Fragment>
        <div className="wrapper header-wrapper">
          <header>
            <div className="header-inner">
              <div className="logo-wrapper">
                <Link className="header-link" to='/feed'>
                  <img src="./icons/LogoFull.svg" alt="Feed"/>
                </Link>
              </div>
              <div className="header-links-wrapper">
                <Link className="header-link" to='/notFound'>
                  Map
                </Link>
                <Link className="header-link" to='/feed'>
                  Posts
                </Link>
                <Link className="header-link" to='#'>
                  Next Trip
                </Link>
                <Link className="header-link" to='#'>
                  Notes
                </Link>
              </div>
              <div className="avatar-wrapper">
                <Link className="profile" to='/profile'>
                  <img className="avatar-small" src="./images/avatar.png" alt="Home"/>
                </Link>
              </div>
            </div>
          </header>
        </div>
    </React.Fragment>
  );
};

export default template;

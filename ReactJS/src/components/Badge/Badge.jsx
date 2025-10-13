import React from 'react';
import './Badge.scss';

function Badge({ children, className = '' }) {
  return (
    <div className={`badge ${className}`}>
      <div className="badge-wrap">
        <div className="badge-label">{children}</div>
      </div>
    </div>
  );
}

export default Badge;

import React from 'react';
import './ButtonArrow.scss';

function ButtonArrow({children, onClick, disabled }) {
  return (
    <button
      className={`btn-arrow`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-arrow-text">{children}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="arrow-icon"
      >
        <path
          d="M13.75 7.25L19.25 12.5L13.75 17.75M19 12.5H4.75"
          stroke="#002FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default ButtonArrow;

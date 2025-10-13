import React from 'react';
import './Tab.scss';

function Tab({ children, isSelected = false, onClick }) {
  return (
    <div 
      className={`tab ${isSelected ? 'tab-selected' : 'tab-default'}`} 
      onClick={onClick}
    >
      <div className="tab-label">{children}</div>
    </div>
  );
}

export default Tab;

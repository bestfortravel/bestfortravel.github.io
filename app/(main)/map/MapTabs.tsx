import React from 'react';

const TABS = ['People', 'Places', 'Stays', 'Activities', 'Restaurants', 'Movies', 'Tips'];

export default function MapTabs({
  active,
  onChange,
  showFriends,
  setShowFriends,
}: {
  active: string;
  onChange: (tab: any) => void;
  showFriends: boolean;
  setShowFriends: (v: boolean) => void;
}) {
  return (
    <div className='map-tabs-row'>
      <div className='map-tabs'>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`map-tab ${active.toLowerCase() === tab.toLowerCase() ? 'active' : ''}`}
            onClick={() => onChange(tab.toLowerCase() as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* show toggle for all tabs now */}
      <div className='map-toggle'>
        <label className='switch'>
          <input
            type='checkbox'
            checked={showFriends}
            onChange={(e) => setShowFriends(e.target.checked)}
          />
          <span className='slider' />
        </label>
        <span className='toggle-label'>Show only my friends</span>
      </div>
    </div>
  );
}

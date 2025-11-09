'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MapTabs from './MapTabs';
import MapPeople from './MapPeople';
import MapPlaces from './MapPlaces';
import '@/styles/Map.scss';
import '@/styles/dropdown.scss';
import '@/styles/mapTooltip.scss';

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('people');
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`/map?tab=${tab}`);
  };

  return (
    <div className='map-page wrapper-full-width section-to-fade'>
      <MapTabs
        active={activeTab}
        onChange={handleTabChange}
        showFriends={showFriends}
        setShowFriends={setShowFriends}
      />

      {activeTab === 'people' && <MapPeople showFriends={showFriends} />}
      {activeTab === 'places' && <MapPlaces /* showFriends={showFriends} if needed */ />}
      {activeTab !== 'people' && activeTab !== 'places' && (
        <div className='coming-soon'>This tab is coming soon.</div>
      )}
    </div>
  );
}

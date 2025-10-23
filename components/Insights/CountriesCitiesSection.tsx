'use client';

import React, { useState } from 'react';
import '@/components/Insights/CountriesCitiesSection.scss';

interface Country {
  flag: string;
  name: string;
  cities: string;
  visits: string;
  lastVisit: string;
}

interface City {
  flag: string;
  name: string;
  image: string;
  date: string;
  badges: string[];
  visits: number;
}

interface Props {
  countries?: Country[];
  cities?: City[];
}

export default function CountriesCitiesSection({ countries = [], cities = [] }: Props) {
  const [countrySort, setCountrySort] = useState('alphabetical');
  const [citySort, setCitySort] = useState('alphabetical');

  const sortOptions = [
    { key: 'alphabetical', label: 'Alphabetical' },
    { key: 'bydate', label: 'By Date' },
    { key: 'list', label: 'As List' },
  ];

  // === Helper to parse "Month YYYY"
  const parseMonthYear = (str: string): Date => {
    if (!str) return new Date(0);
    const [month, year] = str.split(' ');
    const monthIndex = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ].findIndex((m) => m.toLowerCase() === month.toLowerCase());
    return monthIndex >= 0 ? new Date(Number(year), monthIndex, 1) : new Date(0);
  };

  // === Sort Logic
  const getSortedCountries = () => {
    const sorted = [...countries];
    if (countrySort === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (countrySort === 'bydate') {
      sorted.sort((a, b) => parseMonthYear(b.lastVisit).getTime() - parseMonthYear(a.lastVisit).getTime());
    }
    return sorted;
  };

  const getSortedCities = () => {
    const sorted = [...cities];
    if (citySort === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (citySort === 'bydate') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return sorted;
  };

  const sortedCountries = getSortedCountries();
  const sortedCities = getSortedCities();

  // === Dropdown ===
  const SortDropdown = ({
    sortType,
    setSortType,
  }: {
    sortType: string;
    setSortType: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (key: string) => {
      setSortType(key);
      setOpen(false);
    };

    const activeLabel = sortOptions.find((o) => o.key === sortType)?.label;

    return (
      <div className='sort-dropdown' onClick={toggleDropdown}>
        <span>{activeLabel}</span>
        <img
          src='/icons/sort.svg'
          alt='Sort'
          className={`sort-icon ${open ? 'open' : ''}`}
        />
        {open && (
          <div className='dropdown-menu'>
            {sortOptions.map((option) => (
              <div
                key={option.key}
                className={`dropdown-item ${sortType === option.key ? 'active' : ''}`}
                onClick={() => handleSelect(option.key)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='countries-cities-section'>
      {/* === COUNTRIES === */}
      <div className='countries-section'>
        <div className='section-header'>
          <h3>
            Countries <span className='count'>{countries.length}</span>
          </h3>
          <SortDropdown sortType={countrySort} setSortType={setCountrySort} />
        </div>

        {countrySort === 'list' ? (
          <div className='countries-list-view'>
            {sortedCountries.map((c, i) => (
              <div key={i} className='country-tag'>
                <span className='flag'>{c.flag}</span>
                {c.name} <span className='visits'>({c.visits})</span>
              </div>
            ))}
          </div>
        ) : (
          <div className='countries-list'>
            {sortedCountries.map((c, i) => (
              <div key={i} className='country-item'>
                <div className='country-flag'>{c.flag}</div>
                <div className='country-details'>
                  <div className='country-info'>
                    <h4>{c.name}</h4>
                    <div className='country-stats'>
                      <span>{c.cities}</span>
                      <span>·</span>
                      <span>{c.visits}</span>
                    </div>
                  </div>
                  <div className='last-visit'>
                    <span>Last</span>
                    <span>{c.lastVisit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === CITIES === */}
      <div className='cities-section'>
        <div className='section-header'>
          <h3>
            Cities <span className='count'>{cities.length}</span>
          </h3>
          <SortDropdown sortType={citySort} setSortType={setCitySort} />
        </div>

        {citySort === 'list' ? (
          <div className='cities-list-view'>
            {sortedCities.map((city, i) => (
              <div key={i} className='city-tag'>
                <span className='flag'>{city.flag}</span>
                {city.name} <span className='visits'>({city.visits})</span>
              </div>
            ))}
          </div>
        ) : (
          <div className='cities-list'>
            {sortedCities.map((trip, i) => (
              <React.Fragment key={i}>
                <div className='city-item'>
                  <div className='city-details-left'>
                    <img src={trip.image} alt={trip.name} className='city-image' />
                    <div className='city-details'>
                      <div className='city-info'>
                        <h4 className='city-details-title'>{trip.name}</h4>
                        <p className='city-details-date'>{trip.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className='city-badges'>
                    {trip.badges.map((badge, index) => (
                      <span key={index} className='city-badge'>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {i < sortedCities.length - 1 && <div className='divider' />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

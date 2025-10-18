import React, { useState } from 'react'
import './CountriesCitiesSection.scss'

export default function CountriesCitiesSection({ countries = [], cities = [] }) {
  const [countrySort, setCountrySort] = useState('alphabetical')
  const [citySort, setCitySort] = useState('alphabetical')

  const sortOptions = [
    { key: 'alphabetical', label: 'Alphabetical' },
    { key: 'bydate', label: 'By Date' },
    { key: 'list', label: 'As List' }
  ]

  // === Sorting Logic ===
  const getSortedCountries = () => {
    let sorted = [...countries]
    if (countrySort === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (countrySort === 'bydate') {
      sorted.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
    }
    return sorted
  }

  const getSortedCities = () => {
    let sorted = [...cities]
    if (citySort === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (citySort === 'bydate') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return sorted
  }

  const sortedCountries = getSortedCountries()
  const sortedCities = getSortedCities()

  // === Dropdown Component ===
  const SortDropdown = ({ sortType, setSortType }) => {
    const [open, setOpen] = useState(false)

    const toggleDropdown = () => setOpen(!open)
    const handleSelect = key => {
      setSortType(key)
      setOpen(false)
    }

    const activeLabel = sortOptions.find(o => o.key === sortType)?.label

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
            {sortOptions.map(option => (
              <div
                key={option.key}
                className={`dropdown-item ${
                  sortType === option.key ? 'active' : ''
                }`}
                onClick={() => handleSelect(option.key)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='countries-cities-section'>
      {/* === COUNTRIES SECTION === */}
      <div className='countries-section'>
        <div className='section-header'>
          <h3>
            Countries <span className='count'>{countries.length}</span>
          </h3>
          <SortDropdown sortType={countrySort} setSortType={setCountrySort} />
        </div>

        {/* List View */}
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
          // Alphabetical / By Date View
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

      {/* === CITIES SECTION === */}
      <div className='cities-section'>
        <div className='section-header'>
          <h3>
            Cities <span className='count'>{cities.length}</span>
          </h3>
          <SortDropdown sortType={citySort} setSortType={setCitySort} />
        </div>

        {/* List View */}
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
          // Alphabetical / By Date View
          <div className='cities-list'>
            {sortedCities.map((trip, i) => (
              <React.Fragment key={i}>
                <div key={i} className='city-item'>
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
  )
}

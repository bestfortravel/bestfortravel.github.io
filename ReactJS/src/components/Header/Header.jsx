import './Header.scss'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header({ fullWidth = false }) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`header-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div
        className={`${fullWidth ? 'wrapper-full-width' : 'wrapper'}`}
      >
        <header>
          <div className='header-inner'>
            <div className='logo-wrapper'>
              <NavLink className='header-link' to='/feed'>
                <img src='/icons/LogoFull.svg' alt='Feed' />
              </NavLink>
            </div>

            <div className='header-links-wrapper'>
              <NavLink
                to='/feed'
                className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
              >
                Posts
              </NavLink>
              <NavLink
                to='/albums'
                className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
              >
                Albums
              </NavLink>
              <NavLink
                to='/profile'
                className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
              >
                Profile
              </NavLink>
              <NavLink
                to='/insights'
                className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
              >
                Insights
              </NavLink>
            </div>

            <div className='avatar-wrapper'>
              <NavLink className='profile' to='/profile'>
                <img className='avatar-small' src='/images/avatar.png' alt='Home' />
              </NavLink>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

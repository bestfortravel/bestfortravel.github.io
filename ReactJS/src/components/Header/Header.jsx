import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ fullWidth = false }) {
  return (
    <div className={`${fullWidth ? 'wrapper-full-width' : 'wrapper'} header-wrapper`}>
      <header>
        <div className='header-inner'>
          <div className='logo-wrapper'>
            <Link className='header-link' to='/feed'>
              <img src='./icons/LogoFull.svg' alt='Feed' />
            </Link>
          </div>

          <div className='header-links-wrapper'>
            <Link className='header-link' to='/map'>Map</Link>
            <Link className='header-link' to='/feed'>Posts</Link>
            <Link className='header-link' to='#'>Next Trip</Link>
            <Link className='header-link' to='#'>Notes</Link>
          </div>

          <div className='avatar-wrapper'>
            <Link className='profile' to='/profile'>
              <img className='avatar-small' src='./images/avatar.png' alt='Home' />
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

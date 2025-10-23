'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/NotFound.scss';

export default function NotFound() {
  return (
    <div className='notfound-container'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <Link href='/' className='home-link'>
        Go back home
      </Link>
    </div>
  );
}

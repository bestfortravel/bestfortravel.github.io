'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-5 text-center text-slate-800'>
      <h1 className='text-[120px] leading-none font-bold text-[#718af9] m-0'>
        404
      </h1>
      <h2 className='text-[28px] mt-3 mb-5'>Page Not Found</h2>
      <p className='text-[16px] text-slate-500 max-w-md'>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href='/'
        className='inline-block mt-6 px-6 py-2.5 rounded-lg bg-[#718af9] text-white font-medium no-underline transition hover:bg-[#5b73d6]'
      >
        Go back home
      </Link>
    </div>
  );
}

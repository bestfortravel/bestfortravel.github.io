'use client';

import React from 'react';
import Link from 'next/link';

export default function Post() {
  return (
    <div className='wrapper section-to-fade'>
      <div className='flex flex-col gap-8 rounded-[32px] bg-white shadow-[0_0_120px_rgba(71,85,105,0.07)] px-8 py-[34px] box-border max-[991px]:px-5 max-[991px]:py-6 max-[640px]:px-4 max-[640px]:py-4 max-[640px]:rounded-[24px]'>
        {/* header */}
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4'>
            <div className='text-[#1E293B] text-[24px] font-bold max-[991px]:text-[20px] max-[640px]:text-[18px]'>
              Latest post
            </div>
            <button
              type='button'
              className='flex p-[2px] items-center gap-2 cursor-pointer'
              aria-label='Add post'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
              >
                <path
                  d='M21 12.5C21 12.6989 20.921 12.8897 20.7803 13.0303C20.6397 13.171 20.4489 13.25 20.25 13.25H12.75V20.75C12.75 20.9489 12.671 21.1397 12.5303 21.2803C12.3897 21.421 12.1989 21.5 12 21.5C11.8011 21.5 11.6103 21.421 11.4697 21.2803C11.329 21.1397 11.25 20.9489 11.25 20.75V13.25H3.75C3.55109 13.25 3.36032 13.171 3.21967 13.0303C3.07902 12.8897 3 12.6989 3 12.5C3 12.3011 3.07902 12.1103 3.21967 11.9697C3.36032 11.829 3.55109 11.75 3.75 11.75H11.25V4.25C11.25 4.05109 11.329 3.86032 11.4697 3.71967C11.6103 3.57902 11.8011 3.5 12 3.5C12.1989 3.5 12.3897 3.57902 12.5303 3.71967C12.671 3.86032 12.75 4.05109 12.75 4.25V11.75H20.25C20.4489 11.75 20.6397 11.829 20.7803 11.9697C20.921 12.1103 21 12.3011 21 12.5Z'
                  fill='#002FFF'
                />
              </svg>
            </button>
          </div>

          <Link
            href='/feed'
            className='flex items-center gap-2 no-underline cursor-pointer'
          >
            <span className='text-[#002FFF] text-[14px] leading-5 hover:text-[#0028D9] focus:text-[#0021B5]'>
              Check all posts
            </span>
            <svg
              width='24'
              height='25'
              viewBox='0 0 24 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
            >
              <path
                d='M13.75 7.25L19.25 12.5L13.75 17.75M19 12.5H4.75'
                stroke='#002FFF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>

        {/* card */}
        <div className='flex flex-col gap-8 w-full rounded-[24px] bg-[#EFF6FF] p-5 max-[991px]:p-4 max-[640px]:p-3'>
          {/* user */}
          <div className='flex items-center gap-2 w-full'>
            <div className='relative'>
              <div
                className='w-[44px] h-[44px] rounded-full bg-[url("/images/avatar.png")] bg-center bg-cover shadow-[0_0_144px_12px_rgba(71,85,105,0.25)]'
                aria-label='User avatar'
              />
            </div>
            <div className='flex flex-col justify-center gap-[2px]'>
              <div className='text-[#1E293B] text-[16px] leading-[22px]'>
                Leslie Alexander
              </div>
              <div className='text-[#475569] text-[12px] leading-5'>
                2h ago
              </div>
            </div>
          </div>

          {/* body */}
          <div className='flex flex-col gap-5 w-full'>
            <div className='text-[#1E293B] text-[16px] leading-[26px] max-[640px]:text-[14px] max-[640px]:leading-[22px]'>
              Spent the afternoon cycling through lavender fields near Gordes, with the scent of
              summer in the air. Stopped at a local market for fresh cheese and sun-warmed peaches.
              Everything here feels slower, softer, and somehow more alive. Provence truly knows how
              to slow time.
            </div>

            <div className='text-[#475569] text-[12px] leading-5'>
              Paris, France
            </div>

            {/* images */}
            <div className='flex gap-3 w-full'>
              {[
                '/images/PostImage1.png',
                '/images/PostImage2.png',
                '/images/PostImage3.png',
              ].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Post image ${i + 1}`}
                  className='rounded-[24px] object-cover h-[240px]
                            w-[calc((100%-24px)/3)]
                            max-[991px]:h-[220px]
                            max-[800px]:h-[180px]
                            max-[640px]:h-[100px] max-[640px]:rounded-[16px]'
                />
              ))}
            </div>



            {/* engagement */}
            <div className='flex items-center gap-4 flex-wrap max-[640px]:gap-2'>
              {[
                { icon: 'bg-[url("/icons/eye-grey.svg")]', count: 320 },
                { icon: 'bg-[url("/icons/heart-full-blue.svg")]', count: 250 },
                { icon: 'bg-[url("/icons/chat-grey.svg")]', count: 12 },
                { icon: 'bg-[url("/icons/share-grey.svg")]', count: 3 },
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-1.5 max-[640px]:gap-1'>
                  <div
                    className={`w-6 h-6 bg-no-repeat bg-center ${item.icon}`}
                  />
                  <div className='text-[#475569] text-[14px] max-[640px]:text-[12px]'>
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* comment box */}
        <div className='flex items-center gap-2 w-full rounded-[24px] border border-[#F1F5F9] bg-white py-4 px-6 max-[991px]:py-3 max-[991px]:px-4 max-[640px]:py-2.5 max-[640px]:px-3'>
          <div className='flex-1 text-[#64748B] text-[14px] leading-[22px] max-[640px]:text-[12px]'>
            Comment your thoughts
          </div>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
          >
            <path
              d='M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM8.625 9C8.84751 9 9.06502 9.06598 9.25002 9.1896C9.43503 9.31321 9.57922 9.48891 9.66437 9.69448C9.74952 9.90005 9.7718 10.1262 9.72839 10.3445C9.68498 10.5627 9.57783 10.7632 9.4205 10.9205C9.26317 11.0778 9.06271 11.185 8.84448 11.2284C8.62625 11.2718 8.40005 11.2495 8.19449 11.1644C7.98892 11.0792 7.81322 10.935 7.6896 10.75C7.56598 10.565 7.5 10.3475 7.5 10.125C7.5 9.82663 7.61853 9.54048 7.82951 9.3295C8.04049 9.11853 8.32664 9 8.625 9ZM16.3988 14.625C15.4341 16.2928 13.8309 17.25 12 17.25C10.1691 17.25 8.56594 16.2937 7.60125 14.625C7.54699 14.5396 7.51055 14.4442 7.49413 14.3444C7.47772 14.2446 7.48166 14.1425 7.50573 14.0442C7.52979 13.946 7.57348 13.8536 7.63417 13.7727C7.69485 13.6917 7.77128 13.6239 7.85886 13.5733C7.94643 13.5227 8.04334 13.4903 8.14375 13.4781C8.24417 13.4659 8.34601 13.4742 8.44316 13.5023C8.5403 13.5305 8.63074 13.5781 8.70904 13.6421C8.78734 13.7062 8.85187 13.7854 8.89875 13.875C9.59907 15.0853 10.6997 15.75 12 15.75C13.3003 15.75 14.4009 15.0844 15.1013 13.875C15.1481 13.7854 15.2127 13.7062 15.291 13.6421C15.3693 13.5781 15.4597 13.5305 15.5569 13.5023C15.654 13.4742 15.7558 13.4659 15.8563 13.4781C15.9567 13.4903 16.0536 13.5227 16.1412 13.5733C16.2287 13.6239 16.3052 13.6917 16.3658 13.7727C16.4265 13.8536 16.4702 13.946 16.4943 14.0442C16.5183 14.1425 16.5223 14.2446 16.5059 14.3444C16.4895 14.4442 16.453 14.5396 16.3988 14.625ZM15.375 11.25C15.1525 11.25 14.935 11.184 14.75 11.0604C14.565 10.9368 14.4208 10.7611 14.3356 10.5555C14.2505 10.35 14.2282 10.1238 14.2716 9.90552C14.315 9.68729 14.4222 9.48684 14.5795 9.3295C14.7368 9.17217 14.9373 9.06502 15.1555 9.02162C15.3738 8.97821 15.6 9.00049 15.8055 9.08564C16.0111 9.17078 16.1868 9.31498 16.3104 9.49998C16.434 9.68499 16.5 9.9025 16.5 10.125C16.5 10.4234 16.3815 10.7095 16.1705 10.9205C15.9595 11.1315 15.6734 11.25 15.375 11.25Z'
              fill='#94A3B8'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

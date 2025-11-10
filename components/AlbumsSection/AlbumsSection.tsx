'use client';

import Link from 'next/link';

export default function AlbumsSection() {
  return (
    <div className='wrapper section-to-fade'>
      <div
        className='flex flex-col gap-8 rounded-[32px] bg-white shadow-[0_0_120px_rgba(71,85,105,0.07)] px-8 py-[34px] my-4
                   max-[991px]:px-5 max-[991px]:py-6 max-[640px]:px-4 max-[640px]:py-5 max-[640px]:rounded-[20px]'
      >
        {/* header */}
        <div className='flex items-center justify-between w-full'>
          <h2 className='text-[#1E293B] text-[24px] font-bold m-0 max-[640px]:text-[20px]'>
            Albums
          </h2>
          <Link
            href='/albums'
            className='flex items-center gap-2 no-underline cursor-pointer'
          >
            <span className='text-[#002FFF] text-[14px] leading-5 hover:text-[#0028D9] focus:text-[#0021B5] max-[640px]:text-[13px]'>
              Check all posts
            </span>
            <div className='w-6 h-6'>
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.75 7.25L19.25 12.5L13.75 17.75M19 12.5H4.75'
                  stroke='#002FFF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* grid */}
        <div
          className='flex items-center gap-3 w-full
                     max-[1024px]:overflow-x-auto
                     max-[640px]:flex-wrap max-[640px]:overflow-x-visible'
        >
          {/* card 1 */}
          <div
            className='relative rounded-[24px] overflow-hidden h-[316px]
                       w-[calc((100%-24px)/3)]
                       max-[1024px]:min-w-[calc(50%-6px)]
                       max-[800px]:h-[250px]
                       max-[640px]:h-[230px] max-[640px]:w-full'
          >
            <img
              src='/images/Australia.png'
              alt='Australia travel album'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div
              className='absolute left-4 right-6 top-6 flex items-start justify-between
                         max-[768px]:top-auto max-[768px]:bottom-6 max-[768px]:flex-col'
            >
              <h3 className='text-white text-[24px] font-bold m-0 drop-shadow-[0_0_50px_rgba(30,41,59,0.25)]'>
                Australia
              </h3>
              <div
                className='flex items-center rounded-[8px] bg-[#F7F7F8] px-2 py-1
                           max-[900px]:bg-transparent max-[900px]:p-0'
              >
                <span
                  className='text-[#3F3F50] text-[14px] leading-5 px-1 whitespace-nowrap
                             max-[900px]:text-white max-[900px]:px-0'
                >
                  12 posts
                </span>
              </div>
            </div>
          </div>

          {/* card 2 */}
          <div
            className='relative rounded-[24px] overflow-hidden h-[316px]
                       w-[calc((100%-24px)/3)]
                       max-[1024px]:min-w-[calc(50%-6px)]
                       max-[800px]:h-[250px]
                       max-[640px]:h=[230px] max-[640px]:w-full'
          >
            <img
              src='/images/FaroeIslands.png'
              alt='Faroe Islands'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div
              className='absolute left-4 right-6 bottom-6 flex items-center justify-between
                         max-[768px]:flex-col max-[768px]:items-start'
            >
              <h3 className='text-white text-[24px] font-bold m-0 drop-shadow-[0_0_50px_rgba(30,41,59,0.25)]'>
                Faroe Islands
              </h3>
              <div
                className='flex items-center rounded-[8px] bg-[#F7F7F8] px-2 py-1
                           max-[900px]:bg-transparent max-[900px]:p-0'
              >
                <span
                  className='text-[#3F3F50] text-[14px] leading-5 px-1 whitespace-nowrap
                             max-[900px]:text-white max-[900px]:px-0'
                >
                  12 posts
                </span>
              </div>
            </div>
          </div>

          {/* card 3 */}
          <div
            className='relative rounded-[24px] overflow-hidden h-[316px]
                       w-[calc((100%-24px)/3)]
                       max-[1024px]:min-w-[calc(50%-6px)]
                       max-[800px]:h-[250px]
                       max-[640px]:h-[230px] max-[640px]:w-full'
          >
            <img
              src='/images/Japan.png'
              alt='Japan travel album'
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div
              className='absolute left-4 right-6 bottom-6 flex items-center justify-between
                         max-[768px]:flex-col max-[768px]:items-start'
            >
              <h3 className='text-white text-[24px] font-bold m-0 drop-shadow-[0_0_50px_rgba(30,41,59,0.25)]'>
                Japan
              </h3>
              <div
                className='flex items-center rounded-[8px] bg-[#F7F7F8] px-2 py-1
                           max-[900px]:bg-transparent max-[900px]:p-0'
              >
                <span
                  className='text-[#3F3F50] text-[14px] leading-5 px-1 whitespace-nowrap
                             max-[900px]:text-white max-[900px]:px-0'
                >
                  20 posts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

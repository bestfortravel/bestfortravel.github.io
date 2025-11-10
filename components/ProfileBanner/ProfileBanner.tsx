'use client';

import React from 'react';
import Button from '@/components/Button/Button';

export default function ProfileBanner() {
  return (
    <div className="wrapper section-to-fade">
      <div
        className="relative bg-white rounded-[32px] shadow-[0_0_120px_rgba(71,85,105,0.07)]
                   overflow-hidden
                   max-[991px]:rounded-[24px] max-[640px]:rounded-[16px]"
      >
        {/* cover */}
        <div
          className="relative w-full h-[358px] overflow-hidden bg-[#714949]
                     max-[991px]:h-[280px] max-[640px]:h-[200px]"
        >
          <img
            src="/images/profileBackground.png"
            alt="profile background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* avatar wrapper (placed OUTSIDE the cover so it won't be clipped) */}
        <div
          className="absolute left-6 top-[298px] z-20
                     max-[991px]:top-[230px]
                     max-[640px]:top-[160px]"
        >
          {/* avatar circle */}
          <div
            className="relative w-[120px] h-[120px] rounded-full border-[2px] border-[#6fa7f0]
                       shadow-[0_0_144px_12px_rgba(71,85,105,0.25)] overflow-hidden
                       max-[991px]:w-[100px] max-[991px]:h-[100px]
                       max-[640px]:w-[80px]  max-[640px]:h-[80px]"
          >
            <img
              src="/images/avatar.png"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* status emoji — above the avatar rim */}
          <div
            className="absolute -right-2 -top-2 z-30 flex items-center justify-center bg-white rounded-full
                       w-[42px] h-[42px]
                       max-[991px]:w-[36px] max-[991px]:h-[36px]
                       max-[640px]:w-[28px] max-[640px]:h-[28px]"
          >
            <div className="text-[18px] max-[991px]:text-[16px] max-[640px]:text-[14px]">✈️</div>
          </div>
        </div>

        {/* content */}
        <div
          className="relative w-full px-6 pb-6 pt-[82px]
                     max-[640px]:px-4 max-[640px]:pt-[72px]"
        >
          {/* actions top-right */}
          <div
            className="absolute right-6 top-[18px] flex items-center gap-2
                       max-[640px]:right-2 max-[640px]:top-[18px]"
          >
            <Button color="secondary">Message</Button>
            <Button color="primary">Follow</Button>
          </div>

          <div className="flex flex-col gap-4">
            {/* name + meta */}
            <div className="flex flex-col gap-4">
              <div
                className="text-[#1E293B] text-[32px] font-semibold
                           max-[991px]:text-[28px] max-[640px]:text-[24px]"
              >
                Leslie Alexander 🥇
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-[#475569] text-[16px] leading-5">
                  <span className="text-[18px] mr-1">🇺🇸</span> USA · 28 years old
                </div>

                <div className="flex items-center gap-2 rounded-[8px] border border-[#ADE4FF] bg-[#F0FAFF] px-2 py-1">
                  <svg
                    className="w-4 h-4"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33329 3.1665V5.49984M10.6666 3.1665V5.49984M5.16663 7.1665H10.8333M4.49996 12.8332H11.5C12.2363 12.8332 12.8333 12.2362 12.8333 11.4998V5.83317C12.8333 5.09679 12.2363 4.49984 11.5 4.49984H4.49996C3.76358 4.49984 3.16663 5.09679 3.16663 5.83317V11.4998C3.16663 12.2362 3.76358 12.8332 4.49996 12.8332Z"
                      stroke="#0075AD"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-[#0075AD] text-[14px] leading-5">Joined in 2025</div>
                </div>
              </div>
            </div>

            {/* bio */}
            <div className="max-w-[500px] max-[640px]:max-w-[550px]">
              <p className="text-[#1E293B] text-[16px] leading-[26px] m-0">
                Wandering the world one city at a time. Lover of local food, hidden gems, and slow
                mornings in new places.
              </p>
            </div>

            {/* location */}
            <div className="text-[#1E293B] text-[16px] font-semibold leading-5 max-[640px]:text-[14px]">
              <span className="text-[#475569] font-normal">📍 Currently in the</span>
              <span className="ml-[5px] font-semibold text-[#1E293B]">South of France</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

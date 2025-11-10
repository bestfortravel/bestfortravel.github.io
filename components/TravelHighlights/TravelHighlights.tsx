'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import Button from '@/components/Button/Button';

interface VideoData {
  src: string;
  userName: string;
  userAvatar: string;
  location: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface Comment {
  user: string;
  text: string;
  userAvatar: string;
  date: string;
}

interface TravelHighlightsProps {
  videos?: VideoData[];
}

export default function TravelHighlights({ videos = [] }: TravelHighlightsProps) {
  const [muteStates, setMuteStates] = useState<Record<number, boolean>>({});
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      user: 'Ralph Edwards',
      text: 'Amazing view!',
      userAvatar: '/images/RalphEdwards.png',
      date: '2h ago',
    },
    {
      user: 'Guy Hawkins',
      text: 'I want to go there 😍',
      userAvatar: '/images/GuyHawkins.png',
      date: '1h ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // init mute
  useEffect(() => {
    const initial: Record<number, boolean> = {};
    videos.forEach((_, i) => (initial[i] = true));
    setMuteStates(initial);
  }, [videos]);

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuteStates((prev) => ({ ...prev, [index]: next }));
  };

  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    const video = videoRefs.current[index];
    video?.play().catch(() => {});
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile) return;
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openFullScreen = (index: number) => setActiveVideo(index);
  const closeFullScreen = () => {
    setActiveVideo(null);
    setCommentsOpen(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        user: 'You',
        text: newComment.trim(),
        userAvatar: '/images/avatar.png',
        date: 'now',
      },
    ]);
    setNewComment('');
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && closeFullScreen();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  // play active in popup
  useEffect(() => {
    if (activeVideo !== null) {
      const video = videoRefs.current[activeVideo];
      video?.play().catch(() => {});
    }
  }, [activeVideo]);

  const formatNumber = (n: number) =>
    n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n.toString();

  return (
    <div
      className='wrapper section-to-fade
                 rounded-[32px]
                 shadow-[0_0_120px_rgba(71,85,105,0.07)]
                 overflow-hidden bg-white
                 pl-8 py-8
                 max-[991px]:pl-4 max-[991px]:py-4 max-[640px]:pl-5'
    >
      <div className='relative'>
        {/* header */}
        <div
          className='flex items-center justify-between mb-6 pr-8
                     max-[991px]:pr-4 max-[640px]:pr-5'
        >
          <div>
            <h2 className='text-[#1E293B] text-[24px] font-semibold m-0'>
              Travel Highlights
            </h2>
            <p className='text-[#475569] text-[16px] leading-[26px] mt-[6px]'>
              From mountain sunrises to night markets, these are the trips that I still dream about.
            </p>
          </div>
          <Button color='secondary'>All highlights</Button>
        </div>

        {/* slider (only when not fullscreen) */}
        {activeVideo === null && (
          <div className='relative'>
            <Swiper
              modules={[Navigation, Mousewheel]}
              slidesPerView={3.5}
              spaceBetween={12}
              navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
              mousewheel={{ forceToAxis: true }}
              breakpoints={{
                0: { slidesPerView: 1.3, spaceBetween: 5 },
                768: { slidesPerView: 2.2, spaceBetween: 10 },
                1024: { slidesPerView: 3.4, spaceBetween: 12 },
              }}
              className='highlights-swiper'
            >
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div
                    className='relative w-[281px] h-[500px] rounded-[32px] overflow-hidden cursor-pointer'
                    onClick={() => openFullScreen(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      muted={muteStates[index]}
                      loop
                      playsInline
                      preload='metadata'
                      className='w-full h-full object-cover rounded-[32px] transition-transform duration-300 hover:scale-[1.03]'
                    >
                      <source src={video.src} type='video/mp4' />
                    </video>

                    {/* mute button */}
                    <button
                      className='absolute top-4 right-4 w-[34px] h-[34px] rounded-full flex items-center justify-center
                                 bg-white/10 backdrop-blur-[4.35px] z-[3] border-0'
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute(index);
                      }}
                    >
                      <img
                        src={
                          muteStates[index]
                            ? '/icons/unmute-white.svg'
                            : '/icons/mute-white.svg'
                        }
                        alt='Mute toggle'
                        className='w-[10px]'
                      />
                    </button>

                    {/* center play icon (hide on hover) */}
                    <button
                      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full
                                 flex items-center justify-center bg-transparent border-0
                                 group-hover:opacity-0'
                    >
                      <img src='/icons/play-white.svg' alt='Play' />
                    </button>

                    {/* bottom info */}
                    <div
                      className='absolute bottom-0 w-full p-4
                                 bg-gradient-to-b from-black/5 to-black/40
                                 text-white rounded-b-[32px]
                                 transition-transform duration-400
                                 max-[768px]:translate-y-0
                                 hover:md:translate-y-full'
                    >
                      <div className='flex items-center gap-2 mb-3'>
                        <img
                          src={video.userAvatar}
                          alt={video.userName}
                          className='w-[26px] h-[26px] rounded-full'
                        />
                        <div>
                          <h4 className='text-[12px] font-semibold m-0'>{video.userName}</h4>
                          <p className='text-[10px] text-white/75 m-0 leading-3'>
                            {video.location}
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2'>
                        <div className='flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] max-w-[52px]'>
                          <img src='/icons/eye-white.svg' alt='' /> {formatNumber(video.views)}
                        </div>
                        <div className='flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-[10px] max-w-[52px]'>
                          <img src='/icons/heart-full-white.svg' alt='' /> {video.likes}
                        </div>
                        <div
                          className='flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-[10px] max-w-[52px] cursor-pointer'
                          onClick={(e) => {
                            e.stopPropagation();
                            setCommentsOpen(true);
                          }}
                        >
                          <img src='/icons/chat-white.svg' alt='' /> {video.comments}
                        </div>
                        <div className='flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-[10px] max-w-[52px]'>
                          <img src='/icons/share-white.svg' alt='' /> {video.shares}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* slider controls */}
            <div className='flex justify-end gap-2 mt-3 pr-8 max-[991px]:pr-4'>
              <button
                className='swiper-prev w-9 h-9 rounded-full bg-[#F8FAFC] bg-center bg-no-repeat rotate-180'
                aria-label='Previous slide'
              />
              <button
                className='swiper-next w-9 h-9 rounded-full bg-[#F8FAFC] bg-center bg-no-repeat'
                aria-label='Next slide'
              />
            </div>
          </div>
        )}

        {/* fullscreen / popup */}
        {activeVideo !== null && (
          <>
            {!isMobile ? (
              // desktop popup
              <div className='fixed inset-0 z-[9999] flex items-center justify-center'>
                <div
                  className='absolute inset-0 bg-black/50'
                  onClick={closeFullScreen}
                />
                <div
                  className='relative flex items-start bg-[#f8fbff] rounded-[24px] overflow-hidden
                             w-[calc(100%-32px)] h-[calc(100%-32px)] p-0'
                >
                  {/* video section */}
                  <div className='relative h-full w-[calc(100%-416px)] flex items-center justify-center py-6 pb-16 px-12 max-[1100px]:px-6'>
                    <div className='relative w-full h-full max-w-[511px] max-h-[908px] rounded-[24px] overflow-hidden'>
                      <video
                        ref={(el) => {
                          videoRefs.current[activeVideo] = el;
                        }}
                        src={videos[activeVideo].src}
                        muted={muteStates[activeVideo]}
                        loop
                        playsInline
                        autoPlay
                        className='w-full h-full object-cover rounded-[32px]'
                        onClick={() => {
                          const vid = videoRefs.current[activeVideo];
                          if (!vid) return;
                          vid.paused ? vid.play() : vid.pause();
                        }}
                      />
                      {/* video stats bottom */}
                      <div className='absolute -bottom-10 left-0 w-full flex justify-center gap-4 text-[#475569] text-[15px] font-medium'>
                        <div className='flex items-center gap-1'>
                          <img src='/icons/eye-grey.svg' alt='' className='w-[18px]' />{' '}
                          {videos[activeVideo].views}
                        </div>
                        <div className='flex items-center gap-1'>
                          <img src='/icons/heart-full-grey.svg' alt='' className='w-[18px]' />{' '}
                          {videos[activeVideo].likes}
                        </div>
                        <div className='flex items-center gap-1'>
                          <img src='/icons/chat-full-grey.svg' alt='' className='w-[18px]' />{' '}
                          {videos[activeVideo].comments}
                        </div>
                        <div className='flex items-center gap-1'>
                          <img src='/icons/share-full-grey.svg' alt='' className='w-[18px]' />{' '}
                          {videos[activeVideo].shares}
                        </div>
                      </div>

                      {/* mute btn */}
                      <button
                        className='absolute top-5 right-5 w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white/10 backdrop-blur border-0'
                        onClick={() => toggleMute(activeVideo)}
                      >
                        <img
                          src={
                            muteStates[activeVideo]
                              ? '/icons/mute-white.svg'
                              : '/icons/unmute-white.svg'
                          }
                          alt='Mute toggle'
                          className='w-[10px]'
                        />
                      </button>
                    </div>
                  </div>

                  {/* comments panel */}
                  <div className='absolute right-0 top-0 w-[416px] h-full bg-white flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.05)]'>
                    {/* header */}
                    <div className='flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={videos[activeVideo].userAvatar}
                          alt={videos[activeVideo].userName}
                          className='w-11 h-11 rounded-full'
                        />
                        <div>
                          <h4 className='text-[#1E293B] text-[16px] font-medium m-0'>
                            {videos[activeVideo].userName}
                          </h4>
                          <p className='flex items-center gap-1 text-[#475569] text-[12px] m-0'>
                            <img
                              src='/icons/location-grey.svg'
                              alt=''
                              className='w-[10px]'
                            />
                            {videos[activeVideo].location}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <button
                          className='w-4 h-4 bg-[url("/icons/dots-horizontal.svg")] bg-center bg-no-repeat border-none'
                          aria-label='More'
                        />
                        <button
                          className='w-4 h-4 bg-[url("/icons/close-grey.svg")] bg-center bg-no-repeat border-none'
                          onClick={closeFullScreen}
                          aria-label='Close'
                        />
                      </div>
                    </div>

                    {/* comments scroll */}
                    <div className='flex-1 overflow-y-auto px-6 py-6'>
                      {comments.map((c, i) => (
                        <div key={i} className='flex gap-2 mb-3'>
                          <img
                            src={c.userAvatar}
                            alt=''
                            className='w-8 h-8 rounded-full'
                          />
                          <div>
                            <div className='bg-[#F1F5F9] rounded-[12px] px-3 py-2'>
                              <p className='text-[#1E293B] text-[14px] font-medium m-0'>
                                {c.user}
                              </p>
                              <p className='text-[#1E293B] text-[14px] leading-[22px] m-0'>
                                {c.text}
                              </p>
                            </div>
                            <p className='text-[#64748B] text-[12px] mt-1'>{c.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* input */}
                    <div className='flex items-center gap-2 mx-4 mb-4 px-4 py-3 rounded-[24px] border border-[#E2E8F0]'>
                      <input
                        type='text'
                        placeholder='Comment your thoughts'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        className='flex-1 border-none outline-none text-[14px] text-[#64748B]'
                      />
                      <button
                        onClick={handleAddComment}
                        className='w-5 h-5 bg-[url("/icons/comments-emojis-grey.svg")] bg-no-repeat bg-center border-none'
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // mobile fullscreen reels
              <div className='fixed inset-0 bg-black z-[9999]'>
                <Swiper
                  direction='vertical'
                  slidesPerView={1}
                  onSwiper={(swiper) => swiper.slideTo(activeVideo, 0)}
                  onSlideChange={(swiper) => setActiveVideo(swiper.activeIndex)}
                  className='w-full h-full'
                >
                  {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                      <div className='relative w-full h-full'>
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={video.src}
                          muted={muteStates[index]}
                          loop
                          playsInline
                          autoPlay={index === activeVideo}
                          className='w-full h-full object-cover'
                          onClick={() => {
                            const vid = videoRefs.current[index];
                            if (!vid) return;
                            vid.paused ? vid.play() : vid.pause();
                          }}
                        />

                        {/* top buttons */}
                        <div className='absolute top-4 left-4 flex gap-3'>
                          <button
                            className='w-4 h-4 bg-[url("/icons/close-white.svg")] bg-center bg-no-repeat border-none'
                            onClick={closeFullScreen}
                          />
                          <button className='w-4 h-4 bg-[url("/icons/dots-horizontal-white.svg")] bg-center bg-no-repeat border-none' />
                        </div>

                        {/* mute */}
                        <button
                          className='absolute top-4 right-4 w-[34px] h-[34px] rounded-full flex items-center justify-center bg-white/10 backdrop-blur border-0'
                          onClick={() => toggleMute(index)}
                        >
                          <img
                            src={
                              muteStates[index]
                                ? '/icons/unmute-white.svg'
                                : '/icons/mute-white.svg'
                            }
                            alt='Mute toggle'
                            className='w-[10px]'
                          />
                        </button>

                        {/* right actions */}
                        <div className='absolute right-6 bottom-6 flex flex-col gap-5 text-white'>
                          <div className='flex flex-col items-center gap-1'>
                            <img src='/icons/eye-white.svg' alt='' className='w-4' />
                            <span>{video.views}</span>
                          </div>
                          <div className='flex flex-col items-center gap-1'>
                            <img src='/icons/heart-full-white.svg' alt='' className='w-4' />
                            <span>{video.likes}</span>
                          </div>
                          <div
                            className='flex flex-col items-center gap-1 cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              setCommentsOpen(true);
                            }}
                          >
                            <img src='/icons/chat-white.svg' alt='' className='w-4' />
                            <span>{video.comments}</span>
                          </div>
                          <div className='flex flex-col items-center gap-1'>
                            <img src='/icons/share-white.svg' alt='' className='w-4' />
                            <span>{video.shares}</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* comments drawer on mobile */}
                {commentsOpen && (
                  <div className='fixed inset-0 bg-white z-[10000] flex flex-col animate-[slideIn_0.3s_ease_forwards]'>
                    <div className='flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]'>
                      <button
                        className='flex items-center bg-none border-none'
                        onClick={() => setCommentsOpen(false)}
                      >
                        <img src='/icons/arrow-left.svg' alt='Back' className='mr-2' />
                        Back
                      </button>
                    </div>
                    <div className='flex-1 overflow-y-auto px-4 py-4'>
                      {comments.map((c, i) => (
                        <div key={i} className='flex gap-2 mb-3'>
                          <img
                            src={c.userAvatar}
                            alt=''
                            className='w-8 h-8 rounded-full'
                          />
                          <div>
                            <div className='bg-[#F1F5F9] rounded-[12px] px-3 py-2'>
                              <p className='text-[#1E293B] text-[14px] font-medium m-0'>
                                {c.user}
                              </p>
                              <p className='text-[#1E293B] text-[14px] leading-[22px] m-0'>
                                {c.text}
                              </p>
                            </div>
                            <p className='text-[#64748B] text-[12px] mt-1'>{c.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex items-center gap-2 px-4 py-3'>
                      <input
                        type='text'
                        placeholder='Add a comment...'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        className='flex-1 px-3 py-2 rounded-[16px] border border-[#E2E8F0] outline-none'
                      />
                      <Button color='primary' onClick={handleAddComment}>
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

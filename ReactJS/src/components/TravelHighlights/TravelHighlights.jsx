import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import './TravelHighlights.scss'
import Button from '../Button'

function TravelHighlights({ videos = [] }) {
  const [muteStates, setMuteStates] = useState({})
  const [activeVideo, setActiveVideo] = useState(null)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comments, setComments] = useState([
    {
      user: 'Ralph Edwards',
      text: 'Amazing view!',
      userAvatar: '/images/RalphEdwards.png',
      date: '2h ago'
    },
    {
      user: 'Guy Hawkins',
      text: 'I want to go there 😍',
      userAvatar: '/images/GuyHawkins.png',
      date: '1h ago'
    }
  ])
  const [newComment, setNewComment] = useState('')
  const videoRefs = useRef([])
  const isMobile = window.innerWidth <= 768

  // Initialize mute state
  useEffect(() => {
    const initialStates = {}
    videos.forEach((_, i) => (initialStates[i] = true))
    setMuteStates(initialStates)
  }, [videos])

  const toggleMute = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      const newMuted = !video.muted
      video.muted = newMuted
      setMuteStates((prev) => ({ ...prev, [index]: newMuted }))
    }
  }

  const handleMouseEnter = (index) => {
    if (isMobile) return
    const video = videoRefs.current[index]
    if (video) video.play().catch(() => {})
  }

  const handleMouseLeave = (index) => {
    if (isMobile) return
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  const openFullScreen = (index) => setActiveVideo(index)
  const closeFullScreen = () => {
    setActiveVideo(null)
    setCommentsOpen(false)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, {
        user: 'You',
        text: newComment.trim(),
        userAvatar: '/images/avatar.png',
        date: 'now'
      }])
    setNewComment('')
  }

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && closeFullScreen()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (activeVideo !== null) {
      const video = videoRefs.current[activeVideo]
      if (video) video.play().catch(() => {})
    }
  }, [activeVideo])

  return (
    <div className='wrapper travel-highlights-wrapper'>
      <div className='travel-highlights'>
        <div className='section-header'>
          <div>
            <h2 className='highlights-title'>Travel Highlights</h2>
            <p className='highlights-subtitle'>
              From mountain sunrises to night markets, these are the trips that I still dream about.
            </p>
          </div>
          <Button color='secondary'>All highlights</Button>
        </div>

        {/* === SLIDER === */}
        {!activeVideo && (
          <div className='slider-wrapper'>
            <Swiper
              modules={[Navigation, Mousewheel]}
              slidesPerView={3.5}
              spaceBetween={12}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev'
              }}
              mousewheel={{ forceToAxis: true }}
              breakpoints={{
                0: { slidesPerView: 1.3, spaceBetween: 5 },
                768: { slidesPerView: 2.2, spaceBetween: 10 },
                1024: { slidesPerView: 3.5, spaceBetween: 12 }
              }}
              className='highlights-swiper'
            >
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div
                    className='video-card'
                    onClick={() => openFullScreen(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      muted={muteStates[index]}
                      loop
                      playsInline
                      preload='metadata'
                      className='video-element'
                    >
                      <source src={video.src} type='video/mp4' />
                    </video>

                    <button
                      className={`mute-btn ${muteStates[index] ? 'muted' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMute(index)
                      }}
                    >
                      <img
                        src={
                          muteStates[index]
                            ? '/icons/unmute-white.svg'
                            : '/icons/mute-white.svg'
                        }
                        alt='Mute toggle'
                      />
                    </button>

                    <button className='play-btn'>
                      <img src='/icons/play-white.svg' alt='Play' />
                    </button>

                    <div className='highlights-video-info'>
                      <div className='highlights-author'>
                        <img
                          className='highlights-author-image'
                          src={video.userAvatar}
                          alt={video.userName}
                        />
                        <div className='highlights-author-info'>
                          <h4 className='highlights-author-name'>{video.userName}</h4>
                          <p className='highlights-author-travel-location'>{video.location}</p>
                        </div>
                      </div>

                      <div className='highlights-stats'>
                        <div className='highlights-stat-item'>
                          <img src='/icons/eye-white.svg' alt='' /> {video.views}
                        </div>
                        <div className='highlights-stat-item'>
                          <img src='/icons/heart-full-white.svg' alt='' /> {video.likes}
                        </div>
                        <div
                          className='highlights-stat-item'
                          onClick={(e) => {
                            e.stopPropagation()
                            setCommentsOpen(true)
                          }}
                        >
                          <img src='/icons/chat-white.svg' alt='' /> {video.comments}
                        </div>
                        <div className='highlights-stat-item'>
                          <img src='/icons/share-white.svg' alt='' /> {video.shares}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='slider-controls'>
              <button className='swiper-prev' aria-label='Previous slide'></button>
              <button className='swiper-next' aria-label='Next slide'></button>
            </div>
          </div>
        )}

        {/* === FULLSCREEN === */}
        {activeVideo !== null && (
          <>
            {!isMobile ? (
              // DESKTOP POPUP
              <div className='fullscreen-reel desktop'>
                <div className='fullscreen-overlay' onClick={closeFullScreen}></div>
                <div className='fullscreen-popup'>
                  <div className='fullscreen-video-section'>
                    <div className='fullscreen-video-section-inner'>
                      <video
                        ref={(el) => (videoRefs.current[activeVideo] = el)}
                        src={videos[activeVideo].src}
                        muted={muteStates[activeVideo]}
                        loop
                        playsInline
                        autoPlay
                        className='popup-video'
                        onClick={() => {
                          const vid = videoRefs.current[activeVideo]
                          if (!vid) return
                          vid.paused ? vid.play() : vid.pause()
                        }}
                      />
                      <div className='video-stats-row'>
                        <div className='video-stats-item'>
                          <img src='/icons/eye-grey.svg' alt='' /> {videos[activeVideo].views}
                        </div>
                        <div className='video-stats-item'>
                            <img src='/icons/heart-full-grey.svg' alt='' /> {videos[activeVideo].likes}
                          </div>
                        <div className='video-stats-item'>
                          <img src='/icons/chat-grey.svg' alt='' /> {videos[activeVideo].comments}
                        </div>
                        <div className='video-stats-item'>
                          <img src='/icons/share-grey.svg' alt='' /> {videos[activeVideo].shares}
                        </div>
                      </div>
                      <button
                        className={`mute-btn ${muteStates[activeVideo] ? 'muted' : ''}`}
                        onClick={() => toggleMute(activeVideo)}
                      >
                        <img
                          src={
                            muteStates[activeVideo]
                              ? '/icons/mute-white.svg'
                              : '/icons/unmute-white.svg'
                          }
                          alt='Mute toggle'
                        />
                      </button>
                    </div>
                  </div>

                  <div className='fullscreen-comments'>
                    <div className='comment-header'>
                      <div className='comment-author'>
                        <img
                          className='comment-author-avatar'
                          src={videos[activeVideo].userAvatar}
                          alt={videos[activeVideo].userName}
                        />
                        <div>
                          <h4 className='comment-author-name'>{videos[activeVideo].userName}</h4>
                          <p className='comment-author-location'>
                            <span>
                              <img className='comment-author-location-icon' src='./icons/location-grey.svg' alt='location-icon' />
                            </span>
                            {videos[activeVideo].location}
                          </p>
                        </div>
                      </div>

                      <div className='fullscreen-reel-buttons'>
                        <button className='fullscreen-reel-dots'></button>
                        <button className='fullscreen-reel-button-close' onClick={closeFullScreen}></button>
                      </div>
                    </div>

                    <div className='comments-list'>
                      {comments.map((c, i) => (
                        <div key={i} className='comment-item'>
                          <div className='comment-avatar'>
                            <img className='comment-avatar-image' src={c.userAvatar} alt='comment-avatar' />
                          </div>
                          <div className='comment-wrapper'>
                            <div className='comment-wrapper-inner'>
                              <p className='comment-title'>{c.user}</p>
                              <p className='comment-text'>{c.text}</p>
                            </div>
                              <p className='comment-date'>{c.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='comment-input'>
                      <input
                        type='text'
                        placeholder='Comment your thoughts'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      />
                      <button
                        onClick={handleAddComment}
                        className='fullscreen-reel-add-comment-button'
                      >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // MOBILE FULLSCREEN
              <div className='fullscreen-reel mobile'>
                <Swiper
                  direction='vertical'
                  slidesPerView={1}
                  onSwiper={(swiper) => swiper.slideTo(activeVideo, 0)}
                  onSlideChange={(swiper) => setActiveVideo(swiper.activeIndex)}
                  className='fullscreen-swiper'
                >
                  {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                      <div className='reel-slide'>
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={video.src}
                          muted={muteStates[index]}
                          loop
                          playsInline
                          autoPlay={index === activeVideo}
                          className='reel-video'
                          onClick={() => {
                            const vid = videoRefs.current[index]
                            if (!vid) return
                            vid.paused ? vid.play() : vid.pause()
                          }}
                        />

                        <button className='close-btn' onClick={closeFullScreen}>✕</button>
                        <button
                          className={`mute-btn ${muteStates[index] ? 'muted' : ''}`}
                          onClick={() => toggleMute(index)}
                        >
                          <img
                            src={
                              muteStates[index]
                                ? '/icons/unmute-white.svg'
                                : '/icons/mute-white.svg'
                            }
                            alt='Mute toggle'
                          />
                        </button>

                        <div className='fullscreen-reel-buttons'>
                          <button className='fullscreen-reel-button-close' onClick={closeFullScreen}></button>
                          <button className='fullscreen-reel-dots'></button>
                        </div>

                        <div className='fullscreen-actions'>
                          <div><img src='/icons/eye-white.svg' alt='' /> {videos[index].views}</div>
                          <div><img src='/icons/heart-full-white.svg' alt='' /> {videos[index].likes}</div>
                          <div
                            className='chat-trigger'
                            onClick={(e) => {
                              e.stopPropagation()
                              setCommentsOpen(true)
                            }}
                          >
                            <img src='/icons/chat-white.svg' alt='' /> {videos[index].comments}
                          </div>
                          <div><img src='/icons/share-white.svg' alt='' /> {videos[index].shares}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {commentsOpen && (
                  <div className='comments-drawer'>
                    <div className='drawer-header'>
                      <button className='comments-drawer-back-button' onClick={() => setCommentsOpen(false)}>
                        <img src='/icons/arrow-left.svg' alt='Back' />Back
                      </button>
                    </div>
                    <div className='comments-list'>
                      {comments.map((c, i) => (
                        <div key={i} className='comment-item'>
                          <strong>{c.user}:</strong> {c.text}
                        </div>
                      ))}
                    </div>
                    <div className='comment-input'>
                      <input
                        type='text'
                        placeholder='Add a comment...'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      />
                      <Button color='primary' onClick={handleAddComment}>Send</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default TravelHighlights

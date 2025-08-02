import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { useEventSwiper } from '@/hooks'
import { TEvent } from '@/types'

import './styles.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface EventSwiperProps {
  className?: string
  events: TEvent[]
  label?: string
}

export const EventSwiper = ({ className = '', events, label }: EventSwiperProps) => {
  const { swiperRef, isMobile, handleSlideChange, handleSwiper } = useEventSwiper(events)

  return (
    <div className={`event-swiper ${className}`} ref={swiperRef}>
      {label && (
        <div className="event-swiper__label">{label}</div>
      )}
      <div className="event-swiper__line" />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={3}
        navigation={
          !isMobile
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }
        pagination={
          isMobile
            ? {
                clickable: true,
                el: '.swiper-pagination',
              }
            : false
        }
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 45,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 60,
          },
        }}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiper}
      >
        {events.map((event) => (
          <SwiperSlide key={`${event.id}-${event.year}`}>
            <div className='event-card'>
              <div className='event-year'>{event.year}</div>
              <div className='event-description' title={event.description}>
                {event.description}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobile && (
        <>
          <div className='swiper-button-prev' />
          <div className='swiper-button-next' />
        </>
      )}

      {isMobile && <div className='swiper-pagination' />}
    </div>
  )
}

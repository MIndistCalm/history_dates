import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { TEvent } from '../components/EventSwiper/types'

export const useEventSwiper = (events: TEvent[]) => {
  const swiperRef = useRef<HTMLDivElement>(null)
  const prevEventsRef = useRef<TEvent[]>([])
  const isInitialMount = useRef(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    const swiperContainer = swiperRef.current
    if (!swiperContainer) return
    const allSlides = swiperContainer.querySelectorAll('.swiper-slide .event-card')
    const activeSlide = swiperContainer.querySelector('.swiper-slide-active .event-card')
    if (allSlides && isMobile) {
      gsap.set(allSlides, { opacity: 0.5 })
      if (activeSlide) {
        gsap.set(activeSlide, { opacity: 1 })
      }
    } else if (allSlides && !isMobile) {
      gsap.set(allSlides, { opacity: 1 })
    }
  }, [events, isMobile])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevEventsRef.current = events
      return
    }
    const swiperContainer = swiperRef.current
    if (!swiperContainer) return
    const eventCards = swiperContainer.querySelectorAll('.event-card')
    const fadeOutTimeline = gsap.timeline()
    fadeOutTimeline.to(eventCards, {
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        animateNewEvents()
      },
    })
    function animateNewEvents() {
      setTimeout(() => {
        const newEventCards = swiperContainer?.querySelectorAll('.event-card')
        if (newEventCards) {
          gsap.set(newEventCards, { opacity: 0 })
          gsap.to(newEventCards, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
          })
        }
      }, 100)
    }
    prevEventsRef.current = events
  }, [events])

  const handleSlideChange = useCallback(() => {
    const activeSlide = swiperRef.current?.querySelector('.swiper-slide-active .event-card')
    const allSlides = swiperRef.current?.querySelectorAll('.swiper-slide .event-card')
    if (allSlides && isMobile) {
      gsap.set(allSlides, { opacity: 0.5 })
      if (activeSlide) {
        gsap.to(activeSlide, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    } else if (allSlides && !isMobile) {
      gsap.set(allSlides, { opacity: 1 })
    }
  }, [isMobile])

  const handleSwiper = useCallback(() => {
    setTimeout(() => {
      const allSlides = swiperRef.current?.querySelectorAll('.swiper-slide .event-card')
      const activeSlide = swiperRef.current?.querySelector('.swiper-slide-active .event-card')
      if (allSlides && isMobile) {
        gsap.set(allSlides, { opacity: 0.5 })
        if (activeSlide) {
          gsap.set(activeSlide, { opacity: 1 })
        }
      } else if (allSlides && !isMobile) {
        gsap.set(allSlides, { opacity: 1 })
      }
    }, 100)
  }, [isMobile])

  return {
    swiperRef,
    isMobile,
    handleSlideChange,
    handleSwiper,
  }
}

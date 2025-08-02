import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ANGLE_STEP, defaultThemes, START_ANGLE } from '@/constants'
import { TTheme } from '@/types'

export const useHistoryDates = () => {
  const circleRef = useRef<HTMLDivElement>(null)
  const [rotationAngle, setRotationAngle] = useState(START_ANGLE)
  const [currentTheme, setCurrentTheme] = useState<TTheme>(defaultThemes[0])
  const [themes, setThemes] = useState(defaultThemes)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

  const handleClick = (index: number) => {
    setCurrentThemeIndex(index)
    setThemes((prevThemes) =>
      prevThemes.map((theme, i) => (i === index ? { ...theme, active: true } : { ...theme, active: false })),
    )

    const targetAngle = START_ANGLE - index * ANGLE_STEP
    gsap.to(
      {},
      {
        duration: 0.5,
        onUpdate: function () {
          const progress = this.progress()
          const currentAngle = rotationAngle + (targetAngle - rotationAngle) * progress
          setRotationAngle(currentAngle)
        },
        ease: 'power2.out',
      },
    )

    const selectedTheme = themes[index]
    const targetStartDate = selectedTheme.startDate
    const targetEndDate = selectedTheme.endDate

    gsap.to(
      {},
      {
        duration: 1,
        onUpdate: function () {
          const progress = this.progress()
          const currentStartDate = Math.round(
            currentTheme.startDate + (targetStartDate - currentTheme.startDate) * progress,
          )
          setCurrentTheme((prev) => ({ ...prev, startDate: currentStartDate }))
        },
        ease: 'power2.out',
      },
    )

    gsap.to(
      {},
      {
        duration: 1,
        onUpdate: function () {
          const progress = this.progress()
          const currentEndDate = Math.round(currentTheme.endDate + (targetEndDate - currentTheme.endDate) * progress)
          setCurrentTheme((prev) => ({ ...prev, endDate: currentEndDate }))
        },
        ease: 'power2.out',
      },
    )

    setCurrentTheme(selectedTheme)
  }

  const handlePrevious = () => {
    if (currentThemeIndex > 0) {
      handleClick(currentThemeIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentThemeIndex < themes.length - 1) {
      handleClick(currentThemeIndex + 1)
    }
  }

  return {
    circleRef,
    rotationAngle,
    currentTheme,
    themes,
    currentThemeIndex,
    handleClick,
    handlePrevious,
    handleNext,
  }
}

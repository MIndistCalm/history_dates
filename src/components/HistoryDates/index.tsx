import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import './styles.scss'
import { defautlThemes } from './constants'

// bring out the business logic
export const HistoryDates = () => {
  const circleRef = useRef<HTMLDivElement>(null)
  const [rotationAngle, setRotationAngle] = useState(180)
  const [startDate, setStartDate] = useState(defautlThemes[0].startDate)
  const [endDate, setEndDate] = useState(defautlThemes[0].endDate)

  const [themes, setThemes] = useState(defautlThemes)

  const handleClick = (index: number) => {
    setThemes((prevThemes) =>
      prevThemes.map((theme, i) => (i === index ? { ...theme, active: true } : { ...theme, active: false })),
    )

    // Animtion rotation circel points
    const targetAngle = 300 - index * 60
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

    // Animation date's counter
    const selectedTheme = themes[index]
    const targetStartDate = selectedTheme.startDate
    const targetEndDate = selectedTheme.endDate

    // Animation startDate
    gsap.to(
      {},
      {
        duration: 1,
        onUpdate: function () {
          const progress = this.progress()
          const currentStartDate = Math.round(startDate + (targetStartDate - startDate) * progress)
          setStartDate(currentStartDate)
        },
        ease: 'power2.out',
      },
    )

    // Animation endDate
    gsap.to(
      {},
      {
        duration: 1,
        onUpdate: function () {
          const progress = this.progress()
          const currentEndDate = Math.round(endDate + (targetEndDate - endDate) * progress)
          setEndDate(currentEndDate)
        },
        ease: 'power2.out',
      },
    )
  }

  return (
    <section className='history-container'>
      <h1 className='history-container__title'>Исторические даты</h1>

      <div className='animated-circle' ref={circleRef}>
        <div className='animated-circle__outline'></div>
        {themes.map(({ id, label, active }, index) => {
          const angle = (index * 360) / 6 + rotationAngle
          const radius = 264
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <>
              <div
                key={index}
                className={`animated-circle__point ${active ? 'hovered' : ''}`}
                data-point={index}
                data-label={label}
                onClick={() => handleClick(index)}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span>{id}</span>
              </div>
            </>
          )
        })}
        <div className='date-container'>
          <span className='date-container__start-date'>{startDate}</span>
          <span className='date-container__end-date'>{endDate}</span>
        </div>
      </div>
    </section>
  )
}

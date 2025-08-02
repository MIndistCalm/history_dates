import { useHistoryDates } from '@/hooks'
import { EventSwiper } from '../EventSwiper'
import { Navigation } from '../Navigation'
import { START_ANGLE } from './constants'
import './styles.scss'

export const HistoryDates = () => {
  const { circleRef, rotationAngle, currentTheme, themes, currentThemeIndex, handleClick, handlePrevious, handleNext } =
    useHistoryDates()

  return (
    <section className='history-container'>
      <div>
        <h1 className='history-container__title'>Исторические даты</h1>
        <Navigation
          currentIndex={currentThemeIndex + 1}
          totalItems={themes.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>

      <div className='animated-circle' ref={circleRef}>
        <div className='animated-circle__outline'></div>
        {themes.map(({ id, label, active }, index) => {
          const angle = (index * 360 - START_ANGLE) / 6 + rotationAngle
          const radius = 264
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
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
          )
        })}
      </div>

      <div className='date-container'>
        <span className='date-container__start-date'>{currentTheme.startDate}</span>
        <span className='date-container__end-date'>{currentTheme.endDate}</span>
      </div>

      <EventSwiper events={currentTheme.events} />
    </section>
  )
}

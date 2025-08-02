import './styles.scss'

export interface NavigationProps {
  currentIndex: number
  totalItems: number
  disabled?: boolean
  onPrevious: () => void
  onNext: () => void
}

export const Navigation = ({ currentIndex, totalItems, onPrevious, onNext, disabled = false }: NavigationProps) => {
  const isPreviousDisabled = currentIndex <= 1 || disabled
  const isNextDisabled = currentIndex >= totalItems || disabled

  const formatCounter = (current: number, total: number) => {
    const currentStr = current.toString().padStart(2, '0')
    const totalStr = total.toString().padStart(2, '0')
    return `${currentStr}/${totalStr}`
  }

  return (
    <div className='navigation-button'>
      <div className='navigation-button__counter'>{formatCounter(currentIndex, totalItems)}</div>

      <div className='navigation-button__controls'>
        <button
          className={`navigation-button__btn navigation-button__btn--prev ${
            isPreviousDisabled ? 'navigation-button__btn--disabled' : ''
          }`}
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          aria-label='Предыдущий'
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.5 3L4.5 6L7.5 9'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <button
          className={`navigation-button__btn navigation-button__btn--next ${
            isNextDisabled ? 'navigation-button__btn--disabled' : ''
          }`}
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label='Следующий'
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M4.5 3L7.5 6L4.5 9'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

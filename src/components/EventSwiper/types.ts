export type TEvent = {
  id: number
  year: number
  description: string
}

export interface EventSwiperProps {
  className?: string
  events: TEvent[]
} 
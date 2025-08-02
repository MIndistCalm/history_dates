import { TEvent } from './eventSwiper.types'

export interface TTheme {
  id: number
  label: string
  active: boolean
  startDate: number
  endDate: number
  events: TEvent[]
}

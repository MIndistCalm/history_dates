export type TTheme = {
  id: number
  label: string
  active: boolean
  startDate: number
  endDate: number
  events: {
    id: number
    year: number
    description: string
  }[]
}

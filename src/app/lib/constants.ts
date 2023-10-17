import { type TimerProps } from './types'

// minutes to milliseconds
export const DEFAULT_TIME: Record<TimerProps, number> = {
  pomodoro: 25 * 60 * 1000,
  break: 5 * 60 * 1000,
  custom: 0.5 * 60 * 1000
}

export const DEFAULT_TIME_TYPE = {
  pomodoro: 'pomodoro',
  break: 'break',
  custom: 'custom'
}

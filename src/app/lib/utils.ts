import { type ClassValue, clsx } from 'clsx'
import { type ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function alarmNotification () {
  const audio = new Audio('/alarm.mp3')
  audio.volume = 0.5
  void audio.play()
}

export const getTimeFormat = (time: number) => ({
  minutes: () => {
    return Math.floor(time / 1000 / 60).toString().padStart(2, '0')
  },
  seconds: () => {
    return (Math.floor(time / 1000) % 60).toString().padStart(2, '0')
  }
})

export function invertTimeValue ({ time, maxValue }: { time: number, maxValue: number }) {
  return maxValue - time
}

export const centerRectOnScreen = (targetWidth: number, targetHeight: number) => {
  const left = (window.innerWidth - targetWidth) / 2 + window.screenLeft
  const top = (window.innerHeight - targetHeight) / 4 + window.screenTop
  return { width: targetWidth, height: targetHeight, left, top }
}

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString()
  const queryString = `${(paramsString.length !== 0) ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export function browserNotification () {
  void Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      const notification = new Notification('Timer', {
        body: 'Time is up!, go to take a break'
      })
      notification.onclick = () => {
        window.focus()
      }
    }
  })
}

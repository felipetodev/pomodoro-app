import { useState, useEffect } from 'react'
import { alarmNotification } from '../lib/utils'
import { DEFAULT_TIME } from '../lib/constants'
import { type TimerProps } from '../lib/types'

let interval: any

export function useTimer ({ variant }: { variant: TimerProps }) {
  const [notification, setNotification] = useState(() => {
    const notification = global.localStorage.getItem('notification')
    return notification === 'true'
  })
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(DEFAULT_TIME[variant])

  const resetTimer = () => {
    setTime(DEFAULT_TIME[variant])
    setPlaying(false)
    clearInterval(interval)
  }

  useEffect(() => {
    // set broadcast channel to sync timer
    const bc = new BroadcastChannel('timer')
    bc.onmessage = (e) => {
      setTime(e.data)
    }
  }, [])

  useEffect(() => {
    resetTimer()
  }, [variant])

  const handlePlay = () => {
    setPlaying(true)
    const bc = new BroadcastChannel('timer')

    if (time === 0) setTime(DEFAULT_TIME[variant])

    interval = setInterval(() => {
      setTime((time) => {
        if (time <= 1000) {
          clearInterval(interval)
          setPlaying(false)
          setTime(0)

          if (notification) {
            alarmNotification()
          }

          return 0
        }
        bc.postMessage(time - 1000)
        return time - 1000
      })
    }, 1000)
  }

  const handlePause = () => {
    setPlaying(false)
    clearInterval(interval)
  }

  const handleNotification = (val: boolean) => {
    setNotification(val)
    global.localStorage.setItem('notification', val.toString())
  }

  const handleCustomTime = (type: 'plus' | 'minus') => {
    if (time === 0 && type === 'minus') return
    if (type === 'plus') setTime((time) => time + 10000)
    else if (type === 'minus') setTime((time) => time - 10000)
  }

  return {
    time,
    playing,
    notification,
    handlePlay,
    handlePause,
    handleReset: resetTimer,
    handleNotification,
    handleCustomTime
  }
}

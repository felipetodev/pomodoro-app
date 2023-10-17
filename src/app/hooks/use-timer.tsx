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

  useEffect(() => {
    // set broadcast channel to sync timer
    const bc = new BroadcastChannel('timer')
    bc.onmessage = (e) => {
      setTime(e.data)
    }
  }, [])

  useEffect(() => {
    // reset timer when variant changes
    setTime(DEFAULT_TIME[variant])
    setPlaying(false)
    clearInterval(interval)
  }, [variant])

  const handlePlay = () => {
    setPlaying(true)
    const bc = new BroadcastChannel('timer')

    interval = setInterval(() => {
      setTime((time) => {
        if (time <= 1000) {
          clearInterval(interval)
          setPlaying(false)
          setTime(DEFAULT_TIME[variant])

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

  return {
    time,
    playing,
    notification,
    handlePlay,
    handlePause,
    handleNotification
  }
}

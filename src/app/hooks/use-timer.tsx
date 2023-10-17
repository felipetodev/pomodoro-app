import { useState, useEffect } from 'react'
import { DEFAULT_TIME } from '../lib/constants'
import { type TimerProps } from '../lib/types'

let interval: any

export function useTimer ({ variant }: { variant: TimerProps }) {
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
          bc.postMessage(0)
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

  return {
    handlePlay,
    handlePause,
    playing,
    time
  }
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CircularProgress from './ui/circular-progress'
import ShareCounter from './ui/share'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { PauseCircleIcon, PlayCircleIcon } from 'lucide-react'
import { DEFAULT_TIME } from '../lib/constants'
import { getTimeFormat } from '../lib/utils'

import { type TimerProps } from '../lib/types'

let interval: any

function Timer ({ variant }: { variant: TimerProps }) {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(DEFAULT_TIME[variant])
  const searchParams = useSearchParams()
  const hasVariant = searchParams?.get('timer') ?? ''

  useEffect(() => {
    // reset timer when variant changes
    setTime(DEFAULT_TIME[variant])
    setPlaying(false)
    clearInterval(interval)
  }, [variant])

  useEffect(() => {
    // set broadcast channel to sync timer
    const bc = new BroadcastChannel('timer')
    bc.onmessage = (e) => {
      setTime(e.data)
    }
  }, [])

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

  return (
    <div className='flex flex-col'>
      <Slider
        draggable={false}
        value={[time]}
        max={DEFAULT_TIME[variant]}
        min={0}
        className="w-[400px]"
      />

      <CircularProgress
        time={time}
        maxValue={DEFAULT_TIME?.[hasVariant as TimerProps] ?? DEFAULT_TIME[variant]}
      >
        <time className='text-6xl mx-auto w-[168px]'>
          {getTimeFormat(time).minutes()}:{getTimeFormat(time).seconds()}
        </time>
      </CircularProgress>
      <div className='flex mx-auto'>
        {playing
          ? (

            <Button size='lg' className='text-4xl' onClick={handlePause}>
              PAUSE <PauseCircleIcon className='ml-2 w-8 h-8' />
            </Button>
            )
          : (
            <Button size='lg' className='text-4xl' onClick={handlePlay}>
              START <PlayCircleIcon className='ml-2 w-8 h-8' />
            </Button>
            )}
      </div>
      <ShareCounter />
    </div>
  )
}

export default Timer

import { useSearchParams } from 'next/navigation'
import CircularProgress from './ui/circular-progress'
import { Slider } from './ui/slider'
import Controls from './controls'
import ConfigBar from './config-bar'
import { useTimer } from '../hooks/use-timer'
import { DEFAULT_TIME } from '../lib/constants'
import { getTimeFormat } from '../lib/utils'

import { type TimerProps } from '../lib/types'

function Timer ({ variant }: { variant: TimerProps }) {
  const {
    playing,
    time,
    notification,
    handlePlay,
    handlePause,
    handleNotification
  } = useTimer({ variant })
  const searchParams = useSearchParams()
  const hasVariant = searchParams?.get('timer') ?? ''

  return (
    <div className='flex flex-col'>
      <Slider
        draggable={false}
        value={[time]}
        max={DEFAULT_TIME[variant]}
        min={0}
        className="w-full sm:w-[400px]"
      />
      <ConfigBar
        notification={notification}
        handleNotification={handleNotification}
      />
      <CircularProgress
        time={time}
        maxValue={DEFAULT_TIME?.[hasVariant as TimerProps] ?? DEFAULT_TIME[variant]}
      >
        <time className='text-6xl mx-auto w-[168px]'>
          {getTimeFormat(time).minutes()}:{getTimeFormat(time).seconds()}
        </time>
      </CircularProgress>
      <Controls
        playing={playing}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    </div>
  )
}

export default Timer

import { PauseCircleIcon, PlayCircleIcon, TimerReset } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
  playing: boolean
  handlePlay: () => void
  handlePause: () => void
  handleReset: () => void
}

function Controls ({ playing, handlePlay, handlePause, handleReset }: Props) {
  return (
    <div className='flex mx-auto gap-x-2'>
      {playing
        ? (
          <Button size='lg' className='text-2xl sm:text-4xl' onClick={handlePause}>
            PAUSE <PauseCircleIcon className='ml-2 w-6 h-6 sm:w-8 sm:h-8' />
          </Button>
          )
        : (
          <Button size='lg' className='text-2xl sm:text-4xl' onClick={handlePlay}>
            START <PlayCircleIcon className='ml-2 w-6 h-6 sm:w-8 sm:h-8' />
          </Button>
          )}
      <Button className='h-11' onClick={handleReset}>
        <TimerReset className='w-6 h-6 sm:w-8 sm:h-8' />
      </Button>
    </div>
  )
}

export default Controls

import {
  CircularProgressbarWithChildren as CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { invertTimeValue } from '../../lib/utils'

interface Props {
  time: number
  maxValue: number
  children: React.ReactNode
}

function CircularProgress ({ time, maxValue, children }: Props) {
  return (
    <div className='w-60 h-60 sm:w-72 sm:h-72 mx-auto my-8 sm:my-10'>
      <CircularProgressbar
        styles={buildStyles({
          pathColor: 'hsl(var(--primary))'
        })}
        value={invertTimeValue({ time, maxValue })}
        maxValue={maxValue}
      >
        {children}
      </CircularProgressbar>
    </div>
  )
}

export default CircularProgress

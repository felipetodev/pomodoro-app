import { Button } from './ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'

type Props = {
  isCustom: boolean
  handleCustomTime: (type: 'plus' | 'minus') => void
}

function CustomControls ({ isCustom, handleCustomTime }: Props) {
  return (
    <>
      {isCustom
        ? (
          <div className='flex justify-between w-full absolute bottom-20'>
            <Button variant='secondary' className='h-7 px-1' onClick={() => { handleCustomTime('minus') }}>
              <MinusIcon />
            </Button>
            <Button variant='secondary' className='h-7 px-1' onClick={() => { handleCustomTime('plus') }}>
              <PlusIcon />
            </Button>
          </div>
          )
        : null}
    </>
  )
}

export default CustomControls

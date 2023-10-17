import { Share } from 'lucide-react'
import { Button } from './ui/button'
import { centerRectOnScreen } from '../lib/utils'
import { useSearchParams } from 'next/navigation'

function ShareCounter () {
  const searchParams = useSearchParams()
  const variant = searchParams?.get('timer') ?? 'pomodoro'

  const handleWindow = () => {
    const { width, height, left, top } = centerRectOnScreen(350, 350)

    window.open(
      `${window.location.origin}${(variant !== '') ? `?timer=${variant}` : ''}`,
      'popup',
      `width=${width},height=${height},top=${top},left=${left}`
    )
  }

  return (
    <div>
      <Button onClick={handleWindow}>
        <Share size={24} />
      </Button>
    </div>
  )
}

export default ShareCounter
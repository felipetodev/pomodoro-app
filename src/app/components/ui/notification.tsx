import { BellOff, BellRing } from 'lucide-react'
import { Button } from './button'

type Props = {
  notification: boolean
  handleNotification: () => void
}

function Notification ({ notification, handleNotification }: Props) {
  return (
    <div>
      <Button size='sm' variant='outline' onClick={handleNotification}>
        {notification ? <BellRing /> : <BellOff />}
      </Button>
    </div>
  )
}

export default Notification

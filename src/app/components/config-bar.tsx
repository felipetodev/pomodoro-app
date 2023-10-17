import Notification from './ui/notification'
import ShareCounter from './ui/share'

type Props = {
  notification: boolean
  handleNotification: (val: boolean) => void
}

function ConfigBar ({ notification, handleNotification }: Props) {
  return (
    <div className='flex justify-between pt-2'>
      <ShareCounter />
      <Notification
        notification={notification}
        handleNotification={() => {
          if (notification) {
            const audio = new Audio('/stop.mp3')
            void audio.play()
          } else {
            const audio = new Audio('/notification.mp3')
            void audio.play()
          }
          handleNotification(!notification)
        }}
      />
    </div>
  )
}

export default ConfigBar

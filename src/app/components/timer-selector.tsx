import { useRouter, useSearchParams } from 'next/navigation'
import Timer from './timer'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from './ui/tabs'
import { createUrl } from '../lib/utils'
import { DEFAULT_TIME } from '../lib/constants'

import { type TimerProps } from '../lib/types'

function TimerSelector () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString())
  return (
    <Tabs defaultValue="pomodoro" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="pomodoro"
          onClick={() => {
            newParams.delete('timer')
            router.push(createUrl('/', newParams))
          }}
        >
          Pomodoro
        </TabsTrigger>
        <TabsTrigger
          value="break"
          onClick={() => {
            newParams.set('timer', 'break')
            router.push(createUrl('/', newParams))
          }}
        >
          Short Break
        </TabsTrigger>
        <TabsTrigger
          value="custom"
          onClick={() => {
            newParams.set('timer', 'custom')
            router.push(createUrl('/', newParams))
          }}
        >
          Custom
        </TabsTrigger>
      </TabsList>
      {Object.keys(DEFAULT_TIME).map((key) => (
        <TabsContent key={key} value={key}>
          <Timer variant={key as TimerProps} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TimerSelector

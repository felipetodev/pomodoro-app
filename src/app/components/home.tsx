'use client'

import TimerSelector from './timer-selector'

function Home () {
  return (
    <main className="grid place-content-center h-screen">
      <h1 className="text-4xl">Pomodoro App</h1>
      <div className='bg-red-500/50 p-4 rounded-xl'>
        <TimerSelector />
      </div>
    </main>
  )
}

export default Home

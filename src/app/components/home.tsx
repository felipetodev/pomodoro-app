'use client'

import TimerSelector from './timer-selector'

function Home () {
  return (
    <main className="grid place-content-center h-[calc(100vh-50px)]">
      <div className='bg-red-500/50 p-4 rounded-xl'>
        <TimerSelector />
      </div>
    </main>
  )
}

export default Home

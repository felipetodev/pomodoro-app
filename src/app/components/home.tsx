'use client'

import Timer from './timer'

function Home () {
  return (
    <main className="grid place-content-center h-screen">
      <h1 className="text-4xl">Pomodoro App</h1>
      <Timer />
    </main>
  )
}

export default Home

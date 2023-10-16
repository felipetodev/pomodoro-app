import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TailwindIndicator } from './components/tailwind-indicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pomodoro App',
  description: 'Pomodoro App | time to focus!'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
        <TailwindIndicator />
      </body>
    </html>
  )
}

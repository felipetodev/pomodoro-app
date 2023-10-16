import { GithubIcon, Shapes } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { cn } from '../lib/utils'
import Link from 'next/link'

function Navbar () {
  return (
    <nav className="flex items-center h-[50px] border-b max-w-lg mx-auto">
      <Link href="/" className='flex items-center'>
        <Shapes className="w-8 h-8 mr-2" />
        <h1>Pomodoro.app</h1>
      </Link>
      <a
        target='_blank'
        href='https://github.com/felipetodev/pomodoro-app'
        className={cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'ml-auto')}
        rel="noreferrer"
      >
        <GithubIcon className="w-5 h-5" />
      </a>
    </nav>
  )
}

export default Navbar

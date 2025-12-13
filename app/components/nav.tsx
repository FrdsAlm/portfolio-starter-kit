'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const pathname = usePathname()
  const isBlog = pathname?.startsWith('/blog')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret shortcut: Ctrl/Cmd + Shift + S -> Go to Studio
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        window.location.href = '/studio'
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className="mb-16">
      <div className="flex items-center justify-between">
        {/* Profile / Blog Toggle */}
        <div className="relative inline-flex items-center h-10 rounded-full border border-neutral-300 dark:border-white p-1">
          {/* Slider Background */}
          <div
            className={`
              absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-in-out
              bg-neutral-800 dark:bg-white
              ${isBlog ? 'translate-x-[100%]' : 'translate-x-0'}
            `}
          />

          {/* Profile Link */}
          <Link
            href="/"
            className={`
              relative z-10 w-20 text-center text-sm font-medium transition-colors duration-300
              ${!isBlog
                ? 'text-white dark:text-black'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
              }
            `}
          >
            Profile
          </Link>

          {/* Blog Link */}
          <Link
            href="/blog"
            className={`
              relative z-10 w-20 text-center text-sm font-medium transition-colors duration-300
              ${isBlog
                ? 'text-white dark:text-black'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
              }
            `}
          >
            Blog
          </Link>
        </div>

        {/* Theme Toggle - Right side */}
        <ThemeToggle />
      </div>
    </nav>
  )
}

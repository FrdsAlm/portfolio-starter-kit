'use client';

import Link from 'next/link'
import { useState } from 'react'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Blog',
  },
  'https://firdous.dev': {
    name: 'Dev Website',
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="mb-16">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none group"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Menu Items - Horizontal beside hamburger */}
        <div className={`
          flex items-center space-x-6 overflow-hidden transition-all duration-500 ease-out
          ${isOpen ? 'max-w-md opacity-100' : 'max-w-0 opacity-0'}
        `}>
          {Object.entries(navItems).map(([path, { name }], index) => {
            const isExternal = path.startsWith('http')

            return (
              <Link
                key={path}
                href={path}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className={`
                  text-gray-700 dark:text-gray-300 hover:text-[var(--color-teal-blue)] dark:hover:text-[var(--color-electric-green)]
                  font-medium transition-all duration-300 ease-out whitespace-nowrap
                  hover:scale-105 transform
                  ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                `}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

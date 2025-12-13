'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check initial theme from html class or localStorage
        const storedTheme = localStorage.getItem('theme')
        const htmlHasDark = document.documentElement.classList.contains('dark')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (storedTheme === 'dark' || (!storedTheme && prefersDark) || htmlHasDark) {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)

        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    if (!mounted) {
        return <div className="w-14 h-8" /> // Placeholder
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative h-8 w-14 rounded-full border-2 transition-colors duration-300 focus:outline-none
                ${isDark
                    ? 'bg-transparent border-white'
                    : 'bg-white border-slate-300'
                }
            `}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="sr-only">{isDark ? "Dark Mode" : "Light Mode"}</span>

            {/* Knob */}
            <div
                className={`
                    absolute top-0.5 left-0.5 h-6 w-6 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center
                    ${isDark
                        ? 'translate-x-6 bg-white text-black'
                        : 'translate-x-0 bg-slate-500 text-white'
                    }
                `}
            >
                {isDark ? (
                    // Sun Icon (Active/Dark State)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                ) : (
                    // Moon Icon (Inactive/Light State)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                )}
            </div>
        </button>
    )
}

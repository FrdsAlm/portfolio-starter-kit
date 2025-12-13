'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system')
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem('theme') as Theme | null
        if (stored) {
            setTheme(stored)
        }
    }, [])

    useEffect(() => {
        if (!mounted) return

        const root = document.documentElement

        const applyTheme = (resolvedTheme: 'light' | 'dark') => {
            root.classList.remove('light', 'dark')
            root.classList.add(resolvedTheme)
            setResolvedTheme(resolvedTheme)
        }

        if (theme === 'system') {
            const media = window.matchMedia('(prefers-color-scheme: dark)')
            applyTheme(media.matches ? 'dark' : 'light')

            const listener = (e: MediaQueryListEvent) => {
                applyTheme(e.matches ? 'dark' : 'light')
            }
            media.addEventListener('change', listener)
            return () => media.removeEventListener('change', listener)
        } else {
            applyTheme(theme)
        }
    }, [theme, mounted])

    useEffect(() => {
        if (mounted && theme !== 'system') {
            localStorage.setItem('theme', theme)
        } else if (mounted && theme === 'system') {
            localStorage.removeItem('theme')
        }
    }, [theme, mounted])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        // Return safe defaults during SSR or when not in provider
        return {
            theme: 'system' as Theme,
            resolvedTheme: 'dark' as const,
            setTheme: () => { },
        }
    }
    return context
}

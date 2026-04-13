import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    set({ theme: next })
  },
}))

// Initialize on load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initial = prefersDark ? 'dark' : 'light'
document.documentElement.classList.toggle('dark', initial === 'dark')
useThemeStore.setState({ theme: initial })

/**
 * Единая логика стартовой темы (inline в index.html дублирует её для первого кадра).
 * Порядок: query ?theme= → localStorage → prefers-color-scheme → light.
 * Так инструменты вроде html-to-design / Figma видят тёмную тему, если у среды dark
 * или если открыть превью с ?theme=dark.
 */
export function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const q = new URLSearchParams(window.location.search).get('theme')
    if (q === 'dark' || q === 'light') return q
    const stored = localStorage.getItem('tiho-theme')
    if (stored === 'dark' || stored === 'light') return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    /* ignore */
  }
  return 'light'
}

export function applyThemeToDocument(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
}

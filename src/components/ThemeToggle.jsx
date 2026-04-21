import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext.jsx'
import './ThemeToggle.css'

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={`theme-toggle ${compact ? 'theme-toggle--compact' : ''}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      role="switch"
      aria-checked={isDark}
    >
      <span className="theme-toggle__label">
        <span className={!isDark ? 'active' : ''}>День</span>
        <span className={isDark ? 'active' : ''}>Ночь</span>
      </span>

      <span className="theme-toggle__track">
        <motion.span
          className="theme-toggle__thumb"
          initial={false}
          animate={{ x: isDark ? 30 : 0 }}
          transition={{ type: 'spring', stiffness: 520, damping: 32 }}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </g>
            </svg>
          )}
        </motion.span>
      </span>
    </button>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, LifeBuoy, BookOpen } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="nf"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="nf__header">
        <Logo />
        <ThemeToggle />
      </header>

      <div className="nf__body">
        <motion.div
          className="nf__art"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="nf__planet"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="nf__ring"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <div className="nf__code">404</div>
          <div className="nf__stars">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                style={{
                  top: `${(i * 37) % 100}%`,
                  left: `${(i * 53) % 100}%`,
                  animationDelay: `${(i % 6) * 0.4}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="nf__copy">
          <span className="badge badge-lavender">404 · страница не найдена</span>
          <h1>Здесь тихо.
            <br />Слишком тихо.
          </h1>
          <p>
            Кажется, такой страницы у нас нет — или она переехала. Давай вернёмся
            к тому, что помогает: к твоему дневнику, библиотеке или главному
            экрану.
          </p>

          <div className="nf__cta">
            <button className="btn btn-secondary btn-lg" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
              Назад
            </button>
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={20} />
              На главную
            </Link>
          </div>

          <ul className="nf__links">
            <li>
              <Link to="/app/library">
                <BookOpen size={18} />
                <div>
                  <strong>Открыть библиотеку</strong>
                  <span>подборка практик на сегодня</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/app/diary">
                <LifeBuoy size={18} />
                <div>
                  <strong>Записать состояние</strong>
                  <span>20 секунд — и тебе станет легче</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <footer className="nf__footer muted">
        Если страница должна была открыться — напиши нам на{' '}
        <a href="mailto:hi@tiho.app">hi@tiho.app</a>
      </footer>
    </motion.div>
  )
}

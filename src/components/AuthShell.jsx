import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { Shield, Sparkles, Users } from 'lucide-react'
import { mascotFriends } from '../assets/illustrations.js'
import './AuthShell.css'

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <aside className="auth__aside">
        <div className="auth__aside-top">
          <Logo inverse />
        </div>

        <div className="auth__aside-body">
          <h2>Тихий вечер начинается с одной записи.</h2>
          <p>
            Присоединяйся к сообществу людей, которые возвращают своё внимание из
            бесконечных лент — обратно в реальную жизнь.
          </p>

          <div className="auth__features">
            <div className="auth__feature">
              <span className="auth__feature-icon">
                <Sparkles size={18} />
              </span>
              <div>
                <strong>Тёплый интерфейс</strong>
                <p>Никаких красных цифр и стыдящих статистик.</p>
              </div>
            </div>
            <div className="auth__feature">
              <span className="auth__feature-icon">
                <Shield size={18} />
              </span>
              <div>
                <strong>Данные только твои</strong>
                <p>Не передаются рекламодателям, шифруются на устройстве.</p>
              </div>
            </div>
            <div className="auth__feature">
              <span className="auth__feature-icon">
                <Users size={18} />
              </span>
              <div>
                <strong>Поддержка рядом</strong>
                <p>Только близкие, кого ты сам добавил в круг.</p>
              </div>
            </div>
          </div>

          <div className="auth__photo">
            <img src={mascotFriends} alt="" />
          </div>
        </div>

        <div className="auth__aside-foot">
          <span>© 2026 Тихо</span>
          <Link to="/terms">Соглашение</Link>
          <Link to="/privacy">Конфиденциальность</Link>
        </div>
      </aside>

      <section className="auth__main">
        <header className="auth__main-head">
          <Link to="/" className="link-btn">
            ← На главную
          </Link>
          <ThemeToggle />
        </header>

        <motion.div
          className="auth__card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>{title}</h1>
          {subtitle && <p className="auth__subtitle">{subtitle}</p>}
          {children}
        </motion.div>

        {footer && <div className="auth__footer">{footer}</div>}
      </section>
    </motion.div>
  )
}

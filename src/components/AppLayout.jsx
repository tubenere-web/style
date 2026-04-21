import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Activity,
  BookHeart,
  Users,
  BookOpen,
  Settings,
  Bell,
  LogOut,
  Smartphone,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './AppLayout.css'

const navItems = [
  { to: '/app/dashboard', label: 'Главная', short: 'главная', icon: LayoutDashboard },
  { to: '/app/tracker', label: 'Трекер состояния', short: 'трекер', icon: Activity },
  { to: '/app/diary', label: 'Дневник эмоций', short: 'дневник', icon: BookHeart },
  { to: '/app/friends', label: 'Друзья', short: 'друзья', icon: Users },
  { to: '/app/library', label: 'Библиотека', short: 'материалы', icon: BookOpen },
]

export default function AppLayout() {
  const navigate = useNavigate()

  return (
    <div className="app-root app-layout">
      <aside className="app-sidebar">
        <div className="app-sidebar__top">
          <Logo />
        </div>

        <nav className="app-sidebar__nav" aria-label="Главное меню">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                'nav-item' + (isActive ? ' nav-item--active' : '')
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="app-sidebar__bottom">
          <NavLink to="/mobile" className="nav-item nav-item--muted">
            <Smartphone size={20} strokeWidth={1.8} />
            <span>Мобильная&nbsp;версия</span>
          </NavLink>
          <NavLink to="/app/settings" className="nav-item nav-item--muted">
            <Settings size={20} strokeWidth={1.8} />
            <span>Настройки</span>
          </NavLink>

          <div className="app-sidebar__card">
            <div className="dot-pulse" aria-hidden="true" />
            <div>
              <div className="app-sidebar__card-title">Практика&nbsp;дня</div>
              <div className="app-sidebar__card-sub">
                Дыхание 4–7–8, три минуты без&nbsp;экрана
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="app-topbar__logo">
            <Logo size="sm" to={null} />
          </div>

          <div className="app-topbar__right">
            <ThemeToggle />
            <motion.button
              className="icon-btn"
              whileTap={{ scale: 0.94 }}
              aria-label="Уведомления"
            >
              <Bell size={20} strokeWidth={1.8} />
              <span className="icon-btn__dot" />
            </motion.button>

            <button
              className="app-user"
              onClick={() => navigate('/app/settings')}
              aria-label="Профиль"
            >
              <span className="app-user__avatar" aria-hidden="true">
                <span>ВК</span>
              </span>
              <span className="app-user__meta">
                <span className="app-user__name">Вика Коваль</span>
                <span className="app-user__role">наблюдатель 14 дней</span>
              </span>
            </button>

            <button
              className="icon-btn icon-btn--quiet app-logout"
              aria-label="Выйти"
              onClick={() => navigate('/login')}
            >
              <LogOut size={19} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <main className="app-content">
          <Outlet />
        </main>

        <nav className="app-tabbar" aria-label="Быстрая навигация">
          {navItems.map(({ to, short, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                'app-tab' + (isActive ? ' app-tab--active' : '')
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{short}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

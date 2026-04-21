import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Home,
  Activity,
  BookHeart,
  BookOpen,
  Plus,
  Bell,
  Bookmark,
  ChevronRight,
  Moon,
  Smartphone,
  Clock,
  Play,
  Headphones,
  Image as ImageIcon,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import './MobileShowcase.css'

export default function MobileShowcase() {
  return (
    <div className="ms">
      <header className="ms__header">
        <Logo />
        <nav className="ms__nav">
          <Link to="/" className="link-btn">
            <ArrowLeft size={16} /> На главную
          </Link>
          <Link to="/#pl-4" className="link-btn">
            Интерактивное демо
          </Link>
        </nav>
        <ThemeToggle />
      </header>

      <section className="ms__intro">
        <span className="badge badge-lavender">
          <Smartphone size={14} /> адаптив 375×812
        </span>
        <h1>Мобильная версия «Тихо»</h1>
        <p>
          Те же экраны в кармане — доступ к трекеру, дневнику и библиотеке на
          ходу. Ниже показаны 4 ключевых экрана в светлой теме и их тёмная
          версия. Дизайн учитывает one-hand-reach зоны и тихие цвета без
          раздражающих акцентов.
        </p>
      </section>

      <section className="ms__row">
        <header className="ms__row-head">
          <h2>Основная (светлая) тема</h2>
          <span className="muted">4 экрана · iPhone 14 / Pixel 7</span>
        </header>
        <div className="ms__phones">
          <Phone theme="light" label="Главная">
            <MobileDashboard />
          </Phone>
          <Phone theme="light" label="Трекер состояния">
            <MobileTracker />
          </Phone>
          <Phone theme="light" label="Дневник эмоций">
            <MobileDiary />
          </Phone>
          <Phone theme="light" label="Библиотека">
            <MobileLibrary />
          </Phone>
        </div>
      </section>

      <section className="ms__row ms__row--dark">
        <header className="ms__row-head">
          <h2>Тёмная тема</h2>
          <span className="muted">4 экрана · OLED-friendly</span>
        </header>
        <div className="ms__phones">
          <Phone theme="dark" label="Главная">
            <MobileDashboard />
          </Phone>
          <Phone theme="dark" label="Трекер состояния">
            <MobileTracker />
          </Phone>
          <Phone theme="dark" label="Дневник эмоций">
            <MobileDiary />
          </Phone>
          <Phone theme="dark" label="Библиотека">
            <MobileLibrary />
          </Phone>
        </div>
      </section>

      <footer className="ms__footer muted">
        Все макеты интерактивны: каждый телефон имеет независимую цветовую схему
        через токены `data-theme`. Размеры рассчитаны по 8-pt сетке, минимальный
        шрифт — 15 px.
      </footer>
    </div>
  )
}

function Phone({ theme, label, children }) {
  return (
    <motion.div
      className="phone"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
    >
      <div className="phone__frame" data-theme={theme}>
        <div className="phone__notch" />
        <div className="phone__status">
          <span>9:41</span>
          <span className="phone__status-right">
            <span className="phone__signal" />
            <span className="phone__wifi" />
            <span className="phone__battery" />
          </span>
        </div>
        <div className="phone__screen">{children}</div>
        <div className="phone__home" />
      </div>
      <div className="phone__label">{label}</div>
    </motion.div>
  )
}

/* ================= Mobile screens ================= */

function MobileDashboard() {
  return (
    <div className="m-screen">
      <div className="m-top">
        <div>
          <div className="m-hello muted">вторник, 21 апреля</div>
          <h3 className="m-title">Доброе утро, Вика</h3>
        </div>
        <div className="m-top-actions">
          <button className="m-icon" aria-label="Уведомления">
            <Bell size={16} />
            <span className="m-dot" />
          </button>
        </div>
      </div>

      <div className="m-kpi-row">
        <div className="m-kpi m-kpi--primary">
          <span>тревога</span>
          <strong>3.2</strong>
          <small>−18%</small>
        </div>
        <div className="m-kpi m-kpi--accent">
          <span>настрой</span>
          <strong>7.4</strong>
          <small>+12%</small>
        </div>
        <div className="m-kpi m-kpi--lavender">
          <span>экран</span>
          <strong>3:48</strong>
          <small>−42 мин</small>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card__head">
          <strong>Настроение × экран</strong>
          <span className="muted">неделя</span>
        </div>
        <svg viewBox="0 0 260 90" className="m-chart">
          <defs>
            <linearGradient id="mg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 70 C 30 60, 50 45, 80 52 C 110 60, 130 25, 160 32 C 190 40, 210 20, 260 28"
            stroke="var(--primary)"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M0 70 C 30 60, 50 45, 80 52 C 110 60, 130 25, 160 32 C 190 40, 210 20, 260 28 L 260 90 L 0 90 Z"
            fill="url(#mg)"
          />
        </svg>
        <div className="m-chart-x muted">
          <span>пн</span>
          <span>вт</span>
          <span>ср</span>
          <span>чт</span>
          <span>пт</span>
          <span>сб</span>
          <span>вс</span>
        </div>
      </div>

      <div className="m-task">
        <span className="m-task__icon">
          <Moon size={14} />
        </span>
        <div>
          <strong>Прогулка без телефона</strong>
          <span className="muted">20 минут · сейчас</span>
        </div>
        <button className="m-pill m-pill--primary">Начать</button>
      </div>

      <MobileTabbar active="home" />
    </div>
  )
}

function MobileTracker() {
  return (
    <div className="m-screen">
      <div className="m-top">
        <div>
          <div className="m-hello muted">утро, 9:12</div>
          <h3 className="m-title">Как ты сейчас?</h3>
        </div>
      </div>

      <div className="m-mood-row">
        {[
          { i: '☀', l: 'ясно', c: 'var(--accent)', a: true },
          { i: '✦', l: 'фокус', c: 'var(--primary)' },
          { i: '☁', l: 'устало', c: 'var(--lavender)' },
          { i: '⚡', l: 'тревожно', c: 'var(--coral)' },
        ].map((m) => (
          <div
            key={m.l}
            className={`m-mood ${m.a ? 'm-mood--active' : ''}`}
            style={{ '--c': m.c }}
          >
            <span>{m.i}</span>
            <small>{m.l}</small>
          </div>
        ))}
      </div>

      <div className="m-card">
        <div className="m-card__head">
          <strong>Тревога</strong>
          <span className="muted">3 / 10</span>
        </div>
        <div className="m-range" />
        <div className="muted m-range-legend">
          <span>спокойно</span>
          <span>тревожно</span>
        </div>
      </div>

      <div className="m-card">
        <div className="m-card__head">
          <strong>Энергия</strong>
          <span className="muted">7 / 10</span>
        </div>
        <div className="m-range m-range--energy" />
        <div className="muted m-range-legend">
          <span>опустошение</span>
          <span>в ресурсе</span>
        </div>
      </div>

      <div className="m-chips">
        <span className="m-chip m-chip--on">#прогулка</span>
        <span className="m-chip m-chip--on">#книга</span>
        <span className="m-chip">#работа</span>
        <span className="m-chip">#лента</span>
      </div>

      <button className="m-cta">Сохранить запись</button>

      <MobileTabbar active="track" />
    </div>
  )
}

function MobileDiary() {
  const items = [
    { t: '09:12', tag: 'утро без ленты', c: 'var(--accent)', m: 'ясно', text: 'Лежала и слушала поливальщика. Мысли медленные.' },
    { t: '14:40', tag: 'работа', c: 'var(--primary)', m: 'фокус', text: 'Созвон без мессенджеров — голова ясная.' },
    { t: '22:07', tag: 'вечерний залип', c: 'var(--coral)', m: 'тревога', text: 'Зашла на минутку — очнулась через час.' },
  ]
  return (
    <div className="m-screen">
      <div className="m-top">
        <div>
          <div className="m-hello muted">сегодня · 3 записи</div>
          <h3 className="m-title">Дневник эмоций</h3>
        </div>
        <button className="m-icon" aria-label="Новая запись">
          <Plus size={16} />
        </button>
      </div>

      <ul className="m-diary-list">
        {items.map((e) => (
          <li key={e.t} style={{ '--c': e.c }}>
            <div className="m-diary__rail" />
            <div className="m-diary__body">
              <div className="m-diary__meta">
                <span className="m-diary__time">
                  <Clock size={12} /> {e.t}
                </span>
                <span className="m-pill m-pill--mood">{e.m}</span>
              </div>
              <strong>#{e.tag}</strong>
              <p>{e.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <MobileTabbar active="diary" />
    </div>
  )
}

function MobileLibrary() {
  return (
    <div className="m-screen">
      <div className="m-top">
        <div>
          <div className="m-hello muted">подборка апреля</div>
          <h3 className="m-title">Библиотека</h3>
        </div>
      </div>

      <div className="m-feature">
        <div className="m-feature__cover">
          <ImageIcon size={14} />
          <span>обложка</span>
        </div>
        <div className="m-feature__body">
          <span className="badge badge-accent">материал недели</span>
          <h4>Как вернуться к бумажной книге за 7 вечеров</h4>
          <span className="muted">
            <Clock size={12} /> 11 минут · эссе
          </span>
        </div>
      </div>

      <div className="m-filters">
        <span className="m-chip m-chip--on">Все</span>
        <span className="m-chip">До 5 мин</span>
        <span className="m-chip">Слушать</span>
        <span className="m-chip">Дыхание</span>
      </div>

      <ul className="m-lib-list">
        <li>
          <div className="m-lib__cover m-lib__cover--a" />
          <div className="m-lib__body">
            <span className="muted">
              <Play size={11} /> практика · 3 мин
            </span>
            <strong>Дыхание 4–7–8 перед сном</strong>
          </div>
          <Bookmark size={16} />
        </li>
        <li>
          <div className="m-lib__cover m-lib__cover--b" />
          <div className="m-lib__body">
            <span className="muted">
              <Headphones size={11} /> подкаст · 32 мин
            </span>
            <strong>Минимализм без фанатизма</strong>
          </div>
          <Bookmark size={16} />
        </li>
        <li>
          <div className="m-lib__cover m-lib__cover--c" />
          <div className="m-lib__body">
            <span className="muted">эссе · 7 мин</span>
            <strong>Тишина как навык</strong>
          </div>
          <Bookmark size={16} />
        </li>
      </ul>

      <MobileTabbar active="library" />
    </div>
  )
}

function MobileTabbar({ active }) {
  const items = [
    { id: 'home', label: 'главная', icon: Home },
    { id: 'track', label: 'трекер', icon: Activity },
    { id: 'diary', label: 'дневник', icon: BookHeart },
    { id: 'library', label: 'материалы', icon: BookOpen },
  ]
  return (
    <nav className="m-tabbar">
      {items.map((i) => (
        <button
          key={i.id}
          className={`m-tab ${active === i.id ? 'm-tab--active' : ''}`}
        >
          <i.icon size={18} strokeWidth={1.8} />
          <span>{i.label}</span>
        </button>
      ))}
    </nav>
  )
}

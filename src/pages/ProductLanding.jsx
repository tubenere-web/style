import { Link } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Activity,
  BookHeart,
  Users,
  Library,
  Sparkles,
  Heart,
  ChevronDown,
  ExternalLink,
  Monitor,
  Smartphone,
  Moon,
  Menu,
  X,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import { mascotEmotion, mascotPlan } from '../assets/illustrations.js'
import { appUrl } from '../utils/appUrl.js'
import './ProductLanding.css'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease },
}

const DEMO_TABS = [
  { id: 'dash', label: 'Главная', seg: 'dashboard' },
  { id: 'track', label: 'Трекер', seg: 'tracker' },
  { id: 'diary', label: 'Дневник', seg: 'diary' },
  { id: 'friends', label: 'Друзья', seg: 'friends' },
  { id: 'lib', label: 'Библиотека', seg: 'library' },
]

const LEGACY_FEATURES = [
  {
    title: 'Трекер состояния',
    text: 'Шкала настроения, уровня тревоги и энергии. Записи связываются с экранным временем автоматически.',
    icon: Activity,
    bg: 'var(--primary-soft)',
    color: 'var(--primary)',
    tab: 'track',
    cta: 'К разделу — в демо',
  },
  {
    title: 'Дневник эмоций',
    text: 'Короткие записи в удобное время. Тихо подсвечивает паттерны — без оценки «хорошо/плохо».',
    icon: BookHeart,
    bg: 'var(--coral-soft)',
    color: 'var(--coral)',
    tab: 'diary',
    cta: 'К разделу — в демо',
  },
  {
    title: 'Друзья и поддержка',
    text: 'Только те, кого добавил сам. Договорённости о тихих вечерах и мягкая поддержка.',
    icon: Users,
    bg: 'var(--lavender-soft)',
    color: 'var(--lavender)',
    tab: 'friends',
    cta: 'К разделу — в демо',
  },
  {
    title: 'Библиотека материалов',
    text: 'Подборка практик и текстов — одна лента, чтобы не тонуть в категориях.',
    icon: Library,
    bg: 'var(--accent-soft)',
    color: 'var(--accent)',
    tab: 'lib',
    cta: 'К разделу — в демо',
  },
]

function useNarrowDemo() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const fn = () => setNarrow(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return narrow
}

const STORE = {
  apple: 'https://apps.apple.com/app/id0000000000',
  google: 'https://play.google.com/store/apps/details?id=io.tiho.app',
}

const NAV_LINKS = [
  { href: '#pl-1', label: 'Обложка' },
  { href: '#pl-2', label: 'Цифры' },
  { href: '#pl-3', label: 'История' },
  { href: '#pl-4', label: 'Демо' },
  { href: '#pl-5', label: 'Продукт' },
  { href: '#pl-6', label: 'Идея' },
  { href: '#pl-7', label: 'Скачать' },
]

export default function ProductLanding() {
  const narrowDemo = useNarrowDemo()
  const [navOpen, setNavOpen] = useState(false)
  const [demo, setDemo] = useState('dash')
  const activeSeg = DEMO_TABS.find((t) => t.id === demo)?.seg ?? 'dashboard'
  const iframeSrc = useMemo(() => appUrl(activeSeg), [activeSeg])

  const goDemo = useCallback(
    (id) => {
      setDemo(id)
      document.getElementById('pl-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [],
  )

  const closeNav = useCallback(() => setNavOpen(false), [])

  useEffect(() => {
    if (!navOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [navOpen])

  return (
    <div className="pl">
      <div className="pl__aurora" aria-hidden="true" />
      <div className="pl__noise" aria-hidden="true" />

      <header className={`pl-header ${navOpen ? 'pl-header--open' : ''}`}>
        <div className="pl-header__inner">
          <Logo to="/" inverse />
          <nav className="pl-header__nav pl-header__nav--desktop" aria-label="Разделы страницы">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="pl-header__cta pl-header__cta--desktop">
            <Link to="/onboarding/1" className="pl-link">
              Онбординг
            </Link>
            <a href="#pl-7" className="pl-btn pl-btn--primary">
              Скачать
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
          <button
            type="button"
            className="pl-header__burger"
            aria-label={navOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={navOpen}
            aria-controls="pl-header-drawer"
            onClick={() => setNavOpen((o) => !o)}
          >
            {navOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>

        <div id="pl-header-drawer" className="pl-header__drawer" aria-hidden={!navOpen}>
          <nav className="pl-header__nav pl-header__nav--drawer" aria-label="Разделы страницы">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  closeNav()
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="pl-header__drawer-cta">
            <Link to="/onboarding/1" className="pl-btn pl-btn--ghost" onClick={closeNav}>
              Онбординг
            </Link>
            <a href="#pl-7" className="pl-btn pl-btn--primary" onClick={closeNav}>
              Скачать
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>

        <button
          type="button"
          className="pl-header__backdrop"
          tabIndex={navOpen ? 0 : -1}
          aria-label="Закрыть меню"
          aria-hidden={!navOpen}
          onClick={closeNav}
        />
      </header>

      {/* ===== БЛОК 1 — Hero + вставка KPI из реального дашборда ===== */}
      <section id="pl-1" className="pl-block pl-block--hero" aria-labelledby="pl-h1">
        <div className="pl-block__tag">
          <span className="pl-block__num">01</span> / 07
        </div>
        <div className="pl-hero pl-hero--grid">
          <motion.div
            className="pl-hero__copy"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } } }}
          >
            <motion.div className="pl-hero__ribbon" variants={childFade}>
              <Sparkles size={14} strokeWidth={2} /> мягкая цифровая гигиена
            </motion.div>
            <motion.h1 id="pl-h1" variants={childFade}>
              Заметь, что чувствуешь
              <br />
              <span className="pl-hero__accent">без стыда за экран</span>
            </motion.h1>
            <motion.p className="pl-hero__lede" variants={childFade}>
              Тихо — мягкий сервис против цифровой тревожности: настроение, экранное время, дневник
              и близкие в одном месте. Ниже — бумажный визуал и одно демо; путь знакомства — через
              онбординг и обратно сюда.
            </motion.p>
            <motion.ul className="pl-hero__meta" variants={childFade}>
              <li>
                <strong>8 мин</strong>
                <span>в день на осознанность</span>
              </li>
              <li>
                <strong>3 года</strong>
                <span>продуктовой работы</span>
              </li>
              <li>
                <strong>12 300</strong>
                <span>человек в дневниках</span>
              </li>
            </motion.ul>
            <motion.div className="pl-hero__stores" variants={childFade}>
              <a className="pl-store pl-store--apple" href={STORE.apple} target="_blank" rel="noreferrer">
                <span className="pl-store__icon" aria-hidden />
                <span className="pl-store__txt">
                  <small>Загрузить в</small>
                  App Store
                </span>
              </a>
              <a className="pl-store pl-store--google" href={STORE.google} target="_blank" rel="noreferrer">
                <span className="pl-store__icon" aria-hidden />
                <span className="pl-store__txt">
                  <small>Доступно в</small>
                  Google Play
                </span>
              </a>
            </motion.div>
            <motion.div className="pl-hero__subcta" variants={childFade}>
              <a href="#pl-4" className="pl-btn pl-btn--ghost">
                <Monitor size={18} /> К полноэкранному демо
              </a>
              <Link to="/onboarding/1" className="pl-btn pl-btn--line">
                Онбординг <ExternalLink size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="pl-hero__viz"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
          >
            <div className="pl-hero__orb" />
            <div className="pl-hero__rings">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="pl-hero__ring"
                  animate={{ scale: [1, 1.07, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                />
              ))}
            </div>
            <div className="pl-paper" data-theme="light">
              <div className="pl-paper__main">
                <div className="pl-paper__photo" aria-hidden="true">
                  <img src={mascotEmotion} alt="" />
                </div>
                <div className="pl-paper__row">
                  <span className="pl-paper__muted">сегодня, вечер</span>
                  <span className="pl-paper__pill">тревога −32%</span>
                </div>
                <h3 className="pl-paper__h">Вечерняя запись</h3>
                <p className="pl-paper__text">
                  Лёгкость после прогулки без ленты — впервые за неделю без фонового шума уведомлений.
                </p>
                <div className="pl-paper__bars" aria-hidden="true">
                  <span style={{ flexBasis: '28%' }} />
                  <span style={{ flexBasis: '46%' }} />
                  <span style={{ flexBasis: '18%' }} />
                  <span style={{ flexBasis: '8%' }} />
                </div>
                <div className="pl-paper__legend">
                  <span>
                    <i className="pl-paper__dot pl-paper__dot--a" /> спокойствие
                  </span>
                  <span>
                    <i className="pl-paper__dot pl-paper__dot--p" /> концентрация
                  </span>
                  <span>
                    <i className="pl-paper__dot pl-paper__dot--l" /> усталость
                  </span>
                  <span>
                    <i className="pl-paper__dot pl-paper__dot--c" /> тревога
                  </span>
                </div>
              </div>
              <div className="pl-paper__chips">
                <motion.div
                  className="pl-paper-chip"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Activity size={20} strokeWidth={1.9} />
                  <div>
                    <div className="pl-paper-chip__k">1 ч 42 мин</div>
                    <div className="pl-paper__muted">экран</div>
                  </div>
                </motion.div>
                <motion.div
                  className="pl-paper-chip"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Moon size={20} strokeWidth={1.9} />
                  <div>
                    <div className="pl-paper-chip__k">22:30</div>
                    <div className="pl-paper__muted">тихо</div>
                  </div>
                </motion.div>
                <motion.div
                  className="pl-paper-chip"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Users size={18} strokeWidth={1.9} />
                  <div>
                    <div className="pl-paper-chip__k">Алёна + 3</div>
                    <div className="pl-paper__muted">рядом</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <a href="#pl-2" className="pl-scroll" aria-label="Дальше">
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ===== БЛОК 2 — анимированные метрики ===== */}
      <section id="pl-2" className="pl-block pl-block--stats">
        <div className="pl-block__tag">
          <span className="pl-block__num">02</span> / 07
        </div>
        <motion.h2 className="pl-block__title" {...fadeUp}>
          Цифры, которые не пугают
        </motion.h2>
        <p className="pl-block__lede">
          Наведи на карточку — она слегка приподнимается. Так же аккуратно приложение ведёт
          себя с вашими данными.
        </p>
        <div className="pl-stat-grid">
          {[
            { end: 8, suf: '', label: 'минут в день', sub: 'на рефлексию' },
            { end: 24, suf: '', label: 'материала', sub: 'в библиотеке' },
            { end: 0, suf: '₽', label: 'рекламы', sub: 'внутри интерфейса' },
            { end: 100, suf: '%', label: 'контроля', sub: 'над своими данными' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="pl-stat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease }}
              whileHover={{ scale: 1.03, y: -6 }}
            >
              <div className="pl-stat-card__value">
                <AnimatedNumber end={s.end} suffix={s.suf} />
              </div>
              <div className="pl-stat-card__label">{s.label}</div>
              <div className="pl-stat-card__sub">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== БЛОК 3 — история ===== */}
      <section id="pl-3" className="pl-block pl-block--story">
        <div className="pl-block__tag">
          <span className="pl-block__num">03</span> / 07
        </div>
        <div className="pl-story">
          <motion.div className="pl-story__grid" {...fadeUp}>
            <motion.div
              className="pl-story__card pl-story__card--problem"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <span className="pl-kicker">Проблема</span>
              <h2>Лента съедает внимание — тревога приходит незаметно</h2>
              <p>
                Таймеры винят; психолог не всегда онлайн. Нужен ежедневный слой между вами и
                телефоном — без шума и давления.
              </p>
            </motion.div>
            <motion.div
              className="pl-story__card pl-story__card--solve"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <span className="pl-kicker pl-kicker--accent">Ответ «Тихо»</span>
              <h2>Наблюдайте, связывайте, поддерживайте себя</h2>
              <p>
                Состояние, экран, дневник и близкие — в одном дизайне. Напоминания можно
                отключить одним жестом; данные остаются вашими.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== БЛОК 4 — полноэкранное демо ===== */}
      <section id="pl-4" className="pl-block pl-block--demo">
        <div className="pl-block__tag">
          <span className="pl-block__num">04</span> / 07
        </div>
        <motion.div className="pl-demo__head" {...fadeUp}>
          <span className="pl-kicker pl-kicker--accent">Интерактив</span>
          <h2 className="pl-block__title">Одно окно — весь клиент</h2>
          <p className="pl-block__lede">
            Одно место для интерактива: тот же веб-клиент, что и «настройки» в демо. Переключайте
            разделы вкладками и работайте внутри iframe — без лишних вставок по всей странице.
          </p>
        </motion.div>

        <div className="pl-tabs">
          {DEMO_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`pl-tab ${demo === t.id ? 'active' : ''}`}
              onClick={() => setDemo(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          className="pl-devices"
          key={`${demo}-${narrowDemo ? 'm' : 'd'}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {narrowDemo ? (
            <div className="pl-devices__grid pl-devices__grid--single">
              <div className="pl-phone pl-phone--demo">
                <div className="pl-phone__notch" aria-hidden />
                <div className="pl-phone__screen">
                  <iframe
                    title="Демо Тихо — мобильный экран"
                    src={iframeSrc}
                    className="pl-iframe pl-iframe--phone"
                    key={iframeSrc}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="pl-devices__grid pl-devices__grid--single">
              <div className="pl-laptop pl-laptop--wide">
                <div className="pl-laptop__lid">
                  <div className="pl-laptop__cam" aria-hidden />
                  <div className="pl-laptop__screen">
                    <iframe
                      title="Демо Тихо — экран ноутбука"
                      src={iframeSrc}
                      className="pl-iframe"
                      key={iframeSrc}
                    />
                  </div>
                </div>
                <div className="pl-laptop__base" />
              </div>
            </div>
          )}
          <p className="pl-demo__hint">
            {narrowDemo ? <Smartphone size={16} /> : <Monitor size={16} />}
            {narrowDemo ? (
              <>
                Раздел в демо: <code className="pl-code">{`/app/${activeSeg}`}</code> · интерфейс в рамке телефона
              </>
            ) : (
              <>
                Раздел в демо: <code className="pl-code">{`/app/${activeSeg}`}</code> · на узком экране
                показываем тот же клиент в корпусе смартфона
              </>
            )}
          </p>
        </motion.div>
      </section>

      {/* ===== БЛОК 5 — старый лендинг: опоры продукта + 4 шага (без лишних iframe) ===== */}
      <section id="pl-5" className="pl-block pl-block--merge">
        <div className="pl-block__tag">
          <span className="pl-block__num">05</span> / 07
        </div>
        <motion.h2 className="pl-block__title" {...fadeUp}>
          Четыре опоры и четыре шага
        </motion.h2>
        <p className="pl-block__lede pl-block__lede--narrow">
          Единственный живой интерфейс на странице — в блоке «Демо» выше (тот же маршрут, что в
          приложении, но без обхода онбординга к кабинету). Ниже — только сценарии и кнопка в демо.
        </p>

        <div className="pl-merge-features">
          {LEGACY_FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              className="pl-merge-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.55, ease }}
              whileHover={{ y: -4 }}
            >
              <div className="pl-merge-card__icon" style={{ background: f.bg, color: f.color }}>
                <f.icon size={24} strokeWidth={1.8} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <div className="pl-merge-card__actions">
                <button type="button" className="pl-gallery__btn" onClick={() => goDemo(f.tab)}>
                  {f.cta} <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="pl-merge-how">
          <div className="pl-merge-how__media" data-theme="light">
            <div className="pl-merge-how__img">
              <img src={mascotPlan} alt="" />
            </div>
          </div>
          <div className="pl-merge-how__copy">
            <span className="pl-kicker pl-kicker--accent">Как это работает</span>
            <h3 className="pl-merge-how__title">Четыре шага — и тревожность отступает</h3>
            <ol className="pl-merge-steps">
              <li>
                <span className="pl-merge-steps__num">01</span>
                <div>
                  <strong>Онбординг</strong>
                  <p>Четыре экрана про идею сервиса и настройку под ваш день.</p>
                </div>
              </li>
              <li>
                <span className="pl-merge-steps__num">02</span>
                <div>
                  <strong>Записи утром и вечером</strong>
                  <p>Шкала настроения и короткая мысль в дневник — пара минут.</p>
                </div>
              </li>
              <li>
                <span className="pl-merge-steps__num">03</span>
                <div>
                  <strong>Связь с экраном</strong>
                  <p>Видно, как лента и время в телефоне влияют на состояние.</p>
                </div>
              </li>
              <li>
                <span className="pl-merge-steps__num">04</span>
                <div>
                  <strong>Опора</strong>
                  <p>Практики, друзья и библиотека — чтобы привычка закрепилась.</p>
                </div>
              </li>
            </ol>
            <div className="pl-merge-how__cta">
              <Link to="/onboarding/1" className="pl-btn pl-btn--primary">
                Онбординг <ArrowRight size={18} />
              </Link>
              <a href="#pl-4" className="pl-btn pl-btn--ghost">
                <Smartphone size={18} /> К демо на этом экране
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== БЛОК 6 — цитата ===== */}
      <section id="pl-6" className="pl-block pl-block--quote">
        <div className="pl-block__tag">
          <span className="pl-block__num">06</span> / 07
        </div>
        <motion.div className="pl-quote__box" {...fadeUp}>
          <Heart className="pl-quote__icon" size={32} strokeWidth={1.5} />
          <blockquote>
            <p>
              Мы не конкурируем с соцсетями за клики — мы помогаем вернуть внимание себе. Один
              спокойный вечер за другим.
            </p>
            <footer>команда «Тихо» · приватность по умолчанию</footer>
          </blockquote>
        </motion.div>
      </section>

      {/* ===== БЛОК 7 — полоса CTA (legacy) + скачать + футер ===== */}
      <section id="pl-7" className="pl-block pl-block--fin">
        <div className="pl-block__tag">
          <span className="pl-block__num">07</span> / 07
        </div>
        <motion.div className="pl-cta-band" {...fadeUp}>
          <div className="pl-cta-band__copy">
            <h2 className="pl-cta-band__title">Начни с одного вечера без тревоги</h2>
            <p>
              Мы не продаём данные и не гоняем за удержанием — только мягкие напоминания, которые
              можно выключить одним тапом.               Сначала — короткий онбординг и возврат на эту страницу. Прямых кнопок в кабинет здесь
              нет — только знакомство с продуктом.
            </p>
          </div>
          <div className="pl-cta-band__actions">
            <Link to="/onboarding/1" className="pl-btn pl-btn--primary">
              Пройти онбординг <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <motion.div className="pl-download__inner" {...fadeUp}>
          <h2>Скачать в сторы</h2>
          <p>Бесплатная точка входа. Живой клиент на этой странице — только в блоке демо ниже.</p>
          <div className="pl-download__stores">
            <a className="pl-store pl-store--apple pl-store--lg" href={STORE.apple} target="_blank" rel="noreferrer">
              <span className="pl-store__icon" aria-hidden />
              <span className="pl-store__txt">
                <small>Загрузить в</small>
                App Store
              </span>
            </a>
            <a className="pl-store pl-store--google pl-store--lg" href={STORE.google} target="_blank" rel="noreferrer">
              <span className="pl-store__icon" aria-hidden />
              <span className="pl-store__txt">
                  <small>Доступно в</small>
                  Google Play
                </span>
            </a>
          </div>
          <div className="pl-download__web">
            <Link to="/onboarding/1" className="pl-btn pl-btn--primary">
              Сначала онбординг
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <footer className="pl-footer">
          <Logo to="/" inverse />
          <div className="pl-footer__links">
            <Link to="/terms">Соглашение</Link>
            <Link to="/privacy">Персональные данные</Link>
            <Link to="/legacy">Первый лендинг</Link>
            <a href="#pl-4">Интерактивное демо</a>
          </div>
          <p className="pl-footer__copy">© 2026 «Тихо». Не заменяет консультацию специалиста.</p>
        </footer>
      </section>
    </div>
  )
}

const childFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

function AnimatedNumber({ end, suffix }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30%' })

  useEffect(() => {
    if (!isInView) return
    let raf
    const dur = 1400
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur)
      const easeOut = 1 - (1 - p) ** 3
      setV(Math.round(end * easeOut))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isInView, end])

  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}


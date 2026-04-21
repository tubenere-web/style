import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Moon,
  Activity,
  BookHeart,
  Users,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { mascotEmotion, mascotPlan } from '../assets/illustrations.js'
import './Landing.css'

const features = [
  {
    title: 'Трекер состояния',
    text: 'Шкала настроения, уровня тревоги и энергии. Записи связываются с экранным временем автоматически.',
    icon: Activity,
    bg: 'var(--primary-soft)',
    color: 'var(--primary)',
    cta: 'Узнать в онбординге',
  },
  {
    title: 'Дневник эмоций',
    text: 'Короткие записи в удобное время. Тихо подсвечивает паттерны: какие приложения успокаивают, а какие — нет.',
    icon: BookHeart,
    bg: 'var(--coral-soft)',
    color: 'var(--coral)',
    cta: 'Узнать в онбординге',
  },
  {
    title: 'Друзья и поддержка',
    text: 'Добавляй близких людей, договаривайтесь о тихих вечерах и делись прогрессом — только если сам этого хочешь.',
    icon: Users,
    bg: 'var(--lavender-soft)',
    color: 'var(--lavender)',
    cta: 'Узнать в онбординге',
  },
  {
    title: 'Библиотека материалов',
    text: 'Подкасты, тексты и практики о цифровой гигиене. Одна подборка, без лишних разделов — чтобы не тонуть в информации.',
    icon: BookHeart,
    bg: 'var(--accent-soft)',
    color: 'var(--accent)',
    cta: 'Узнать в онбординге',
  },
]

export default function LegacyLanding() {
  return (
    <div className="landing">
      <header className="landing__header">
        <Logo />
        <nav className="landing__nav">
          <a href="#product">Продукт</a>
          <a href="#how">Как это работает</a>
          <a href="#library">Библиотека</a>
          <a href="#friends">Сообщество</a>
        </nav>
        <div className="landing__actions">
          <ThemeToggle />
          <Link to="/" className="btn btn-ghost">
            Новая главная
          </Link>
          <Link to="/onboarding/1" className="btn btn-primary">
            Онбординг
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <section className="landing__hero">
        <motion.div
          className="landing__hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="badge badge-lavender">
            <Sparkles size={14} /> цифровое спокойствие
          </span>
          <h1>
            Заметь, что чувствуешь,
            <br />
            когда держишь телефон.
          </h1>
          <p className="landing__lede">
            Тихо — это мягкий сервис против цифровой тревожности. Мы помогаем
            замечать настроение, связывать его с экранным временем и возвращать
            внимание к себе — без нотаций и стыда.
          </p>

          <div className="landing__cta">
            <Link to="/onboarding/1" className="btn btn-primary btn-lg">
              Пройти онбординг
              <ArrowRight size={20} />
            </Link>
            <Link to="/#pl-4" className="btn btn-secondary btn-lg">
              Интерактивное демо
            </Link>
          </div>

          <ul className="landing__meta">
            <li>
              <strong>8 мин</strong>
              <span>в день, чтобы заметить тревогу</span>
            </li>
            <li>
              <strong>3 года</strong>
              <span>работы с цифровой гигиеной</span>
            </li>
            <li>
              <strong>12 300</strong>
              <span>человек ведут дневник вместе</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="landing__hero-art"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div className="hero-card hero-card--main">
            <div className="hero-card__photo" aria-hidden="true">
              <img className="hero-card__photo-img" src={mascotEmotion} alt="" />
            </div>
            <div className="hero-card__head">
              <span className="muted">сегодня, 21:14</span>
              <span className="badge badge-accent">тревога −32%</span>
            </div>
            <h3>Вечерняя запись</h3>
            <p className="hero-card__text">
              Чувствую лёгкость. Отложила телефон в 20:30, гуляла с собакой,
              читала бумажную книгу — впервые за неделю без фонового шума
              уведомлений.
            </p>
            <div className="hero-card__bar">
              <span style={{ width: '28%' }} />
              <span style={{ width: '46%' }} />
              <span style={{ width: '18%' }} />
              <span style={{ width: '8%' }} />
            </div>
            <div className="hero-card__legend">
              <span>
                <i style={{ background: 'var(--accent)' }} /> спокойствие
              </span>
              <span>
                <i style={{ background: 'var(--primary)' }} /> концентрация
              </span>
              <span>
                <i style={{ background: 'var(--lavender)' }} /> усталость
              </span>
              <span>
                <i style={{ background: 'var(--coral)' }} /> тревога
              </span>
            </div>
          </div>

          <motion.div
            className="hero-card hero-card--float hero-card--a"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Activity size={22} />
            <div>
              <div className="hero-card__kpi">1 ч 42 мин</div>
              <div className="muted">экранного времени</div>
            </div>
          </motion.div>

          <motion.div
            className="hero-card hero-card--float hero-card--b"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Moon size={22} />
            <div>
              <div className="hero-card__kpi">22:30</div>
              <div className="muted">тихий режим включён</div>
            </div>
          </motion.div>

          <motion.div
            className="hero-card hero-card--float hero-card--c"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Users size={20} />
            <div>
              <div className="hero-card__kpi">Алёна + 3</div>
              <div className="muted">читают с тобой «Цифровой минимализм»</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="landing__features" id="product">
        <header className="section-head">
          <span className="badge">четыре опоры продукта</span>
          <h2>Всё, чтобы перестать тревожиться из-за экрана</h2>
          <p className="muted landing__section-lede">
            Тихо — не ещё один таймер без уведомлений. Это связка из трекера,
            дневника, друзей и библиотеки: по одной минуте в день складывается в
            настоящую цифровую гигиену.
          </p>
        </header>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <div className="feature-card__icon" style={{ background: f.bg, color: f.color }}>
                <f.icon size={24} strokeWidth={1.8} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Link to="/onboarding/1" className="link-btn">
                {f.cta} <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="landing__how" id="how">
        <div className="landing__how-media">
          <div className="photo-placeholder photo-placeholder--tall">
            <img className="photo-placeholder__img" src={mascotPlan} alt="" />
          </div>
        </div>
        <div className="landing__how-copy">
          <span className="badge badge-accent">как это работает</span>
          <h2>Четыре шага — и тревожность отступает</h2>
          <ol className="steps">
            <li>
              <span className="steps__num">01</span>
              <div>
                <h4>Проходишь короткий онбординг</h4>
                <p>
                  Четыре экрана: рассказываем, как устроен сервис, и настраиваем
                  его под твой режим дня.
                </p>
              </div>
            </li>
            <li>
              <span className="steps__num">02</span>
              <div>
                <h4>Записываешь состояние утром и вечером</h4>
                <p>
                  Две минуты: шкала настроения, метки тревоги и свободное
                  дыхание мысли в дневник.
                </p>
              </div>
            </li>
            <li>
              <span className="steps__num">03</span>
              <div>
                <h4>Смотришь, как экран влияет на тебя</h4>
                <p>
                  Тихо связывает эмоции с экранным временем и показывает, какие
                  приложения истощают.
                </p>
              </div>
            </li>
            <li>
              <span className="steps__num">04</span>
              <div>
                <h4>Возвращаешь внимание себе</h4>
                <p>
                  Маленькие практики, поддержка друзей и библиотека — чтобы
                  привычка закрепилась.
                </p>
              </div>
            </li>
          </ol>

          <div className="landing__how-cta">
            <Link to="/onboarding/1" className="btn btn-primary">
              Попробовать онбординг
              <ArrowRight size={18} />
            </Link>
            <Link to="/#pl-4" className="btn btn-secondary">
              <Smartphone size={18} />
              Демо на главной
            </Link>
          </div>
        </div>
      </section>

      <section className="landing__cta-band">
        <div>
          <h2>Начни с одного вечера без тревоги</h2>
          <p>
            Регистрация занимает минуту. Мы не продаём данные и не используем
            приёмы удержания — только мягкие напоминания, которые можно выключить
            одним тапом.
          </p>
        </div>
        <div className="landing__cta-band-actions">
          <Link to="/onboarding/1" className="btn btn-primary btn-lg">
            Пройти онбординг
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="landing__footer">
        <Logo size="sm" />
        <div className="landing__footer-links">
          <Link to="/terms">Условия использования</Link>
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/personal-data">Обработка персональных данных</Link>
          <Link to="/#pl-4">Интерактивное демо</Link>
        </div>
        <div className="muted landing__footer-copy">
          © 2026 «Тихо». Сервис не заменяет консультацию специалиста.
        </div>
      </footer>
    </div>
  )
}

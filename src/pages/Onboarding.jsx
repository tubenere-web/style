import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Activity,
  BookHeart,
  Users,
  BookOpen,
  Check,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { mascotPlan, mascotEmotion, mascotFriends } from '../assets/illustrations.js'
import './Onboarding.css'

const steps = [
  {
    id: 'idea',
    badge: 'шаг 01 · идея',
    title: 'Тревога приходит не из телефона — из того, как мы его используем',
    description:
      'Тихо помогает заметить момент, когда социальные сети перестают быть отдыхом и становятся источником напряжения. Без запретов и чувства вины — только мягкие наблюдения.',
    bullets: [
      'Замечаем тревогу на ранней стадии',
      'Возвращаем внимание к телу и дыханию',
      'Работаем постепенно, маленькими шагами',
    ],
    illustration: 'idea',
  },
  {
    id: 'tracker',
    badge: 'шаг 02 · трекер',
    title: 'Две минуты утром и вечером — и ты видишь свой ритм',
    description:
      'Отмечаешь настроение, уровень тревоги и энергии. Тихо сам связывает записи с экранным временем и показывает, что на тебя влияет сильнее всего.',
    bullets: [
      'Шкалы настроения, тревоги и энергии',
      'Автоматический учёт экранного времени',
      'Недельные и месячные отчёты простым языком',
    ],
    illustration: 'tracker',
  },
  {
    id: 'diary',
    badge: 'шаг 03 · дневник',
    title: 'Дневник эмоций, который помнит, а не осуждает',
    description:
      'Пишешь коротко — настроение, тег приложения, одна мысль. Через неделю видно паттерны: какие ленты успокаивают, а какие оставляют ощущение пустоты.',
    bullets: [
      'Короткий формат: полминуты на запись',
      'Связка с приложениями и временем суток',
      'Тёплые подсказки, а не напоминания-угрозы',
    ],
    illustration: 'diary',
  },
  {
    id: 'together',
    badge: 'шаг 04 · вместе',
    title: 'Близкие рядом и подборка, которая не захлёбывает',
    description:
      'Добавляешь друзей и договариваешься о тихих вечерах. В библиотеке одна подборка материалов — без лишних подкатегорий, чтобы выбор не отнимал энергию.',
    bullets: [
      'Круг поддержки — только те, кого ты сам добавил',
      'Совместные практики и челленджи без рейтингов',
      'Библиотека из 24 материалов, обновляется каждую неделю',
    ],
    illustration: 'together',
  },
]

export default function Onboarding() {
  const [i, setI] = useState(0)
  const navigate = useNavigate()
  const step = steps[i]
  const last = i === steps.length - 1

  const next = () => {
    if (last) navigate('/register')
    else setI((v) => v + 1)
  }

  const prev = () => {
    if (i === 0) navigate('/')
    else setI((v) => v - 1)
  }

  return (
    <motion.div
      className="onb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="onb__header">
        <Logo />
        <div className="onb__header-right">
          <ThemeToggle />
          <Link to="/login" className="link-btn">
            Пропустить и войти
          </Link>
        </div>
      </header>

      <div className="onb__body">
        <div className="onb__progress" aria-label="Прогресс онбординга">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              className={`onb__pip ${idx === i ? 'active' : ''} ${
                idx < i ? 'done' : ''
              }`}
              onClick={() => setI(idx)}
              aria-label={`Перейти на шаг ${idx + 1}`}
            >
              <span>{idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="onb__grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id + '-copy'}
              className="onb__copy"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge badge-lavender">{step.badge}</span>
              <h1>{step.title}</h1>
              <p className="onb__desc">{step.description}</p>
              <ul className="onb__bullets">
                {step.bullets.map((b) => (
                  <li key={b}>
                    <span className="onb__check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="onb__nav">
                <button className="btn btn-secondary" onClick={prev}>
                  <ArrowLeft size={18} />
                  {i === 0 ? 'На главную' : 'Назад'}
                </button>
                <button className="btn btn-primary btn-lg" onClick={next}>
                  {last ? 'Создать аккаунт' : 'Дальше'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id + '-art'}
              className="onb__art"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.illustration === 'idea' && <IdeaArt />}
              {step.illustration === 'tracker' && <TrackerArt />}
              {step.illustration === 'diary' && <DiaryArt />}
              {step.illustration === 'together' && <TogetherArt />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="onb__footer">
        <span className="muted">{`${i + 1} из ${steps.length}`}</span>
        <Link to="/login" className="muted onb__footer-skip">
          Уже пользуешься? Войти
        </Link>
      </footer>
    </motion.div>
  )
}

/* ====================== ИЛЛЮСТРАЦИИ ====================== */

function IdeaArt() {
  return (
    <div className="art art--idea">
      <motion.div
        className="art__ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ transform: `rotate(${i * 30}deg)` }} />
        ))}
      </motion.div>
      <motion.div
        className="art__bubble"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="art__bubble-head">
          <span className="dot dot--a" />
          <span className="muted">в голове</span>
        </div>
        <p>уведомления, ленты, бесконечный скролл…</p>
      </motion.div>
      <motion.div
        className="art__bubble art__bubble--alt"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="art__bubble-head">
          <span className="dot dot--b" />
          <span className="muted">в теле</span>
        </div>
        <p>сжатие в груди, тревога, тяжесть к вечеру.</p>
      </motion.div>
      <div className="art__core">
        <div className="art__core-title">тихо</div>
        <div className="art__core-sub">замечай раньше</div>
      </div>
      <div className="photo-slot photo-slot--a">
        <img src={mascotEmotion} alt="" />
      </div>
    </div>
  )
}

function TrackerArt() {
  return (
    <div className="art art--tracker">
      <div className="art-card art-card--chart">
        <div className="art-card__title">
          <Activity size={18} />
          Настроение · 7 дней
        </div>
        <svg viewBox="0 0 360 140" className="chart-line">
          <defs>
            <linearGradient id="gradA" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 100 C 40 90, 60 70, 100 80 C 140 90, 160 40, 200 50 C 240 60, 260 30, 300 40 C 320 45, 340 55, 360 50"
            stroke="var(--primary)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
          <motion.path
            d="M0 100 C 40 90, 60 70, 100 80 C 140 90, 160 40, 200 50 C 240 60, 260 30, 300 40 C 320 45, 340 55, 360 50 L 360 140 L 0 140 Z"
            fill="url(#gradA)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </svg>
        <div className="chart-legend">
          <span>пн</span>
          <span>вт</span>
          <span>ср</span>
          <span>чт</span>
          <span>пт</span>
          <span>сб</span>
          <span>вс</span>
        </div>
      </div>

      <div className="art-card art-card--bars">
        <div className="art-card__title">Экранное время</div>
        <div className="bars">
          {[40, 62, 72, 45, 84, 30, 52].map((v, i) => (
            <motion.div
              key={i}
              className="bar"
              initial={{ height: 0 }}
              animate={{ height: v }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            />
          ))}
        </div>
      </div>

      <div className="art-card art-card--scale">
        <div className="muted">утро</div>
        <div className="scale">
          <div className="scale__thumb" />
        </div>
        <div className="scale__legend">
          <span>спокойно</span>
          <span>тревожно</span>
        </div>
      </div>
      <div className="photo-slot photo-slot--b">
        <img src={mascotPlan} alt="" />
      </div>
    </div>
  )
}

function DiaryArt() {
  const entries = [
    { time: '09:12', tag: 'инстаграм', mood: 'тревога ↑', color: 'var(--coral)' },
    { time: '14:40', tag: 'работа', mood: 'концентрация', color: 'var(--primary)' },
    { time: '19:05', tag: 'прогулка', mood: 'спокойствие', color: 'var(--accent)' },
    { time: '22:20', tag: 'чтение', mood: 'лёгкость', color: 'var(--lavender)' },
  ]

  return (
    <div className="art art--diary">
      <div className="diary-book">
        <div className="diary-book__head">
          <div>
            <div className="muted">сегодня, вторник</div>
            <h4>Заметки за день</h4>
          </div>
          <span className="badge badge-accent">4 записи</span>
        </div>

        <div className="diary-book__entries">
          {entries.map((e, idx) => (
            <motion.div
              key={e.time}
              className="diary-entry"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
            >
              <div className="diary-entry__time">{e.time}</div>
              <div className="diary-entry__dot" style={{ background: e.color }} />
              <div className="diary-entry__body">
                <div className="diary-entry__tag">#{e.tag}</div>
                <div className="diary-entry__mood">{e.mood}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="diary-book__foot muted">
          тихо подсвечивает: после ленты тревога выше на 28%
        </div>
      </div>
      <div className="photo-slot photo-slot--c">
        <img src={mascotEmotion} alt="" />
      </div>
    </div>
  )
}

function TogetherArt() {
  const friends = [
    { name: 'Алёна', initials: 'АЛ', status: 'тихий вечер', c: 'var(--primary)' },
    { name: 'Марк', initials: 'МР', status: 'читает', c: 'var(--accent)' },
    { name: 'Соня', initials: 'СН', status: '15 мин в ленте', c: 'var(--lavender)' },
    { name: 'Кирилл', initials: 'КЛ', status: 'офлайн', c: 'var(--coral)' },
  ]

  return (
    <div className="art art--together">
      <div className="art-card art-card--friends">
        <div className="art-card__title">
          <Users size={18} />
          Круг поддержки
        </div>
        <ul className="friend-list">
          {friends.map((f, i) => (
            <motion.li
              key={f.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="avatar" style={{ background: f.c }}>
                {f.initials}
              </span>
              <div>
                <div className="friend-list__name">{f.name}</div>
                <div className="muted">{f.status}</div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="art-card art-card--library">
        <div className="art-card__title">
          <BookOpen size={18} />
          Библиотека · подборка недели
        </div>
        <div className="lib-list">
          <div className="lib-item">
            <div className="lib-item__cover lib-item__cover--1" />
            <div>
              <h5>Медленное утро без ленты</h5>
              <span className="muted">эссе · 6 мин</span>
            </div>
          </div>
          <div className="lib-item">
            <div className="lib-item__cover lib-item__cover--2" />
            <div>
              <h5>Дыхание 4–7–8 перед сном</h5>
              <span className="muted">практика · 3 мин</span>
            </div>
          </div>
          <div className="lib-item">
            <div className="lib-item__cover lib-item__cover--3" />
            <div>
              <h5>Цифровая тишина по выходным</h5>
              <span className="muted">подкаст · 24 мин</span>
            </div>
          </div>
        </div>
      </div>
      <div className="photo-slot photo-slot--d">
        <img src={mascotFriends} alt="" />
      </div>
    </div>
  )
}

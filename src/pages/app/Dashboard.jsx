import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Activity,
  HeartPulse,
  Smartphone,
  Moon,
  ArrowUpRight,
  Plus,
  ArrowRight,
  CalendarDays,
  Sparkles,
} from 'lucide-react'
import { mascotPlan, mascotEmotion } from '../../assets/illustrations.js'
import './Dashboard.css'

const kpis = [
  {
    icon: HeartPulse,
    label: 'Средняя тревога',
    value: '3.2 / 10',
    trend: '−18% к неделе',
    trendType: 'down',
    tint: 'coral',
  },
  {
    icon: Activity,
    label: 'Настроение',
    value: '7.4 / 10',
    trend: '+12% к неделе',
    trendType: 'up',
    tint: 'primary',
  },
  {
    icon: Smartphone,
    label: 'Экранное время',
    value: '3 ч 48 мин',
    trend: '−42 мин в среднем',
    trendType: 'down',
    tint: 'accent',
  },
  {
    icon: Moon,
    label: 'Тихих вечеров',
    value: '5 из 7',
    trend: 'цель месяца выполнена',
    trendType: 'up',
    tint: 'lavender',
  },
]

const weekly = [
  { d: 'пн', mood: 6, screen: 4.5 },
  { d: 'вт', mood: 7, screen: 3.8 },
  { d: 'ср', mood: 5.2, screen: 5.1 },
  { d: 'чт', mood: 8, screen: 2.6 },
  { d: 'пт', mood: 6.7, screen: 4.2 },
  { d: 'сб', mood: 8.4, screen: 2.1 },
  { d: 'вс', mood: 7.8, screen: 3.4 },
]

export default function Dashboard() {
  return (
    <div className="page dashboard">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge badge-accent">вторник, 21 апреля</span>
          <h1>Доброе утро, Вика</h1>
          <p className="muted">
            Вчера ты закончила вечер без ленты и хорошо спала. Сегодня можно
            попробовать первую медитацию после обеда — 7 минут.
          </p>
        </div>
        <div className="page__head-actions">
          <Link to="/app/tracker" className="btn btn-secondary">
            <CalendarDays size={18} />
            Неделя целиком
          </Link>
          <Link to="/app/diary" className="btn btn-primary">
            <Plus size={18} />
            Записать состояние
          </Link>
        </div>
      </header>

      <div className="grid grid--4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            className={`kpi kpi--${k.tint}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <span className="kpi__icon">
              <k.icon size={22} strokeWidth={1.8} />
            </span>
            <div>
              <div className="kpi__label">{k.label}</div>
              <div className="kpi__value">{k.value}</div>
            </div>
            <span className={`kpi__trend ${k.trendType === 'down' ? 'kpi__trend--down' : ''}`}>
              <ArrowUpRight size={14} style={{ transform: k.trendType === 'down' ? 'rotate(90deg)' : 'none' }} />
              {k.trend}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid--2-left dashboard__split">
        <motion.section
          className="panel dashboard__chart"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="panel__head">
            <div>
              <h3>Настроение и экранное время</h3>
              <p>Чем ниже экран — тем выше настроение. Тихо строит связку за тебя.</p>
            </div>
            <div className="panel__tabs">
              <button className="panel__tab panel__tab--active">Неделя</button>
              <button className="panel__tab">Месяц</button>
              <button className="panel__tab">Год</button>
            </div>
          </div>

          <div className="chart-box">
            <svg viewBox="0 0 720 240" className="chart-line" width="100%" height="240">
              <defs>
                <linearGradient id="mood-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  x2="700"
                  y1={40 + i * 40}
                  y2={40 + i * 40}
                  stroke="var(--border)"
                  strokeDasharray="2 6"
                />
              ))}
              {weekly.map((w, i) => {
                const x = 40 + i * ((700 - 40) / (weekly.length - 1))
                const yScreen = 40 + (6 - w.screen) * 25
                return (
                  <motion.rect
                    key={i}
                    x={x - 14}
                    y={yScreen}
                    width="28"
                    height={210 - yScreen}
                    rx="8"
                    fill="var(--accent-soft)"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    style={{ transformOrigin: `${x}px 210px` }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  />
                )
              })}
              <motion.path
                d={buildPath(weekly, 40, 700, 200, 30)}
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              />
              <motion.path
                d={buildPath(weekly, 40, 700, 200, 30) + ' L 700 220 L 40 220 Z'}
                fill="url(#mood-grad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />
              {weekly.map((w, i) => {
                const x = 40 + i * ((700 - 40) / (weekly.length - 1))
                const y = 200 - (w.mood / 10) * 160
                return (
                  <motion.g
                    key={i + 'pt'}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: 1.3 + i * 0.05 }}
                  >
                    <circle cx={x} cy={y} r="7" fill="var(--surface)" stroke="var(--primary)" strokeWidth="3" />
                  </motion.g>
                )
              })}
            </svg>

            <div className="chart-x">
              {weekly.map((w) => (
                <span key={w.d}>{w.d}</span>
              ))}
            </div>

            <div className="chart-legend-row">
              <span className="chart-legend-row__item">
                <i style={{ background: 'var(--primary)' }} /> Настроение
              </span>
              <span className="chart-legend-row__item">
                <i style={{ background: 'var(--accent)' }} /> Экранное время, ч
              </span>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="panel dashboard__today"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="panel__head">
            <div>
              <h3>План на сегодня</h3>
              <p>Три мягких шага — ничего срочного.</p>
            </div>
          </div>

          <div className="dashboard__plan-illustration" aria-hidden="true">
            <img src={mascotPlan} alt="" />
          </div>

          <ul className="tasks">
            <li className="tasks__item tasks__item--done">
              <span className="tasks__check">✓</span>
              <div>
                <div className="tasks__title">Утренняя запись настроения</div>
                <div className="muted">9:12 · 6.4 / 10 — чуть уставшая, но ровно</div>
              </div>
              <span className="muted">готово</span>
            </li>
            <li className="tasks__item tasks__item--now">
              <span className="tasks__check">
                <Sparkles size={16} />
              </span>
              <div>
                <div className="tasks__title">Прогулка без телефона, 20 минут</div>
                <div className="muted">телефон остаётся дома — это очень важный шаг</div>
              </div>
              <button className="btn btn-primary btn-sm">Начать</button>
            </li>
            <li className="tasks__item">
              <span className="tasks__check tasks__check--idle" />
              <div>
                <div className="tasks__title">Вечерняя запись и рефлексия</div>
                <div className="muted">до 22:30 · 2 минуты</div>
              </div>
              <Link to="/app/diary" className="link-btn">
                Открыть <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </motion.section>
      </div>

      <div className="grid grid--3">
        <motion.section
          className="panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="panel__head">
            <div>
              <h3>Эмоции недели</h3>
              <p>Самые частые отметки из дневника</p>
            </div>
          </div>

          <div className="emotions">
            <EmotionBar label="Спокойствие" value={42} color="var(--accent)" />
            <EmotionBar label="Концентрация" value={28} color="var(--primary)" />
            <EmotionBar label="Усталость" value={18} color="var(--lavender)" />
            <EmotionBar label="Тревога" value={12} color="var(--coral)" />
          </div>
        </motion.section>

        <motion.section
          className="panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="panel__head">
            <div>
              <h3>Друзья рядом</h3>
              <p>Те, с кем ты делишься прогрессом</p>
            </div>
            <Link to="/app/friends" className="link-btn">
              Все <ArrowRight size={14} />
            </Link>
          </div>

          <ul className="friends-mini">
            {[
              { n: 'Алёна Вершинина', s: 'тихий вечер · 19:48', c: 'var(--primary)', i: 'АВ' },
              { n: 'Марк Круглов', s: 'читает «Медленная жизнь»', c: 'var(--accent)', i: 'МК' },
              { n: 'Соня Ряшко', s: '15 мин в ленте за день', c: 'var(--lavender)', i: 'СР' },
            ].map((f) => (
              <li key={f.n}>
                <span className="avatar" style={{ background: f.c }}>
                  {f.i}
                </span>
                <div>
                  <strong>{f.n}</strong>
                  <span className="muted">{f.s}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="panel panel--featured"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="featured__photo">
            <img src={mascotEmotion} alt="" />
          </div>
          <span className="badge">материал дня</span>
          <h3>Как распознать цифровую усталость до того, как она стала тревогой</h3>
          <p>
            Психолог Екатерина Луговая объясняет три сигнала тела, по которым
            можно понять: пора закрыть ноутбук и выйти на улицу.
          </p>
          <Link to="/app/library" className="btn btn-secondary">
            Читать · 7 минут
            <ArrowRight size={16} />
          </Link>
        </motion.section>
      </div>
    </div>
  )
}

function buildPath(data, x0, x1, y0, yPad) {
  const step = (x1 - x0) / (data.length - 1)
  return data
    .map((d, i) => {
      const x = x0 + i * step
      const y = y0 - (d.mood / 10) * (y0 - yPad)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

function EmotionBar({ label, value, color }) {
  return (
    <div className="emotion">
      <div className="emotion__head">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="emotion__track">
        <motion.span
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

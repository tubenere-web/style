import { useState } from 'react'
import { motion } from 'framer-motion'
import { mascotEmotion } from '../../assets/illustrations.js'
import {
  Activity,
  Battery,
  Smartphone,
  Wind,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Sparkles,
  Save,
} from 'lucide-react'
import './Tracker.css'

const moods = [
  { id: 'calm', label: 'Спокойно', icon: Sun, color: 'var(--accent)' },
  { id: 'focus', label: 'Фокус', icon: Sparkles, color: 'var(--primary)' },
  { id: 'tired', label: 'Устало', icon: Cloud, color: 'var(--lavender)' },
  { id: 'anxious', label: 'Тревожно', icon: CloudRain, color: 'var(--coral)' },
  { id: 'empty', label: 'Пусто', icon: CloudSnow, color: 'var(--text-muted)' },
]

const tags = [
  'утренняя лента',
  'рабочие встречи',
  'переписка',
  'прогулка',
  'новости',
  'книга',
  'подкаст',
  'семья',
]

export default function Tracker() {
  const [mood, setMood] = useState('calm')
  const [anxiety, setAnxiety] = useState(35)
  const [energy, setEnergy] = useState(68)
  const [active, setActive] = useState(['прогулка', 'книга'])

  const toggle = (t) =>
    setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]))

  return (
    <div className="page tracker-page">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge badge-accent">запись 21 апреля · утро</span>
          <h1>Трекер состояния</h1>
          <p className="muted">
            Две минуты внимания к себе. Тихо сам свяжет запись с экранным
            временем и покажет тенденцию недели.
          </p>
        </div>
        <div className="page__head-actions">
          <button className="btn btn-secondary">Отменить</button>
          <button className="btn btn-primary">
            <Save size={18} />
            Сохранить запись
          </button>
        </div>
      </header>

      <div className="grid grid--2-left">
        <section className="panel tracker__mood">
          <div className="panel__head">
            <div>
              <h3>Как ты сейчас?</h3>
              <p>Выбери один тон — потом можно уточнить тегами.</p>
            </div>
          </div>

          <div className="mood-grid">
            {moods.map((m) => (
              <motion.button
                key={m.id}
                whileTap={{ scale: 0.96 }}
                className={`mood-card ${mood === m.id ? 'mood-card--active' : ''}`}
                onClick={() => setMood(m.id)}
                style={{ '--mood-color': m.color }}
              >
                <span className="mood-card__icon">
                  <m.icon size={28} strokeWidth={1.5} />
                </span>
                <span>{m.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="tracker__slider">
            <div className="slider-head">
              <label>Уровень тревоги</label>
              <strong>{anxiety} / 100</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={anxiety}
              onChange={(e) => setAnxiety(+e.target.value)}
              className="tracker-range tracker-range--anxiety"
            />
            <div className="slider-legend">
              <span>спокойно</span>
              <span>тревожно</span>
            </div>
          </div>

          <div className="tracker__slider">
            <div className="slider-head">
              <label>Уровень энергии</label>
              <strong>{energy} / 100</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(+e.target.value)}
              className="tracker-range tracker-range--energy"
            />
            <div className="slider-legend">
              <span>опустошение</span>
              <span>в ресурсе</span>
            </div>
          </div>

          <div className="tracker__tags">
            <label>Что повлияло на состояние</label>
            <div className="chip-row">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggle(t)}
                  className={`chip-btn ${active.includes(t) ? 'chip-btn--active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="tracker__note">
            <label htmlFor="note">Свободная мысль</label>
            <textarea
              id="note"
              rows={4}
              placeholder="Одно предложение — ровно столько, сколько хочется"
              defaultValue="Утро было мягким: выпила кофе, не заглядывая в телефон первые полчаса. Чувствую ясность в голове."
            />
          </div>
        </section>

        <section className="panel tracker__summary">
          <div className="panel__head">
            <div>
              <h3>Сводка недели</h3>
              <p>Всё, что у тебя уже получилось</p>
            </div>
          </div>

          <div className="mini-kpis">
            <div className="mini-kpi">
              <Activity size={18} />
              <div>
                <strong>7.4</strong>
                <span className="muted">настроение, средн.</span>
              </div>
            </div>
            <div className="mini-kpi">
              <Wind size={18} />
              <div>
                <strong>3.2</strong>
                <span className="muted">тревога, ↓ 18%</span>
              </div>
            </div>
            <div className="mini-kpi">
              <Battery size={18} />
              <div>
                <strong>6.8</strong>
                <span className="muted">энергия, + 12%</span>
              </div>
            </div>
            <div className="mini-kpi">
              <Smartphone size={18} />
              <div>
                <strong>3:48</strong>
                <span className="muted">экран, ↓ 42 мин</span>
              </div>
            </div>
          </div>

          <div className="tracker__heat">
            <div className="panel__head" style={{ marginTop: 4 }}>
              <div>
                <h4>Тепловая карта 28 дней</h4>
                <p>Чем темнее клетка — тем лучше день</p>
              </div>
            </div>
            <div className="heatmap">
              {Array.from({ length: 28 }).map((_, i) => {
                const v = ((i * 13) % 100) / 100
                return (
                  <motion.div
                    key={i}
                    className="heatmap__cell"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    style={{
                      background:
                        v < 0.25
                          ? 'var(--coral-soft)'
                          : v < 0.5
                          ? 'var(--lavender-soft)'
                          : v < 0.75
                          ? 'var(--accent-soft)'
                          : 'var(--accent)',
                    }}
                    title={`День ${i + 1} · индекс ${Math.round(v * 100)}`}
                  />
                )
              })}
            </div>
            <div className="heatmap-legend">
              <span>тревожнее</span>
              <div className="heatmap-legend__grad" />
              <span>спокойнее</span>
            </div>
          </div>

          <div className="photo-frame photo-frame--illustration tracker__photo">
            <img src={mascotEmotion} alt="" />
          </div>

          <div className="tracker__hint">
            <Sparkles size={18} />
            <div>
              <strong>Тихо заметил</strong>
              <p className="muted">
                По вторникам после 19:00 ты стабильно тратишь больше 50 минут в
                ленте — и это совпадает с ростом тревоги на следующее утро.
                Попробуем начать вечер со страницы книги?
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

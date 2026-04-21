import { useState } from 'react'
import { motion } from 'framer-motion'
import { mascotFriends } from '../../assets/illustrations.js'
import {
  UserPlus,
  MessageCircle,
  Check,
  X,
  Moon,
  BookOpen,
  Share2,
  Search,
} from 'lucide-react'
import './Friends.css'

const circle = [
  {
    n: 'Алёна Вершинина',
    i: 'АВ',
    c: 'var(--primary)',
    streak: 12,
    status: 'тихий вечер · 19:48',
    mood: 'спокойно',
    moodC: 'var(--accent)',
    screen: '2 ч 40 мин',
  },
  {
    n: 'Марк Круглов',
    i: 'МК',
    c: 'var(--accent)',
    streak: 4,
    status: 'читает «Медленная жизнь»',
    mood: 'концентрация',
    moodC: 'var(--primary)',
    screen: '3 ч 08 мин',
  },
  {
    n: 'Соня Ряшко',
    i: 'СР',
    c: 'var(--lavender)',
    streak: 18,
    status: '15 мин в ленте за день',
    mood: 'ясно',
    moodC: 'var(--accent)',
    screen: '1 ч 14 мин',
  },
  {
    n: 'Кирилл Зотов',
    i: 'КЗ',
    c: 'var(--coral)',
    streak: 0,
    status: 'офлайн второй день',
    mood: 'пусто',
    moodC: 'var(--lavender)',
    screen: '—',
  },
  {
    n: 'Ира Панова',
    i: 'ИП',
    c: 'var(--primary)',
    streak: 7,
    status: 'начала утренний ритуал',
    mood: 'фокус',
    moodC: 'var(--primary)',
    screen: '3 ч 22 мин',
  },
  {
    n: 'Дима Хмелёв',
    i: 'ДХ',
    c: 'var(--accent)',
    streak: 2,
    status: 'подключён к челленджу',
    mood: 'легко',
    moodC: 'var(--accent)',
    screen: '2 ч 58 мин',
  },
]

const requests = [
  { n: 'Лера Осипова', i: 'ЛО', c: 'var(--lavender)', mutual: 3 },
  { n: 'Павел Крылов', i: 'ПК', c: 'var(--primary)', mutual: 1 },
]

export default function Friends() {
  const [tab, setTab] = useState('circle')

  return (
    <div className="page friends-page">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge">6 человек в круге · 2 запроса</span>
          <h1>Круг поддержки</h1>
          <p className="muted">
            Близкие люди, с которыми можно делиться тишиной, а не вечным
            скроллом. Ничего не публикуется автоматически — всё только по твоему
            согласию.
          </p>
        </div>
        <div className="page__head-actions">
          <button className="btn btn-secondary">
            <Search size={18} />
            Найти друга
          </button>
          <button className="btn btn-primary">
            <UserPlus size={18} />
            Пригласить в круг
          </button>
        </div>
      </header>

      <div className="grid grid--2-left">
        <section className="panel friends__main">
          <div className="panel__head">
            <div className="panel__tabs">
              <button
                className={`panel__tab ${tab === 'circle' ? 'panel__tab--active' : ''}`}
                onClick={() => setTab('circle')}
              >
                Круг
              </button>
              <button
                className={`panel__tab ${tab === 'req' ? 'panel__tab--active' : ''}`}
                onClick={() => setTab('req')}
              >
                Запросы · 2
              </button>
              <button
                className={`panel__tab ${tab === 'sug' ? 'panel__tab--active' : ''}`}
                onClick={() => setTab('sug')}
              >
                Знакомы?
              </button>
            </div>
            <span className="muted">сортировка: активные сегодня</span>
          </div>

          {tab === 'circle' && (
            <div className="friends-grid">
              {circle.map((p, i) => (
                <motion.article
                  key={p.n}
                  className="friend-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="friend-card__top">
                    <span className="avatar avatar--lg" style={{ background: p.c }}>
                      {p.i}
                    </span>
                    <div>
                      <strong>{p.n}</strong>
                      <span className="muted">{p.status}</span>
                    </div>
                  </div>
                  <div className="friend-card__stats">
                    <div className="friend-card__stat">
                      <span className="friend-card__stat-label">Состояние</span>
                      <span
                        className="friend-card__stat-value"
                        style={{ color: p.moodC }}
                      >
                        {p.mood}
                      </span>
                    </div>
                    <div className="friend-card__stat">
                      <span className="friend-card__stat-label">Экран сегодня</span>
                      <span className="friend-card__stat-value">{p.screen}</span>
                    </div>
                    <div className="friend-card__stat">
                      <span className="friend-card__stat-label">Тихих вечеров</span>
                      <span className="friend-card__stat-value">
                        {p.streak} подряд
                      </span>
                    </div>
                  </div>
                  <div className="friend-card__actions">
                    <button className="friend-card__btn">
                      <MessageCircle size={16} />
                      <span>Написать</span>
                    </button>
                    <button className="friend-card__btn">
                      <Moon size={16} />
                      <span>Позвать на тихий&nbsp;вечер</span>
                    </button>
                    <button className="friend-card__btn">
                      <BookOpen size={16} />
                      <span>Читать вместе</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {tab === 'req' && (
            <ul className="req-list">
              {requests.map((r) => (
                <li key={r.n}>
                  <span className="avatar" style={{ background: r.c }}>
                    {r.i}
                  </span>
                  <div>
                    <strong>{r.n}</strong>
                    <span className="muted">
                      {r.mutual} общих друга в круге
                    </span>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    <Check size={16} /> Принять
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <X size={16} /> Отклонить
                  </button>
                </li>
              ))}
            </ul>
          )}

          {tab === 'sug' && (
            <div className="empty-state">
              <h4>Пока нет подсказок</h4>
              <p className="muted">
                Мы бережно относимся к контактам и не предлагаем людей без
                взаимных связей. Когда у тебя и друзей появится общий знакомый —
                покажем его здесь.
              </p>
              <button className="btn btn-secondary">Пригласить по ссылке</button>
            </div>
          )}
        </section>

        <aside className="panel friends__aside">
          <div className="panel__head">
            <div>
              <h3>Общие ритуалы</h3>
              <p>То, чем вы занимаетесь вместе</p>
            </div>
          </div>

          <ul className="rituals">
            <li className="ritual">
              <div className="ritual__icon ritual__icon--accent" aria-hidden="true">
                <Moon size={18} strokeWidth={1.9} />
              </div>
              <strong className="ritual__title">Тихие четверги</strong>
              <p className="ritual__text muted">
                с 20:00 до 22:00 без соц.сетей · 5 участников
              </p>
              <span className="badge badge-accent ritual__status">активно</span>
            </li>
            <li className="ritual">
              <div className="ritual__icon ritual__icon--lavender" aria-hidden="true">
                <BookOpen size={18} strokeWidth={1.9} />
              </div>
              <strong className="ritual__title">Совместное чтение</strong>
              <p className="ritual__text muted">
                «Цифровой минимализм» · 64 страницы из 260
              </p>
              <span className="badge badge-lavender ritual__status">на паузе</span>
            </li>
            <li className="ritual">
              <div className="ritual__icon ritual__icon--neutral" aria-hidden="true">
                <Share2 size={18} strokeWidth={1.9} />
              </div>
              <strong className="ritual__title">Утренние заметки</strong>
              <p className="ritual__text muted">
                три человека делятся короткой мыслью до 10:00
              </p>
              <span className="badge ritual__status">скоро</span>
            </li>
          </ul>

          <div className="photo-frame photo-frame--illustration friends__photo">
            <img src={mascotFriends} alt="" />
          </div>

          <div className="friends__rule">
            <strong>Правила круга</strong>
            <p>
              Данные не публикуются без твоего согласия. Можно выключить
              совместную статистику в один клик и остаться только с общими
              практиками.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

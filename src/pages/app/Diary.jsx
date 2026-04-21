import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mascotEmotion } from '../../assets/illustrations.js'
import {
  Plus,
  Filter,
  Smartphone,
  Video,
  Camera,
  MessageCircle,
  Newspaper,
  BookHeart,
  Clock,
  Image as ImageIcon,
} from 'lucide-react'
import './Diary.css'

const entries = [
  {
    id: 1,
    date: 'сегодня',
    time: '09:12',
    mood: 'ясно',
    moodColor: 'var(--accent)',
    tag: 'утро без ленты',
    app: 'без приложений',
    appIcon: BookHeart,
    screen: '12 мин',
    text:
      'Впервые за неделю проснулась без телефона в руках. Просто лежала и слушала, как за окном едет машина поливальщика. Тело мягкое, мысли медленные.',
  },
  {
    id: 2,
    date: 'сегодня',
    time: '14:40',
    mood: 'концентрация',
    moodColor: 'var(--primary)',
    tag: 'работа',
    app: 'Google Meet',
    appIcon: MessageCircle,
    screen: '2 ч 10 мин',
    text:
      'Созвон по проекту прошёл без пауз в мессенджерах. В конце даже не хотелось открывать соц.сети — закрыла ноутбук и пошла заваривать чай.',
  },
  {
    id: 3,
    date: 'вчера',
    time: '22:07',
    mood: 'тревога',
    moodColor: 'var(--coral)',
    tag: 'вечерний залип',
    app: 'соцсеть с лентой',
    appIcon: Camera,
    screen: '58 мин',
    text:
      'Зашла «на минутку» и очнулась через почти час. Чувствую ту самую знакомую пустоту — будто кто-то вытащил из меня батарейку. Запишу как триггер.',
  },
  {
    id: 4,
    date: 'вчера',
    time: '19:05',
    mood: 'лёгкость',
    moodColor: 'var(--accent)',
    tag: 'прогулка',
    app: 'фотокамера',
    appIcon: ImageIcon,
    screen: '7 мин',
    text:
      'Вышла в парк с бумажной книгой. Сфотографировала два дерева — и всё. Телефон сам остался в сумке до возвращения домой.',
  },
  {
    id: 5,
    date: 'позавчера',
    time: '13:22',
    mood: 'устало',
    moodColor: 'var(--lavender)',
    tag: 'новости',
    app: 'Telegram каналы',
    appIcon: Newspaper,
    screen: '42 мин',
    text:
      'Листала ленту новостей за обедом, еда прошла мимо вкуса. На выходе — ком в груди и желание лечь. Сделала 3 минуты дыхания 4-7-8.',
  },
  {
    id: 6,
    date: 'позавчера',
    time: '21:30',
    mood: 'спокойствие',
    moodColor: 'var(--accent)',
    tag: 'подкаст',
    app: 'подкаст-сервис',
    appIcon: Video,
    screen: '38 мин',
    text:
      'Слушала эпизод про «медленное утро». В конце легла сразу спать, без перелистывания чатов. Засыпала с ощущением, что вечер был длинным и добрым.',
  },
]

const filters = ['Все', 'Только ясно', 'Только тревожно', 'С тегом «работа»']

export default function Diary() {
  const [f, setF] = useState('Все')

  return (
    <div className="page diary-page">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge badge-lavender">11 записей на неделе</span>
          <h1>Дневник эмоций</h1>
          <p className="muted">
            Короткие заметки о настроении и приложениях, которые на него
            влияли. Тихо сам раскрашивает ленту по тону и подсказывает
            закономерности.
          </p>
        </div>
        <div className="page__head-actions">
          <button className="btn btn-secondary">
            <Filter size={18} />
            Фильтры
          </button>
          <button className="btn btn-primary">
            <Plus size={18} />
            Новая запись
          </button>
        </div>
      </header>

      <div className="grid grid--2-left">
        <section className="panel diary__feed">
          <div className="panel__head">
            <div>
              <h3>Лента состояний</h3>
              <p>Истории твоей недели — сверху самые свежие</p>
            </div>
          </div>

          <div className="chip-row">
            {filters.map((x) => (
              <button
                key={x}
                className={`chip-btn ${f === x ? 'chip-btn--active' : ''}`}
                onClick={() => setF(x)}
              >
                {x}
              </button>
            ))}
          </div>

          <ul className="diary-list">
            <AnimatePresence>
              {entries.map((e, i) => (
                <motion.li
                  key={e.id}
                  className="diary-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  style={{ '--mood-color': e.moodColor }}
                >
                  <div className="diary-card__rail" />
                  <div className="diary-card__head">
                    <div className="diary-card__meta">
                      <span className="diary-card__time">
                        <Clock size={14} />
                        {e.time}
                      </span>
                      <span className="muted">· {e.date}</span>
                      <span className="badge" style={{ background: 'color-mix(in oklab, var(--mood-color) 18%, var(--surface) 70%)', color: 'var(--mood-color)' }}>
                        {e.mood}
                      </span>
                    </div>
                    <div className="diary-card__app">
                      <e.appIcon size={16} />
                      {e.app}
                      <span className="diary-card__screen">
                        <Smartphone size={14} />
                        {e.screen}
                      </span>
                    </div>
                  </div>
                  <h4>#{e.tag}</h4>
                  <p>{e.text}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <aside className="panel diary__aside">
          <div className="panel__head">
            <div>
              <h3>Что влияет сильнее</h3>
              <p>Приложения и их вклад в состояние недели</p>
            </div>
          </div>

          <ul className="apps-list">
            {[
              { app: 'Соцсеть с лентой', effect: -42, time: '5 ч 12 мин', c: 'var(--coral)', icon: Camera },
              { app: 'Новостные каналы', effect: -18, time: '3 ч 48 мин', c: 'var(--lavender)', icon: Newspaper },
              { app: 'Подкаст-сервисы', effect: 22, time: '2 ч 10 мин', c: 'var(--primary)', icon: Video },
              { app: 'Бумажная книга', effect: 38, time: '1 ч 30 мин', c: 'var(--accent)', icon: BookHeart },
            ].map((a) => (
              <li key={a.app}>
                <span className="apps-list__icon" style={{ background: a.c }}>
                  <a.icon size={16} />
                </span>
                <div className="apps-list__body">
                  <div className="apps-list__top">
                    <strong>{a.app}</strong>
                    <span
                      className={`apps-list__effect ${
                        a.effect < 0 ? 'apps-list__effect--bad' : 'apps-list__effect--good'
                      }`}
                    >
                      {a.effect > 0 ? '+' : ''}
                      {a.effect}
                    </span>
                  </div>
                  <div className="apps-list__meta">
                    <span className="muted">{a.time}</span>
                    <div className="apps-list__bar">
                      <span
                        style={{
                          width: `${Math.min(100, Math.abs(a.effect) * 2)}%`,
                          background: a.c,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="diary__insight">
            <BookHeart size={18} />
            <div>
              <strong>Паттерн недели</strong>
              <p className="muted">
                После 20 минут в ленте соцсети настроение падает в среднем на
                2.1 пункта. После чтения бумажной книги — наоборот, растёт на 1.7.
              </p>
            </div>
          </div>

          <div className="photo-frame photo-frame--illustration diary__photo">
            <img src={mascotEmotion} alt="" />
          </div>
        </aside>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  Bookmark,
  BookmarkCheck,
  Play,
  Headphones,
  BookOpen,
  PenLine,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react'
import './Library.css'

const filters = [
  { id: 'all', label: 'Вся подборка' },
  { id: 'short', label: 'До 5 минут' },
  { id: 'deep', label: 'Глубокие темы' },
  { id: 'listen', label: 'Можно слушать' },
  { id: 'breathe', label: 'Практики дыхания' },
]

const items = [
  {
    id: 1,
    type: 'эссе',
    icon: PenLine,
    title: 'Почему тревога приходит именно вечером',
    author: 'Катя Луговая · психолог',
    time: '7 минут',
    cover: 'a',
    saved: true,
    tag: 'про вечер',
  },
  {
    id: 2,
    type: 'подкаст',
    icon: Headphones,
    title: 'Цифровой минимализм без фанатизма',
    author: 'Подкаст «Тихо» · 14 выпуск',
    time: '32 минуты',
    cover: 'b',
    saved: false,
    tag: 'минимализм',
  },
  {
    id: 3,
    type: 'практика',
    icon: Play,
    title: 'Дыхание 4–7–8 перед сном',
    author: 'Аудио-инструкция',
    time: '3 минуты',
    cover: 'c',
    saved: true,
    tag: 'дыхание',
  },
  {
    id: 4,
    type: 'книга',
    icon: BookOpen,
    title: 'Глава «Медленное утро» из книги Зимина',
    author: 'Алексей Зимин',
    time: '12 минут',
    cover: 'd',
    saved: false,
    tag: 'утро',
  },
  {
    id: 5,
    type: 'эссе',
    icon: PenLine,
    title: 'Тишина как навык: три простых упражнения',
    author: 'Марк Гольдштейн',
    time: '5 минут',
    cover: 'e',
    saved: false,
    tag: 'навыки',
  },
  {
    id: 6,
    type: 'подкаст',
    icon: Headphones,
    title: 'Разговор с врачом: когда тревога — не только про телефон',
    author: 'Подкаст «Тихо» · 12 выпуск',
    time: '46 минут',
    cover: 'f',
    saved: false,
    tag: 'психика',
  },
]

export default function Library() {
  const [f, setF] = useState('all')
  const [saved, setSaved] = useState(
    Object.fromEntries(items.map((i) => [i.id, i.saved]))
  )

  return (
    <div className="page library-page">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge">подборка апреля · 24 материала</span>
          <h1>Библиотека</h1>
          <p className="muted">
            Один раздел вместо десяти — чтобы не приходилось выбирать между
            «ресурсами», «статьями» и «историями». Всё самое полезное — здесь,
            без лишних вкладок.
          </p>
        </div>
      </header>

      <motion.section
        className="library__hero"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="library__hero-copy">
          <span className="badge badge-accent">материал недели</span>
          <h2>Как вернуться к бумажной книге за 7 вечеров</h2>
          <p>
            Маленький эксперимент для тех, кто давно не мог читать дольше пяти
            минут. Автор — журналист Марта Карская — пробует восстановить
            внимание, отказываясь от вечернего скролла. Обещаем: без жёстких
            правил.
          </p>
          <div className="library__hero-meta">
            <span>
              <Clock size={16} /> 11 минут
            </span>
            <span>
              <PenLine size={16} /> эссе · специальная рубрика
            </span>
          </div>
          <button className="btn btn-primary">
            Читать сейчас
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="library__hero-cover">
          <div className="photo-frame library__hero-photo">
            <ImageIcon size={22} />
            <span>обложка 520×360</span>
          </div>
        </div>
      </motion.section>

      <div className="library__filters">
        {filters.map((x) => (
          <button
            key={x.id}
            className={`chip-btn ${f === x.id ? 'chip-btn--active' : ''}`}
            onClick={() => setF(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <section className="library-grid">
        {items.map((it, i) => (
          <motion.article
            key={it.id}
            className="lib-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <div className={`lib-card__cover lib-card__cover--${it.cover}`}>
              <span className="lib-card__type">
                <it.icon size={14} /> {it.type}
              </span>
              <button
                className="lib-card__save"
                onClick={() => setSaved((s) => ({ ...s, [it.id]: !s[it.id] }))}
                aria-label="Сохранить в избранное"
              >
                {saved[it.id] ? (
                  <BookmarkCheck size={18} />
                ) : (
                  <Bookmark size={18} />
                )}
              </button>
              <span className="photo-hint">место под обложку</span>
            </div>
            <div className="lib-card__body">
              <h4>{it.title}</h4>
              <span className="muted">{it.author}</span>
              <div className="lib-card__meta">
                <span>
                  <Clock size={14} /> {it.time}
                </span>
                <span className="badge badge-lavender">#{it.tag}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="library__foot">
        <div>
          <h3>Новое в библиотеке каждую среду</h3>
          <p className="muted">
            Мы добавляем по 3–4 материала в неделю. Ничего срочного, без пушей.
            Подписка по желанию — получать письмо с подборкой на почту.
          </p>
        </div>
        <button className="btn btn-secondary btn-lg">
          Получать подборку на почту
        </button>
      </section>
    </div>
  )
}

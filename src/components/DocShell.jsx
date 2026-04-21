import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Printer, Download } from 'lucide-react'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './DocShell.css'

export default function DocShell({ title, meta, sections, siblings }) {
  return (
    <motion.div
      className="doc"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="doc__header">
        <Logo />
        <nav className="doc__nav">
          <Link to="/">На главную</Link>
          <Link to="/terms">Условия использования</Link>
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/personal-data">Обработка персональных данных</Link>
        </nav>
        <ThemeToggle />
      </header>

      <div className="doc__layout">
        <aside className="doc__toc">
          <Link to="/" className="link-btn doc__back">
            <ArrowLeft size={16} />
            Вернуться на главную
          </Link>
          <h4>Содержание</h4>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>

          <div className="doc__actions">
            <button className="btn btn-secondary btn-sm">
              <Printer size={16} />
              Распечатать
            </button>
            <button className="btn btn-ghost btn-sm">
              <Download size={16} />
              PDF
            </button>
          </div>

          {siblings && (
            <div className="doc__siblings">
              <span className="muted">Другие документы</span>
              {siblings.map((s) => (
                <Link key={s.to} to={s.to}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}
        </aside>

        <article className="doc__article">
          <div className="doc__meta">
            {meta.map((m) => (
              <span key={m.label} className="doc__meta-item">
                <strong>{m.value}</strong>
                {m.label}
              </span>
            ))}
          </div>
          <h1>{title}</h1>

          {sections.map((s, i) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <h2>
                <span className="doc__num">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              {s.body.map((paragraph, idx) =>
                Array.isArray(paragraph) ? (
                  <ul key={idx}>
                    {paragraph.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={idx}>{paragraph}</p>
                )
              )}
            </motion.section>
          ))}

          <div className="doc__finish">
            <p className="muted">
              Документ обновлён 14 апреля 2026 года. Предыдущая редакция хранится
              в архиве и доступна по запросу.
            </p>
            <Link to="/" className="btn btn-primary">
              Всё понятно, на главную
            </Link>
          </div>
        </article>
      </div>
    </motion.div>
  )
}

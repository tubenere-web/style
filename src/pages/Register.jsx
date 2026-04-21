import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import AuthShell from '../components/AuthShell.jsx'

export default function Register() {
  const [show, setShow] = useState(false)
  const [pwd, setPwd] = useState('')
  const navigate = useNavigate()

  const strength = passwordStrength(pwd)

  return (
    <AuthShell
      title="Создай свой тихий кабинет"
      subtitle="Займёт минуту. Мы не спрашиваем ничего лишнего — только чтобы начать заметки и трекер."
      footer={
        <>
          Уже с нами? <Link to="/login">Войти в аккаунт</Link>
        </>
      }
    >
      <form
        className="auth__form"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/app/dashboard')
        }}
      >
        <div className="auth__field">
          <label htmlFor="name">Как к тебе обращаться?</label>
          <div className="input-with-icon">
            <User size={18} />
            <input
              id="name"
              type="text"
              placeholder="Имя или псевдоним"
              defaultValue="Вика"
              required
            />
          </div>
        </div>

        <div className="auth__field">
          <label htmlFor="email2">Электронная почта</label>
          <div className="input-with-icon">
            <Mail size={18} />
            <input
              id="email2"
              type="email"
              placeholder="на этот адрес придёт код восстановления"
              defaultValue="vika.koval@example.ru"
              required
            />
          </div>
        </div>

        <div className="auth__field">
          <label htmlFor="password2">Пароль</label>
          <div className="input-with-icon">
            <Lock size={18} />
            <input
              id="password2"
              type={show ? 'text' : 'password'}
              placeholder="Не менее 8 символов, буквы и цифры"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-eye"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="pwd-strength">
            <div className="pwd-strength__bars">
              <span className={strength.score >= 1 ? 'on' : ''} />
              <span className={strength.score >= 2 ? 'on' : ''} />
              <span className={strength.score >= 3 ? 'on' : ''} />
              <span className={strength.score >= 4 ? 'on' : ''} />
            </div>
            <span className="auth__field-helper">{strength.label}</span>
          </div>
        </div>

        <label className="auth__checkbox">
          <input type="checkbox" defaultChecked />
          <span>
            Принимаю <Link to="/terms">пользовательское соглашение</Link> и
            согласен на <Link to="/privacy">обработку персональных данных</Link>.
          </span>
        </label>

        <label className="auth__checkbox">
          <input type="checkbox" />
          <span>
            Получать раз в неделю тёплое письмо с подборкой практик. Можно
            отключить одним кликом.
          </span>
        </label>

        <button type="submit" className="btn btn-primary btn-lg">
          Создать аккаунт
          <ArrowRight size={20} />
        </button>

        <div className="auth__divider">или зарегистрируйся через</div>

        <div className="auth__socials">
          <button type="button" className="auth__social">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Google
          </button>
          <button type="button" className="auth__social">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.04C6.5 2.04 2.04 6.5 2.04 12c0 4.84 3.44 8.87 8.02 9.8v-6.93H7.9V12h2.16V9.96c0-2.14 1.27-3.33 3.22-3.33.93 0 1.9.17 1.9.17v2.1h-1.07c-1.06 0-1.39.66-1.39 1.33V12h2.37l-.38 2.87h-1.99V21.8c4.58-.93 8.02-4.96 8.02-9.8 0-5.5-4.46-9.96-9.96-9.96z" />
            </svg>
            ВКонтакте
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

function passwordStrength(p) {
  let s = 0
  if (p.length >= 8) s += 1
  if (/[A-ZА-Я]/.test(p)) s += 1
  if (/\d/.test(p)) s += 1
  if (/[^A-Za-zА-Яа-я0-9]/.test(p)) s += 1
  const labels = [
    'Введите пароль не короче 8 символов',
    'Слабый пароль — добавь цифру',
    'Хорошо, но можно добавить заглавную букву',
    'Крепкий пароль',
    'Отличный пароль — так держать',
  ]
  return { score: s, label: labels[s] }
}

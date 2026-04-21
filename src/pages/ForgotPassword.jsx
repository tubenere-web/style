import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import AuthShell from '../components/AuthShell.jsx'

export default function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <AuthShell
      title="Восстановим доступ спокойно"
      subtitle="Введи почту, к которой привязан аккаунт. Мы отправим шестизначный код на ящик — его не нужно будет запоминать, он действует 10 минут."
      footer={
        <>
          Вспомнил пароль? <Link to="/login">Вернуться ко входу</Link>
        </>
      }
    >
      <form
        className="auth__form"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/recovery-code')
        }}
      >
        <div className="auth__field">
          <label htmlFor="rec-email">Электронная почта</label>
          <div className="input-with-icon">
            <Mail size={18} />
            <input
              id="rec-email"
              type="email"
              placeholder="vika@example.ru"
              defaultValue="vika.koval@example.ru"
              required
            />
          </div>
          <div className="auth__field-helper">
            Если такой почты у нас нет — дадим подсказку, но не раскроем, есть
            ли у тебя аккаунт (так безопаснее).
          </div>
        </div>

        <div className="info-block">
          <h4>Что произойдёт дальше</h4>
          <ol>
            <li>Отправим код на указанную почту.</li>
            <li>Ты введёшь его на следующем шаге — это подтвердит, что почта твоя.</li>
            <li>Сразу после этого сможешь задать новый пароль.</li>
          </ol>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          Отправить код
          <ArrowRight size={20} />
        </button>

        <Link to="/login" className="btn btn-ghost">
          <ArrowLeft size={18} />
          Вернуться ко входу
        </Link>
      </form>
    </AuthShell>
  )
}

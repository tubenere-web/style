import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Mail, Lock, Eye, EyeOff, RefreshCw } from 'lucide-react'
import AuthShell from '../components/AuthShell.jsx'

export default function RecoveryCode() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [step, setStep] = useState('code')
  const [show, setShow] = useState(false)
  const [timer, setTimer] = useState(54)
  const inputs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (timer <= 0) return
    const t = setInterval(() => setTimer((v) => v - 1), 1000)
    return () => clearInterval(t)
  }, [timer])

  const onChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[i] = val
    setCode(next)
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  return (
    <AuthShell
      title={step === 'code' ? 'Введи код из письма' : 'Придумай новый пароль'}
      subtitle={
        step === 'code'
          ? 'Мы отправили шестизначный код на vika.koval@example.ru. Он действует 10 минут и используется один раз.'
          : 'Код принят. Задай новый пароль — после сохранения автоматически войдём в аккаунт.'
      }
      footer={
        <>
          Не пришёл код?{' '}
          <Link to="/forgot-password">Проверить адрес почты</Link>
        </>
      }
    >
      {step === 'code' ? (
        <form
          className="auth__form"
          onSubmit={(e) => {
            e.preventDefault()
            setStep('reset')
          }}
        >
          <div className="auth__field">
            <label>Шестизначный код</label>
            <div className="code-inputs">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  value={c}
                  onChange={(e) => onChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Цифра ${i + 1} из 6`}
                />
              ))}
            </div>
            <div className="auth__field-helper" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Mail size={16} /> Код пришёл на почту. Проверь папку «Спам», если
              не видишь письмо.
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Подтвердить код
            <ArrowRight size={20} />
          </button>

          <div className="auth__resend">
            {timer > 0 ? (
              <span>Отправить код повторно можно через {timer} сек.</span>
            ) : (
              <button
                type="button"
                className="link-btn"
                onClick={() => setTimer(54)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <RefreshCw size={16} /> Отправить код снова
              </button>
            )}
          </div>
        </form>
      ) : (
        <form
          className="auth__form"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/app/dashboard')
          }}
        >
          <div className="auth__field">
            <label htmlFor="np">Новый пароль</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                id="np"
                type={show ? 'text' : 'password'}
                placeholder="Минимум 8 символов"
                defaultValue="novyi-tihiy-2026"
                required
              />
              <button
                type="button"
                className="input-eye"
                onClick={() => setShow((v) => !v)}
                aria-label="Показать пароль"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth__field">
            <label htmlFor="np2">Повторите новый пароль</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                id="np2"
                type={show ? 'text' : 'password'}
                defaultValue="novyi-tihiy-2026"
                required
              />
            </div>
          </div>

          <div className="info-block info-block--soft">
            <h4>Мы позаботились о безопасности</h4>
            <ul>
              <li>После смены пароля разлогинимся на других устройствах.</li>
              <li>Если это был не ты — напиши нам, мы поможем.</li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Сохранить и войти
            <ArrowRight size={20} />
          </button>
        </form>
      )}
    </AuthShell>
  )
}

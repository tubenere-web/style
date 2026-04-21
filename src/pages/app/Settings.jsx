import { useState } from 'react'
import { Bell, Moon, Shield, User, Download, Trash2 } from 'lucide-react'
import { mascotPlan } from '../../assets/illustrations.js'
import ThemeToggle from '../../components/ThemeToggle.jsx'

export default function Settings() {
  const [qh, setQh] = useState(true)
  const [weekly, setWeekly] = useState(true)
  const [friends, setFriends] = useState(false)

  return (
    <div className="page settings-page">
      <header className="page__head">
        <div className="page__head-left">
          <span className="badge">аккаунт Вика Коваль · 14 дней в «Тихо»</span>
          <h1>Настройки</h1>
          <p className="muted">
            Тонкая настройка ритма и приватности. Никакие изменения не
            применяются, пока ты не нажмёшь «Сохранить» — можно спокойно
            экспериментировать.
          </p>
        </div>
        <div className="page__head-actions">
          <button className="btn btn-secondary">Отменить</button>
          <button className="btn btn-primary">Сохранить изменения</button>
        </div>
      </header>

      <div className="grid grid--2-left">
        <section className="panel">
          <div className="panel__head">
            <div>
              <h3>
                <User size={20} style={{ verticalAlign: -4 }} /> Профиль
              </h3>
              <p>Так тебя видят друзья в круге</p>
            </div>
          </div>

          <div className="settings__profile">
            <div className="photo-frame photo-frame--illustration settings__avatar">
              <img src={mascotPlan} alt="" />
            </div>
            <div className="settings__profile-grid">
              <div className="auth__field">
                <label>Имя</label>
                <input type="text" defaultValue="Вика Коваль" />
              </div>
              <div className="auth__field">
                <label>Почта</label>
                <input type="email" defaultValue="vika.koval@example.ru" />
              </div>
              <div className="auth__field">
                <label>Часовой пояс</label>
                <select defaultValue="msk">
                  <option value="msk">Москва (GMT+3)</option>
                  <option value="spb">Санкт-Петербург (GMT+3)</option>
                  <option value="ekb">Екатеринбург (GMT+5)</option>
                </select>
              </div>
              <div className="auth__field">
                <label>Первый день недели</label>
                <select defaultValue="mon">
                  <option value="mon">Понедельник</option>
                  <option value="sun">Воскресенье</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__head">
            <div>
              <h3>
                <Moon size={20} style={{ verticalAlign: -4 }} /> Оформление
              </h3>
              <p>Светлая и тёмная темы · можно менять в любое время</p>
            </div>
          </div>
          <div className="row row--between">
            <div>
              <strong>Тема оформления</strong>
              <p className="muted">Переключается тумблером в шапке или здесь.</p>
            </div>
            <ThemeToggle />
          </div>
          <div className="row row--between">
            <div>
              <strong>Автотема по системе</strong>
              <p className="muted">Следовать настройкам устройства.</p>
            </div>
            <Switch />
          </div>
          <div className="row row--between">
            <div>
              <strong>Крупный шрифт</strong>
              <p className="muted">Добавит 2 px к базовому размеру.</p>
            </div>
            <Switch />
          </div>
        </section>
      </div>

      <div className="grid grid--2-left">
        <section className="panel">
          <div className="panel__head">
            <div>
              <h3>
                <Bell size={20} style={{ verticalAlign: -4 }} /> Уведомления
              </h3>
              <p>Тёплые напоминания, без давления</p>
            </div>
          </div>
          <div className="row row--between">
            <div>
              <strong>Тихие часы 22:30 – 08:00</strong>
              <p className="muted">В это время ни один пуш не придёт.</p>
            </div>
            <Switch value={qh} onChange={setQh} />
          </div>
          <div className="row row--between">
            <div>
              <strong>Еженедельный отчёт по воскресеньям</strong>
              <p className="muted">
                Короткое письмо с тем, что получилось, без цифровых баллов.
              </p>
            </div>
            <Switch value={weekly} onChange={setWeekly} />
          </div>
          <div className="row row--between">
            <div>
              <strong>Отметки друзей</strong>
              <p className="muted">
                Сообщения и приглашения на совместные практики.
              </p>
            </div>
            <Switch value={friends} onChange={setFriends} />
          </div>
        </section>

        <section className="panel">
          <div className="panel__head">
            <div>
              <h3>
                <Shield size={20} style={{ verticalAlign: -4 }} /> Данные и приватность
              </h3>
              <p>Тебе решать, где живут твои записи</p>
            </div>
          </div>
          <div className="row row--between">
            <div>
              <strong>Экспорт данных</strong>
              <p className="muted">
                Все записи в JSON и PDF — придёт на почту за 5 минут.
              </p>
            </div>
            <button className="btn btn-secondary btn-sm">
              <Download size={16} /> Запросить
            </button>
          </div>
          <div className="row row--between">
            <div>
              <strong>Сессии на устройствах</strong>
              <p className="muted">Активных устройств: 2 (ноутбук и iPhone)</p>
            </div>
            <button className="btn btn-ghost btn-sm">Управлять</button>
          </div>
          <div className="row row--between danger">
            <div>
              <strong>Удалить аккаунт</strong>
              <p className="muted">
                Удалим всё в течение 72 часов. Отменить после подтверждения
                нельзя.
              </p>
            </div>
            <button className="btn btn-ghost btn-sm danger-btn">
              <Trash2 size={16} /> Удалить
            </button>
          </div>
        </section>
      </div>

      <style>{`
        .row--between {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--surface-alt);
          gap: 16px;
        }
        .row--between + .row--between {
          margin-top: 10px;
        }
        .row--between strong { font-size: var(--fs-base); color: var(--text); display: block; margin-bottom: 4px; }
        .row--between p { font-size: var(--fs-sm); line-height: 1.5; max-width: 420px; }
        .row--between.danger { border-color: color-mix(in oklab, var(--danger) 30%, var(--border)); background: color-mix(in oklab, var(--danger) 8%, var(--surface)); }
        .danger-btn { color: var(--danger) !important; }
        .danger-btn:hover { background: color-mix(in oklab, var(--danger) 12%, transparent) !important; }
        .settings__profile { display: grid; grid-template-columns: 160px 1fr; gap: 24px; }
        .settings__avatar { height: 160px; flex-direction: column; gap: 8px; }
        .settings__profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        @media (max-width: 899px) {
          .row--between { flex-direction: column; align-items: stretch; gap: 10px; padding: 14px 16px; }
          .row--between p { max-width: none; }
          .row--between .switch { align-self: flex-start; }
          .row--between .btn-sm { width: 100%; justify-content: center; }
          .settings__profile { grid-template-columns: 1fr; }
          .settings__avatar { height: 140px; max-width: 160px; }
          .settings__profile-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

function Switch({ value = false, onChange }) {
  const [v, setV] = useState(value)
  const actual = onChange ? value : v
  const toggle = () => {
    if (onChange) onChange(!value)
    else setV(!v)
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={actual}
      onClick={toggle}
      className={`switch ${actual ? 'switch--on' : ''}`}
    >
      <span className="switch__thumb" />
      <style>{`
        .switch { position: relative; width: 52px; height: 30px; border-radius: 999px; background: var(--border-strong); border: none; cursor: pointer; padding: 0; transition: background var(--tr); }
        .switch:hover { background: var(--text-soft); }
        .switch--on { background: var(--primary); }
        .switch--on:hover { background: var(--primary-hover); }
        .switch__thumb { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%; background: #fff; box-shadow: var(--shadow-sm); transition: transform var(--tr); }
        .switch--on .switch__thumb { transform: translateX(22px); }
      `}</style>
    </button>
  )
}

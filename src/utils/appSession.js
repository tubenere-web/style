/** Доступ к разделу /app после «входа» с экранов Login/Register (демо). */
const KEY = 'tiho_app_session'

export function setAppSession() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}

export function clearAppSession() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

export function hasAppSession() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** iframe с /app на лендинге — тот же origin, не требует сессии */
export function isAppEmbedded() {
  if (typeof window === 'undefined') return false
  try {
    return window.self !== window.top
  } catch {
    return true
  }
}

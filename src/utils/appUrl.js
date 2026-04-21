/** Ссылка внутри текущего деплоя на экран приложения (/app/...). Учитывает Vite base. */
export function appUrl(segment) {
  const part = String(segment).replace(/^\//, '')
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  if (!base) return `/app/${part}`
  return `${base}/app/${part}`
}

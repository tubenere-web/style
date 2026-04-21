# Тихо

Веб-приложение на **React** и **Vite**: лендинг, онбординг, экраны приложения (дашборд, трекер, дневник, друзья, библиотека, настройки).

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`, предпросмотр билда: `npm run preview`.

## Репозиторий

[github.com/tubenere-web/style](https://github.com/tubenere-web/style)

## Vercel (рекомендуется)

Подключи репозиторий на [vercel.com](https://vercel.com): фреймворк **Vite**, команда сборки `npm run build`, каталог **`dist`**. Переменные окружения не обязательны — в проде используется корень сайта (`base: '/'`). Файл **`vercel.json`** задаёт SPA-роутинг.

После деплоя сайт будет на `*.vercel.app` или на своём домене.

## GitHub Pages (альтернатива)

Сайт: `https://tubenere-web.github.io/style/` — в workflow при сборке задаётся `VITE_BASE_PATH=/style`.

1. **Settings → Pages → Source:** ветка **`gh-pages`**, папка **`/ (root)`** (не корень `main`).
2. Push в `main` запускает workflow и обновляет `gh-pages`.

Локально прод без подпути: `npm run build` и `npm run preview`.

## Тема и экспорт в Figma (html-to-design и т.п.)

Тема задаётся атрибутом `data-theme` на `<html>`. До загрузки React тема выставляется **скриптом в `index.html`**: `?theme=dark` или `?theme=light`, затем `localStorage`, затем **`prefers-color-scheme`** (системная тёмная тема).

Для плагина, который не подхватывает тёмный вид: открой деплой с явным параметром, например `https://…vercel.app/?theme=dark`, и импортируй этот URL. Если среда плагина всегда считает тему «светлой», без `?theme=dark` тёмные токены не применятся.

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

## GitHub Pages

Сайт: **https://tubenere-web.github.io/style/**

При публикации **из корня ветки `main`** GitHub отдаёт исходный `index.html` с путём `/src/main.jsx` (это только для `npm run dev`), поэтому страница **пустая**. Нужна **сборка** в `dist/` и публикация **не из main**.

1. **Settings → Pages → Build and deployment**
2. **Source:** *Deploy from a branch*
3. **Branch:** `gh-pages`, folder **/ (root)** — сохранить.

После каждого push в `main` workflow **Deploy GitHub Pages** собирает проект и обновляет ветку `gh-pages` содержимым `dist/`. Статус — вкладка **Actions** (1–2 минуты).

Локально проверить прод: `npm run build` и `npm run preview`.

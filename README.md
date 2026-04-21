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

Сайт после деплоя: **https://tubenere-web.github.io/style/**

В репозитории на GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. После push в `main` workflow собирает проект и публикует папку `dist`. Первый запуск может занять 1–2 минуты; статус — вкладка **Actions**.

Локально проверить прод-сборку с тем же `base`, что и на Pages: `npm run build` и `npm run preview`.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import App from './App.jsx'
import './styles/global.css'
import './styles/forms.css'
import './pages/app/app-shared.css'

const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={routerBasename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

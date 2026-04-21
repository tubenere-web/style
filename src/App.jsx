import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import AppLayout from './components/AppLayout.jsx'
import useNbspTypography from './hooks/useNbspTypography.js'

import Landing from './pages/Landing.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import RecoveryCode from './pages/RecoveryCode.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

import Dashboard from './pages/app/Dashboard.jsx'
import Tracker from './pages/app/Tracker.jsx'
import Diary from './pages/app/Diary.jsx'
import Friends from './pages/app/Friends.jsx'
import Library from './pages/app/Library.jsx'
import Settings from './pages/app/Settings.jsx'

import MobileShowcase from './pages/MobileShowcase.jsx'

export default function App() {
  const location = useLocation()
  useNbspTypography()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Navigate to="/onboarding/1" replace />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recovery-code" element={<Navigate to="/recovery-code/code" replace />} />
        <Route path="/recovery-code/:step" element={<RecoveryCode />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/mobile" element={<MobileShowcase />} />

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="diary" element={<Diary />} />
          <Route path="friends" element={<Friends />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

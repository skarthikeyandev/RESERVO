import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AppNav from './components/AppNav'
import Toast from './components/Toast'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ServicesPage from './pages/ServicesPage'
import BookingsPage from './pages/BookingsPage'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return !isLoggedIn ? children : <Navigate to="/" replace />
}

export default function App() {
  const { isLoggedIn } = useAuth()

  return (
    <div>
      {isLoggedIn && <AppNav />}
      <Routes>
        <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/"         element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </div>
  )
}

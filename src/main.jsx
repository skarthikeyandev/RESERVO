import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { BookingsProvider } from './context/BookingsContext'
import { ToastProvider } from './context/ToastContext'
import './assets/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingsProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BookingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

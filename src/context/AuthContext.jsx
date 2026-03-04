import { createContext, useContext, useState } from 'react'

const USERS_KEY   = 'reservo_users'
const SESSION_KEY = 'reservo_session'

const AuthContext = createContext(null)

// ── localStorage helpers ──────────────────────────────
function getUsers()       { return JSON.parse(localStorage.getItem(USERS_KEY)   || '[]') }
function saveUsers(u)     { localStorage.setItem(USERS_KEY, JSON.stringify(u)) }
function getSession()     { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') }
function saveSession(u)   { localStorage.setItem(SESSION_KEY, JSON.stringify(u)) }
function clearSession()   { localStorage.removeItem(SESSION_KEY) }

// ── Provider ─────────────────────────────────────────
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getSession())

  function login(email, password) {
    const user = getUsers().find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    setCurrentUser(user)
    saveSession(user)
  }

  function register(name, email, password) {
    const users = getUsers()
    if (users.find(u => u.email === email))
      throw new Error('An account with this email already exists.')
    const newUser = { id: Date.now(), name, email, password }
    saveUsers([...users, newUser])
  }

  function logout() {
    setCurrentUser(null)
    clearSession()
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn: !!currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }

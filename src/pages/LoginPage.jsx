import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { values, handleChange } = useForm({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const { email, password } = values
    if (!email || !password) { setError('Please fill in all fields.'); return }
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.sub}>
        Don't have an account? <Link to="/register">Create one</Link>
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label>Email Address</label>
          <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="••••••••" />
        </div>
        <button type="submit" className={styles.submit}>Sign In →</button>
      </form>
    </AuthLayout>
  )
}

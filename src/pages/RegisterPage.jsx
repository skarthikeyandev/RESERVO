import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { values, handleChange } = useForm({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    const { name, email, password, confirmPassword } = values
    if (!name || !email || !password || !confirmPassword) { setError('All fields are required.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    try {
      register(name, email, password)
      setSuccess('Account created! Redirecting to login…')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthLayout>
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.sub}>
        Already registered? <Link to="/login">Sign in</Link>
      </p>

      {error   && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label>Full Name</label>
          <input name="name" type="text" value={values.name} onChange={handleChange} placeholder="Jane Doe" />
        </div>
        <div className={styles.field}>
          <label>Email Address</label>
          <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Min. 6 characters" />
        </div>
        <div className={styles.field}>
          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} placeholder="Repeat password" />
        </div>
        <button type="submit" className={styles.submit}>Create Account →</button>
      </form>
    </AuthLayout>
  )
}

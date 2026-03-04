import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBookings } from '../context/BookingsContext'
import styles from './AppNav.module.css'

export default function AppNav() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { getBookingsByUser } = useBookings()

  const myBookings = currentUser ? getBookingsByUser(currentUser.id) : []
  const upcomingCount = myBookings.filter(
    b => new Date(b.date + 'T23:59:59') >= new Date()
  ).length

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>RESERVO</div>

      <div className={styles.tabs}>
        <NavLink to="/" end className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}>
          Services
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}>
          My Bookings
          {upcomingCount > 0 && <span className={styles.badge}>{upcomingCount}</span>}
        </NavLink>
      </div>

      <div className={styles.right}>
        <div className={styles.avatar}>{currentUser?.name[0]?.toUpperCase()}</div>
        <span className={styles.username}>{currentUser?.name}</span>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

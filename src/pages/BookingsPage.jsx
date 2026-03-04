import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBookings } from '../context/BookingsContext'
import { useToast } from '../context/ToastContext'
import { getServiceById } from '../data/services'
import styles from './BookingsPage.module.css'

function isUpcoming(bk) {
  return new Date(bk.date + 'T23:59:59') >= new Date()
}

function formatDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function BookingsPage() {
  const { currentUser } = useAuth()
  const { getBookingsByUser, cancelBooking } = useBookings()
  const { showToast } = useToast()

  const myBookings = currentUser ? getBookingsByUser(currentUser.id) : []
  const upcomingCount = myBookings.filter(isUpcoming).length
  const totalSpent = myBookings.reduce((sum, b) => sum + (getServiceById(b.serviceId)?.price || 0), 0)

  function handleCancel(id) {
    cancelBooking(id)
    showToast('Booking cancelled successfully.')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Bookings</h1>
        <p className={styles.sub}>Manage and track your reservations</p>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Bookings</div>
          <div className={styles.statValue}>{myBookings.length}<span className={styles.statUnit}> sessions</span></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Upcoming</div>
          <div className={styles.statValue}>{upcomingCount}<span className={styles.statUnit}> confirmed</span></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Spent</div>
          <div className={styles.statValue}>${totalSpent}<span className={styles.statUnit}> USD</span></div>
        </div>
      </div>

      {/* Empty */}
      {myBookings.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <div className={styles.emptyTitle}>No bookings yet</div>
          <p className={styles.emptySub}>Head over to Services to make your first reservation</p>
          <Link to="/" className={styles.goBtn}>Browse Services →</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {myBookings.map(bk => {
            const svc = getServiceById(bk.serviceId)
            const upcoming = isUpcoming(bk)
            return (
              <div key={bk.id} className={styles.card}>
                <div className={styles.icon} style={{ background: svc?.bg }}>{svc?.icon}</div>
                <div className={styles.info}>
                  <div className={styles.serviceName}>{svc?.name}</div>
                  <div className={styles.detail}>📅 {formatDate(bk.date)} &nbsp;·&nbsp; ⏰ {bk.time}</div>
                </div>
                <div className={styles.right}>
                  <div className={styles.price}>${svc?.price}</div>
                  <div className={`${styles.status} ${upcoming ? styles.confirmed : styles.past}`}>
                    {upcoming ? 'Confirmed' : 'Completed'}
                  </div>
                  {upcoming && (
                    <button className={styles.cancelBtn} onClick={() => handleCancel(bk.id)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

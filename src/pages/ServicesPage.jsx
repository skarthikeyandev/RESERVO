import { useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import BookingModal from '../components/BookingModal'
import { SERVICES, CATEGORIES } from '../data/services'
import { useAuth } from '../context/AuthContext'
import { useBookings } from '../context/BookingsContext'
import { useToast } from '../context/ToastContext'
import styles from './ServicesPage.module.css'

function formatDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric',
  })
}

export default function ServicesPage() {
  const { currentUser } = useAuth()
  const { addBooking } = useBookings()
  const { showToast } = useToast()

  const [category, setCategory] = useState('All')
  const [activeService, setActiveService] = useState(null)

  const filtered = category === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === category)

  function handleBooked({ date, time }) {
    addBooking({ userId: currentUser.id, serviceId: activeService.id, date, time })
    showToast(`${activeService.name} booked for ${formatDate(date)} at ${time}`)
    setActiveService(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.sub}>Choose from our curated selection of premium experiences</p>
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.chip} ${category === cat ? styles.active : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(svc => (
          <ServiceCard key={svc.id} service={svc} onBook={setActiveService} />
        ))}
      </div>

      <BookingModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onBooked={handleBooked}
      />
    </div>
  )
}

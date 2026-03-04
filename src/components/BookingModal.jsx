import { useState } from 'react'
import { useBookings } from '../context/BookingsContext'
import { TIME_SLOTS } from '../data/services'
import styles from './BookingModal.module.css'

const today = new Date().toISOString().split('T')[0]

export default function BookingModal({ service, onClose, onBooked }) {
  const { isSlotTaken } = useBookings()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')

  if (!service) return null

  function handleConfirm() {
    setError('')
    if (!date) { setError('Please select a date.'); return }
    if (!time) { setError('Please select a time slot.'); return }
    onBooked({ date, time })
    setDate('')
    setTime('')
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.serviceName}>{service.name}</div>
        <div className={styles.servicePrice}>${service.price} · {service.duration}</div>

        <div className={styles.field}>
          <label>Select Date</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={e => { setDate(e.target.value); setTime('') }}
            className={styles.dateInput}
          />
        </div>

        {date && (
          <div className={styles.field}>
            <label>Select Time Slot</label>
            <div className={styles.slots}>
              {TIME_SLOTS.map(slot => {
                const taken = isSlotTaken(service.id, date, slot)
                return (
                  <button
                    key={slot}
                    className={`${styles.slot} ${time === slot ? styles.selected : ''} ${taken ? styles.taken : ''}`}
                    onClick={() => !taken && setTime(slot)}
                    disabled={taken}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
            <div className={styles.legend}>
              <span><span className={`${styles.dot} ${styles.dotAvail}`} /> Available</span>
              <span><span className={`${styles.dot} ${styles.dotTaken}`} /> Taken</span>
              <span><span className={`${styles.dot} ${styles.dotSel}`} /> Selected</span>
            </div>
          </div>
        )}

        <hr className={styles.divider} />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.confirmBtn} onClick={handleConfirm}>
          Confirm Reservation →
        </button>
        <p className={styles.note}>Free cancellation up to 24 hours before your appointment.</p>
      </div>
    </div>
  )
}

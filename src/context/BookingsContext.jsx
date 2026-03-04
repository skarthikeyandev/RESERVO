import { createContext, useContext, useState } from 'react'

const BOOKINGS_KEY = 'reservo_bookings'
const BookingsContext = createContext(null)

function load() { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]') }
function persist(b) { localStorage.setItem(BOOKINGS_KEY, JSON.stringify(b)) }

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(() => load())

  function addBooking({ userId, serviceId, date, time }) {
    const booking = { id: Date.now(), userId, serviceId, date, time, createdAt: new Date().toISOString() }
    const next = [...bookings, booking]
    setBookings(next)
    persist(next)
    return booking
  }

  function cancelBooking(id) {
    const next = bookings.filter(b => b.id !== id)
    setBookings(next)
    persist(next)
  }

  function isSlotTaken(serviceId, date, time) {
    return bookings.some(b => b.serviceId === serviceId && b.date === date && b.time === time)
  }

  function getBookingsByUser(userId) {
    return [...bookings.filter(b => b.userId === userId)].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  }

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking, isSlotTaken, getBookingsByUser }}>
      {children}
    </BookingsContext.Provider>
  )
}

export function useBookings() { return useContext(BookingsContext) }

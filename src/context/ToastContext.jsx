import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')

  const showToast = useCallback((msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() { return useContext(ToastContext) }

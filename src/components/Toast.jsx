import { useToast } from '../context/ToastContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { message } = useToast()
  if (!message) return null
  return <div className={styles.toast}>✓ {message}</div>
}

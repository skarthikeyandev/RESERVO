import styles from './AuthLayout.module.css'

export default function AuthLayout({ children }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.brand}>RESERVO</div>
        <div className={styles.brandSub}>Premium Booking Experience</div>
        <div className={styles.tagline}>
          Reserve your <em>perfect</em> moment with ease.
        </div>
        <p className={styles.desc}>
          From wellness sessions to consultations, book premium services
          in seconds. Your time is precious — let us handle the rest.
        </p>
        <div className={styles.dots}>
          <span className={styles.active} />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.formWrap}>{children}</div>
      </div>
    </div>
  )
}

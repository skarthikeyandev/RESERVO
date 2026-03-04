import styles from './ServiceCard.module.css'

export default function ServiceCard({ service, onBook }) {
  return (
    <div className={styles.card}>
      <div className={styles.img} style={{ background: service.bg }}>
        <span>{service.icon}</span>
        <span className={styles.badge}>{service.category}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{service.name}</div>
        <div className={styles.desc}>{service.desc}</div>
        <div className={styles.meta}>
          <div className={styles.price}>
            ${service.price}<span>/session</span>
          </div>
          <div className={styles.duration}>⏱ {service.duration}</div>
        </div>
        <button className={styles.bookBtn} onClick={() => onBook(service)}>
          Book Now
        </button>
      </div>
    </div>
  )
}

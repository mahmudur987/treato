import React from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'

export default function AddedServiceMain({serviceData}) {
  return (
    <div className={styles.service_cardC}>
      <div className={styles.service_cardCA}>
        <div className={styles.service_cardCAA}>{serviceData?.service_name}</div>
        <div className={styles.service_cardCAA}>₹{serviceData?.service_price}</div>
      </div>
      <div className={styles.service_cardCB}>{serviceData?.service_time}</div>
    </div>
  )
}

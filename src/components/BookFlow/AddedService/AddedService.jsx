import React from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import cross from "../../../assets/images/icons/cross.svg"
export default function AddedService() {
  return (
    <div className={styles.addedServiceA}>
        <div className={styles.addedServiceB}>
            <div>1</div>
            <img src={cross} alt="x" />
            <div>Hair cut girls</div>
        </div>
        <div className={styles.addedServiceC}>
            ₹399
        </div>
    </div>
  )
}

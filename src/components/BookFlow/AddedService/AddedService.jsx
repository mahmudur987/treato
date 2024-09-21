import React from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import cross from "../../../assets/images/icons/cross.svg"
export default function AddedService(item) {
  console.log(item);
  return (
    <div className={styles.addedServiceA}>
      {item?
      <>      
        <div className={styles.addedServiceB}>
            <div>{item?.service_count}</div>
            <img loading="lazy" src={cross} alt="x" />
            <div>{item?.service_name}</div>
        </div>
        <div className={styles.addedServiceC}>
            ₹{item?.service_price}
        </div>
      </>
      :
      <>
          <div className={styles.addedServiceB}>
            <div>1</div>
            <img loading="lazy" src={cross} alt="x" />
            <div>Hair cut girls</div>
        </div>
        <div className={styles.addedServiceC}>
            ₹399
        </div></>
      }
    </div>
  )
}

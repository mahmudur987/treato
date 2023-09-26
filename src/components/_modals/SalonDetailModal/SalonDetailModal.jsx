import React from 'react'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import SalonOffers from '../../SalonDetail/SalonOffers/SalonOffers'
import styles from './SalonDetailModal.module.css'
import { cross } from '../../../assets/images/icons'
export default function SalonDetailModal({setShowModal}) {
  return (
    <div className={styles.ModalMain}>
        <div className={styles.ModalMainA}>
            <div className={styles.ModalMainAA}>
                <div>Select Offers</div>
                <img src={cross} alt="" onClick={()=>setShowModal?setShowModal(false):''}/>
            </div>
            <div className={styles.ModalMainB}>
                <SalonOffers isFromModal={true}/>
                <SalonOffers isFromModal={true}/>
                <SalonOffers isFromModal={true}/>
            </div>
            <div className={styles.ModalMainC}>
                <PrimaryButton children={'Cancel'} className={styles.bgWhite}  onClick={()=>setShowModal?setShowModal(false):''}/>
                <PrimaryButton children={'Apply'}/>
            </div>
        </div>
    </div>
  )
}

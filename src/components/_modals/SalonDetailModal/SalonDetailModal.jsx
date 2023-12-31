import React, { useEffect, useState } from 'react'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import SalonOffers from '../../SalonDetail/SalonOffers/SalonOffers'
import styles from './SalonDetailModal.module.css'
import { cross } from '../../../assets/images/icons'
import { useParams } from 'react-router-dom'
import { getSingleSalonData } from '../../../services/salon'
export default function SalonDetailModal({setShowModal}) {
  const [salon, setSalon] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getSingleSalonData(id).then((res) => {
          setSalon(res?.res?.data?.salon);
        });
      }, [id]);
  return (
    <div className={styles.ModalMain}>
        <div className={styles.ModalMainA}>
            <div className={styles.ModalMainAA}>
                <div>Select Offers</div>
                <img src={cross} alt="" onClick={()=>setShowModal?setShowModal(false):''}/>
            </div>
            <div className={styles.ModalMainB}>
                {
                    salon?.salon_offers && salon?.salon_offers?.map((e)=>(
                        <SalonOffers isFromModal={true} offerData={e}/>
                    ))
                }

            </div>
            <div className={styles.ModalMainC}>
                <PrimaryButton children={'Cancel'} className={styles.bgWhite}  onClick={()=>setShowModal?setShowModal(false):''}/>
                <PrimaryButton children={'Apply'}/>
            </div>
        </div>
    </div>
  )
}

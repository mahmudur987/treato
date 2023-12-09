import React from 'react'
import styles from './FindLocationModal.module.css'
import DarkCross from '../../../assets/images/icons/DarkCross.svg'
import smallMapPin from '../../../assets/images/icons/smallMapPin.svg'
import mapPinBlue from '../../../assets/images/icons/mapPinBlue.svg'
import smallCross from '../../../assets/images/icons/smallCross.svg'
import BasicInput from '../../Input/BasicInput/BasicInput'
import { useState } from 'react'

export default function FindLocationModal({ setAddressModal, setlocationModal, addressModal }) {
    let closeModal = () => {
        let newAddressModal = { ...addressModal };
        newAddressModal.active = true;
        setAddressModal(newAddressModal);
        setlocationModal(false)
    }
    let [locationValue, setLocationValue] = useState(" ");

    return (
        <div className={styles.locationMain}>
            <div className={styles.locationBack}>
                <div className={styles.locationA}>
                    <div className={styles.locationAA}>Find your location</div>
                    <img src={DarkCross} alt="close" onClick={closeModal} />
                </div>
                <div className={styles.locationB}>
                    <img src={smallMapPin} alt="mapPin" />
                    <BasicInput Type={'text'} onChange={e => setLocationValue(e.target.value)} VALUE={locationValue} />
                    <img src={smallCross} alt="smallCross" onClick={() => setLocationValue(' ')} />
                </div>
                <div className={styles.locationC}>
                    <img src={mapPinBlue} alt="mapPin" />
                    <div>Current Location</div>
                </div>
                <div className={styles.locationE}>
                    <div className={styles.locationD}>
                        Bengaluru, Karnataka, India
                    </div>
                    <div className={styles.locationD}>
                        Bengaluru Palace, Bengaluru, Karnataka, India
                    </div>
                </div>
            </div>
        </div>
    )
}

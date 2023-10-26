import React from 'react'
import styles from './AddressModal.module.css'
import DarkCross from '../../../assets/images/icons/DarkCross.svg'
import map from '../../../assets/images/icons/map.png'
import SecondaryButton from '../../Buttons/SecondaryButton/SecondaryButton'
import BasicInput from '../../Input/BasicInput/BasicInput'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'

export default function AddressModal({setAddressModal}) {
    return (
        <div className={styles.addressMain}>
            <div className={styles.addressBack}>
            <div className={styles.addressA}>
                <div className={styles.addressAA}>Add new address</div>
                <img src={DarkCross} alt="close" onClick={()=>setAddressModal(false)}/>
            </div>
            <div className={styles.addressB}>
                <div className={styles.addressBA}>Bellandur, Bengaluru, Karnataka, 560103, India</div>
                <div className={styles.addressBB}><SecondaryButton children={'Change'} className={styles.addressBB_btn}/></div>
            </div>
            <div className={styles.addressC}>
                <img src={map} alt="" />
            </div>
            <div className={styles.addressD}>
                <label htmlFor="house">
                    <div className={styles.addressDA}>House/Flat Number*</div>
                    <BasicInput PlaceHolder={'House or flat number'} />
                </label>
            </div>
            <div className={styles.addressD}>
                <label htmlFor="house">
                    <div className={styles.addressDA}>Landmark (optional)</div>
                    <BasicInput PlaceHolder={'e.g. opp. AXN Center'} />
                </label>
            </div>
            <div className={styles.addressE}>
                <div className={styles.addressEA}>Save as</div>
                <div className={styles.addressEB}>
                    <div  className={styles.addressEBA}>Home</div>
                    <div  className={styles.addressEBB}>Other</div>
                </div>
            </div>
            <div className={styles.addressF}>
                <PrimaryButton children={'Add Address'} className={styles.saveInactive}/>
            </div>
            </div>
        </div>
    )
}

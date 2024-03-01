import React from 'react'
import styles from "./SalonPic.module.css";
// import Grey_Close from '../../../../assets/images/icons/Grey_Close.svg';
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg';

const SalonPicModal = ({ onClose }) => {
    return (
        <div className={styles.shareMain}>

            <div className={styles.shareA}>
                {/* <div className={styles.mob_d_none}>

                    
                    <div className={styles.shareB}>
                        <img src={Grey_Close} alt="close" onClick={onClose} />
                    </div>
                </div> */}
                <div className={styles.shareB} >
                    <h3 onClick={onClose}>Make Primary</h3>
                    <h3 onClick={onClose}>Replace</h3>
                    <h4 onClick={onClose} className={styles.Delete}>Delete</h4>
                </div>
            </div>
        </div>
    )
}

export default SalonPicModal
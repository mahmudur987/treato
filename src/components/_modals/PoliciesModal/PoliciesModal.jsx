import React from 'react'
import styles from './PoliciesModal.module.css'
import DarkCross from '../../../assets/images/icons/DarkCross.svg'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import { useState } from 'react'

export default function PoliciesModal({ setOpenModal, mainIcon, desc, title }) {
    let [closeModal, setCloseModal] = useState(false)

    const handlePrimaryButton =()=>{
        setCloseModal(true); 
        setOpenModal({ taxModal: false, cancelModal: false });
    }
    return (
        <>
            {
                closeModal ?
                    null
                    :
                    <div className={styles.taxesMain}>
                        <div className={styles.taxesPC}>
                            <div className={styles.taxesA}>
                                <img loading="lazy" src={mainIcon ? mainIcon : null} alt="tax_icon" />
                                <div className={styles.taxesB}>
                                    {
                                        title ? title : null
                                    }
                                </div>
                                <div className={styles.taxesC}>
                                    {
                                        desc ? desc : null
                                    }
                                </div>
                                <PrimaryButton children={'Got it'} onClick={handlePrimaryButton} />
                            </div>
                        </div>
                        <div className={styles.taxesMob}>
                            <div className={styles.taxesA}>
                                <div className={styles.taxesB}>
                                    <div>
                                        {
                                            title ? title : null
                                        }
                                    </div>
                                    <img loading="lazy" src={DarkCross} alt="cross" onClick={handlePrimaryButton} />
                                </div>
                                <img loading="lazy" src={mainIcon ? mainIcon : null} alt="tax_icon" className={styles.taxesIco} />
                                <div className={styles.taxesC}>
                                    {
                                        desc ? desc : null
                                    }
                                </div>
                                <PrimaryButton children={'Got it'} onClick={handlePrimaryButton} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

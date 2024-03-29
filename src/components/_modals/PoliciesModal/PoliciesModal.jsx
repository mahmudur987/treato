import React from 'react'
import styles from './PoliciesModal.module.css'
import DarkCross from '../../../assets/images/icons/DarkCross.svg'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import { useState } from 'react'

export default function PoliciesModal({ setOpenModal, mainIcon, desc, title }) {
    let [closeModal, setCloseModal] = useState(false)
    return (
        <>
            {
                closeModal ?
                    null
                    :
                    <div className={styles.taxesMain}>
                        <div className={styles.taxesPC}>
                            <div className={styles.taxesA}>
                                <img src={mainIcon ? mainIcon : null} alt="tax_icon" />
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
                                <PrimaryButton children={'Got it'} onClick={() => { setCloseModal(true); setOpenModal({ taxModal: false, cancelModal: false }) }} />
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
                                    <img src={DarkCross} alt="cross" onClick={() => { setCloseModal(true); setOpenModal({ taxModal: false, cancelModal: false }) }} />
                                </div>
                                <img src={mainIcon ? mainIcon : null} alt="tax_icon" className={styles.taxesIco} />
                                <div className={styles.taxesC}>
                                    {
                                        desc ? desc : null
                                    }
                                </div>
                                <PrimaryButton children={'Got it'} onClick={() => { setCloseModal(true); setOpenModal({ taxModal: false, cancelModal: false }) }} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

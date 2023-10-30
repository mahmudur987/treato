import { useState } from 'react'
import { useRef } from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import BasicInput from '../../Input/BasicInput/BasicInput'
import PhoneInput from '../../Input/PhoneInput/PhoneInput'
import RadioInput from '../../Input/RadioInput/RadioInput'
import TextArea from '../../Input/TextArea/TextArea'

export default function VisitorDetail() {
    let [guest,setGuest] = useState(0)
    return (
        <div className={styles.visitor_detailMain}>
            <div className={styles.visitor_detailA}>
                <div className={styles.visitor_detailAA}>
                    Who are you booking for?
                </div>
                <div className={styles.visitor_detailAB}>
                    <RadioInput Type={'radio'} NAME={'visitor'} setGuest={setGuest} guest={false}/>
                    <div>Booking for myself</div>
                </div>
                <div className={styles.visitor_detailAB}>
                    <RadioInput Type={'radio'} NAME={'visitor'} setGuest={setGuest} guest={true}/>
                    <div>Booking for someone else (guest)</div>
                </div>
            </div>
            <div className={styles.visitor_detailA}>
                <div className={`${styles.visitor_detailAA} ${styles.mb_0}`}>
                    {
                        guest?
                        "Enter details of guest"
                        :
                        "Enter contact details"
                    }
                </div>
                <div className={styles.visitor_detailAB}>You may need this phone number at the salon for OTP purposes</div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Name</div>
                    <div className={styles.visitor_detailACB}>
                        <BasicInput Type={'text'} PlaceHolder={'Shreyas Awasthi'}/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Phone</div>
                    <div className={`${styles.visitor_detailACB} ${styles.visitor_detailAC_opt}`}>
                        <PhoneInput Type={'tel'} PlaceHolder={'Enter your phone number'}/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Email</div>
                    <div className={styles.visitor_detailACB}>
                        <BasicInput Type={'email'} PlaceHolder={'shreya2716@gmail.com'}/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Preferences (optional)</div>
                    <div className={styles.visitor_detailACB}>
                        <TextArea PlaceHolder={'Anyhing specific you want to share'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
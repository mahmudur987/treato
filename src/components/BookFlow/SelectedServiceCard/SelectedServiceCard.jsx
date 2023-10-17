import styles from '../../../pages/BookFlow/BookFlow.module.css'
import BookNow from '../../SalonDetail/BookNow/BookNow'
import clock from "../../../assets/images/SalonDetail/clock.svg"
import user_3 from "../../../assets/images/SalonDetail/user_3.svg"
import editIco from "../../../assets/images/icons/edit.svg"
import { useNavigate } from 'react-router-dom'

export default function SelectedServiceCard({ updateActiveBookFlowBA, activeBookFlowBA }) {
    const navigate = useNavigate();

    return (
        <div className={styles.service_cardMain}>
            <div className={styles.service_cardA}>She Hair & Beauty</div>
            <div className={styles.service_cardB}>You have selected the following services</div>
            <div className={styles.service_cardC}>
                <div className={styles.service_cardCA}>
                    <div className={styles.service_cardCAA}>Hair cut girls</div>
                    <div className={styles.service_cardCAA}>₹399</div>
                </div>
                <div className={styles.service_cardCB}>45 mins</div>
            </div>
            <div className={styles.service_cardC}>
                <div className={styles.service_cardCA}>
                    <div className={styles.service_cardCAA}>Hair cut girls</div>
                    <div className={styles.service_cardCAA}>₹399</div>
                </div>
                <div className={styles.service_cardCB}>45 mins</div>
            </div>
            <div className={styles.service_cardD}>
                <div className={styles.service_cardDA}>Item total</div>
                <div className={styles.service_cardDA}>₹998</div>
            </div>
            {
                activeBookFlowBA === 1 ?
                    ''
                    :
                    activeBookFlowBA === 2 ?
                        <>
                            <div className={styles.service_cardD}>
                                <div>Service Details:</div>
                            </div>
                            <div className={styles.service_cardF}>
                                <img src={clock} alt="" />
                                <div>Tue - Aug 15, 1:30 PM</div>
                                <img src={editIco} alt="" />
                            </div>
                            <div className={styles.service_cardG}>
                                <div className={styles.service_cardGA}><img src={user_3} alt="" /></div>
                                <div>No Preference</div>
                                <img src={editIco} alt="" />
                            </div>
                        </>
                        :
                        activeBookFlowBA === 3 ?
                            <>
                                <div className={styles.service_cardD}>
                                    <div>Service Details:</div>
                                </div>
                                <div className={styles.service_cardF}>
                                    <img src={clock} alt="" />
                                    <div>Tue - Aug 15, 1:30 PM</div>
                                    <img src={editIco} alt="" />
                                </div>
                                <div className={styles.service_cardG}>
                                    <div className={styles.service_cardGA}><img src={user_3} alt="" /></div>
                                    <div>No Preference</div>
                                    <img src={editIco} alt="" />
                                </div>
                            </>
                            :
                            <>
                                <div className={styles.service_cardD}>
                                    <div>Service Details:</div>
                                </div>
                                <div className={styles.service_cardF}>
                                    <img src={clock} alt="" />
                                    <div>Tue - Aug 15, 1:30 PM</div>
                                    <img src={editIco} alt="" />
                                </div>
                                <div className={styles.service_cardG}>
                                    <div className={styles.service_cardGA}><img src={user_3} alt="" /></div>
                                    <div>No Preference</div>
                                    <img src={editIco} alt="" />
                                </div>
                            </>
            }
            <div className={styles.service_cardE}>
                <BookNow innerText={'Proceed'} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} />
            </div>
            <div className={styles.service_cardBack} onClick={()=> activeBookFlowBA===1?navigate(-1):activeBookFlowBA===2?updateActiveBookFlowBA(activeBookFlowBA=1):activeBookFlowBA===3?updateActiveBookFlowBA(activeBookFlowBA=2):updateActiveBookFlowBA(activeBookFlowBA=3)}>
                Back to previous
            </div>
        </div>
    )
}
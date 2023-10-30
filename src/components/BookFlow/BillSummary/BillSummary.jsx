import styles from '../../../pages/BookFlow/BookFlow.module.css'
import slide1 from "../../../assets/images/SalonDetail/slide1.png"
import discountIco from "../../../assets/images/SalonDetail/discountIco.svg"
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg"
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg"
import cancelIco from "../../../assets/images/icons/cancelIco.svg"
import taxIco from "../../../assets/images/icons/taxIco.svg"
import { useNavigate } from 'react-router-dom'
import BookNow from '../../SalonDetail/BookNow/BookNow'
import PoliciesModal from '../../_modals/PoliciesModal/PoliciesModal'
import { useState } from 'react'

export default function BillSummary({ setShowModal, updateActiveBookFlowBA, activeBookFlowBA, showPay, paySelected,setCompletedPay }) {
    const navigate = useNavigate();
    let [openModal,setOpenModal] = useState(
        {
            taxModal:false,
            cancelModal:false
        }
    )
    return (
        <>
            <div className={styles.service_cardMain}>
                <div className={styles.bill_sumA}>Bill Summary</div>
                <div className={styles.bill_sumI}>
                    <div className={styles.bill_sumB}>
                        <img src={slide1} alt="" />
                        <div>She Hair & Beauty</div>
                    </div>
                    <div className={styles.bill_sumC}>
                        <div className={styles.bill_sumCA}>
                            <div>1</div>
                            <div>x</div>
                            <div>Hair cut girls</div>
                        </div>
                        <div>₹399</div>
                    </div>
                    <div className={styles.bill_sumD}>
                        <div className={styles.bill_sumDA}>
                            <div>1</div>
                            <div>x</div>
                            <div>Blow drying ladies</div>
                        </div>
                        <div>₹599</div>
                    </div>
                    <div className={styles.bill_sumE}>
                        <div>
                            Item total
                        </div>
                        <div>₹998 </div>
                    </div>
                    <div className={styles.bill_sumE}>
                        <div className={styles.bill_sumEA} onClick={()=>setOpenModal({taxModal:true,cancelModal:false})}>
                            Taxes and fees
                        </div>
                        <div className={styles.bill_sumEB}>₹179</div>
                    </div>
                    <div className={styles.bill_sumF}>
                        <div className={styles.bill_sumFA}>
                            Amount to be paid
                        </div>
                        <div className={styles.bill_sumFB}>₹1,177</div>
                    </div>
                </div>
                <div className={styles.bill_sumF}>
                    <div className={styles.bill_sumFC}>
                        <img src={discountIco} alt="" />
                        <div>Offers & Benefits</div>
                    </div>
                    <div className={styles.bill_sumFD} onClick={() => setShowModal ? setShowModal(true) : ''}>
                        <div>4 offers</div>
                        <img src={rightBlue} alt="" />
                    </div>
                </div>
                {
                    !showPay || paySelected ?
                        <BookNow innerText={'Pay ₹1,177'} setCompletedPay={setCompletedPay}/>
                        :
                        <div className={styles.bill_sumG}>
                            <button>Pay ₹1,177</button>
                        </div>
                }
                <div className={styles.service_cardBack} onClick={() => activeBookFlowBA === 1 ? navigate(-1) : activeBookFlowBA === 2 ? updateActiveBookFlowBA(activeBookFlowBA = 1) : activeBookFlowBA === 3 ? updateActiveBookFlowBA(activeBookFlowBA = 2) : updateActiveBookFlowBA(activeBookFlowBA = 3)}>
                    Back to previous
                </div>
            </div>
            <div className={styles.bill_sumH}>
                <img src={calendar_cancel} alt="" />
                <div className={styles.bill_sumHA}>
                    Free cancellation & rescheduling till 4 hours before the start time, post that cancellation charge(s) apply. <span onClick={()=>setOpenModal({taxModal:false,cancelModal:true})}>Cancellation Policy.</span>
                </div>
            </div>
            {
                openModal.taxModal?
                <PoliciesModal setOpenModal={setOpenModal} mainIcon={taxIco} desc={"Taxes levied as per Govt. regulations, subject to change basis final service value. The fee goes towards training of partners and providing support & assistance during the service."} title={"Taxes and Fees"}/>
                :
                openModal.cancelModal?
                <PoliciesModal setOpenModal={setOpenModal} mainIcon={cancelIco} desc={"Treato has a fair cancellation policy. Taxes levied as per Govt. regulations, subject to change basis final service value. The fee goes towards training of partners and providing support & assistance during the service."} title={"Cancellation Policy"}/>
                :
                null
            }
        </>
    )
}
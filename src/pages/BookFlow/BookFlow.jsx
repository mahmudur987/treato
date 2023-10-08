import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BillSummary from '../../components/BookFlow/BillSummary/BillSummary'
import FinalBill from '../../components/BookFlow/FInalBill/FinalBill'
import SelectedServiceCard from '../../components/BookFlow/SelectedServiceCard/SelectedServiceCard'
import VisitorDetail from '../../components/BookFlow/VisitorDetail/VisitorDetail'
import WorkerDetail from '../../components/BookFlow/WorkerDetail/WorkerDetail'
import BackButton from '../../components/Buttons/BackButton/BackButton'
import BookNow from '../../components/SalonDetail/BookNow/BookNow'
import SalonServiceMain from '../../components/SalonDetail/SalonServiceMain/SalonServiceMain'
import SalonDetailModal from '../../components/_modals/SalonDetailModal/SalonDetailModal'
import styles from './BookFlow.module.css'

export default function BookFlow() {
    let navigate = useNavigate()
    let [activeBookFlowBA, updateActiveBookFlowBA] = useState(1)
    let [winWidthMain,updateWinWidthMain] = useState(window.innerWidth);
    function reportWindowSize() {
        let winWidth = window.innerWidth;
        updateWinWidthMain(winWidth)
    }
    window.onresize = reportWindowSize;
    let [showModal,setShowModal] = useState(false)
    return (
        <div className={styles.book_flowMain}>
            <BackButton updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} />
            {
                showModal?
                <SalonDetailModal setShowModal={setShowModal}/>
                :
                ''
            }
            <div className={styles.book_flowMainA}>
                <div className={styles.book_flowA}>
                    {
                        activeBookFlowBA === 1 ?
                            'Select services'
                            :
                            activeBookFlowBA === 2 ?
                                'Select professional and time'
                                :
                                activeBookFlowBA === 3 ?
                                    'Visitor Details'
                                    :
                                    'Payment'
                    }
                </div>
                <div className={styles.book_flowB}>
                    <div className={activeBookFlowBA === 1 || activeBookFlowBA === 2 || activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                    <div className={activeBookFlowBA === 2 || activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                    <div className={activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                    <div className={activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                </div>
                {
                    activeBookFlowBA === 4 && winWidthMain < 768 ?
                        <BillSummary setShowModal={setShowModal}/>
                        :
                        ''

                }
                {
                    activeBookFlowBA === 1 ?
                        <SalonServiceMain hideTitle={true} />
                        :
                        activeBookFlowBA === 2 ?
                            <WorkerDetail />
                            :
                            activeBookFlowBA === 3 ?
                                <VisitorDetail />
                                :
                                activeBookFlowBA === 4 ?
                                <FinalBill />
                                :
                                navigate('/salons/:id')
                                
                }
            </div>
            <div className={styles.book_flowMainB}>
                {
                    activeBookFlowBA === 4 ?
                        <BillSummary setShowModal={setShowModal}/>
                        :
                        <SelectedServiceCard updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} />

                }
            </div>
            <div className={styles.book_flowMob}>
                <BookNow innerText={activeBookFlowBA === 4 ? 'Pay ₹1,177' : 'Proceed'} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} />
            </div>
        </div>
    )
}
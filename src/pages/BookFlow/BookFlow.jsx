import { useState } from 'react'
import BillSummary from '../../components/BookFlow/BillSummary/BillSummary'
import FinalBill from '../../components/BookFlow/FInalBill/FinalBill'
import SelectedServiceCard from '../../components/BookFlow/SelectedServiceCard/SelectedServiceCard'
import VisitorDetail from '../../components/BookFlow/VisitorDetail/VisitorDetail'
import WorkerDetail from '../../components/BookFlow/WorkerDetail/WorkerDetail'
import BookNow from '../../components/SalonDetail/BookNow/BookNow'
import SalonServiceMain from '../../components/SalonDetail/SalonServiceMain/SalonServiceMain'
import styles from './BookFlow.module.css'

export default function BookFlow() {
    let [activeBookFlowBA, updateActiveBookFlowBA] = useState(1)
    let [winWidthMain,updateWinWidthMain] = useState(window.innerWidth);
    function reportWindowSize() {
        let winWidth = window.innerWidth;
        updateWinWidthMain(winWidth)
    }
    window.onresize = reportWindowSize;
    return (
        <div className={styles.book_flowMain}>
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
                        <BillSummary />
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
                                <FinalBill />

                }
            </div>
            <div className={styles.book_flowMainB}>
                {
                    activeBookFlowBA === 4 ?
                        <BillSummary />
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
import styles from '../../../pages/BookFlow/BookFlow.module.css'

export default function DateComponent({index,updateActiveCard,actveCard}) {
    
    return (
        <div className={actveCard===index?`${styles.service_dateA} ${styles.activeTimeMain}`:styles.service_dateA} onClick={()=>updateActiveCard(actveCard===index?0:index)}>
                <div>Mon</div>
                <div>14</div>
        </div>
    )
}
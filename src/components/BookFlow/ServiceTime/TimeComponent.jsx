import styles from '../../../pages/BookFlow/BookFlow.module.css'

export default function TimeComponent({index,activeTime,updateActiveTime}) {
    
    return (
        <div className={activeTime===index?`${styles.timeMain} ${styles.activeTimeMain}`:styles.timeMain} onClick={()=>updateActiveTime(activeTime===index?0:index)}>
            <div className={styles.timeMainA}>10:30 AM</div>
        </div>
    )
}
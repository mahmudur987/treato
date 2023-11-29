import styles from '../../../pages/BookFlow/BookFlow.module.css'
import BasicInput from '../../Input/BasicInput/BasicInput'

export default function TimeComponent({ index, activeTime, updateActiveTime, getWorkerData, timeData }) {

    return (
        <label htmlFor={`time${index}`} className={activeTime === index ? `${styles.timeMain} ${styles.activeTimeMain}` : styles.timeMain} onClick={(e) => { updateActiveTime(index); getWorkerData(e) }}>
            <div className={styles.timeMainA}>{timeData ? timeData : null}</div>
            <BasicInput Type={'text'} id={`time${index}`} VALUE={timeData} NAME={'time'} className={styles.d_none}/>
        </label>
    )
}
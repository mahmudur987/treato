import styles from './RadioInput.module.css'

export default function RadioInput({Type,VALUE,DISABLED,ID,NAME}){

    return(
        <input type={Type?Type:''} className={styles.radio_input} value={VALUE?VALUE:''} disabled={DISABLED?DISABLED:false} ID={ID?ID:''} name={NAME?NAME:''}/>
    )
}
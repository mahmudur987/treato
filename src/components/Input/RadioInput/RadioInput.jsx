import styles from './RadioInput.module.css'

export default function RadioInput({Type,VALUE,DISABLED,id,NAME,setGuest,guest,setShowPay,showPay,setPaySelected,checked}){

    return(
        <input type={Type?Type:''} className={styles.radio_input} value={VALUE?VALUE:''} disabled={DISABLED?DISABLED:false} id={id?id:''} name={NAME?NAME:''} onClick={()=>setGuest?setGuest(guest?true:false):setShowPay?setShowPay(showPay?true:false):setPaySelected?setPaySelected(true):null}  checked={checked}/>
    )
}
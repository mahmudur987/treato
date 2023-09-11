import leftIco from "../../../assets/images/AccountSettings/arrow-left.svg"
import styles from "./BackButton.module.css"

export default function BackButton({func}){

    return(
        <>
            <div className={styles.acc_mob_back}><img src={leftIco} alt="" onClick={func}/></div>
        </>
    )
}
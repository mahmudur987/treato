import { useNavigate } from "react-router-dom"
import leftIco from "../../../assets/images/AccountSettings/arrow-left.svg"
import styles from "./BackButton.module.css"

export default function BackButton({updateMobileOpt,updateActiveBookFlowBA,activeBookFlowBA}){
    let navigate = useNavigate();
    return(
        <>
            <button className={styles.acc_mob_back}><img loading="lazy" src={leftIco} alt="" onClick={()=>updateActiveBookFlowBA?updateActiveBookFlowBA(activeBookFlowBA>0?activeBookFlowBA-1:activeBookFlowBA=0):updateMobileOpt?updateMobileOpt(-1):navigate(-1)}/></button>
        </>
    )
}
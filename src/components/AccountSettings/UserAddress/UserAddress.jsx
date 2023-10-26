import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useState } from "react";

export default function UserAddress({setAddressModal}){
    let [editStatus,updateEditStatus] = useState(-1);
    return(
        <div className={styles.user_address}>
            <div className={styles.addr_head}>
                My Addresses
            </div>
            <div className={styles.addr_main}>
                <div className={styles.addr_main_top}>
                    <div>Home</div>
                    <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={()=>updateEditStatus(editStatus===1?-1:1)}/></div>
                    <div className={editStatus===1?`${styles.addr_edit_opt} ${styles.addr_edit_opt_show}`:styles.addr_edit_opt}>
                        <div onClick={()=>{setAddressModal(true);updateEditStatus(-1)}}>Edit</div>
                        <div className={styles.addr_edit_del}>Delete</div>
                    </div>
                </div>
                <div className={styles.addr_stored}>
                    42, Palm Grove Avenue, J.P. Nagar 8th Phase, Opposite Royal Park Mall Southwood Enclave, Bengaluru - 560078
                </div>
            </div>
            <div className={styles.new_addr_add} onClick={()=>setAddressModal(true)}>
                <span>+</span>
                <span>Add another address</span>
            </div>
        </div>
    )
}
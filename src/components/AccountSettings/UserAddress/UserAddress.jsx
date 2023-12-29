import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useEffect, useState } from "react";
import { updateUser } from "../../../services/updateUser";

export default function UserAddress({ setAddressModal, address, updateInputVal, inputVal }) {
    let [editStatus, updateEditStatus] = useState(-1);
    let [allAddress, setAllAddress] = useState(address ? address : [])
    let deleteAddress = (data) => {
        const userJWt = localStorage.getItem("jwtToken");
        let filtered = allAddress.filter((v) => v != data);
        setAllAddress(filtered);
        let allData = { ...inputVal };
        allData.place = filtered
        updateInputVal(allData);
        updateEditStatus(-1)
        updateUser(userJWt, allData).then((res) => {

            localStorage.setItem('userData', JSON.stringify(allData))
        })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log("UserAddress",inputVal);
// useEffect(() => {
// console.log("address changed ");
// }, [inputVal])
console.log(inputVal);
    return (
        <div className={styles.user_address}>

            <div className={styles.addr_head}>
                My Addresses
            </div>
            <div className={styles.addr_main} >
                <div className={styles.addr_main_top}>
                    <div>{inputVal?.house_type}</div>
                    {/* <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === i ? -1 : i)} /></div> */}
                    {/* <div className={editStatus === i ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        <div onClick={() => { setAddressModal({ active: true, data: v, index: i }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(v)}>Delete</div>
                    </div> */}
                </div>
                <div className={styles.addr_stored}>
                    <div>{inputVal?.house}</div>
                    <div>{inputVal?.landmark}</div>
                </div>
            </div>


            <div className={styles.new_addr_add} onClick={() => setAddressModal({ active: true, data: null })}>
                <div>+</div>
                <div>Add address</div>
                {/* <div>Add {address?.length ? 'another' : null} address</div> */}
            </div>
        </div>
    )
}



{/* <div className={styles.addr_main} key={i}>
<div className={styles.addr_main_top}>
    <div>{v.house_type}</div>
    <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === i ? -1 : i)} /></div>
    <div className={editStatus === i ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
        <div onClick={() => { setAddressModal({ active: true, data: v, index: i }); updateEditStatus(-1); }}>Edit</div>
        <div className={styles.addr_edit_del} onClick={() => deleteAddress(v)}>Delete</div>
    </div>
</div>
<div className={styles.addr_stored}>
    <div>{v.house}</div>
    <div>{v.landmark}</div>
</div>
</div> */}
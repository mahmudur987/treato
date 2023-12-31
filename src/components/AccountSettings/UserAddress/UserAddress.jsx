import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useEffect, useState } from "react";
import { updateUser } from "../../../services/updateUser";
import { useSelector } from "react-redux";

export default function UserAddress({ setAddressModal, address, updateInputVal, inputVal }) {
    let [editStatus, updateEditStatus] = useState(-1);
    const { user } = useSelector(state => state.user)

    let [deletedData, setDeletedData] = useState()
    let deleteAddress = (data) => {
        console.log("deleted data", data);
        const deleteAddrsssIn = data === data ? null : data

        const userJWt = localStorage.getItem("jwtToken");
        setDeletedData(deleteAddrsssIn)

        // let allData = { ...inputVal };
        // allData.place = filtered
        // updateInputVal(allData);
        updateInputVal(deleteAddrsssIn);
        updateEditStatus(-1)
        // updateUser(userJWt, allData).then((res) => {
        updateUser(userJWt, deleteAddrsssIn).then((res) => {

            // localStorage.setItem('userData', JSON.stringify(allData))
            localStorage.setItem('userData', JSON.stringify(deleteAddrsssIn))
        })
            .catch((err) => {
                console.log(err)
            })
    }


    console.log("UserAddress", inputVal);
    useEffect(() => {
        console.log("address changed ");
    }, [deletedData])
    return (
        <div className={styles.user_address}>

            <div className={styles.addr_head}>
                My Addresses
            </div>
            <div className={styles.addr_main} >
                <div className={styles.addr_main_top}>
                    <div>{inputVal?.house_type}</div>
                    <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === 1 ? -1 : 1)} /></div>
                    <div className={editStatus === 1 ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        {/* <div onClick={() => { setAddressModal({ active: true, data: inputVal, }); updateEditStatus(-1); }}>Edit</div> */}
                        <div onClick={() => { setAddressModal({ active: true, data: inputVal, }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(user?.location)}>Delete</div>
                    </div>
                </div>
                <div className={styles.addr_stored}>
                    <div>{inputVal?.house}</div>
                    <div>{inputVal?.landmark}</div>
                </div>
            </div>

            <div
                className={styles.new_addr_add}
                onClick={() => setAddressModal({ active: true, data: null })}
                disabled={inputVal && inputVal.address === 1}>
                <div>+</div>
                <div>Add address</div>
            </div>
        </div>
    )
}

{/* <div className={styles.addr_main_top}>
                    <div>{inputVal?.house_type}</div>
                    <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === i ? -1 : i)} /></div>
                    <div className={editStatus === i ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        <div onClick={() => { setAddressModal({ active: true, data: v, index: i }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(v)}>Delete</div>
                    </div>
                </div> */}
////////////////////////////////
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
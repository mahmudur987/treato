import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useEffect, useState } from "react";
import { updateUser } from "../../../services/updateUser";
import { useSelector } from "react-redux";

export default function UserAddress({ setAddressModal, address, updateInputVal, inputVal }) {
    let [editStatus, updateEditStatus] = useState(-1);

    const { user } = useSelector(state => state.user)

    let deleteAddress = (data) => {
        console.log("deleted data", data);
        const userJWt = localStorage.getItem("jwtToken");
        updateInputVal({ ...inputVal, landmark: "", house: "", house_type: "", place: "" });
        console.log("inputVal", inputVal);
        updateEditStatus(-1)
        updateUser(userJWt, { ...inputVal, landmark: "", house: "", address_type: "", place: "" }).then((res) => {
            console.log("result", res);
        })
            .catch((err) => {
                console.log(err)
            })
    }
<<<<<<< HEAD


    console.log("UserAddress", inputVal);
=======
>>>>>>> 86946b05bff5110fa48a19092d8616ff7229783c

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
<<<<<<< HEAD
                    <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === 1 ? -1 : 1)} /></div>
                    <div className={editStatus === 1 ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        <div onClick={() => { setAddressModal({ active: true, data: inputVal, }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(user?.location)}>Delete</div>
                    </div>
=======
                    {/* <div><img src={moreVertical} alt="" className={styles.addr_edit_click} onClick={() => updateEditStatus(editStatus === i ? -1 : i)} /></div> */}
                    {/* <div className={editStatus === i ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        <div onClick={() => { setAddressModal({ active: true, data: v, index: i }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(v)}>Delete</div>
                    </div> */}
>>>>>>> 86946b05bff5110fa48a19092d8616ff7229783c
                </div>
                <div className={styles.addr_stored}>
                    <div>{inputVal?.house}</div>
                    <div>{inputVal?.landmark}</div>
                </div>
            </div>

            <div
                className={styles.new_addr_add}
                onClick={() => setAddressModal({ active: true, data: null })}
            // disabled={inputVal?.location ? false : true}
            >
                <div>+</div>
                <div>Add address</div>
            </div>
        </div>
    )
}


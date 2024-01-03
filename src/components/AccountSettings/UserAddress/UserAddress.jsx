import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg"
import { useEffect, useState } from "react";
import { updateUser } from "../../../services/updateUser";
import { useSelector } from "react-redux";

export default function UserAddress({ setAddressModal, setuserAddressText, updateInputVal, inputVal, setShowSave }) {
    let [editStatus, updateEditStatus] = useState(-1);
    let [updateSave, setUpdateSave] = useState(false);

    const { user } = useSelector(state => state.user)
    let deleteAddress = (data) => {

        const userJWt = localStorage.getItem("jwtToken");
        updateInputVal({ ...inputVal, landmark: "", house: "", house_type: "", place: "" });
        // setUpdateSave(true)
        setShowSave(true)

        updateEditStatus(-1)
        updateUser(userJWt, { ...inputVal, landmark: "", house: "", address_type: "", place: "" }).then((res) => {
            console.log(res, 'userAddress');
        })
            .catch((err) => {
                console.log(err)
            })
    }




    return (
        <div className={styles.user_address}>
            <pre>{JSON.stringify(inputVal, null, 2)}</pre>
            <div className={styles.addr_head}>
                My Addresses
            </div>
            <div className={styles.addr_main} >
                <div className={styles.addr_main_top}>
                    <div>{inputVal?.house_type}</div>
                    <div><img src={moreVertical} alt=""
                        className={`${styles.addr_edit_click} ${!user.location ? styles.add_data : ''}`}
                        onClick={() => updateEditStatus(editStatus === 1 ? -1 : 1)} /></div>
                    <div className={editStatus === 1 ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}` : styles.addr_edit_opt}>
                        <div onClick={() => { setAddressModal({ active: true, data: inputVal, }); updateEditStatus(-1); }}>Edit</div>
                        <div className={styles.addr_edit_del} onClick={() => deleteAddress(user?.location)}>Delete</div>
                    </div>
                </div>
                <div className={styles.addr_stored}>
                    <div>{inputVal?.house}</div>
                    <div>{inputVal?.landmark}</div>
                </div>
            </div>



            <div className={user.location ? `${styles.add_data}` : null}>

                <div
                    className={styles.new_addr_add}
                    onClick={() => setAddressModal({ active: true, data: null })}>

                    <div>+</div>
                    <div>Add address</div>
                </div>
            </div>

        </div>
    )
}


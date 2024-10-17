import styles from "./UserAddress.module.css";
import moreVertical from "../../../assets/images/AccountSettings/more-vertical.svg";
import { memo, useEffect, useState } from "react";
import { updateUser } from "../../../services/updateUser";
import { useSelector } from "react-redux";

export default function UserAddress({
  setAddressModal,
  setuserAddressText,
  updateInputVal,
  inputVal,
  setShowSave,
}) {
  const [editStatus, setEditStatus] = useState(-1);
  const [saveDeleteStatus, setSaveDeleteStatus] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleDeleteAddress = () => {
    const userJWt = localStorage.getItem("jwtToken");

    const updatedInputVal = {
      ...inputVal,
      landmark: "",
      house: "",
      house_type: "",
      place: "",
    };

    updateInputVal(updatedInputVal);
    setEditStatus(-1);

    updateUser(userJWt, updatedInputVal)
      .then((res) => {
        console.log(res, "userAddress");
        setSaveDeleteStatus(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditAddress = () => {
    setAddressModal({ active: true, data: inputVal });
    setEditStatus(-1);
  };

  const handleToggleEdit = () => {
    setEditStatus(editStatus === 1 ? -1 : 1);
  };

  const handleAddOrUpdateAddress = () => {
    setAddressModal({ active: true, data: null });
  };

  return (
    <div className={styles.user_address}>
      <div className={styles.addr_head}>My Addresses</div>
      <div className={styles.addr_main}>
        <div className={styles.addr_main_top}>
          {inputVal.house && inputVal.landmark && inputVal.place && (
            <div>
              <img
                loading="lazy"
                src={moreVertical}
                alt="edit options"
                className={`${styles.addr_edit_click}`}
                onClick={handleToggleEdit}
              />
            </div>
          )}

          <div
            className={
              editStatus === 1
                ? `${styles.addr_edit_opt} ${styles.addr_edit_opt_show}`
                : styles.addr_edit_opt
            }
          >
            <div onClick={handleEditAddress}>Edit</div>
            <div className={styles.addr_edit_del} onClick={handleDeleteAddress}>
              Delete
            </div>
          </div>
        </div>
        <div className={styles.addr_stored}>
          <div>{inputVal?.house_type}</div>
          <div>{inputVal?.place}</div>
          <div>{inputVal?.house}</div>
          <div>{inputVal?.landmark}</div>
        </div>
      </div>

      <div
        className={
          inputVal.house && inputVal.landmark && inputVal.place
            ? styles.add_data
            : null
        }
      >
        <div className={styles.new_addr_add} onClick={handleAddOrUpdateAddress}>
          <div>{inputVal.place ? "" : "+"}</div>
          <div>{inputVal.place ? "Update" : "Add"} address</div>
        </div>
      </div>
    </div>
  );
}

export const MemoizedUserAddress = memo(UserAddress);

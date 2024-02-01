import React, { useState } from 'react'
import styles from './BasicDetailsPartner.module.css'
import BasicInputs from '../Input/BasicInputs';
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg"

const BasicDetailsPartner = ({ mobView, setOtpModal, setShowSave, updateInputState, inputState, updateInputVal, inputVal, }) => {
    const [value, onChange] = useState(new Date());

    let updateInput = (data) => {
        let newInputState = { ...inputState }
        newInputState[Object.keys(data)[0]] === true ? newInputState[Object.keys(data)[0]] = false : newInputState[Object.keys(data)[0]] = true;
        updateInputState(newInputState)
        setShowSave(true)
    }


    return (<>
        <div>
            <div className={styles.usr_detail_head}>
                <span><img src={arrowLeft} alt="arrowLeft" />Bussness</span>

                {/* {
                    mobView !== undefined ? mobView : 'Basic Details'
                } */}
            </div>
            <div className={styles.usr_detail_body}>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="first_name">
                        <div className={styles.usr_detail_label}>First Name</div>
                        <BasicInputs className={styles.usr_detail_input} Type={'text'} VALUE={inputVal?.first_name} DISABLED={inputState?.first_name} id={"first_name"} NAME={"first_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.first_name ? { first_name: false } : { first_name: true })} />

                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="last_name">
                        <div className={styles.usr_detail_label}>Last Name</div>
                        <BasicInputs Type={'text'} VALUE={inputVal?.last_name} DISABLED={inputState?.last_name} id={"last_name"} NAME={"last_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                    </label>

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.last_name ? { last_name: false } : { last_name: true })} />
                </div>
                <div className={styles.user_Textarea}>
                    <label htmlFor="About Business">
                        <div className={styles.usr_detail_label}>Last Name</div>
                        <BasicInputs Type={'textarea'}
                            VALUE={inputVal?.last_name} DISABLED={inputState?.last_name} id={"About_Business"}
                            NAME={"AboutBusiness"} updateInputVal={updateInputVal}
                            inputVal={inputVal}
                            styles={`${styles.input} ${styles.textarea}`}
                        />
                    </label>

                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.last_name ? { last_name: false } : { last_name: true })} />
                </div>

            </div>

        </div>

    </>)
}

export default BasicDetailsPartner
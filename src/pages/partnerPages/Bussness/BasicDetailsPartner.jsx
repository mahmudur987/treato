import React, { useState } from 'react'
import styles from './BasicDetailsPartner.module.css'
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg"
import { Link } from 'react-router-dom';
import BasicInputs, { } from "../Input/BasicInputs"

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
                <Link to={"/service/PartnerAccountSetting"} className={styles.Pictures}>

                    <span><img src={arrowLeft} alt="arrowLeft" /></span>

                </Link>
                <p>Business Profile</p>

            </div>
            <h2 className={styles.Heading1}>Basic Details</h2>
            <div>
                <div className={styles.usr_detail_body}>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="Business_name">
                            <div className={styles.usr_detail_label}>Business Name</div>
                            <BasicInputs placeholder="She Hair & Beauty" className={styles.usr_detail_input} Type={'text'} VALUE={inputVal?.first_name} DISABLED={inputState?.first_name} id={"first_name"} NAME={"first_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.first_name ? { first_name: false } : { first_name: true })} />

                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="Website">
                            <div className={styles.usr_detail_label}>Website <span className={styles.optional}>(optional)</span></div>
                            <BasicInputs placeholder="www.shehairandbeauty.com" Type={'text'} VALUE={inputVal?.last_name} DISABLED={inputState?.last_name} id={"last_name"} NAME={"last_name"} updateInputVal={updateInputVal} inputVal={inputVal} />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={() => updateInput(inputState?.last_name ? { last_name: false } : { last_name: true })} />
                    </div>

                </div>

                <div className={styles.usr_detail_boxs}>
                    <div className={styles.usr_detail_label}> About Business </div>

                    <BasicInputs
                        type="textarea"
                        placeholder="She Hair & Beauty is a luxurious hair spa nestled 
                        in the heart of Ejipura, Bengaluru. Step into a haven of relaxation 
                        and rejuvenation, where expert stylists and therapists 
                        pamper you with personalized treatments, from haircare to beau..."
                        style={`${styles.input} ${styles.textarea}`}
                    />


                    <img src={editImg} alt="" className={styles.usr_detail_edit_text}
                        onClick={() => updateInput(inputState?.last_name ? { last_name: false } : { last_name: true })} />
                </div>
            </div>
            <div className={styles.horizontalLine}></div>
        </div>



    </>)
}

export default BasicDetailsPartner
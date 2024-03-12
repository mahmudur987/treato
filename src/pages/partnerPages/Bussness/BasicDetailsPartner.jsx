import React, { useState } from 'react'
import styles from './BasicDetailsPartner.module.css'
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg"
import { Link } from 'react-router-dom';
import BasicInputs, { } from "../Input/BasicInputs"

const BasicDetailsPartner = ({ setSalonData, salonData, handleChange }) => {

    // let updateInput = (data) => {
    //     let newInputState = { ...salonData }
    //     newInputState[Object.keys(data)[0]] === true ? newInputState[Object.keys(data)[0]] = false : newInputState[Object.keys(data)[0]] = true;
    //     setSalonData(newInputState)
    // }


    return (<>
        <div>
            <div className={styles.usr_detail_head}>
                <Link to={"/partner/dashboard/PartnerAccountSetting"} className={styles.Pictures}>

                    <span><img src={arrowLeft} alt="arrowLeft" /></span>

                </Link>
                <p>Business Profile</p>

            </div>
            <h2 className={styles.Heading1}>Basic Details</h2>
            <div>
                <div className={styles.usr_detail_body}>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="salon_name">
                            <div className={styles.usr_detail_label}>Business Name</div>
                            <BasicInputs
                                placeholder="She Hair & Beauty"
                                className={styles.usr_detail_input}
                                NAME={"salon_name"}
                                type={'text'}
                                id={"salon_name"}
                                value={salonData.salon_name}
                                onChange={handleChange}
                            />
                        </label>

                        <img src={editImg} alt="" className={styles.usr_detail_edit}
                        //  onClick={() => updateInput(inputState?.salon_name ? { salon_name: false } : { salon_name: true })} 
                        />

                    </div>
                    <div className={styles.usr_detail_box}>
                        <label htmlFor="Website">
                            <div className={styles.usr_detail_label}>Website <span className={styles.optional}>(optional)</span></div>
                            <BasicInputs
                                placeholder="www.shehairandbeauty.com"
                                type={'text'}
                                id={"website"}
                                NAME={"website"}
                                value={salonData.website}
                                onChange={handleChange}
                            />
                        </label>

                        <img src={editImg} alt="editImg" className={styles.usr_detail_edit}
                        // onClick={() => updateInput(inputState?.website ? { website: false } : { website: true })}
                        />
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
                        value={salonData.salons_description}
                        onChange={handleChange}
                        style={`${styles.input} ${styles.textarea}`}
                    />


                    <img src={editImg} alt="editImg" className={styles.usr_detail_edit_text}
                    // onClick={() => updateInput(inputState?.salons_description ? { salons_description: false } : { salons_description: true })} 
                    />
                </div>
            </div>
            <div className={styles.horizontalLine}></div>
        </div>



    </>)
}

export default BasicDetailsPartner
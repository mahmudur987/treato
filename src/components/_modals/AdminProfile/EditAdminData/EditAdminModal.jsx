import React, { useState } from 'react';
import Grey_Close from '../../../../assets/images/icons/Grey_Close.svg';
import styles from "./EditAdminModal.module.css";
import search from "../../../../assets/images/TeamDetails/search.png";
import chevron_down from "../../../../assets/images/TeamDetails/chevron-down.png";
import plus from "../../../../assets/images/TeamDetails/plus.png";
import Profile_Pic from "../../../../assets/images/TeamDetails/pexels-stefan-stefancik-91227 1.png";

const EditAdminModal = ({ onClose }) => {
    const [timeFieldsCount, setTimeFieldsCount] = useState(1);

    const handleAddTimeFields = () => {
        setTimeFieldsCount(prevCount => prevCount + 1);
    };

    return (
        <div className={styles.shareMain}>
            <div className={styles.shareA}>
                <div className={styles.checkboxContainer}>
                    <div className={styles.mob_d_none}>
                        <div className={styles.shareC}>
                            Edit Shift - Nov 28
                        </div>
                        <div className={styles.shareB}>
                            <img src={Grey_Close} alt="close" onClick={onClose} />
                        </div>

                    </div>
                    <form className={styles.CheckBoxForm}>
                        <div className={styles.ModalHeader}>
                            <div className={styles.selectPro}>
                                <div className={styles.SubHeading}>Employee</div>

                                <div className={styles.selectContainer}>
                                    <select name="" id="" className={styles.Select}>
                                        <option value="">Anirban Banerjee</option>
                                    </select>
                                    <img src={Profile_Pic} alt="Profile_Pic" className={styles.Profile_Img} />
                                </div>
                            </div>


                            {[...Array(timeFieldsCount)].map((_, index) => (
                                <div className={styles.Profile_Time} key={index}>
                                    <div className={styles["inputField"]}>
                                        <div className={styles.StartTime}>Start Time</div>
                                        <select name="" id="" className={styles.option}>
                                            <option value="">10am-4pm</option>
                                            <option value="">09am-5pm</option>
                                            <option value="">08am-6pm</option>
                                        </select>
                                    </div>
                                    <div className={styles["inputField"]}>
                                        <div className={styles.StartTime}>End Time</div>
                                        <select name="" id="" className={styles.option}>
                                            <option value="">10am-4pm</option>
                                            <option value="">09am-5pm</option>
                                            <option value="">08am-6pm</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {timeFieldsCount === 2 ? null : <div className={styles.plusDiv}>
                            <img src={plus} alt="plus" className={styles.plus} onClick={handleAddTimeFields} />
                            <span>Add another shift for this day</span>


                        </div>}


                        <p className={styles.note}>You are editing this day’s shift only. To set regular shifts for this employee, click on <span className={styles.Schedule}>Edit Employee Schedule</span></p>
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.SubmitBtn}>
                            <button className={styles.CancelBtn} onClick={onClose}>Cancel</button>
                            <button className={styles.SaveBtn}>Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAdminModal;

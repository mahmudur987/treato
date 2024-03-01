import React, { useState } from 'react'
import Grey_Close from '../../../../assets/images/icons/Grey_Close.svg';
import styles from "./AddLeaveModal.module.css";
import search from "../../../../assets/images/TeamDetails/search.png";
import chevron_down from "../../../../assets/images/TeamDetails/chevron-down.png";
import plus from "../../../../assets/images/TeamDetails/plus.png";
import Profile_Pic from "../../../../assets/images/TeamDetails/pexels-stefan-stefancik-91227 1.png";
import Pick from '../../../../pages/partnerPages/Date/Pic';

const AddLeaveModal = ({ onClose }) => {
    const [timeFieldsCount, setTimeFieldsCount] = useState(1);
    const [isFullDayLeave, setIsFullDayLeave] = useState(false);

    const handleFullDayLeaveChange = () => {
        setIsFullDayLeave(!isFullDayLeave);
    };

    const handleAddTimeFields = () => {
        setTimeFieldsCount(prevCount => prevCount + 1);
    };
    return (<div className={styles.shareMain}>
        <div className={styles.shareA}>
            <div className={styles.checkboxContainer}>
                <form className={styles.CheckBoxForm}>
                    <div className={styles.ModalHeader}>

                        <div className={styles.mob_d_none}>
                            <div className={styles.shareB}>
                                <img src={Grey_Close} alt="close" onClick={onClose} />
                            </div>
                            <div className={styles.shareC}>
                                Add Leave
                            </div>
                        </div>

                        <div className={styles.selectPro}>
                            <div className={styles.SubHeading}>Employee</div>

                            <div className={styles.selectContainer}>
                                <select name="" id="" className={styles.Select}>
                                    <option value="">Anirban Banerjee</option>
                                </select>
                                <img src={Profile_Pic} alt="Profile_Pic" className={styles.Profile_Img} />
                            </div>
                        </div>
                        <div className={styles.selectPro}>
                            <div className={styles.SubHeading}>Type of Leave</div>

                            <div className={styles.selectContainer}>
                                <select name="" id="" className={styles.Select}>
                                    <option value="" >Casual Leave</option>
                                    <option value="" >Medical Leave</option>
                                </select>
                            </div>
                        </div>


                        <div className={styles.Profile_Time} >
                            <div className={styles.dateInput}>
                                <label htmlFor="">
                                    <div className={styles.labelText}>Schedule Starts</div>
                                    <Pick className={styles.customPickWidth} />
                                </label>
                            </div>
                            <div className={styles.dateInput}>
                                <label htmlFor="">
                                    <div className={styles.labelText}>Schedule Date</div>
                                    <Pick className={styles.customPickWidth} />
                                </label>
                            </div>
                        </div>
                        <label className={styles.topLabel}>
                            <input
                                type="checkbox"
                                onChange={handleFullDayLeaveChange}
                                checked={isFullDayLeave}
                            />
                            <span>Full-day leave</span>
                        </label>
                        <div className={styles.Profile_Time}>
                            <div className={styles["inputField"]}>
                                <div className={styles.StartTime}>Start Time</div>
                                <select
                                    name=""
                                    id=""
                                    className={styles.option}
                                    disabled={isFullDayLeave}
                                >
                                    <option value="">10am-4pm</option>
                                    <option value="">09am-5pm</option>
                                    <option value="">08am-6pm</option>
                                </select>
                            </div>
                            <div className={styles["inputField"]}>
                                <div className={styles.StartTime}>End Time</div>
                                <select
                                    name=""
                                    id=""
                                    className={styles.option}
                                    disabled={isFullDayLeave}
                                >
                                    <option value="">10am-4pm</option>
                                    <option value="">09am-5pm</option>
                                    <option value="">08am-6pm</option>
                                </select>
                            </div>
                        </div>

                    </div>



                    <p className={styles.noteInfo}>Online appointments cannot be placed when employees are on leave. Any existing appointments on these days will need to be reassigned from  <span className={styles.Schedule}>Calendar.</span></p>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.SubmitBtn}>
                        <button className={styles.CancelBtn} onClick={onClose}>Cancel</button>
                        <button className={styles.SaveBtn}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}

export default AddLeaveModal
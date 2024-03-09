import React, { useState } from 'react'
import styles from "./EmployeeSchedule.module.css"
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg"
import { Link } from 'react-router-dom'
import search from "../../../../../assets/images/TeamDetails/search.png";
import chevron_down from "../../../../../assets/images/TeamDetails/chevron-down.png";
import plus from "../../../../../assets/images/TeamDetails/plus.png";
import copy from "../../../../../assets/images/TeamDetails/copy.png";
import Profile_Pic from "../../../../../assets/images/TeamDetails/pexels-stefan-stefancik-91227 1.png";
import Pick from '../../../Date/Pic';

const editEmployeeSchedule = [
    {
        day: "Monday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Tuesday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Wednesday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Thursday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Friday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Saturday",
        copyImg: copy,
        plusImg: plus,
        AddShift: "Add shift"
    },
    {
        day: "Sunday"
    },
]

const EmployeeSchedule = () => {
    const [shiftTimesVisible, setShiftTimesVisible] = useState(Array(editEmployeeSchedule.length).fill(false));

    const toggleShiftTimes = (index) => {
        const newShiftTimesVisible = [...shiftTimesVisible];
        newShiftTimesVisible[index] = !newShiftTimesVisible[index];
        setShiftTimesVisible(newShiftTimesVisible);
    };
    return (
        <div className={styles.container}>
            <div className={styles.usr_detail_head}>
                <Link to={"/partner/dashboard/TeamManageMent"}>
                    <span><img src={arrowLeft} alt="arrowLeft" className={styles.Pictures} /></span>
                </Link>
                Edit Employee Schedule
                <p className={styles.usr_detail_Para}>Set weekly schedule. Changes will apply to all upcoming shifts from the schedule start date</p>
            </div>

            <div>
                <form>
                    <div className={styles.mainDiv}>
                        <div className={styles.Profile_Pic_Main}>


                            <div className={styles.selectPro}>
                                <div className={styles.SubHeading}>Employee</div>

                                <div className={styles.selectContainer}>
                                    <select name="" id="" className={styles.Select}>
                                        <option value="">Anirban Banerjee</option>
                                    </select>
                                    <img src={Profile_Pic} alt="Profile_Pic" className={styles.Profile_Img} />
                                </div>
                            </div>


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
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.headingShift}>Day-wise Shifts</div>
                        <div className={styles.headingShift1}>
                            <p>Day</p>
                            <p>start Time</p>
                            <p>End Time</p>
                        </div>
                        {/* {editEmployeeSchedule.map((item, index) => (
                            <div className={styles.mainMapDiv1}>

                                <div className={styles.mainMapDiv} key={index}>
                                    <div className={styles.EplyShiptcheck}>

                                        <input type="checkbox" name="" id="" />
                                        <p>{item.day}</p>
                                    </div>
                                    {item.day !== "Sunday" ? (
                                        <>
                                            <div>
                                                <div className={styles.EplyShiptSelect}>
                                                    <div>
                                                        <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                            <option value="">10am-4pm</option>
                                                            <option value="">09am-5pm</option>
                                                            <option value="">08am-6pm</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                            <option value="">10am-4pm</option>
                                                            <option value="">09am-5pm</option>
                                                            <option value="">08am-6pm</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className={styles.plusImgDiv}>
                                                    <img src={item.plusImg} alt="" />
                                                    <p>{item.AddShift}</p>
                                                    <img src={item.copyImg} alt="copyImg" className={styles.copyImgRespons} />
                                                </div>
                                            </div>
                                            <div className={styles.copyImgR}>
                                                <img src={item.copyImg} alt="copyImg" />
                                            </div>

                                        </>
                                    ) : (
                                        <div className={styles.closeBtn}>
                                            <button className={styles.closeB}>Close</button>
                                            <button className={styles.closeB}>Close</button>
                                        </div>
                                    )}




                                </div>
                               



                            </div>

                        ))} */}
                        {editEmployeeSchedule.map((item, index) => (
                            <div className={styles.mainMapDiv1} key={index}>
                                <div className={styles.mainMapDiv}>
                                    <div className={styles.EplyShiptcheck}>
                                        <input type="checkbox" name="" id="" />
                                        <p>{item.day}</p>
                                    </div>
                                    {item.day !== "Sunday" ? (
                                        <>
                                            <div>
                                                <div className={styles.EplyShiptSelect}>
                                                    <div>
                                                        <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                            <option value="">10am-4pm</option>
                                                            <option value="">09am-5pm</option>
                                                            <option value="">08am-6pm</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                            <option value="">10am-4pm</option>
                                                            <option value="">09am-5pm</option>
                                                            <option value="">08am-6pm</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className={styles.plusImgDiv} onClick={() => toggleShiftTimes(index)}>
                                                    <img src={item.plusImg} alt="" />
                                                    <p>{item.AddShift}</p>
                                                    <img src={item.copyImg} alt="copyImg" className={styles.copyImgRespons} />
                                                </div>

                                                {shiftTimesVisible[index] && (
                                                    <div className={styles.EplyShiptSelect}>
                                                        <div>
                                                            <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                                <option value="">10am-4pm</option>
                                                                <option value="">09am-5pm</option>
                                                                <option value="">08am-6pm</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <select name="" id="" className={styles.EplyShiptSelectBox}>
                                                                <option value="">10am-4pm</option>
                                                                <option value="">09am-5pm</option>
                                                                <option value="">08am-6pm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.copyImgR}>
                                                <img src={item.copyImg} alt="copyImg" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.closeBtn}>
                                            <button className={styles.closeB}>Close</button>
                                            <button className={styles.closeB}>Close</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.SubmitBtn}>
                        <button className={styles.CancelBtn}>Cancel</button>
                        <button className={styles.SaveBtn}>Save</button>
                    </div>
                </form >
            </div >

        </div >
    )
}

export default EmployeeSchedule

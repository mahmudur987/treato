import React, { useState } from 'react'
import styles from "./EditTeamData.module.css"
import profileImg from "../../../../../assets/images/TeamDetails/ProfileImg.png"
import Profile_Pic_Edit from "../../../../../assets/images/TeamDetails/Profile_Pic_Edit.png"
import PhoneInput from '../../../../../components/Input/PhoneInput/PhoneInput'
import editImg from "../../../../../assets/images/AccountSettings/edit.svg"
import ProfileEditPencil from "../../../../../assets/images/TeamDetails/ProfileEditPencil.png"
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg"
import 'react-calendar/dist/Calendar.css';
import '../../../../../components/AccountSettings/UserDetails/ReactCalendar.css'
// import AdminProfileModal from '../../../../../components/_modals/AdminProfile/SelectServiceModal'
import AdminProfileModal from '../../../../../components/_modals/AdminProfile/Service/SelectServiceModal'
import { Link, useNavigate } from 'react-router-dom'
import EditInput from './EditInput/EditInput'
import Pick from '../../../Date/Pic'

const EditTeamData = () => {
    const navigate = useNavigate()
    const [AProfileModal, setAProfileModal] = useState(false)
    const AdminProfileModalFun = () => {
        setAProfileModal(!AProfileModal)


    }
    const employeeSchedule = () => {
        navigate("/partner/dashboard/EmployeeSchedule")
    }
    return (

        <div className={styles.container}>
            <div>
                <div className={styles.usr_detail_head}>
                    <Link to={"/partner/dashboard/TeamManageMent"}>

                        <span><img src={arrowLeft} alt="arrowLeft" className={styles.Pictures} /></span>

                    </Link>
                    Edit details
                    <p className={styles.usr_detail_Para}>Enter employee details and add a team member to your salon.</p>

                </div>

                <form>

                    <div className={styles.mainDiv}>

                        <div>
                            <h4 className={styles.BasicHeading}>Basic Details of employee</h4>
                            <div className={styles.profileRounded1}>
                                <div className={styles.profileRounded}>
                                    <img src={profileImg} alt="profileImg" className={styles.profileImg} />
                                    <img src={ProfileEditPencil} alt="Profile_Pic_Edit" className={styles.profileEdit} />
                                </div>
                            </div>
                            <div>

                                <div className={styles.inputtext}>
                                    <div className={styles.names}>

                                        <label htmlFor="">
                                            <div className={styles.labelText}>First Name</div>
                                            <EditInput
                                                type="text"
                                                name="firstName"
                                                //   value={formData.firstName}
                                                // onChange={handleChange}
                                                placeholder="e.g. Vivek"

                                            />
                                        </label>
                                    </div>
                                    <div className={styles.names}>

                                        <label htmlFor="">
                                            <div className={styles.labelText}>Last Name </div>
                                            <EditInput

                                                type="text"
                                                name="lastName"
                                                // value={formData.firstName}
                                                // onChange={handleChange}
                                                placeholder="e.g. Kumar"

                                            />
                                        </label>
                                    </div>

                                </div>
                                <div className={styles.usr_detail_Phone}>
                                    <label htmlFor="phone">
                                        <div className={styles.usr_detail_label}>Phone</div>
                                        <PhoneInput name="phone" Type={'tel'} placeholder="Phone number" />
                                    </label>
                                    <div>
                                    </div>
                                </div>
                                <div className={styles.inputtextLoc}>

                                    <label htmlFor="">
                                        <div className={styles.labelText}>Address</div>
                                        <EditInput
                                            type="textarea"
                                            name="about"
                                            // value={formData.firstName}
                                            // onChange={handleChange}
                                            placeholder="e.g. 3rd Main, Ejipura, Bengaluru"
                                            sty={`${styles.input} ${styles.textarea}`}
                                        />
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className={styles.inputtextLoc1}>
                            <h4>Employment Details</h4>
                            <div className={styles.inputtextLoc}>

                                <label htmlFor="">
                                    <div className={styles.labelText}>Service Title</div>
                                    <EditInput
                                        type="text"
                                        name="service"
                                        // value={formData.firstName}
                                        // onChange={handleChange}
                                        placeholder="Hair Styling Specialist"

                                    />
                                </label>
                            </div>
                            <div className={styles.inputtextPick}>

                                <div className={styles.dateInput}>
                                    <label htmlFor="">
                                        <div className={styles.labelText}>Service Start Date</div>
                                        <Pick />
                                    </label>
                                </div>
                                <div className={styles.dateInput}>
                                    <label htmlFor="">
                                        <div className={styles.labelText}>Service End Date</div>
                                        <Pick />
                                    </label>
                                </div>


                            </div>
                            <div className={styles.horizontalLine}></div>
                            <h4 className={styles.ServiceAssignment}>Service Assignment</h4>
                            <p className={styles.offerTeam}>Add the services this team member can offer</p>
                            <div className={styles.AllServices}>
                                <p className={styles.AllServicesText}>All services (32)</p>
                                <div>

                                    <p className={styles.editImgEdit}>
                                        Edit
                                        <img src={editImg} alt="editImg" onClick={AdminProfileModalFun} /></p>
                                    {AProfileModal && <AdminProfileModal onClose={AdminProfileModalFun} />}
                                </div>
                            </div>
                            <div className={styles.horizontalLine}></div>
                            <h4 className={styles.Schedule}>Schedule</h4>
                            <p className={styles.Employee1}>Go to <span className={styles.Employee} onClick={employeeSchedule}>Employee Schedule</span> to view and edit employee schedule.</p>
                            <div className={styles.SubmitBtn}>
                                <button className={styles.CancelBtn}>Cancel</button>
                                <button className={styles.SaveBtn}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTeamData
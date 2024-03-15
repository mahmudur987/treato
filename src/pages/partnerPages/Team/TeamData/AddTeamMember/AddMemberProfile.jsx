import React, { useState } from "react";
import styles from "./AddMemberProfile.module.css";
// import BasicInputs from '../../../Input/BasicInputs'
import profileImg from "../../../../../assets/images/TeamDetails/user_3_fill 1.png";
import Profile_Pic from "../../../../../assets/images/TeamDetails/Profile_Pic_Edit.png";
import PhoneInput from "../../../../../components/Input/PhoneInput/PhoneInput";
import editImg from "../../../../../assets/images/AccountSettings/edit.svg";
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg";
import BasicInputTeam from "./input/BasicInputTeam";
import "react-calendar/dist/Calendar.css";
import "../../../../../components/AccountSettings/UserDetails/ReactCalendar.css";

import { Link, useNavigate } from "react-router-dom";
import Pick from "../../../Date/Pic";
import { useSingleSalon } from "../../../../../services/salon";
import SelectServiceModal from "../../../../../components/_modals/SelectServiceModal/SelectServiceModal";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";

const AddMemberProfile = () => {
  const { data, isLoading, isError, error } = useSingleSalon();
  const [selectedServices, setSelectedServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [AProfileModal, setAProfileModal] = useState(false);
  const AdminProfileModalFun = () => {
    setAProfileModal(!AProfileModal);
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceStartDate, setServiceStartDate] = useState("");
  const [serviceEndDate, setServiceEndDate] = useState("");
  const updateInputValues = (updatedValues) => {
    if (updatedValues.firstName !== undefined) {
      setFirstName(updatedValues.firstName);
    }
    if (updatedValues.lastName !== undefined) {
      setLastName(updatedValues.lastName);
    }
    if (updatedValues.serviceTitle !== undefined) {
      setServiceTitle(updatedValues.phone);
    }
    if (updatedValues.address !== undefined) {
      setAddress(updatedValues.address);
    }
  };

  const allMainCategories = data?.salon?.services.reduce(
    (accumulator, service) => {
      // Concatenating mainCategories arrays
      return accumulator.concat(service.mainCategories);
    },
    []
  );

  //   console.log(allMainCategories);

  const handleSubmt = () => {};

  const employeeSchedule = () => {
    navigate("/partner/dashboard/EmployeeSchedule");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.usr_detail_head}>
            <Link to={"/partner/dashboard/TeamManageMent"}>
              <span>
                <img
                  src={arrowLeft}
                  alt="arrowLeft"
                  className={styles.Pictures}
                />
              </span>
            </Link>
            Add team member
            <p className={styles.usr_detail_Para}>
              Enter employee details and add a team member to your salon.
            </p>
          </div>

          <form>
            <div className={styles.mainDiv}>
              <div>
                <h4>Basic Details of employee</h4>
                <div className={styles.profileRounded1}>
                  <div className={styles.profileRounded}>
                    <img src={profileImg} alt="profileImg" />
                    <img
                      src={Profile_Pic}
                      alt="Profile_Pic"
                      className={styles.profileAdd}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.inputtext}>
                    <div className={styles.names}>
                      <label htmlFor="">
                        <div className={styles.labelText}>First Name</div>
                        <BasicInputTeam
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={(e) =>
                            updateInputValues({ firstName: e.target.value })
                          }
                          placeholder="e.g. Vivek"
                        />
                      </label>
                    </div>
                    <div className={styles.names}>
                      <label htmlFor="">
                        <div className={styles.labelText}>Last Name </div>
                        <BasicInputTeam
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={(e) =>
                            updateInputValues({ lastName: e.target.value })
                          }
                          placeholder="e.g. Kumar"
                        />
                      </label>
                    </div>
                  </div>
                  <div className={styles.usr_detail_Phone}>
                    <label htmlFor="phone">
                      <div className={styles.usr_detail_label}>Phone</div>
                      <PhoneInput
                        name="phone"
                        Type={"tel"}
                        placeholder="Phone number"
                      />
                    </label>
                    <div></div>
                  </div>
                  <div className={styles.inputtextLoc}>
                    <label htmlFor="">
                      <div className={styles.labelText}>Address</div>
                      <BasicInputTeam
                        type="textarea"
                        name="about"
                        value={address}
                        onChange={(e) =>
                          updateInputValues({ address: e.target.value })
                        }
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
                    <BasicInputTeam
                      type="text"
                      name="service"
                      value={serviceTitle}
                      onChange={(e) =>
                        updateInputValues({ serviceTitle: e.target.value })
                      }
                      placeholder="Hair Styling Specialist"
                    />
                  </label>
                </div>
                <div className={styles.inputtextPick}>
                  <div className={styles.dateInput}>
                    <label htmlFor="">
                      <div className={styles.labelText}>Service Start Date</div>
                      <Pick
                        ondateChange={(date) => setServiceStartDate(date)}
                      />
                    </label>
                  </div>
                  <div className={styles.dateInput}>
                    <label htmlFor="">
                      <div className={styles.labelText}>Service End Date</div>
                      <Pick ondateChange={(date) => setServiceEndDate(date)} />
                    </label>
                  </div>
                </div>
                <div className={styles.horizontalLine}></div>
                <h4 className={styles.ServiceAssignment}>Service Assignment</h4>
                <p className={styles.offerTeam}>
                  Add the services this team member can offer
                </p>
                {data && allMainCategories?.length > 0 ? (
                  <div className={styles.AllServices}>
                    <h4 className={styles.AllServicesText}>
                      All services (32)
                    </h4>
                    <div onClick={() => setIsModalOpen((pre) => !pre)}>
                      <p className={styles.editImgEdit}>
                        Edit
                        <img src={editImg} alt="editImg" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <ErrorComponent
                    message={error?.message ?? "no service available"}
                  />
                )}
                <div className={styles.horizontalLine}></div>
                <h4 className={styles.Schedule}>Schedule</h4>
                <p className={styles.Employee1}>
                  Go to{" "}
                  <span className={styles.Employee} onClick={employeeSchedule}>
                    Employee Schedule
                  </span>{" "}
                  to view and edit employee schedule.
                </p>
                <div className={styles.SubmitBtn}>
                  <button className={styles.CancelBtn}>Cancel</button>
                  <button className={styles.SaveBtn}>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {data && allMainCategories?.length > 0 && (
        <SelectServiceModal
          mainCategories={allMainCategories}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          showModal={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default AddMemberProfile;

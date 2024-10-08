import React, { useRef, useState } from "react";
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
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";

const AddMemberProfile = () => {
  const fileInputRef = useRef(null);
  const { data, error } = useSingleSalon();
  const [selectedServices, setSelectedServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState(null);
  const [address, setAddress] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceStartDate, setServiceStartDate] = useState("");
  const [serviceEndDate, setServiceEndDate] = useState("");
  const [time_for_service, setTimeForService] = useState([]);

  const [loading, setLoading] = useState(false);

  const updateInputValues = (updatedValues) => {
    if (updatedValues.firstName !== undefined) {
      setFirstName(updatedValues.firstName);
    }
    if (updatedValues.lastName !== undefined) {
      setLastName(updatedValues.lastName);
    }
    if (updatedValues.serviceTitle !== undefined) {
      setServiceTitle(updatedValues.serviceTitle);
    }
    if (updatedValues.address !== undefined) {
      setAddress(updatedValues.address);
    }
    if (updatedValues.phoneNumber !== undefined) {
      setPhone(updatedValues.address);
    }
  };

  const allMainCategories = data?.salon?.services.reduce(
    (accumulator, service) => {
      return accumulator.concat(service.mainCategories);
    },
    []
  );
  const allServices = allMainCategories?.reduce((accumulator, service) => {
    return accumulator.concat(service.subCategories);
  }, []);

  const selectedServiceDetails = allServices?.filter((x) =>
    selectedServices.includes(x._id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validations
    if (!firstName) return toast.error("Please write your first name.");
    if (!serviceTitle) return toast.error("Please write your service title.");
    if (!picture) return toast.error("Please select a picture.");

    if (!phone || phone.length < 10) {
      return toast.error("The phone number should be at least 10 digits long.");
    }

    const phoneAsNumber = Number(phone);
    if (isNaN(phoneAsNumber)) {
      return toast.error("Phone number is not valid.");
    }

    if (!address) return toast.error("Please write your address.");

    // Prepare form data
    const formData = new FormData();
    formData.append("stylist_name", `${firstName} ${lastName}`);
    formData.append("stylist_service", serviceTitle);
    formData.append("stylist_Img", picture);
    formData.append("rating", "4.5");
    formData.append("stylist_number", phoneAsNumber);
    formData.append("stylist_address", address);

    // Append time and services
    time_for_service.forEach((time) => {
      formData.append("time_for_service[]", time);
    });
    selectedServices.forEach((service) => {
      formData.append("services[]", service);
    });

    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("stylist/new", formData, {
        headers,
      });
      console.log(data);
      toast.success("Team member added successfully");

      // Reset form fields
      setPhone("");
      setFirstName("");
      setAddress("");
      setServiceTitle("");
      setPicture(null);
    } catch (error) {
      console.log("Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const employeeSchedule = () => {
    navigate("/partner/dashboard/EmployeeSchedule");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  if (loading) {
    return <LoadSpinner />;
  }
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.usr_detail_head}>
            <Link to={"/partner/dashboard/TeamManageMent"}>
              <span>
                <img
                  loading="lazy"
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
                  <div
                    className={styles.profileRounded}
                    onClick={handleButtonClick}
                  >
                    <img
                      loading="lazy"
                      src={picture ? URL.createObjectURL(picture) : profileImg}
                      alt="profileImg"
                      className={styles.Rounded}
                    />

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className={styles.inputBox}
                    />
                    <img
                      loading="lazy"
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
                          required={true}
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
                        VALUE={phone}
                        setPhone={setPhone}
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
                    {selectedServiceDetails.length > 0 ? (
                      <div className={styles.serviceList}>
                        {selectedServiceDetails?.map((x, y) => (
                          <h5 key={y}>{x.service_name}</h5>
                        ))}
                      </div>
                    ) : (
                      <h4 className={styles.AllServicesText}>
                        All services (
                        {allServices?.length > 0 ? allServices?.length : 0})
                      </h4>
                    )}

                    <div onClick={() => setIsModalOpen((pre) => !pre)}>
                      <p className={styles.editImgEdit}>
                        Edit
                        <img loading="lazy" src={editImg} alt="editImg" />
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
                    Employee schedules
                  </span>{" "}
                  to view and edit employee schedule.
                </p>
                <div className={styles.SubmitBtn}>
                  <button className={styles.CancelBtn}>Cancel</button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={styles.SaveBtn}
                  >
                    Save
                  </button>
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

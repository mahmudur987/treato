import React, { useEffect, useRef, useState } from "react";
import styles from "./EditTeamData.module.css";
import profileImg from "../../../../../assets/images/TeamDetails/ProfileImg.png";
import Profile_Pic_Edit from "../../../../../assets/images/TeamDetails/Profile_Pic_Edit.png";
import PhoneInput from "../../../../../components/Input/PhoneInput/PhoneInput";
import editImg from "../../../../../assets/images/AccountSettings/edit.svg";
import ProfileEditPencil from "../../../../../assets/images/TeamDetails/ProfileEditPencil.png";
import arrowLeft from "../../../../../assets/images/AccountSettings/arrow-left.svg";
import "react-calendar/dist/Calendar.css";
import "../../../../../components/AccountSettings/UserDetails/ReactCalendar.css";
// import AdminProfileModal from '../../../../../components/_modals/AdminProfile/SelectServiceModal'
import AdminProfileModal from "../../../../../components/_modals/AdminProfile/Service/SelectServiceModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditInput from "./EditInput/EditInput";
import Pick from "../../../Date/Pic";
import { useSingleSalon } from "../../../../../services/salon";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";
import BasicInputTeam from "../AddTeamMember/input/BasicInputTeam";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import SelectServiceModal from "../../../../../components/_modals/SelectServiceModal/SelectServiceModal";
import { useGetSingleMember } from "../../../../../services/Team";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import img1 from "../../../../../assets/images/TeamDetails/ProfileImg.png";
import img2 from "../../../../../assets/images/TeamDetails/ProfileEditPencil.png";
const EditTeamData = () => {
  const location = useLocation();

  const id = location.pathname.split("/").pop();
  const {
    data: member,
    isError: memIsError,
    isLoading: memLoading,
    error: memError,
    refetch,
  } = useGetSingleMember(id);

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
  useEffect(() => {
    setSelectedServices(member?.data?.services);
    setFirstName(member?.data.stylist_name.split(" ")[0]);
    setLastName(member?.data?.stylist_name?.split(" ")[1]);
    setPhone(member?.data?.stylist_number);
    setAddress(member?.data?.stylist_address);
    setServiceTitle(member?.data?.stylist_service);
    setServiceStartDate(member?.data?.created);
    setSelectedServices(member?.data.services);
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneAsNumber = Number(phone);
    if (isNaN(phoneAsNumber)) {
      return toast.error("Phone number is not valid");
    }

    const formData = new FormData();
    formData.append(
      "stylist_name",
      `${firstName ? firstName : member?.data.stylist_name} ${lastName}`
    );
    formData.append("stylist_service", serviceTitle);
    formData.append("stylist_Img", picture); // Assuming 'picture' is the file object
    formData.append("rating", "4.5");
    formData.append("stylist_number", phoneAsNumber);
    formData.append("stylist_address", address);
    time_for_service.forEach((time) => {
      formData.append("time_for_service[]", time);
    });
    selectedServices.forEach((service) => {
      formData.append("services[]", service); // Appending services as array
    });
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    setLoading(true);
    try {
      const { data } = await axiosInstance.patch(
        `stylist/updateStylist/${id}`,
        formData,
        {
          headers,
        }
      );
      console.log(data);
      toast.success(data.message);
      setLoading(false);
      refetch();
    } catch (error) {
      console.log("error", error);
      setLoading(false);

      toast.error(error.message);
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

  const handleDeleteMember = async () => {
    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      let url = `/stylist/teamMembers/removeStylist/${id}`;
      const { data } = await axiosInstance.patch(url, {}, { headers });
      console.log(url);
      console.log(data);
      toast.success("Team member delete successfully ");
      navigate("/partner/dashboard/TeamManageMent");
    } catch (error) {
      console.error(error);
      toast.error(error ? error.message : "Error");
    }
  };

  if (memLoading || loading) {
    return <LoadSpinner />;
  }
  if (memIsError) {
    <ErrorComponent message={memError.message} />;
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.header}>
            <div className={styles.usr_detail_head}>
              <Link to={"/partner/dashboard/TeamManageMent"}>
                <span>
                  <img loading="lazy"
                    src={arrowLeft}
                    alt="arrowLeft"
                    className={styles.Pictures}
                  />
                </span>
              </Link>
              Edit team member
              <p className={styles.usr_detail_Para}>
                Enter employee details and add a team member to your salon.
              </p>
            </div>
            <div className={styles.newBtnWrapper}>
              <button type="button" onClick={handleDeleteMember}>
                Delete
              </button>
            </div>
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
                    <img loading="lazy"
                      className={styles.profileRounded}
                      src={
                        picture
                          ? URL.createObjectURL(picture)
                          : member?.data?.stylist_Img?.public_url
                          ? member?.data?.stylist_Img?.public_url
                          : img1
                      }
                      alt="profileImg"
                    />

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <img loading="lazy"
                      src={img2}
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
                          VALUE={firstName}
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
                          VALUE={lastName}
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
                        VALUE={address}
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
                      VALUE={serviceTitle}
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
                        date={member?.data?.created.slice(0, 10)}
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
                    Employee schedules.
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

export default EditTeamData;

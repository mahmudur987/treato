import React, { createContext, useState } from "react";
import styles from "./AddAppointment.module.css";
import { Link, useNavigate } from "react-router-dom";
import AppointmentDetails from "../../../../components/Services/AddAppoinment/AppointmentDetails/AppointmentDetails";
import ClientsDetails from "../../../../components/Services/AddAppoinment/ClientDetails/ClientDetails";
import { useSingleSalon } from "../../../../services/salon";
import axiosInstance from "../../../../services/axios";
import { Toast } from "@coreui/coreui";
import { toast } from "react-toastify";
export const AddAppoinmentContext = createContext();
const AddAppoinment = () => {
  const navigate = useNavigate();

  const [servicesDetails, setServiceDetails] = useState({});
  const [customarDeatils, setCustomarDeails] = useState({
    phone: "",
    name: "",
    email: "",
  });
  const {
    data,
    isLoading: salonLoading,
    isError: salonIsError,
    error: salonError,
  } = useSingleSalon();

  const teamMembers = data?.salon?.stylists.map((x) => {
    return {
      name: x.stylist_name,
      imageUrl: x.stylist_Img.public_url,
      id: x._id,
    };
  });
  const [price, setPrice] = useState("");
  const [discount, setdiscount] = useState("");

  const [selectedteamMember, setSelectedTeamMember] = useState(
    teamMembers ? teamMembers[0] : ""
  );
  const handleSubmit = async () => {
    const { name, email, phone } = customarDeatils;
    const { service_id, time, dateforService, additionalComments, duration } =
      servicesDetails;
    const newdata = {
      service_id,
      final_amount: Number(price),
      time,
      noPreference: false,
      selectedStylistId: selectedteamMember?.id,
      dateforService,
      userData: {
        name,
        email,
        phone,
      },
      additionalComments,
    };

    console.log(newdata);

    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance.post(
        "/appointment/walkinAppointment",
        newdata,
        {
          headers,
        }
      );
      console.log(data);

      toast.success("A new appoinment successfully");
      navigate("/partner/dashboard");
    } catch (error) {
      console.log("error", error);

      toast.error(error ? error.message : "Failed");
    }
  };
  return (
    <AddAppoinmentContext.Provider
      value={{
        setServiceDetails,
        setCustomarDeails,
        teamMembers,
        selectedteamMember,
        setSelectedTeamMember,
        price,
        setPrice,
        discount,
        setdiscount,
      }}
    >
      <main className={styles.mainContainer}>
        <Link to={"/service"} className={styles.backLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 12H5"
              stroke="#08090A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#08090A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>

        <section className={styles.container}>
          <header className={styles.header}>
            <Link to={"/service"} className={styles.backLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 12H5"
                  stroke="#08090A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="#08090A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <h1>
              <span> Add Appoinments</span>
            </h1>
            <p>
              Enter visit details to add a walk-in appointment to your database
            </p>
          </header>

          <div className={styles.content}>
            <div className={styles.leftContent}>
              <AppointmentDetails />
            </div>
            <div className={styles.rightContent}>
              <ClientsDetails />
            </div>
          </div>

          <div className={styles.buttontContainer}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.submit} onClick={handleSubmit}>
              Submit
            </button>
            <button className={styles.save}>Save and Continue</button>
          </div>
        </section>
      </main>
    </AddAppoinmentContext.Provider>
  );
};

export default AddAppoinment;

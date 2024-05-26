import React, { createContext, useEffect, useState } from "react";
import styles from "./AddAppointment.module.css";
import { Link, useNavigate } from "react-router-dom";
import AppointmentDetails from "../../../../components/Services/AddAppoinment/AppointmentDetails/AppointmentDetails";
import ClientsDetails from "../../../../components/Services/AddAppoinment/ClientDetails/ClientDetails";
import { useSingleSalon } from "../../../../services/salon";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
import Loader from "../../../../components/LoadSpinner/Loader";
export const AddAppointmentContext = createContext();
const AddAppointment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [servicesDetails, setServiceDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({
    phone: "",
    name: "",
    email: "",
  });
  const { data, isLoading, isError, error } = useSingleSalon();

  const teamMembers = data?.salon?.stylists.map((x) => {
    return {
      name: x.stylist_name,
      imageUrl: x.stylist_Img.public_url,
      id: x._id,
    };
  });
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [SelectedTeamMember, setSelectedTeamMember] = useState({});

  useEffect(() => {
    setSelectedTeamMember(teamMembers ? teamMembers[0] : "");
  }, [data]);

  const handleSubmit = async () => {
    const { name, email, phone } = customerDetails;
    const { service_id, time, dateforService, additionalComments, duration } =
      servicesDetails;
    if (!dateforService) {
      return toast.error("select date ");
    }
    if (service_id.length === 0) {
      return toast.error("select services ");
    }
    if (!time) {
      return toast.error("select a time ");
    }

    if (!name) {
      return toast.error("customer name not available");
    }
    if (!email) {
      return toast.error("customer email not available");
    }
    if (!phone) {
      return toast.error("customer phone not available in Database");
    }

    if (!price) {
      return toast.error("select price ");
    }

    const newdata = {
      service_id,
      final_amount: Number(price),
      time,
      noPreference: false,
      selectedStylistId: SelectedTeamMember?.id,
      dateforService,
      userData: {
        name,
        email,
        phone,
      },
      additionalComments,
    };

    setLoading(true);

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
      toast.success(
        data ? data.message : "A New Appointment Has Been Added Successfully "
      );
    } catch (error) {
      console.log("error", error);
      toast.error(error ? error.message : "Failed");
    }
    setLoading(false);
  };
  return (
    <AddAppointmentContext.Provider
      value={{
        setServiceDetails,
        setCustomerDetails,
        teamMembers,
        SelectedTeamMember,
        setSelectedTeamMember,
        price,
        setPrice,
        discount,
        setDiscount,
        isLoading,
        isError,
        error,
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

          <div className={styles.buttonContainer}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.submit} onClick={handleSubmit}>
              {loading ? <Loader /> : "Submit"}
            </button>
            <button onClick={handleSubmit} className={styles.save}>
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </section>
      </main>
    </AddAppointmentContext.Provider>
  );
};

export default AddAppointment;

import React, { createContext, useEffect, useMemo, useState } from "react";
import styles from "./AddAppointment.module.css";
import { Link, useNavigate } from "react-router-dom";
import AppointmentDetails, {
  MemoizedAppointmentDetails,
} from "../../../../components/Services/AddAppoinment/AppointmentDetails/AppointmentDetails";
import ClientsDetails, {
  MemoizedClientsDetails,
} from "../../../../components/Services/AddAppoinment/ClientDetails/ClientDetails";
import { useSingleSalon } from "../../../../services/salon";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
import Loader from "../../../../components/LoadSpinner/Loader";
// import { useNavigate } from "react-router-dom";

export const AddAppointmentContext = createContext();

export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const AddAppointment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [servicesDetails, setServiceDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({
    phone: "",
    name: "",
    email: "",
  });
  const [comments, setComments] = useState("");

  const { service_id, time, dateforService, additionalComments } =
    servicesDetails || {};
  const { data, isLoading, isError, error } = useSingleSalon();
  const teamMembers = useMemo(() => {
    return (
      data?.salon?.stylists?.map((x) => ({
        name: x.stylist_name,
        imageUrl: x.stylist_Img.public_url,
        id: x._id,
      })) || []
    );
  }, [data?.salon?.stylists]);

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [SelectedTeamMember, setSelectedTeamMember] = useState({});

  useEffect(() => {
    if (teamMembers.length > 0) {
      setSelectedTeamMember(teamMembers.length > 0 ? teamMembers[0] : {});
    }
  }, [teamMembers]);

  const [isPast, setIsPast] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const givenDateString = dateforService || null;
  const givenTimeString = time;
  const { name, email, phone } = customerDetails;
  useEffect(() => {
    if (givenTimeString) {
      const currentTime = new Date();
      const [hours, minutes] = givenTimeString?.split(":")?.map(Number);
      const givenTime = new Date();
      givenTime.setHours(hours);
      givenTime.setMinutes(minutes);
      givenTime.setSeconds(0);
      givenTime.setMilliseconds(0);

      if (currentTime > givenTime) {
        setIsPast(true);
      } else {
        setIsPast(false);
      }
    }
  }, [givenTimeString]);

  useEffect(() => {
    if (givenDateString) {
      const currentDate = new Date();
      const parts = givenDateString?.split(",");
      const day = parseInt(parts[0]?.split(" ")[1]);
      const monthString = parts[0]?.split(" ")[0].slice(0, 3);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthIndex = months.indexOf(monthString);
      const givenDate = new Date(
        currentDate.getFullYear(),
        monthIndex,
        parseInt(day)
      );

      if (
        currentDate.getDate() === givenDate.getDate() &&
        currentDate.getMonth() === givenDate.getMonth() &&
        currentDate.getFullYear() === givenDate.getFullYear()
      ) {
        setIsToday(true);
      } else {
        setIsToday(false);
      }
    }
  }, [givenDateString]);

  const handleSubmit = async () => {
    const validations = [
      {
        condition: !dateforService,
        message: "Please select a date for the service.",
      },
      {
        condition: !service_id || service_id.length === 0,
        message: "Please select at least one service.",
      },
      { condition: !time, message: "Please select a time slot." },
      {
        condition: isToday && isPast,
        message: "The selected time slot has already passed.",
      },
      { condition: !name, message: "Customer name is missing." },
      { condition: !email, message: "Customer email is missing." },
      {
        condition: !phone,
        message: "Customer phone number is not available in the database.",
      },
      { condition: !price, message: "Please select a price." },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        return toast.error(validation.message);
      }
    }

    const appointmentData = {
      service_id,
      final_amount: Number(price),
      time,
      noPreference: false,
      selectedStylistId: SelectedTeamMember?.id,
      dateforService: formatDate(dateforService),
      userData: {
        name,
        email,
        phone,
      },
      additionalComments,
      discount: Number(discount),
    };

    setLoading(true); // Start loading

    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance.post(
        "/appointment/walkinAppointment",
        appointmentData,
        { headers }
      );

      toast.success(
        data?.message || "A new appointment has been added successfully."
      );

      setComments("");
      setCustomerDetails({});
      setDiscount("");
      setPrice("");
      setSelectedTeamMember({});
    } catch (error) {
      console.error("Error while submitting appointment:", error);
      toast.error(
        error?.response?.data?.message || "Failed to add appointment."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };
  const backNavigate = () => {
    navigate(-1);
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
        comments,
        setComments,
        loading,
      }}
    >
      <main className={styles.mainContainer}>
        <Link onClick={backNavigate} className={styles.backLink}>
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
              <span> Add Appointments</span>
            </h1>
            <p>
              Enter visit details to add a walk-in appointment to your database
            </p>
          </header>

          <div className={styles.content}>
            <div className={styles.leftContent}>
              <MemoizedAppointmentDetails />
            </div>
            <div className={styles.rightContent}>
              <MemoizedClientsDetails />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.cancel}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={styles.submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
            <button
              onClick={handleSubmit}
              className={styles.save}
              disabled={loading}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </section>
      </main>
    </AddAppointmentContext.Provider>
  );
};

export default AddAppointment;

import React, { useRef, useState } from "react";
import styles from "./ManageHolidays.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import ToggleButton from "../../Buttons/Toggle/ToggleButton";
import { useSingleSalon } from "../../../services/salon";
import { useGetHolidays } from "../../../services/holidays";
import ErrorComponent from "../../ErrorComponent/ErrorComponent";
import Loader from "../../LoadSpinner/Loader";
import axiosInstance from "../../../services/axios";
import { toast } from "react-toastify";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const ManageHolidays = ({ showModal, onClose }) => {
  const { data, isError, isLoading, error, refetch } = useGetHolidays();
  const [updateId, setUpdateId] = useState("");
  const { data: salon } = useSingleSalon();
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("Fri,Mar 29");
  const [date, setDate] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [show, setShow] = useState(false);

  const handleAddHoliday = async () => {
    if (!date) {
      return toast.error("Please select a date.");
    }
    if (!eventName) {
      return toast.error("Please provide the event name.");
    }

    setLoading(true);
    const updateData = {
      event: eventName,
      date,
      status: "closed",
    };

    console.log(updateData);

    try {
      const id = salon?.salon?._id;
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      let url = `holidays/${id}/addHoliday`;
      const { data } = await axiosInstance.post(url, updateData, { headers });
      console.log(data);
      refetch();
      toast.success("Holiday added successfully.");

      setLoading(false);
      setShow(!show);
    } catch (error) {
      toast.error(
        error?.message || "An error occurred while adding the holiday."
      );
      console.log(error);
      setLoading(false);
    }
  };

  const handleToggle = async (data) => {
    setUpdateId(data._id);
    setLoading(true);

    const updateData = [
      {
        date: data.date,
        event: data.event,
        status: data.status === "closed" ? "open" : "closed",
      },
    ];
    console.log(updateData);
    try {
      const id = salon?.salon?._id;
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      let url = `holidays/${id}/updateHoliday`;
      const { data } = await axiosInstance.patch(url, updateData, {
        headers,
      });
      console.log(data);
      refetch();
      setLoading(false);
    } catch (error) {
      toast.error(error ? error.message : "Error");
      console.log(error);
      setLoading(false);
    }
  };
  const openDatePicker = () => {
    dateInputRef.current.showPicker();
  };
  const handleShow = () => {
    setShow(!show);
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>List of Holidays - 2024</h2>
        <p className={styles.modalDescription}>
          Your store will be unavailable for bookings on the days marked as
          closed. You can update this list anytime before the relevant date.
        </p>
        <div className={styles.top}>
          {show ? (
            <form className={styles.addHolidayForm}>
              <div className={styles.topPart}>
                <h4>Add a new holiday</h4>
                <p className={styles.ToggleButtonWrapper}>
                  <ToggleButton isOn={false} /> <span>close</span>
                </p>
              </div>
              <div className={styles.bottomPart}>
                <p className={styles.dateWrapper}>
                  <span className={styles.dateSpan}>Date</span>
                  <span onClick={openDatePicker} className={styles.datePicker}>
                    {selectedDate} <FaAngleDown />
                  </span>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className={styles.dateInput}
                    onChange={(e) => {
                      const selectedDate = e.target.value;
                      setDate(selectedDate);
                      const formattedDate = new Date(
                        selectedDate
                      ).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      });
                      setSelectedDate(formattedDate);
                    }}
                  />
                </p>
                <p className={styles.eventWrapper}>
                  <span className={styles.eventSpan}>Event</span>
                  <input
                    onChange={(e) => setEventName(e.target.value)}
                    type="text "
                    placeholder="Enter holidays name"
                  />
                </p>
                <button
                  type="button"
                  onClick={handleAddHoliday}
                  className={styles.addHolidaySave}
                >
                  save
                </button>
              </div>
            </form>
          ) : (
            <button onClick={handleShow} className={styles.addNewButton}>
              <span>
                <FaPlus />
              </span>
              <span>Add a new holiday</span>
            </button>
          )}
          <div className={styles.row1}>
            <span className={styles.col1}>Day/ Date</span>
            <span className={styles.col2}> Event</span>
            <span className={styles.col3}> Status</span>
          </div>
        </div>
        <div className={styles.content}>
          {data &&
            !isError &&
            !isLoading &&
            data?.AllHolidays?.holidays.length > 0 &&
            data?.AllHolidays?.holidays.map((x) => (
              <div key={x._id} className={styles.row1}>
                <span className={styles.col1}>{formatDate(x.date)}</span>
                <span className={styles.col2}>{x.event}</span>

                <span
                  className={styles.col3}
                  style={{
                    color: `${x.status === "closed" ? "#6D747A" : ""}`,
                  }}
                >
                  {loading && updateId === x._id ? (
                    <Loader />
                  ) : (
                    <ToggleButton
                      isOn={x.status === "closed" ? false : true}
                      handleToggle={handleToggle}
                      data={x}
                    />
                  )}

                  {x.status}
                </span>
              </div>
            ))}
          {isError && !isLoading && (
            <ErrorComponent message={error ? error.message : "Error "} />
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancel} type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ManageHolidays;

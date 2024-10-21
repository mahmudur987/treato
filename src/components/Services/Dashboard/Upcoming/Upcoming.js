import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import RecentActivity from "../RecentActivity/RecentActivity";
import axiosInstance from "../../../../services/axios";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import MobileView from "./MobileView";
import { Link } from "react-router-dom";
const TimeAddition = (initialTime, additionalTime) => {
  let hoursToAdd = 0;
  let minutesToAdd = 0;

  // Check if additionalTime matches the pattern "X hr Y min"
  const match = additionalTime.match(/(\d+)\s*hr\s*(\d*)\s*min/);

  if (match) {
    hoursToAdd = parseInt(match[1], 10);
    minutesToAdd = parseInt(match[2], 10);
  } else {
    // If match fails, try to parse just minutes
    const minutesMatch = additionalTime.match(/(\d+)\s*min/);
    if (minutesMatch) {
      minutesToAdd = parseInt(minutesMatch[1], 10);
    } else {
      // Handle invalid additionalTime format
      console.error("Invalid additionalTime format:", additionalTime);
      return initialTime; // or handle error as needed
    }
  }

  const initialDate = new Date(
    `2000-01-01T${initialTime ? initialTime : "09:00"}:00`
  );

  const newTime = new Date(
    initialDate.getTime() + (hoursToAdd * 60 + minutesToAdd) * 60000
  );

  const formattedNewTime = newTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedNewTime;
};

const Upcoming = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales/upcomingAppointments"],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance("sales/upcomingAppointments", {
        headers,
      });
      // console.log(data)
      return data;
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {innerWidth < 600 ? (
        <div className={styles.maincontainer}>
          {data && <MobileView data={data?.data} />}
        </div>
      ) : (
        <div className={styles.maincontainer}>
          <div className={styles.container}>
            <div className={styles.hearderBox}>
              <h2 className={styles.heading}>Upcoming</h2>
              <Link to="/partner/dashboard/appointment/calendar">
                <h3>View Calendar</h3>
              </Link>
            </div>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Time slot</th>
                  <th className={styles.th}>Booking Type</th>
                  <th className={styles.th}>Client</th>
                  <th className={styles.th}>Phone/email</th>
                  <th className={styles.th}>Service Name</th>
                  <th className={styles.th}>Stylist</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Price</th>
                </tr>
              </thead>
              <tbody className={`${styles.tbody} ${styles.scroll}`}>
                {data &&
                  data?.data?.slice(0, 72).map((item, i) => {
                    const addedTime = TimeAddition(
                      item?.time?.slice(0, 5),
                      item.serviceData?.time_takenby_service
                    );
                    // console.log(item);
                    return (
                      <tr key={i}>
                        <td className={styles.date_row}>
                          {item.dateforService}
                        </td>
                        <td className={styles.slot}>
                          {item?.time}-{addedTime} (
                          {item.serviceData?.time_takenby_service})
                        </td>
                        <td className={styles.row}>{item?.paymentMode}</td>
                        <td className={styles.row}>
                          {item?.userData?.name ? item?.userData?.name : "N/A"}
                        </td>
                        <td className={styles.row}>
                          {item?.userData?.phone
                            ? item.userData.phone
                            : item?.userData?.email}
                        </td>
                        <td className={styles.row}>
                          {item?.serviceData?.service_name}
                        </td>
                        <td className={styles.row}>
                          <div className={styles.teamMember}>
                            <img
                              loading="lazy"
                              className={styles.imgSize}
                              src={
                                item?.noPreference
                                  ? "No Preference"
                                  : item?.stylistData[0]?.stylist_Img
                                      ?.public_url
                              }
                              alt=""
                            />
                            <span>
                              {item?.noPreference
                                ? "No Preference"
                                : item?.stylistData[0]?.stylist_name}
                            </span>
                          </div>
                        </td>
                        <td className={styles.booked}>
                          {item?.status ? item?.status : "N/A"}
                        </td>
                        <td className={styles.row}>
                          ₹{item?.serviceData?.price ?? "not found"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {isLoading && <LoadSpinner />}

            {isError && <ErrorComponent message={error.message} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Upcoming;

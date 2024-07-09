import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import RecentActivity from "../RecentActivity/RecentActivity";
import axiosInstance from "../../../../services/axios";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import MobileView from "./MobileView";
const TimeAddition = (initialTime, additionalTime) => {
  const match = additionalTime.match(/(\d+)\s*hr\s*(\d*)\s*min/);
  const hoursToAdd = match ? parseInt(match[1], 10) : 0;
  const minutesToAdd = match ? parseInt(match[2], 10) : 0;
  // Convert initialTime to Date object
  const initialDate = new Date(
    `2000-01-01T${initialTime ? initialTime : "09:00"}:00`
  );

  // Calculate new time by adding hours and minutes
  const newTime = new Date(
    initialDate.getTime() + (hoursToAdd * 60 + minutesToAdd) * 60000
  );

  // Format the new time as HH:mm
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
  console.log(error);
  return (
    <>
      {innerWidth < 600 ? (
        <div className={styles.maincontainer}>
          {data && <MobileView data={data?.data} />}
        </div>
      ) : (
        <div className={styles.maincontainer}>
          <div className={styles.container}>
            <h2 className={styles.heading}>Upcoming</h2>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Time slot</th>
                  <th className={styles.th}>Client</th>
                  <th className={styles.th}>Phone/email</th>
                  <th className={styles.th}>Service Name</th>
                  <th className={styles.th}>Stylist</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Price</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {data &&
                  data?.data?.slice(0, 72).map((item, i) => {
                    return (
                      <tr key={i}>
                        <td className={styles.date_row}>
                          {item.dateforService}
                        </td>
                        <td className={styles.slot}>
                          {item?.time}-
                          {TimeAddition(
                            item?.time?.slice(0, 5),
                            item.serviceData?.time_takenby_service
                          )}{" "}
                          (45min)
                        </td>
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
                          {item?.noPreference
                            ? "N/A"
                            : item?.stylistData[0].stylist_name}
                        </td>
                        <td className={styles.booked}>
                          {item?.status ? item?.status : "N/A"}
                        </td>
                        <td className={styles.row}>
                          ₹{item.final_amount.toFixed(2)}
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

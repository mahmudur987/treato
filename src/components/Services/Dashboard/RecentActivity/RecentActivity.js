import React from "react";
import styles from "./RecentActivity.module.css";
import axiosInstance from "../../../../services/axios";
import { useQuery } from "react-query";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
const RecentActivity = () => {
  const options = { day: "numeric", month: "short" };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales/recentActivity"],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance(`sales/recentActivity`, {
        headers,
      });

      return data.data;
    },
  });

  if (isLoading) {
    <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <div className={styles.maincontainer}>
      <h2>Recent activity</h2>

      <div className={styles.container}>
        {/* dinamic card */}
        {data &&
          data.map((item, i) => (
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={styles.date}>
                  <p>
                    {
                      new Date(item?.start_date)
                        .toLocaleDateString("en-US", options)
                        .split(" ")[1]
                    }
                  </p>
                  <span>
                    {
                      new Date(item?.start_date)
                        .toLocaleDateString("en-US", options)
                        .split(" ")[0]
                    }
                  </span>
                </div>

                <div className={styles.contents}>
                  <p>
                    <span className={styles.appointmentDate}>
                      {new Date(item?.dateforService).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        }
                      )}
                      {"  " + " "}
                      {item.bookingTime}
                    </span>{" "}
                    <span className={styles.appointmentStatus}>
                      {item.status}
                    </span>
                  </p>
                  <p>
                    <span className={styles.appointmentName}>
                      Haircut women (1h 15m)
                    </span>
                    <span className={styles.appointmentFor}>Nayanika</span>
                  </p>
                </div>
              </div>
              <div className={styles.cardRight}>
                <p className={styles.price}>₹{item.final_amount}</p>
                <p className={styles.paymentType}>online</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentActivity;

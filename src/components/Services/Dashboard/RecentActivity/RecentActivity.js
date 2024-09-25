import React from "react";
import styles from "./RecentActivity.module.css";
import axiosInstance from "../../../../services/axios";
import { useQuery } from "react-query";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../NodataToDisplay/NoDataDisplay";
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

  return (
    <div className={styles.maincontainer}>
      <h2>Recent activity</h2>

      <div className={styles.container}>
        {/* dynamic card */}
        {data &&
          data.length > 0 &&
          data
            ?.sort(
              (a, b) => new Date(b.dateforService) - new Date(a.dateforService)
            )
            .slice(0, 20)
            .map((item, i) => (
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
                    <p className={styles.contentsP}>
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
                        {item?.serviceData?.service_name || "No Name"} (
                        {item?.serviceData?.time_takenby_service})
                      </span>
                      {item.stylistData.map((x, y) => (
                        <div className={styles.teamMember}>
                          <img loading="lazy" src={x.stylist_Img?.public_url} alt="" />
                          <span className={styles.appointmentFor}>
                            {x.stylist_name}
                          </span>
                        </div>
                      ))}
                    </p>
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <p className={styles.price}>₹{item.final_amount}</p>
                  <p className={styles.paymentType}>
                    {item.PaymentMode || "Payment Mode"}
                  </p>
                </div>
              </div>
            ))}
        {data && data.length === 0 && <NoDataDisplay />}
        {isLoading && <LoadSpinner />}
        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}
      </div>
    </div>
  );
};

export default RecentActivity;

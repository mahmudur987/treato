import React from "react";
import styles from "./MobileView.module.css";
const MobileView = ({ data }) => {
  const options = { day: "numeric", month: "short" };
  return (
    <div className={styles.maincontainer}>
      <div className={styles.header}>
        <h2>Upcoming</h2>
        <h3>view calender</h3>
      </div>

      <div className={styles.container}>
        {data &&
          data.map((x, i) => {
            console.log(x);

            return (
              <div className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.date}>
                    <p>12</p>
                    <span>Oct</span>
                  </div>

                  <div className={styles.contents}>
                    <p>
                      <span className={styles.appointmentDate}>
                        {new Date(x?.dateforService).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          }
                        )}
                        {"  " + " "}
                        {x.time}
                      </span>{" "}
                      <span className={styles.appointmentStatus}>
                        {x.status}
                      </span>
                      <span className={styles.appointmentPayment}>online</span>
                    </p>
                    <p>
                      <span className={styles.appointmentName}>
                        {x.serviceData.service_name} (
                        {x.serviceData.time_takenby_service})
                      </span>
                      <span className={styles.appointmentFor}>
                        {x.noPreference ? "N/A" : "nayanika"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <p className={styles.price}>₹{x?.final_amount}</p>
                </div>
              </div>
            );
          })}
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            <div className={styles.date}>
              <p>12</p>
              <span>Oct</span>
            </div>

            <div className={styles.contents}>
              <p>
                <span className={styles.appointmentDate}>
                  wed 11 oct 5:45pm
                </span>{" "}
                <span className={styles.appointmentStatus}>completed</span>
                <span className={styles.appointmentPayment}>online</span>
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
            <p className={styles.price}>₹599</p>
            <p className={styles.paymentType}>online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;

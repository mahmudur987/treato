import React, { useState } from "react";
import styles from "./Upcoming.module.css";
import RecentActivity from "../RecentActivity/RecentActivity";

const Upcoming = () => {
  console.log(window.innerWidth);

  return (
    <>
      {window.innerWidth < 600 ? (
        <div className={styles.maincontainer}>
          <RecentActivity />
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
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Service Name</th>
                  <th className={styles.th}>Stylist</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Price</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                <tr>
                  <td className={styles.date_row}>wed ,11 Oct</td>
                  <td className={styles.slot}>7.00-7:45 (45min)</td>
                  <td className={styles.row}>Nishanth sing</td>
                  <td className={styles.row}>91-32464111</td>
                  <td className={styles.row}>Hair color men</td>
                  <td className={styles.row}>Nayanica</td>
                  <td className={styles.booked}>Booked</td>
                  <td className={styles.row}>₹599</td>
                </tr>
                <tr>
                  <td className={styles.date_row}>wed ,11 Oct</td>
                  <td className={styles.slot}>7.00-7:45 (45min)</td>
                  <td className={styles.row}>Nishanth sing</td>
                  <td className={styles.row}>91-32464111</td>
                  <td className={styles.row}>Hair color men</td>
                  <td className={styles.row}>Nayanica</td>
                  <td className={styles.booked}>Booked</td>
                  <td className={styles.row}>₹599</td>
                </tr>
                <tr>
                  <td className={styles.date_row}>wed ,11 Oct</td>
                  <td className={styles.slot}>7.00-7:45 (45min)</td>
                  <td className={styles.row}>Nishanth sing</td>
                  <td className={styles.row}>91-32464111</td>
                  <td className={styles.row}>Hair color men</td>
                  <td className={styles.row}>Nayanica</td>
                  <td className={styles.booked}>Booked</td>
                  <td className={styles.row}>₹599</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Upcoming;

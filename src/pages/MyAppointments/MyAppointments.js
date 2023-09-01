import React from "react";
import "./Nav.css";
import styles from "./MyAppointments.module.css";
import Upcoming from "../../components/MyAppointments/Upcoming/Upcoming";
import Cancelled from "../../components/MyAppointments/Cancelled/Cancelled";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Completed from "../../components/MyAppointments/Completed/Completed";
const MyAppointments = () => {
  return (
    <div className={styles.MyAppointments}>
      <h3 className={styles.title}>My Appointments</h3>
      <div className={styles.navWrapper}>

        <nav className={styles.nav}>
          <NavLink to="/my-appointments/upcoming" exact>
            Upcoming
          </NavLink>
          <NavLink to="/my-appointments/completed" exact>
            Completed
          </NavLink>
          <NavLink to="/my-appointments/cancelled" exact>
            Cancelled
          </NavLink>
          {/* <div className={`${styles.animation} ${styles.starthome}`}/> */}
        </nav>



        {/* <hr className={styles.line} /> */}
      </div>
      <div className={styles.contents}>
        <Routes>
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/cancelled" element={<Cancelled />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyAppointments;

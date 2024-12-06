import React from "react";
import "./MyAppointmentNav.css";
import styles from "./MyAppointments.module.css";
import Upcoming from "../../components/MyAppointments/Upcoming/Upcoming";
import Cancelled from "../../components/MyAppointments/Cancelled/Cancelled";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Completed from "../../components/MyAppointments/Completed/Completed";
import ModalManager from "../../components/_modals/ModalManager";
import { useUpcomingApponments } from "../../services/Appointments";
import Progress from "../../components/MyAppointments/Progress/Progress";
const MyAppointments = () => {
  const { data } = useUpcomingApponments();
  const count = data?.res?.data?.data.length;
  return (
    <div className={styles.MyAppointments}>
      <ModalManager />
      <h3 className={styles.title}>My Appointments</h3>
      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <NavLink to="/my-appointments/upcoming" exact>
            Upcoming
            {count > 0 && <span className={styles.unSeenDot}></span>}
          </NavLink>
          <NavLink to="/my-appointments/progress" exact>
            <span className={styles.progress}>Progress</span>
            {count > 0 && <span className={styles.unSeenDot}></span>}
          </NavLink>
          <NavLink to="/my-appointments/completed" exact>
            Completed
          </NavLink>
          <NavLink to="/my-appointments/cancelled" exact>
            Cancelled
          </NavLink>
        </nav>
      </div>
      <div className={styles.contents}>
        <Routes>
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/cancelled" element={<Cancelled />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyAppointments;

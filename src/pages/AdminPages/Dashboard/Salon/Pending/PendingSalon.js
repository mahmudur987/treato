import React, { useState } from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/FilterSection/FilterSection";
import styles from "./PendingSalon.module.css";
import PendingAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/SingleSalon/PendingAllSalon";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
const pendingSalonData = [
  {
    id: 1,
    image: img,
    name: "Getanjali Salon",
    address: "Windmills Road ,Bengaluru",
    date: "12,Mar ,2024",
    ownerName: "fajila khatun ",
  },
  {
    id: 2,
    image: img,
    name: "Getanjali Salon",
    address: "Windmills Road ,Bengaluru",
    date: "12,Mar ,2024",
    ownerName: "fajila khatun ",
  },
  {
    id: 3,
    image: img,
    name: "Getanjali Salon",
    address: "Windmills Road ,Bengaluru",
    date: "12,Mar ,2024",
    ownerName: "fajila khatun ",
  },
  {
    id: 4,
    image: img,
    name: "Getanjali Salon",
    address: "Windmills Road ,Bengaluru",
    date: "12,Mar ,2024",
    ownerName: "fajila khatun ",
  },
];
const PendingSalon = () => {
  const [viewBy, setViewBy] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState([]);

  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          viewBy={viewBy}
          setViewBy={setViewBy}
          selectedSalon={selectedSalon}
        />

        <PendingAllSalon
          selectedSalon={selectedSalon}
          setSelectedSalon={setSelectedSalon}
          pendingSalonData={pendingSalonData}
          viewBy={viewBy}
        />
      </section>
    </SalonInDashBoard>
  );
};

export default PendingSalon;

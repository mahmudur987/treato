import React from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import styles from "./DeactivatedSalon.module.css";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/FilterSection/FilterSection";
import DeactivatedAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/DeactivatedAllSalon/DeactivatedAllSalon";
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
const DeactivatedSalon = () => {
  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          viewBy={viewBy}
          setViewBy={setViewBy}
          selectedSalon={selectedSalon}
        />

        <DeactivatedAllSalon
          selectedSalon={selectedSalon}
          setSelectedSalon={setSelectedSalon}
          pendingSalonData={pendingSalonData}
          viewBy={viewBy}
        />
      </section>
    </SalonInDashBoard>
  );
};

export default DeactivatedSalon;

import React, { useState } from "react";
import styles from "./ActiveSalon.module.css";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/FilterSection/FilterSection";
import salonImage from "../../../../../assets/images/SalonsPageImages/cardImage.png";
import SingleSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SingleSalon/SingleSalon";
import SalonTable from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SalonTable/SalonTable";

const ActiveSalons = [
  {
    salon_image: salonImage,
    salon_name: "Athena Hair Salon & Unisex Spa",
    salon_rating: "4.8",
    salon_ratingCount: "277",
    salon_address: "Windmills Road,Bengaluru",
    salon_owner: "Saurav Nanda ",
    salon_joinDate: "02 oct 2023 ",
    salon_NetSales: "$1.2L ",
  },
  {
    salon_image: salonImage,
    salon_name: "Athena Hair Salon & Unisex Spa",
    salon_rating: "4.8",
    salon_ratingCount: "277",
    salon_address: "Windmills Road,Bengaluru",
    salon_owner: "Saurav Nanda ",
    salon_joinDate: "02 oct 2023 ",
    salon_NetSales: "$1.2L ",
  },
  {
    salon_image: salonImage,
    salon_name: "Athena Hair Salon & Unisex Spa",
    salon_rating: "4.8",
    salon_ratingCount: "277",
    salon_address: "Windmills Road,Bengaluru",
    salon_owner: "Saurav Nanda ",
    salon_joinDate: "02 oct 2023 ",
    salon_NetSales: "$1.2L ",
  },
];
const ActiveSalon = () => {
  const [viewBy, setViewBy] = useState(true);

  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection viewBy={viewBy} setViewBy={setViewBy} />
        {viewBy ? (
          <div className={styles.container}>
            {ActiveSalons.map((x, i) => (
              <SingleSalon key={i} salon={x} />
            ))}
          </div>
        ) : (
          <SalonTable tableData={ActiveSalons} />
        )}
      </section>
    </SalonInDashBoard>
  );
};

export default ActiveSalon;

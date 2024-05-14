import React, { useState } from "react";
import styles from "./ActiveSalon.module.css";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/FilterSection/FilterSection";
import salonImage from "../../../../../assets/images/SalonsPageImages/cardImage.png";
import SingleSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SingleSalon/SingleSalon";
import SalonTable from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SalonTable/SalonTable";
import { useActiveSalons } from "../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import { formatDate } from "../../AdminDashboard";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ActiveSalon = () => {
  const [viewBy, setViewBy] = useState(true);
  const { searchText } = useSelector((state) => state.admin);

  const { pathname } = useLocation();

  const { data, isError, isLoading, error } = useActiveSalons(
    pathname === "/admin/salon/active" ? searchText : ""
  );
  const ActiveSalons = data?.data.map((x) => {
    const data = {
      id: x._id,
      salon_image: x?.salon_image[0]?.public_url ?? salonImage,
      salon_name: x.salon_name ?? "N/A",
      salon_rating: x.rating ?? "N/A",
      salon_ratingCount: "277",
      salon_address: x.address ?? "N/A",
      salon_owner: x.owner_name ?? "N/A",
      salon_joinDate: formatDate(x.date_join) ?? "N/A",
      salon_NetSales: x.net_sales ?? "N/A",
    };

    return data;
  });

  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          viewBy={viewBy}
          setViewBy={setViewBy}
          count={ActiveSalons ? ActiveSalons.length : 0}
        />

        {isLoading && <LoadSpinner />}

        {data && !isLoading && !isError && data?.data.length > 0 && (
          <>
            {viewBy ? (
              <div className={styles.container}>
                {ActiveSalons.map((x, i) => (
                  <SingleSalon key={i} salon={x} />
                ))}
              </div>
            ) : (
              <SalonTable tableData={ActiveSalons} />
            )}
          </>
        )}
        {data && !isLoading && !isError && data?.data.length === 0 && (
          <p>No active salon</p>
        )}
        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}
      </section>
    </SalonInDashBoard>
  );
};

export default ActiveSalon;

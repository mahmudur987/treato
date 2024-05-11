import React, { useState } from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/FilterSection/FilterSection";
import styles from "./PendingSalon.module.css";
import PendingAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/PendingAllSalon/PendingAllSalon";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import { usePendingSalons } from "../../../../../services/superAdmin/Dashboard";
import { formatDate } from "../../AdminDashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";

const PendingSalon = () => {
  const [viewBy, setViewBy] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState([]);
  const { data, isLoading, isError, error } = usePendingSalons();
  const pendingSalonData = data?.pendingSalons?.map((x) => {
    const data = {
      id: x._id,
      image: x.salon_image.public_url ?? img,
      name: x.salon_name ?? "N/A",
      address: x.salons_address ?? "N/A",
      date: formatDate(x.created) ?? "N/A",
      ownerName: "fajila khatun ",
    };
    return data;
  });
  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          viewBy={viewBy}
          setViewBy={setViewBy}
          selectedSalon={selectedSalon}
          count={pendingSalonData ? pendingSalonData.length : 0}
        />
        {isLoading && <LoadSpinner />}
        {data && !isError && !isLoading && pendingSalonData.length > 0 && (
          <PendingAllSalon
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            pendingSalonData={pendingSalonData}
            viewBy={viewBy}
          />
        )}
        {data &&
          !isLoading &&
          !isError &&
          data?.pendingSalons?.length === 0 && (
            <div className={styles.contents}>
              <p>No Pending Salon</p>
            </div>
          )}
        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}
      </section>
    </SalonInDashBoard>
  );
};

export default PendingSalon;

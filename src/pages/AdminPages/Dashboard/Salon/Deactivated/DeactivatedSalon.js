import React, { useState } from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import styles from "./DeactivatedSalon.module.css";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/FilterSection/FilterSection";
import DeactivatedAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/DeactivatedAllSalon/DeactivatedAllSalon";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import { useGetDeactivatedSalons } from "../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../../components/NodataToDisplay/NoDataDisplay";
import { convertToMonthYear } from "../../../../../utils/utils";
import { formatDate } from "../../AdminDashboard";

const DeactivatedSalon = () => {
  const [viewBy, setViewBy] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState([]);
  const { data, isLoading, isError, error } = useGetDeactivatedSalons();
  const pendingSalonData = data?.data.map((x) => {
    const data = {
      id: x._id,
      image: x?.salon_image?.public_url ?? img,
      name: x.salon_name,
      address: x.salons_address,
      date: formatDate(x.created) ?? "N/A",
      ownerName: "fajila khatun ",
    };

    return data;
  });
  console.log(data?.data);

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

        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}

        {data && !isError && !isLoading && data?.data?.length > 0 && (
          <DeactivatedAllSalon
            selectedSalon={selectedSalon}
            setSelectedSalon={setSelectedSalon}
            pendingSalonData={pendingSalonData}
            viewBy={viewBy}
          />
        )}
        {data && !isError && !isLoading && data?.data?.length === 0 && (
          <NoDataDisplay message={"No Deactivated Salon"} />
        )}
      </section>
    </SalonInDashBoard>
  );
};

export default DeactivatedSalon;

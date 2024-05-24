import React, { useEffect, useState } from "react";
import styles from "./ActiveSalon.module.css";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/FilterSection/FilterSection";
import salonImage from "../../../../../assets/images/SalonsPageImages/cardImage.png";
import SingleSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SingleSalon/SingleSalon";
import SalonTable from "../../../../../components/AdminPage/AdminDashboard/Salon/Active/SalonTable/SalonTable";
import {
  getCities,
  useActiveSalons,
} from "../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import { formatDate } from "../../AdminDashboard";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const sortSalons = (salons, sortBy) => {
  if (sortBy === "Rating") {
    return salons.sort((a, b) => b.salon_rating - a.salon_rating);
  } else if (sortBy === "Total Appointments") {
    return salons.sort((a, b) => b.total_appointments - a.total_appointments);
  }
  return salons;
};
const ActiveSalon = () => {
  const [City, setCity] = useState(["City"]);
  const SortBy = ["Rating", "Total Appointments"];
  const [selectedCity, setSelectedCity] = useState("City");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  const [viewBy, setViewBy] = useState(true);
  const { searchText } = useSelector((state) => state.admin);
  const { pathname } = useLocation();

  const { data, isError, isLoading, error } = useActiveSalons(
    pathname === "/admin/salon/active" ? searchText : ""
  );
  const ActiveSalons = data?.data
    ?.filter((x) => {
      return selectedCity === "City" || x.otherLocation.city === selectedCity;
    })
    .map((x) => {
      const data = {
        id: x._id,
        salon_image: x?.salon_image[0]?.public_url ?? salonImage,
        salon_name: x.salon_name ?? "N/A",
        salon_rating: x.rating ?? "N/A",
        salon_ratingCount: "n0" ?? "N/A",
        salon_address: x.address ?? "N/A",
        salon_owner: x.owner_name ?? "N/A",
        salon_joinDate: formatDate(x.date_join) ?? "N/A",
        salon_NetSales: x.net_sales ?? "N/A",
        total_appointments: x.total_appointments ?? "N/A",
      };

      return data;
    });
  const sortedSalons = sortSalons(ActiveSalons, selectedSortBy);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCities();
        setCity(["City", ...cities]);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const value = {
    City,
    selectedCity,
    setSelectedCity,
    SortBy,
    selectedSortBy,
    setSelectedSortBy,
  };
  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          value={value}
          viewBy={viewBy}
          setViewBy={setViewBy}
          count={ActiveSalons ? ActiveSalons.length : 0}
        />

        {isLoading && <LoadSpinner />}

        {data && !isLoading && !isError && ActiveSalons?.length > 0 && (
          <>
            {viewBy ? (
              <div className={styles.container}>
                {sortedSalons.map((x, i) => (
                  <SingleSalon key={i} salon={x} />
                ))}
              </div>
            ) : (
              <SalonTable tableData={sortedSalons} />
            )}
          </>
        )}
        {data && !isLoading && !isError && data?.data?.length === 0 && (
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

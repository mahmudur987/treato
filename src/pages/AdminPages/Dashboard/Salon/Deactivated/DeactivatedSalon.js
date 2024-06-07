import React, { useEffect, useState } from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import styles from "./DeactivatedSalon.module.css";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/FilterSection/FilterSection";
import DeactivatedAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Deactivated/DeactivatedAllSalon/DeactivatedAllSalon";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import {
  getCities,
  useGetDeactivatedSalons,
} from "../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../../components/NodataToDisplay/NoDataDisplay";
import { formatDate } from "../../AdminDashboard";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../../../../../components/AdminPage/AdminDashboard/Dashboard/BillingHistory/pagination/Pagination";

const DeactivatedSalon = () => {
  const [City, setCity] = useState(["City"]);
  const [selectedCity, setSelectedCity] = useState("City");
  const { searchText } = useSelector((state) => state.admin);
  const { pathname } = useLocation();
  const [viewBy, setViewBy] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  const [itemPerPage, setItemPerPage] = useState(6);
  const { data, isLoading, isError, error } = useGetDeactivatedSalons(
    pathname === "/admin/salon/deactivated" ? searchText : ""
  );
  const filteredData = data?.data
    ?.filter((x) => {
      return selectedCity === "City" || x.otherLocation.city === selectedCity;
    })
    ?.map((x) => {
      const data = {
        id: x._id,
        image: x?.salon_image?.public_url ?? img,
        name: x.salon_name,
        address: x.address ?? "N/A",
        date: formatDate(x.date_join) ?? "N/A",
        ownerName: x.owner_name ?? "N/A ",
      };

      return data;
    });

  useEffect(() => {
    setCount(data?.data?.length);
  }, [data]);
  const getFilteredData = (x) => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = startIndex + Number(itemPerPage);
    return x?.slice(startIndex, endIndex);
  };
  const pendingSalonData = getFilteredData(filteredData);
  console.log(data);
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
  };

  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          data={pendingSalonData}
          value={value}
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

        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          count={count}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
        />

        {data && !isError && !isLoading && data?.data?.length === 0 && (
          <NoDataDisplay message={"No Deactivated Salon"} />
        )}
      </section>
    </SalonInDashBoard>
  );
};

export default DeactivatedSalon;

import React, { useEffect, useState } from "react";
import SalonInDashBoard from "../../../../../layouts/Admin/SalonInDashboard/SalonInDashBoard";
import FilterSection from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/FilterSection/FilterSection";
import styles from "./PendingSalon.module.css";
import PendingAllSalon from "../../../../../components/AdminPage/AdminDashboard/Salon/Pending/PendingAllSalon/PendingAllSalon";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import {
  adminToken,
  getCities,
  usePendingSalons,
} from "../../../../../services/superAdmin/Dashboard";
import { formatDate } from "../../AdminDashboard";
import LoadSpinner from "../../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../components/ErrorComponent/ErrorComponent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../../../services/axios";
import { toast } from "react-toastify";

const PendingSalon = () => {
  const [City, setCity] = useState(["City"]);
  const [selectedCity, setSelectedCity] = useState("City");
  const [viewBy, setViewBy] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState([]);
  const { searchText } = useSelector((state) => state.admin);
  const { pathname } = useLocation();
  const { data, isLoading, isError, error } = usePendingSalons(
    pathname === "/admin/salon/pending" ? searchText : ""
  );
  const pendingSalonData = data?.pendingSalons
    ?.filter((x) => {
      return (
        selectedCity === "City" || x?.location_details?.city === selectedCity
      );
    })
    ?.map((x) => {
      const data = {
        id: x._id,
        image: x?.salon_image?.public_url ?? img,
        name: x.salon_name ?? "N/A",
        address: x.salons_address ?? "N/A",
        date: formatDate(x.created) ?? "N/A",
        ownerName: "fajila khatun ",
      };
      return data;
    });

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

  const handleApprove = async (id) => {
    if (id) {
      try {
        const approveData = {};
        const headers = { token: adminToken };

        const { data } = await axiosInstance.post("", approveData, headers);

        if (data) {
          console.log(data);
          toast.success("Salon Approve Successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error.message : "Error");
      }
    } else {
      try {
        const approveData = {};
        const headers = { token: adminToken };

        const { data } = await axiosInstance.post("", approveData, headers);

        if (data) {
          console.log(data);
          toast.success("Salon Approve Successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error.message : "Error");
      }
    }
  };

  const value = {
    City,
    selectedCity,
    setSelectedCity,
    handleApprove,
  };
  return (
    <SalonInDashBoard>
      <section className={styles.mainContainer}>
        <FilterSection
          value={value}
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
            handleApprove={handleApprove}
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

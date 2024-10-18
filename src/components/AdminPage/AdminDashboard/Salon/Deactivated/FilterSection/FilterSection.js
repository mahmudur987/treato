import React, { useState } from "react";
import styles from "./FilterSection.module.css";
import CustomSelect4 from "../../../../../Select/CustomeSelect4/CustomSelect4";
import { MdOutlineGridView } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import axiosInstance from "../../../../../../services/axios";
import { toast } from "react-toastify";

const FilterSection = ({
  viewBy,
  setViewBy,
  selectedSalon,
  setSelectedSalon,
  count,
  value,
  data,
  refetch,
}) => {
  const { City, selectedCity, setSelectedCity } = value;

  const handleReActiveSalons = async () => {
    console.log(selectedSalon);

    if (selectedSalon.length === 0) {
      return toast.error("Please select at least one salon to reactivate.");
    }

    try {
      const Data = {
        salon_ids: selectedSalon, // Assuming you're reactivating multiple salons
      };
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.patch(
        "super/salonreactivate",
        Data,
        {
          headers,
        }
      );

      if (data) {
        toast.success("Salons reactivated successfully!");
        setSelectedSalon([]); // Clear the selection
        refetch(); // Refresh data
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "An error occurred while reactivating salons."
      );
    }
  };
  const handleDeleteAll = async () => {
    console.log(selectedSalon);

    if (selectedSalon.length === 0) {
      return toast.error("Please select at least one salon to delete.");
    }

    try {
      const deleteData = {
        salonId: selectedSalon, // Assuming you're deleting multiple salons
      };
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const { data } = await axiosInstance.post(
        "/super/salon/delete",
        deleteData,
        {
          headers,
        }
      );

      if (data) {
        toast.success("Salons deleted successfully!");
        setSelectedSalon([]); // Clear the selection after deletion
        refetch(); // Refresh data
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "An error occurred while deleting salons.");
    }
  };

  const theview =()=>{
    setViewBy((pre) => !pre)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Deactivated ({count})</h3>
        <div className={styles.topButtonWrapper}>
          <button>
            Approve
            {selectedSalon.length > 0 ? (
              <span className={styles.selLength}>{selectedSalon.length}</span>
            ) : (
              "All"
            )}
          </button>
        </div>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={theview} className={styles.viewBy}>
          <button className={viewBy ? styles.active : styles.notActive}>
            <MdOutlineGridView />
          </button>
          <button className={!viewBy ? styles.active : styles.notActive}>
            <IoMenu />
          </button>
        </div>
        <div className={styles.selectsWrapper}>
          <CustomSelect4
            options={City}
            onChange={setSelectedCity}
            value={selectedCity}
          />
          <div className={styles.buttonWrapper}>
            <button onClick={handleReActiveSalons}>
              Reactivated
              {selectedSalon.length > 0 ? (
                <span style={{ marginLeft: "7px" }}>
                  {selectedSalon.length}
                </span>
              ) : (
                "All"
              )}
            </button>
          </div>
          <div className={styles.buttonWrapper1}>
            <button onClick={handleDeleteAll}>
              Delete
              {selectedSalon.length > 0 ? (
                <span style={{ marginLeft: "7px" }}>
                  {selectedSalon.length}
                </span>
              ) : (
                "All"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

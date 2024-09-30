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

    try {
      const Data = {
        salon_ids: [selectedSalon],
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
      console.log(data);
      if (data) {
        toast.success("Salons are activated successfully!");
        setSelectedSalon([]);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(error ? error?.message : "Error");
    }
  };
  const handleDeleteAll = async (id) => {
    console.log(selectedSalon);
    if (selectedSalon.length > 0) {
      try {
        const deleteData = {
          salonId: [id],
        };
        const headers = {};

        const { data } = await axiosInstance.delete("", headers, deleteData);

        if (data) {
          toast.success("Salons deleted successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error?.message : "Error");
      }
    }
    if (selectedSalon.length === 0) {
      try {
        const deleteData = {
          salonId: [id],
        };
        const headers = {};

        const { data } = await axiosInstance.post("", headers, deleteData);

        if (data) {
          toast.success("Salons deleted successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error?.message : "Error");
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchWrapper}>
        <h3>Deactivated ({count})</h3>
        <div className={styles.topButtonWrapper}>
          <button>
            Approve
            {selectedSalon.length > 0 ? (
              <span  className={styles.selLength} >{selectedSalon.length}</span>
            ) : (
              "All"
            )}
          </button>
        </div>
      </div>
      <div className={styles.Wrapper}>
        <div onClick={() => setViewBy((pre) => !pre)} className={styles.viewBy}>
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

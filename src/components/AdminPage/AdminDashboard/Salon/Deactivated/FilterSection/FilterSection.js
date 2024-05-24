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
  count,
  value,
  data,
}) => {
  const { City, selectedCity, setSelectedCity } = value;

  const handleReActiveAll = async (id) => {
    if (selectedSalon.length > 0) {
      try {
        const Data = {
          salonId: [id],
        };
        const headers = {};

        const { data } = await axiosInstance.post("", headers, Data);

        if (data) {
          toast.success("Salons reactivated successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error?.message : "Error");
      }
    } else if (selectedSalon.length === 0) {
      try {
        const Data = {
          salonId: [id],
        };
        const headers = {};

        const { data } = await axiosInstance.post("", headers, Data);

        if (data) {
          toast.success("Salons reactivated successfully!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error ? error?.message : "Error");
      }
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

        const { data } = await axiosInstance.post("", headers, deleteData);

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
              <span style={{ marginLeft: "7px" }}>{selectedSalon.length}</span>
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
            <button onClick={handleReActiveAll}>
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

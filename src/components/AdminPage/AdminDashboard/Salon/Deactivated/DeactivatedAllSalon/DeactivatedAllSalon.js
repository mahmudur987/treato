import React, { memo, useState } from "react";
import styles from "./DeactivatedAllSalon.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../../../services/axios";
import { toast } from "react-toastify";
import { memo } from "react";

const DeactivatedAllSalon = ({
  selectedSalon,
  setSelectedSalon,
  pendingSalonData,
  viewBy,
  refetch,
}) => {
  const toggleSelectCard = (id) => {
    const isSelected = selectedSalon.includes(id);
    if (isSelected) {
      setSelectedSalon(selectedSalon.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedSalon([...selectedSalon, id]);
    }
  };

  const selectAllSalon = () => {
    if (selectedSalon.length === pendingSalonData.length) {
      return setSelectedSalon([]);
    }
    const allIds = pendingSalonData.map((salon) => salon.id);
    setSelectedSalon(allIds);
  };

  const handleReActive = async (id) => {
    try {
      const Data = {
        salon_ids: [id],
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
        toast.success("Salon activated successfully!");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(error ? error?.message : "Error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteData = {
        salonId: [id],
      };
      const headers = {};

      const { data } = await axiosInstance.post("", headers, deleteData);

      if (data) {
        toast.success("Salon deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error ? error?.message : "Error");
    }
  };

  return (
    <section className={styles.mainContainer}>
      {viewBy ? (
        <div className={styles.contents}>
          {pendingSalonData?.map((salon) => (
            <div key={salon.id} className={styles.card}>
              <figure>
                <img loading="lazy" src={salon.image} alt="" />
              </figure>
              <p className={styles.selectSalon}>
                <input
                  type="checkbox"
                  checked={selectedSalon.includes(salon.id)}
                  onChange={() => toggleSelectCard(salon.id)}
                />
              </p>
              <div className={styles.cardBottom}>
                <div className={styles.info}>
                  <h3>{salon.name} </h3>
                  <p className={styles.address}>{salon.address}</p>
                  <p className={styles.date}>Applied on {salon.date}</p>
                </div>
                <div className={styles.cardAction}>
                  <button
                    className={styles.approve}
                    onClick={() => handleReActive(salon.id)}
                  >
                    Reactivated
                  </button>
                  <button
                    className={styles.reject}
                    onClick={() => handleDelete(salon.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className={styles.rightIcon}>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <td>
                  <input
                    onChange={selectAllSalon}
                    type="checkbox"
                    name=""
                    id=""
                    checked={selectedSalon.length === pendingSalonData.length}
                  />
                </td>

                <td>
                  <span>Salon</span>
                </td>
                <td>
                  <span>Owner Name</span>
                </td>
                <td>
                  <span>Address</span>
                </td>
                <td>
                  <span>Date applied</span>
                </td>
                <td>
                  <span>Action</span>
                </td>
                <td>
                  <span></span>
                </td>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {pendingSalonData.map((salon) => {
                return (
                  <tr key={salon.id}>
                    <td>
                      <input
                        checked={selectedSalon.includes(salon.id)}
                        onChange={() => toggleSelectCard(salon.id)}
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </td>
                    <td>
                      <span>{salon.name}</span>
                    </td>
                    <td>
                      <span>{salon.ownerName}</span>
                    </td>
                    <td>
                      <span>{salon.address}</span>
                    </td>
                    <td>
                      <span>{salon.date}</span>
                    </td>
                    <td>
                      <button
                        className={styles.listApproveBtn}
                        onClick={() => handleReActive(salon.id)}
                      >
                        Reactivated
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.listRejectBtn}
                        onClick={() => handleDelete(salon.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default DeactivatedAllSalon;
export const MemoizedDeactivatedAllSalon = memo(DeactivatedAllSalon);

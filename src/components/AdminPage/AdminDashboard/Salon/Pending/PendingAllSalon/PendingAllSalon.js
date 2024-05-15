import React, { useState } from "react";
import styles from "./PendingAllSalon.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PendingAllSalon = ({
  selectedSalon,
  setSelectedSalon,
  pendingSalonData,
  viewBy,
}) => {
  const toggleSelectCard = (id) => {
    const isSelected = selectedSalon.includes(id);
    if (isSelected) {
      setSelectedSalon(selectedSalon.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedSalon([...selectedSalon, id]);
    }
  };

  // Function to select all Salon
  const selectAllSalon = () => {
    if (selectedSalon.length === pendingSalonData.length) {
      return setSelectedSalon([]);
    }

    const allIds = pendingSalonData.map((salon) => salon.id);
    setSelectedSalon(allIds);
  };
  return (
    <section className={styles.mainContainer}>
      {viewBy ? (
        <div className={styles.contents}>
          {pendingSalonData?.map((salon) => (
            <div key={salon.id} className={styles.card}>
              <figure>
                <img src={salon.image} alt="" />
              </figure>
              {pendingSalonData.length > 1 && (
                <p className={styles.selectSalon}>
                  <input
                    type="checkbox"
                    checked={selectedSalon.includes(salon.id)}
                    onChange={() => toggleSelectCard(salon.id)}
                  />
                </p>
              )}
              <div className={styles.cardBottom}>
                <Link
                  to={`/admin/salon/pending/${salon.id}`}
                  className={styles.info}
                >
                  <h3>{salon.name}</h3>
                  <p className={styles.address}>{salon.address}</p>
                  <p className={styles.date}>Applied on {salon.date}</p>
                </Link>
                <div className={styles.cardAction}>
                  <button className={styles.approve}>Approve</button>
                  <button className={styles.reject}>Reject</button>
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
                      <button className={styles.listApproveBtn}>Approve</button>
                    </td>
                    <td>
                      <button className={styles.listRejectBtn}>Reject</button>
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

export default PendingAllSalon;

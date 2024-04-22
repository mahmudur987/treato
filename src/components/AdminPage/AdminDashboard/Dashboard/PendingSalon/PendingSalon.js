import React from "react";
import styles from "./PendingSalon.module.css";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
import { Link } from "react-router-dom";
const PendingSalon = () => {
  const pendingSalonData = [
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
    {
      image: img,
      name: "Getanjali Salon",
      address: "Windmills Road ,Bengaluru",
      date: "12,Mar ,2024",
    },
  ];

  return (
    <section className={styles.mainContainer}>
      <div className={styles.top}>
        <h2>Pending Salon (11)</h2>
        <Link to={"#"}>view all</Link>
      </div>

      <div className={styles.contents}>
        {pendingSalonData?.slice(0, 4).map((x, y) => (
          <div key={y} className={styles.card}>
            <figure>
              <img src={x.image} alt="" />
            </figure>

            <div className={styles.cardBottom}>
              <div className={styles.info}>
                <h3>{x.name}</h3>
                <p className={styles.address}>{x.address}</p>
                <p className={styles.date}>Applied on {x.date}</p>
              </div>
              <div className={styles.cardAction}>
                <button className={styles.approve}>Approve</button>
                <button className={styles.reject}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingSalon;

import React from "react";
import styles from "./PendingSalon.module.css";
import img from "../../../../../assets/images/SalonDetail/slide4.png";
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
  ];

  return (
    <section>
      <div>
        {pendingSalonData?.slice(0, 4).map((x, y) => (
          <div key={y}>
            <figure>
              <img src={x.image} alt="" />
            </figure>

            <div>
              <h3>{x.name}</h3>
              <p>{x.address}</p>
              <p>Applied on {x.date}</p>

              <div>
                <button>Approve</button>
                <button>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingSalon;

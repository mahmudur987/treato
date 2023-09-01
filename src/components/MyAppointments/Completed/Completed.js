import React, { useState } from "react";
import styles from "./Completed.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
const Completed = () => {
  const [toggleoptions, settoggleoptions] = useState(false);
  const salonData = [
    {
      name: "She Hair and Beauty",
      location: "Ejipura, Bengaluru",
      dateTime: "Fri, Apr 21 at 11:30 AM",
      bookedOn: "Wed, 12 Apr at 10:39 PM",
      professional: "Nayanika",
      paymentIcon: "checkCircleFill",
      paymentStatus: "Due",
      amount: "₹2,277.64",
    },
    {
      name: "Geetanjali Hair and Beauty",
      location: "Ejipura, Bengaluru",
      dateTime: "Fri, Apr 21 at 11:30 AM",
      bookedOn: "Wed, 12 Apr at 10:39 PM",
      professional: "John Doe",
      paymentIcon: "checkCircleFill",
      paymentStatus: "Amount Paid",
      amount: "₹1,177.64",
    },
  ];
  
  return (
    <div className={styles.UpcomingWrapper}>
      {salonData.map((salon,index)=>(
        <AppointmentCard salon={salon} key={index} cardType="Completed"/>
      ))}
    </div>
  );
};

export default Completed;

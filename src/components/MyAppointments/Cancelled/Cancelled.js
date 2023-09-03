import React, { useState } from "react";
import styles from "./Cancelled.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
const Cancelled = () => {
  const [toggleoptions, settoggleoptions] = useState(false);
  const salonData = [
    {
      name: "She Hair and Beauty",
      location: "Ejipura, Bengaluru",
      dateTime: "Fri, Apr 21 at 11:30 AM",
      bookedOn: "Wed, 12 Apr at 10:39 PM",
      professional: "Nayanika",
      paymentIcon: "checkCircleFill",
      paymentStatus: "Refund",
      amount: "₹2,277.64",
      onSite:false,
      services : [
        {
          quantity: 1,
          serviceName: "Hair cut girls",
          servicePeriod: "45 mins",
          servicePrice: "₹399",
          professional: "Nayanika",
        },
        // Add more objects as needed
      ],
    },
    {
      name: "Geetanjali Hair and Beauty",
      location: "Ejipura, Bengaluru",
      dateTime: "Fri, Apr 21 at 11:30 AM",
      bookedOn: "Wed, 12 Apr at 10:39 PM",
      professional: "John Doe",
      paymentIcon: "checkCircleFill",
      paymentStatus: "Refund",
      amount: "₹1,177.64",
      onSite:true,
      services : [
        {
          quantity: 1,
          serviceName: "Hair cut girls",
          servicePeriod: "45 mins",
          servicePrice: "₹399",
          professional: "Nayanika",
        },
        {
            quantity: 1,
            serviceName: "Hair cut girls",
            servicePeriod: "45 mins",
            servicePrice: "₹399",
            professional: "Nayanika",
          },
        // Add more objects as needed
      ],
    },
  ];
  
  return (
    <div className={styles.UpcomingWrapper}>
      {salonData.map((salon,index)=>(
        <AppointmentCard salon={salon} key={index} cardType="Cancelled"/>
      ))}
    </div>
  );
};

export default Cancelled;

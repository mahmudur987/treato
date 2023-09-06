import React, { useState } from "react";
import styles from "./Upcoming.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
const Upcoming = () => {
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
      onSite:true,
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
      paymentStatus: "Paid",
      amount: "₹1,177.64",
      onSite:false,
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
        <AppointmentCard salon={salon} key={index} cardType="Upcoming"/>
      ))}
    </div>
  );
};

export default Upcoming;

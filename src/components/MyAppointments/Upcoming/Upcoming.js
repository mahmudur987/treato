import React, { useEffect, useState } from "react";
import styles from "./Upcoming.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
import { getUpcomingAppointments } from "../../../services/Appointments";
import { getSingleServices } from "../../../services/Services";
const Upcoming = () => {
  const [toggleoptions, settoggleoptions] = useState(false);
  const [upcomingAppointments, setupcomingAppointments] = useState({});
  const [upcomingResult, setUpcomingResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUpcomingAppointments();
      if (res) {
        const upcomingDatas = res?.res?.data?.data;
        const uniqueObjects = new Set();

        for (const upcoming_res of upcomingDatas) {
          const e = await getSingleServices(upcoming_res.service_id);
          if (e && e.res?.data?.data) {
            const serviceResponse = e.res?.data?.data;
            const obj = { ...upcoming_res,allServices:serviceResponse };
            uniqueObjects.add(JSON.stringify(obj));
          }
        }

        const filteredUpcomingResult = Array.from(uniqueObjects).map((objString) => JSON.parse(objString));
        setUpcomingResult(filteredUpcomingResult);
      }
    };

    fetchData();
  }, []);

  console.log(upcomingResult);


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
      onSite: true,
      services: [
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
      onSite: false,
      services: [
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
      {salonData.map((salon, index) => (
        <AppointmentCard salon={salon} key={index} cardType="Upcoming" />
      ))}
    </div>
  );
};

export default Upcoming;

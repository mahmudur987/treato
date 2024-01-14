import React, { useEffect, useState } from "react";
import styles from "./Cancelled.module.css";
import AppointmentCard from "../../Cards/AppointmentCard/AppointmentCard";
import { getCancelledAppointments } from "../../../services/Appointments";
import { toast } from "react-toastify";
const Cancelled = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCancelledAppointments();
      if (res.res) {
        setData(res?.res?.data?.data);
      }
      if (res.err) {
        toast.error(res.err.message, {
          toastId: 1,
        });
      }
    };

    fetchData();
  }, []);
  // const salonData = [
  //   {
  //     name: "She Hair and Beauty",
  //     location: "Ejipura, Bengaluru",
  //     dateTime: "Fri, Apr 21 at 11:30 AM",
  //     bookedOn: "Wed, 12 Apr at 10:39 PM",
  //     professional: "Nayanika",
  //     paymentIcon: "checkCircleFill",
  //     paymentStatus: "Refund",
  //     amount: "₹2,277.64",
  //     onSite: false,
  //     services: [
  //       {
  //         quantity: 1,
  //         serviceName: "Hair cut girls",
  //         servicePeriod: "45 mins",
  //         servicePrice: "₹399",
  //         professional: "Nayanika",
  //       },
  //       // Add more objects as needed
  //     ],
  //   },
  //   {
  //     name: "Geetanjali Hair and Beauty",
  //     location: "Ejipura, Bengaluru",
  //     dateTime: "Fri, Apr 21 at 11:30 AM",
  //     bookedOn: "Wed, 12 Apr at 10:39 PM",
  //     professional: "John Doe",
  //     paymentIcon: "checkCircleFill",
  //     paymentStatus: "Refund",
  //     amount: "₹1,177.64",
  //     onSite: true,
  //     services: [
  //       {
  //         quantity: 1,
  //         serviceName: "Hair cut girls",
  //         servicePeriod: "45 mins",
  //         servicePrice: "₹399",
  //         professional: "Nayanika",
  //       },
  //       {
  //         quantity: 1,
  //         serviceName: "Hair cut girls",
  //         servicePeriod: "45 mins",
  //         servicePrice: "₹399",
  //         professional: "Nayanika",
  //       },
  //       // Add more objects as needed
  //     ],
  //   },
  // ];

  return (
    <div className={styles.CancelledWrapper}>
      {data?.map((salon, index) => (
        <AppointmentCard salon={salon} key={index} cardType="Cancelled" />
      ))}
    </div>
  );
};

export default Cancelled;

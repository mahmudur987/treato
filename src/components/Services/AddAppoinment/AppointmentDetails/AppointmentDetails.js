import React, { useEffect, useState } from "react";
import styles from "./AppointmentDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import SelectServiceModal from "../../../_modals/SelectServiceModal/SelectServiceModal";
import { singleSalon } from "../../../../utils/data";
import { useTimeSlots } from "../../../../services/Appointments";
const AppointmentDetails = () => {
  const mainCategories = singleSalon.salon.services[0].mainCategories;
  const categories = mainCategories.map((x) => x.category_name);
  const genarateSlotsData = {
    salons_id: singleSalon.salon._id,
    service_id: mainCategories.flatMap((category) =>
      category.subCategories.map((service) => service._id)
    ),
    noPreference: true,
    dateforService: "2024-02-23",
  };
  const { data: slots, isLoading, error } = useTimeSlots(genarateSlotsData);
  const times = slots?.res?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [category, setcategory] = useState(categories[0]);
  const [time, setTime] = useState(times ? times[0] : "option");
  const services = mainCategories
    .find((x) => x.category_name === category)
    .subCategories.map((x) => x.service_name);
  const [service, setservice] = useState(services[0]);

  useEffect(() => {
    setservice(services[0]);
  }, [category]);

  const allSelectedServices = mainCategories.flatMap((category) =>
    category.subCategories.filter((service) =>
      selectedServices.includes(service._id)
    )
  );
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <h3 className={styles.heding}>Appointment Details</h3>
        {/* date select */}
        <div className={styles.dateWrapper}>
          <label htmlFor="date">Date</label>
          <input type="date" name="appointment date" id="" />
        </div>
        {/*  category */}

        <div className={styles.serviceCategory}>
          <label htmlFor="">Service Category</label>

          <CustomSelect2
            options={categories}
            value={category}
            onChange={setcategory}
          />
        </div>
        {/* select service */}

        <div className={styles.selectService}>
          <label htmlFor="">Select Service </label>
          <CustomSelect2
            options={services}
            value={service}
            onChange={setservice}
          />
        </div>
        {allSelectedServices.length > 0 &&
          allSelectedServices.map((service, i) => (
            <div className={styles.selectedService}>
              <label htmlFor="">Select Service {i + 2} </label>
              <span>
                <p>{service.service_name}</p>
              </span>
            </div>
          ))}
        <p onClick={() => openModal()} className={styles.addMoreService}>
          <span>+</span>
          <span>Add more service</span>
        </p>

        {/* time */}

        <div className={styles.timeWrapper}>
          <div className={styles.selectService}>
            <label htmlFor="">Start Time </label>
            {slots && !isLoading && (
              <CustomSelect2
                options={times ? times : [error?.message]}
                value={time}
                onChange={setTime}
              />
            )}
          </div>{" "}
          <div className={styles.selectService}>
            <label htmlFor="">Duration of service</label>
            <p className={styles.durationOfService}>
              <input type="text" placeholder="1 hour" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.422 2.60727C12.6409 1.82622 11.3746 1.82622 10.5936 2.60727L10.1222 3.07867L13.422 6.37851L13.8934 5.9071C14.6745 5.12605 14.6745 3.85973 13.8934 3.07867L13.422 2.60727ZM12.4792 7.32133L9.17932 4.02149L3.11869 10.0821C2.98616 10.2147 2.89355 10.3818 2.85141 10.5644L2.16604 13.5343C2.05513 14.0149 2.48586 14.4455 2.96634 14.3346L5.93628 13.6493C6.1189 13.6071 6.286 13.5145 6.41852 13.382L12.4792 7.32133Z"
                  fill="#0D69D7"
                />
              </svg>
            </p>
          </div>
        </div>

        {/* adition al comments */}
        <div className={styles.comments}>
          <label htmlFor="comments">
            Additional comments <span>(optional)</span>
          </label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <SelectServiceModal
        mainCategories={mainCategories}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        showModal={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default AppointmentDetails;

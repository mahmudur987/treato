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
  const [selectedOption, setSelectedOption] = useState("Option 1");
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
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
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
                options={times ? times : [error.message]}
                value={time}
                onChange={setTime}
              />
            )}
          </div>{" "}
          <div className={styles.selectService}>
            <label htmlFor="">Duration of service</label>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
            />
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

import React, { useEffect, useMemo, useState } from "react";
import styles from "./AppointmentDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import SelectServiceModal from "../../../_modals/SelectServiceModal/SelectServiceModal";
import { singleSalon } from "../../../../utils/data";
import { useTimeSlots } from "../../../../services/Appointments";
import { useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import { useContext } from "react";
import { AddAppointmentContext } from "../../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";

const AppointmentDetails = () => {
  const {
    data,
    isLoading: salonLoading,
    isError: salonIsError,
    error: salonError,
  } = useSingleSalon();

  const [date, setDate] = useState("Oct 8 ,2022");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setServiceDetails } = useContext(AddAppointmentContext);
  const [serviceType, setServiceType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(
    categories.length > 0 ? categories[0] : null
  );
  const [service, setService] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [time, setTime] = useState("09:00");
  const [comments, setcomments] = useState("");
  const [duration, setduration] = useState("");
  const [prevId, setPrevId] = useState("");

  useEffect(() => {
    const salon = data?.salon;
    const data1 = salon?.services.map((service) => service.service_name);
    setServiceType(data1);
    setSelectedServiceType(data1 ? data1[0] : "");
  }, [data]);

  useEffect(() => {
    const selectedServiceData = data?.salon?.services.find(
      (service) => service.service_name === selectedServiceType
    );
    const mainCategoriesData = selectedServiceData?.mainCategories || [];
    const categoriesData = mainCategoriesData.map(
      (category) => category.category_name
    );

    setMainCategories(mainCategoriesData);
    setCategories(categoriesData);
  }, [selectedServiceType]);

  const services = mainCategories
    .find((x) => x.category_name === category)
    ?.subCategories.map((x) => x.service_name);

  const generateSlotsData = useMemo(() => {
    return {
      salons_id: data?.salon?._id || "",
      service_id: selectedServices,
      noPreference: true,
      dateforService: date,
    };
  }, [data?.salon?._id, selectedServices, date]);

  const { data: slots, isLoading, error } = useTimeSlots(generateSlotsData);
  const times = slots?.res?.data || ["09:00", "9:30", "10:00"];
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSelectService = (item) => {
    const serviceId = mainCategories
      .find((x) => x.category_name === category)
      ?.subCategories.find((x) => x.service_name === item)._id;
    setSelectedServices((prevSelectedServices) => {
      const existingprvIndex = prevSelectedServices.findIndex(
        (selectedId) => selectedId === prevId
      );
      const existingnewIndex = prevSelectedServices.findIndex(
        (selectedId) => selectedId === selectedId
      );
      if (existingprvIndex !== -1) {
        const newSelectedServices = [...prevSelectedServices].filter(
          (x) => x !== serviceId
        );
        newSelectedServices[existingprvIndex] = serviceId; // Replace the existing item with the new one
        return newSelectedServices;
      } else if (existingnewIndex !== -1) {
        const newSelectedServices = [...prevSelectedServices].filter(
          (x) => x !== serviceId
        );
        console.log(existingnewIndex);
        console.log(newSelectedServices);
        return newSelectedServices;
      } else {
        return [serviceId, ...prevSelectedServices]; // Add the new item at the beginning
      }
    });
    setService(item);
    setPrevId(serviceId);
  };
  const allSelectedServices = mainCategories.flatMap((category) =>
    category?.subCategories?.filter((service) =>
      selectedServices?.includes(service._id)
    )
  );
  const extractMinutes = (timeString) => {
    return parseInt(timeString.split(" ")[0], 10);
  };

  // Sum the time_takenby_service values
  const totalMinutes = allSelectedServices?.reduce((total, item) => {
    return total + extractMinutes(item.time_takenby_service);
  }, 0);
  allSelectedServices.shift();
  const generateFinalData = useMemo(() => {
    return {
      service_id: selectedServices,
      time,
      dateforService: date,
      additionalComments: comments,
      duration,
    };
  }, [time, selectedServices, date, comments, duration]);

  useEffect(() => {
    setServiceDetails(generateFinalData);
  }, [generateFinalData]);

  // Optionally, convert totalMinutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime =
    hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;

  if (salonLoading) {
    return <LoadSpinner />;
  }
  if (salonIsError) {
    return <ErrorComponent message={salonError.message} />;
  }
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <h3 className={styles.heding}>Appointment Details</h3>
        {/* date select */}
        <div className={styles.dateWrapper}>
          <label htmlFor="date">Date</label>
          <p>
            <span>{date}</span>

            <input
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const options = {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                };
                const formattedDate = selectedDate.toLocaleDateString(
                  "en-US",
                  options
                );
                setDate(formattedDate);
              }}
              type="date"
              name="appointment date"
            />
          </p>
        </div>
        {/* servce category */}

        <div className={styles.serviceCategory}>
          <label htmlFor="">Service Category</label>

          <CustomSelect2
            options={serviceType}
            value={selectedServiceType}
            onChange={setSelectedServiceType}
          />
        </div>
        {/*  category */}

        <div className={styles.serviceCategory}>
          <label htmlFor=""> Category</label>

          <CustomSelect2
            options={categories}
            value={category ? category : "please select one"}
            onChange={setCategory}
          />
        </div>
        {/* select service */}
        {services && services?.length > 0 ? (
          <div className={styles.selectService}>
            <label htmlFor="">Select Service </label>
            <CustomSelect2
              options={services}
              value={
                selectedServices.length > 0 ? service : "please select one"
              }
              onChange={handleSelectService}
            />
          </div>
        ) : (
          <p className={styles.noservice}>
            No service available at selected category.please add a service
          </p>
        )}
        {services &&
          services.length > 0 &&
          allSelectedServices?.length > 0 &&
          allSelectedServices.slice(0, 1000).map((service, i) => (
            <div className={styles.selectedService}>
              <label htmlFor="">Select Service {i + 2} </label>
              <span>
                <p>{service.service_name}</p>
              </span>
            </div>
          ))}
        {services && services.length > 0 && (
          <p onClick={() => openModal()} className={styles.addMoreService}>
            <span>+</span>
            <span>Add/Remove more service</span>
          </p>
        )}

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
              <input
                onChange={(e) => setduration(e.target.value)}
                type="text"
                placeholder="1 hour"
                value={formattedTime ? formattedTime : "0 min"}
                disabled
              />
            </p>
          </div>
        </div>

        {/* adition al comments */}
        <div className={styles.comments}>
          <label htmlFor="comments">
            Additional comments <span>(optional)</span>
          </label>
          <textarea
            onChange={(e) => setcomments(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
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

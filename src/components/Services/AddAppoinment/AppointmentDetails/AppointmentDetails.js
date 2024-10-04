import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AppointmentDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import SelectServiceModal from "../../../_modals/SelectServiceModal/SelectServiceModal";
import { useTimeSlots } from "../../../../services/Appointments";
import { salon, useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import { useContext } from "react";
import {
  AddAppointmentContext,
  formatDate,
} from "../../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";
import NoDataDisplay from "../../../NodataToDisplay/NoDataDisplay";

const AppointmentDetails = () => {
  const {
    data,
    isLoading: salonLoading,
    isError: salonIsError,
    error: salonError,
  } = useSingleSalon();
  const dateInputRef = useRef(null);

  const [date, setDate] = useState("Oct 8 ,2022");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    setServiceDetails,
    teamMembers,
    SelectedTeamMember,
    setSelectedTeamMember,
    comments,
    isError: teamIsError,
    error: teamError,
  } = useContext(AddAppointmentContext);
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
  // const [comments, setcomments] = useState("");
  const [duration, setduration] = useState("");
  const [prevId, setPrevId] = useState("");

  const handleWrapperClick = () => {
    console.log(55);
    dateInputRef.current.showPicker();
  };
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

  useEffect(() => {
    const selectedDate = new Date(Date.now());
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-US", options);
    setDate(formattedDate);
  }, []);

  const generateSlotsData = useMemo(() => {
    if (SelectedTeamMember.name === "No preference") {
      return {
        salons_id: data?.salon?._id || "",
        service_id: selectedServices,
        noPreference: true,
        dateforService: formatDate(date),
      };
    }

    return {
      salons_id: data?.salon?._id || "",
      service_id: selectedServices,
      dateforService: formatDate(date),
      selectedStylistId: SelectedTeamMember?.id,
    };
  }, [data?.salon?._id, selectedServices, SelectedTeamMember, date]);

  // console.log(generateSlotsData);
  const { data: slots, isLoading, error } = useTimeSlots(generateSlotsData);
  const times = slots?.res?.data || ["09:00"];
  // console.log(slots);

  useEffect(() => {
    setTime(times.length > 0 ? times[0] : "09:00");
  }, [times]);

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

  const convertToMinutes = (timeStr) => {
    const timeParts = timeStr.toLowerCase().split(" ");
    let totalMinutes = 0;

    // Handle hours
    const hourIndex = timeParts.findIndex((part) =>
      ["hour", "hours", "h"].includes(part)
    );
    if (hourIndex > 0) {
      const hours = parseInt(timeParts[hourIndex - 1]);
      totalMinutes += hours * 60;
    }

    // Handle minutes
    const minuteIndex = timeParts.findIndex((part) =>
      ["min", "mins"].includes(part)
    );
    if (minuteIndex > 0) {
      const minutes = parseInt(timeParts[minuteIndex - 1]);
      totalMinutes += minutes;
    }

    return totalMinutes;
  };

  // Sum the time_takenby_service values
  const totalMinutes = allSelectedServices?.reduce((total, item) => {
    return total + convertToMinutes(item.time_takenby_service);
  }, 0);

  allSelectedServices.shift();

  // Optionally, convert totalMinutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime =
    hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  const handleSelectTeamMember = (value) => {
    setSelectedTeamMember(value);
  };

  const generateFinalData = useMemo(() => {
    return {
      service_id: selectedServices,
      time,
      dateforService: date,
      additionalComments: comments,
      duration: formattedTime,
    };
  }, [time, selectedServices, date, comments, formattedTime]);

  useEffect(() => {
    setServiceDetails(generateFinalData);
  }, [generateFinalData, setServiceDetails]);
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
        <div className={styles.dateWrapper} onClick={handleWrapperClick}>
          <label htmlFor="date">Date</label>
          <p>
            <span>{date}</span>

            <input
              ref={dateInputRef}
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

        {/* assign professional*/}
        <h3 className={styles.heading}>Assign Professional</h3>

        <div className={styles.professional}>
          {teamMembers?.length > 0 && !teamIsError ? (
            <CustomSelect2
              options={null}
              value={SelectedTeamMember}
              onChange={handleSelectTeamMember}
              teamMembers={[
                ...teamMembers,
                {
                  name: "No preference",
                  imageUrl: "",
                },
              ]}
            />
          ) : (
            <ErrorComponent message={teamError?.message} />
          )}

          {teamMembers?.length === 0 && (
            <NoDataDisplay message={"No Team Members Available"} />
          )}
        </div>
        {/* time */}

        <div className={styles.timeWrapper}>
          <div className={styles.selectService}>
            <label htmlFor="">Start Time </label>
            {times && times?.length > 0 && !isLoading && (
              <CustomSelect2
                options={times ? times : [error?.message]}
                value={time}
                onChange={setTime}
              />
            )}
            {times?.length === 0 && (
              <div className={styles.warnning}>No slots available</div>
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

export const MemoizedAppointmentDetails = memo(AppointmentDetails);

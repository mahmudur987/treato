import React, { useEffect, useState } from "react";
import styles from "./TeamMember.module.css";
import img1 from "../../../../assets/icons/services/a-1.webp";

import { useGetTemMembers, useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGetAllTeamMembers, useGetSlots } from "../../../../services/Team";

const TeamMembers = ({ mobile, currentStep, setTeamMember, setdays }) => {
  return (
    <section className={styles.mainContainer}>
      {currentStep === 2 && mobile && (
        <CheckBoxComponent setTeamMember={setTeamMember} />
      )}
      {!mobile && <CheckBoxComponent setTeamMember={setTeamMember} />}

      {currentStep === 3 && mobile && <SchedulingCheckBox setdays={setdays} />}
      {!mobile && <SchedulingCheckBox setdays={setdays} />}
    </section>
  );
};

const CheckBoxComponent = ({ setTeamMember }) => {
  const location = useLocation();
  const { pathname } = location;
  const queryParams = new URLSearchParams(location.search);
  const subcategory_id = queryParams.get("subcategory");
  const { data, isLoading, isError, error } = useSingleSalon();
  const allPeople = data.salon
    ? data?.salon?.stylists?.map((x) => {
        return {
          name: x.stylist_name,
          avatar: x.stylist_Img.public_url,
          id: x._id,
          servicesIds: x.services,
        };
      })
    : [{ name: "Person 1", avatar: img1, id: "25" }];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(() => {
    const alredySelected = allPeople.find((people) =>
      people.servicesIds.includes(subcategory_id)
    );
    return alredySelected ? [alredySelected] : [];
  });
  const [filterValue, setFilterValue] = useState("");

  const filteredPeople = allPeople.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleCheckboxChange = (person) => {
    const isSelected = selectedCheckboxes.some(
      (selectedPerson) => selectedPerson.id === person.id
    );

    let updatedCheckboxes;

    if (isSelected) {
      updatedCheckboxes = selectedCheckboxes.filter(
        (selectedPerson) => selectedPerson.id !== person.id
      );
    } else {
      updatedCheckboxes = [...selectedCheckboxes, person];
    }

    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleSelectAll = () => {
    if (selectedCheckboxes.length === filteredPeople.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(filteredPeople);
    }
  };

  useEffect(() => {
    setTeamMember(selectedCheckboxes);
  }, [selectedCheckboxes]);
  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return toast.error(error.message, { toastId: 1 });
  }

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.sectionHeading}>
        <h3>Assign Team Members</h3>
        <p>Select professionals who provide this service</p>
      </div>
      <form className={styles.CheckBoxForm}>
        {filteredPeople.length > 2 && (
          <label className={styles.topLabel}>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedCheckboxes.length === filteredPeople.length}
            />
            <span>Select All</span>
          </label>
        )}
        {pathname !== "/partner/dashboard/service/editservice" && (
          <input
            type="text"
            placeholder="Filter by name"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
        <div className={styles.peoples}>
          {filteredPeople.map((person) => (
            <label key={person.name} className={styles.people}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(person)}
                checked={selectedCheckboxes.some(
                  (selectedPerson) => selectedPerson.id === person.id
                )}
              />

              <p>
                <img loading="lazy" src={person.avatar ?? img1} alt="" />
                <span>{person.name}</span>
              </p>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

const SchedulingCheckBox = ({ setdays }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("09:00");
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { data } = useGetSlots();
  const slots = data?.slotsPerDay[0].slots;
  const handleDayClick = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
  };

  const handleSelectAll = () => {
    if (selectedDays.length === allDays.length) {
      return setSelectedDays([]);
    } else setSelectedDays(allDays);
  };
  useEffect(() => {
    const data = {
      days: selectedDays,
      startTime,
      closeTime,
    };

    setdays(data);
  }, [selectedDays, startTime, closeTime]);
  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.scheHeading}>
        <h2>Scheduling</h2>
        <p>Select days and time during which the service is available</p>
      </div>

      <form className={styles.CheckBoxForm}>
        <label className={styles.topLabel}>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedDays.length === allDays.length}
          />
          <span>Available every day during store open timings</span>
        </label>
        <div className={styles.days}>
          {allDays.map((day) => (
            <div
              className={`${styles.date} `}
              onClick={() => handleDayClick(day)}
              key={day}
            >
              <input type="checkbox" checked={selectedDays.includes(day)} />{" "}
              {day}
            </div>
          ))}
        </div>

        {/* Selects  */}

        <div className={styles.selectsContainer}>
          <div className={styles.content}>
            <h3>Available from (optional)</h3>
            <div className={styles.selectWrapper}>
              <select onChange={(e) => setStartTime(e.target.value)}>
                {slots &&
                  slots.map((x, i) => (
                    <option value={x} key={i}>
                      {x}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className={styles.content}>
            <h3>Till (optional)</h3>
            <div className={styles.selectWrapper}>
              <select onChange={(e) => setCloseTime(e.target.value)}>
                {slots &&
                  slots.map((x, i) => (
                    <option value={x} key={i}>
                      {x}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeamMembers;

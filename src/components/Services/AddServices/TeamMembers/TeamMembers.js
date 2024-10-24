import React, { memo, useEffect, useState } from "react";
import styles from "./TeamMember.module.css";
import img1 from "../../../../assets/icons/services/a-1.webp";
import { useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
import { useGetSlots } from "../../../../services/Team";
import { useLocation } from "react-router-dom";
import NoDataDisplay from "../../../NodataToDisplay/NoDataDisplay";

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
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const { data, isLoading, isError, error } = useSingleSalon();
  const { pathname } = useLocation();

  // console.log(pathname);

  const allPeople = data.salon
    ? data?.salon?.stylists?.map((x) => {
        return {
          name: x.stylist_name,
          avatar: x.stylist_Img.public_url,
          id: x._id,
        };
      })
    : [{ name: "Person 1", avatar: img1, id: "25" }];

  const filteredPeople = allPeople.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleCheckboxChange = (person) => {
    const isSelected = selectedCheckboxes.includes(person);

    let updatedCheckboxes;

    if (isSelected) {
      // If the person is already selected, remove them
      updatedCheckboxes = selectedCheckboxes.filter(
        (selectedPerson) => selectedPerson !== person
      );
    } else {
      // If the person is not selected, add them
      updatedCheckboxes = [...selectedCheckboxes, person];
    }

    setSelectedCheckboxes(updatedCheckboxes);
  };
  const handleSelectAll = () => {
    if (selectedCheckboxes.length === filteredPeople.length) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(filteredPeople.map((person) => person.id));
    }
    console.log(filteredPeople);
  };
  useEffect(() => {
    setTeamMember(selectedCheckboxes);
  }, [selectedCheckboxes]);
  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.sectionHeading}>
        <h3>Assign Team Members</h3>
        <p>Select professionals who provide this service</p>
      </div>

      {filteredPeople.length > 0 ? (
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
          {pathname !== "/partner/dashboard/service/addservice" && (
            <input
              type="text"
              placeholder="Search by name"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
          <div className={styles.peoples}>
            {filteredPeople.map((person) => (
              <div className={styles.stylistBox}>
                <label key={person.name} className={styles.people}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(person.id)}
                    checked={selectedCheckboxes.includes(person.id)}
                  />

                  <p>
                    <img loading="lazy" src={person.avatar ?? img1} alt="" />
                    <span>{person.name}</span>
                  </p>
                </label>
              </div>
            ))}
          </div>
        </form>
      ) : (
        <NoDataDisplay message={"Please Add A Team Member"} />
      )}
    </div>
  );
};

const SchedulingCheckBox = ({ setdays }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("08:00");
  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // const { data } = useGetSlots();
  const slots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];
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
              className={`${styles.date}`}
              onClick={() => handleDayClick(day)}
              key={day}
            >
              <input type="checkbox" checked={selectedDays.includes(day)} />{" "}
              {day}
            </div>
          ))}
        </div>

        {/* selects  */}

        <div className={styles.selectsContainer}>
          <div className={styles.content}>
            <h3>Available from (optional)</h3>
            <div className={styles.selectWrapper}>
              <select
                onChange={(e) => setStartTime(e.target.value)}
                name=""
                id=""
              >
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
              <select
                onChange={(e) => setCloseTime(e.target.value)}
                name=""
                id=""
              >
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

export const MemoizedTeamMembers = memo(TeamMembers);

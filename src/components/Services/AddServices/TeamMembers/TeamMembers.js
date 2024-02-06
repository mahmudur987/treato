import React, { useState } from "react";
import styles from "./TeamMember.module.css";
import img1 from "../../../../assets/icons/services/a-1.png";
import img2 from "../../../../assets/icons/services/a-2.png";
import img3 from "../../../../assets/icons/services/a-3.png";
import img4 from "../../../../assets/icons/services/a-4.png";
import img5 from "../../../../assets/icons/services/a-5.png";
import img6 from "../../../../assets/icons/services/a-6.png";
import img7 from "../../../../assets/icons/services/a-7.png";

const CheckBoxComponent = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const allPeople = [
    { name: "Person 1", avatar: img1 },
    { name: "Person 2", avatar: img2 },
    { name: "Person 3", avatar: img3 },
    { name: "Person 4", avatar: img4 },
    { name: "Person 5", avatar: img5 },
    { name: "Person 6", avatar: img6 },
    { name: "Person 7", avatar: img7 },
  ];

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
      setSelectedCheckboxes(filteredPeople.map((person) => person.name));
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.sectionHeading}>
        <h3>Assign Team Members</h3>
        <p>Select professionals who provide this service</p>
      </div>
      <form className={styles.CheckBoxForm}>
        <label className={styles.topLabel}>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedCheckboxes.length === filteredPeople.length}
          />
          <span>Select All</span>
        </label>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <div className={styles.peoples}>
          {filteredPeople.map((person) => (
            <label key={person.name} className={styles.people}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(person.name)}
                checked={selectedCheckboxes.includes(person.name)}
              />

              <p>
                <img src={person.avatar ?? img1} alt="" />
                <span>{person.name}</span>
              </p>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

const SchedulingCheckBox = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
              className={`${styles.date} ${
                selectedDays.includes(day) ? styles.selectedDay : ""
              }`}
              onClick={() => handleDayClick(day)}
              key={day}
            >
              {day}
            </div>
          ))}
        </div>

        {/* slescts  */}

        <div className={styles.selectsContainer}>
          <div className={styles.content}>
            <h3>Available from (optional)</h3>
            <div className={styles.selectWrapper}>
              <select name="" id="">
                <option value="30minn">09:00 AM</option>
                <option value="30minn">08:00 AM</option>
                <option value="30minn">07:00 AM</option>
              </select>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.content}>
            <h3>Till (optional)</h3>
            <div className={styles.selectWrapper}>
              <select name="" id="">
                <option value="30minn">30 min</option>
                <option value="30minn">40 min</option>
                <option value="30minn">50 min</option>
              </select>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const TeamMembers = ({ mobile, currentStep }) => {
  return (
    <section className={styles.mainContainer}>
      {currentStep === 2 && mobile && <CheckBoxComponent />}
      {!mobile && <CheckBoxComponent />}

      {currentStep === 3 && mobile && <SchedulingCheckBox />}
      {!mobile && <SchedulingCheckBox />}
    </section>
  );
};

export default TeamMembers;

// CheckBoxComponent.jsx

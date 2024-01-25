import React, { useState } from "react";
import styles from "./TeamMember.module.css";

const CheckBoxComponent = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const allPeople = [
    "Person 1",
    "Person 2",
    "Person 3",
    "Person 4",
    "Person 5",
    "Person 6",
    "Person 7",
  ];

  const handleCheckboxChange = (person) => {
    const updatedCheckboxes = selectedCheckboxes.includes(person)
      ? selectedCheckboxes.filter((selectedPerson) => selectedPerson !== person)
      : [...selectedCheckboxes, person];

    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleSelectAll = () => {
    setSelectedCheckboxes(allPeople);
  };

  const handleDeselectAll = () => {
    setSelectedCheckboxes([]);
  };

  return (
    <div className={styles.checkboxContainer}>
      <form>
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedCheckboxes.length === allPeople.length}
          />
          Select All
        </label>
        {allPeople.map((person) => (
          <label key={person}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(person)}
              checked={selectedCheckboxes.includes(person)}
            />
            {person}
          </label>
        ))}
        <button type="button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </form>
    </div>
  );
};

const TeamMembers = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.sectionHeading}>
        <h3>Assign Team Members</h3>
        <p>Select professionals who provide this service</p>
      </div>

      <CheckBoxComponent />
    </section>
  );
};

export default TeamMembers;

// CheckBoxComponent.jsx

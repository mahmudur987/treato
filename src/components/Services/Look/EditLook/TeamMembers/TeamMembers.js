import React, { useContext, useState } from "react";
import styles from "./TeamMembers.module.css";
import { EditLookContext } from "../../../../../pages/partnerPages/Look/EditLook/EditLook";
import { useGetAllTeamMembers } from "../../../../../services/Team";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";

const TeamMembers = () => {
  const { selectedPeople, setSelectedPeople } = useContext(EditLookContext);
  const { data, isLoading, isError, error } = useGetAllTeamMembers();
  const people = data?.data?.map((x) => {
    const data = {
      id: x._id,
      name: x?.stylist_name ?? "N/A",
      image:
        x.stylist_Img?.public_url ??
        "https://images.unsplash.com/photo-1559629819-638a8f0a4303?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
    return data;
  });
  const handleSelectAll = () => {
    if (selectedPeople.length === people.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(people.map((person) => person.id));
    }
  };

  const handleSelectPerson = (id) => {
    if (selectedPeople.includes(id)) {
      setSelectedPeople(selectedPeople.filter((personId) => personId !== id));
    } else {
      setSelectedPeople([...selectedPeople, id]);
    }
  };

  const isSelected = (id) => selectedPeople?.includes(id);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heading}>
        <h2>Assign Team Members</h2>
        <p>Select professionals who provide this service</p>
      </div>
      <div className={styles.container}>
        <div className={styles.selectAll}>
          <input
            type="checkbox"
            id={`person`}
            checked={selectedPeople?.length === people?.length}
            onChange={() => handleSelectAll()}
            className={styles.checkbox}
          />
          <label htmlFor={`person`} className={styles.label}>
            <span className={styles.name}>Select All</span>
          </label>
        </div>
        <div className={styles.peopleList}>
          {people &&
            people?.length > 0 &&
            people?.map((person) => (
              <div key={person?.id} className={styles.person}>
                <input
                  type="checkbox"
                  id={`person-${person?.id}`}
                  checked={isSelected(person?.id)}
                  onChange={() => handleSelectPerson(person?.id)}
                  className={styles.checkbox}
                />
                <label
                  htmlFor={`person-${person?.id}`}
                  className={styles.label}
                >
                  <img
                    src={person?.image}
                    alt={person?.name}
                    className={styles.image}
                  />
                  <span className={styles.name}>{person?.name}</span>
                </label>
              </div>
            ))}
          {people?.length === 0 && (
            <NoDataDisplay message={"No Team members available"} />
          )}
          {isLoading && <LoadSpinner />}
          {isError && (
            <ErrorComponent message={error ? error.message : "Error"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./TeamMember.module.css";
import img1 from "../../../../assets/icons/services/a-1.webp";

import {
  salon,
  useGetTemMembers,
  useSingleSalon,
} from "../../../../services/salon";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGetAllTeamMembers, useGetSlots } from "../../../../services/Team";
import NoDataDisplay from "../../../NodataToDisplay/NoDataDisplay";

const TeamMembers = ({ mobile, currentStep, setTeamMember, setdays }) => {
  return (
    <section className={styles.mainContainer}>
      {currentStep === 2 && mobile && (
        <CheckBoxComponent setTeamMember={setTeamMember} />
      )}
      {!mobile && <CheckBoxComponent setTeamMember={setTeamMember} />}

      {/* {currentStep === 3 && mobile && <SchedulingCheckBox setdays={setdays} />}
      {!mobile && <SchedulingCheckBox setdays={setdays} />} */}
    </section>
  );
};

const CheckBoxComponent = ({ setTeamMember }) => {
  const location = useLocation();
  const { pathname } = location;
  const queryParams = new URLSearchParams(location.search);
  const subcategory_id = queryParams.get("subcategory");

  const { data, isLoading, isError, error } = useSingleSalon();

  // Memoizing the `allPeople` array to avoid recalculations on every render
  const allPeople = useMemo(() => {
    return (
      data?.salon?.stylists?.map((x) => ({
        name: x.stylist_name,
        avatar: x.stylist_Img.public_url,
        id: x._id,
        servicesIds: x.services,
      })) || []
    );
  }, [data]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  // Memoizing the alreadySelected array
  const alreadySelected = useMemo(() => {
    return allPeople.filter((people) =>
      people.servicesIds.includes(subcategory_id)
    );
  }, [allPeople, subcategory_id]);

  useEffect(() => {
    if (alreadySelected.length > 0) {
      setSelectedCheckboxes(alreadySelected);
    }
  }, [alreadySelected]);

  // Memoizing the filteredPeople array
  const filteredPeople = useMemo(() => {
    return allPeople.filter((person) =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [allPeople, filterValue]);

  // Using useCallback to memoize event handlers
  const handleCheckboxChange = useCallback((person) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const isSelected = prevSelectedCheckboxes.some(
        (selectedPerson) => selectedPerson.id === person.id
      );

      if (isSelected) {
        return prevSelectedCheckboxes.filter(
          (selectedPerson) => selectedPerson.id !== person.id
        );
      } else {
        return [...prevSelectedCheckboxes, person];
      }
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.length === filteredPeople.length) {
        return [];
      } else {
        return filteredPeople;
      }
    });
  }, [filteredPeople]);

  useEffect(() => {
    setTeamMember(selectedCheckboxes);
  }, [selectedCheckboxes, setTeamMember]);

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.sectionHeading}>
        <h3>Assign Team Members</h3>
        <p>Select professionals who provide this service</p>
      </div>
      {data && !isLoading && !isError && filteredPeople?.length > 0 && (
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
      )}
      {data && !isLoading && !isError && filteredPeople?.length === 0 && (
        <NoDataDisplay />
      )}

      {isLoading && <LoadSpinner />}
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
export const MemoizedTeamMembers = memo(TeamMembers);

import { useEffect, useState, useRef, memo } from "react";
import styles from "./SalonMain.module.css";
import SalonReview from "../SalonReview/SalonReview";
import SalonTeam from "../SalonTeam/SalonTeam";
import SalonOffers from "../SalonOffers/SalonOffers";
import SalonMap from "../SalonMap/SalonMap";
import SalonServiceMain from "../SalonServiceMain/SalonServiceMain";
import {
  useGetAllSalonOffer,
  useGetAllSalonReview,
} from "../../../services/Appointments";
import { useParams } from "react-router-dom";
import NoDataDisplay from "../../NodataToDisplay/NoDataDisplay";

export default function SalonServices({
  SalonData,
  addServices,
  addedServices,
}) {
  let { id } = useParams();
  const { data, isLoading, isError } = useGetAllSalonOffer();

  const {
    data: reviews,
    isLoading: reviewsIsLoading,
    isError: reviewsIswError,
  } = useGetAllSalonReview(id);

  const [activeSalon, updateActiveSalon] = useState(1);

  const [groupedTimings, setGroupedTimings] = useState([]);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const offersRef = useRef(null);
  const teamRef = useRef(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    const workingHours = SalonData?.working_hours;
    const groupConsecutiveDays = (workingHours) => {
      if (!workingHours || workingHours.length === 0) {
        return []; // Return an empty array if no timings are provided
      }

      const daysOrder = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // Sort timings based on the day order
      const sortedTimings = workingHours.sort(
        (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
      );

      if (sortedTimings.length === 0) {
        return []; // Safeguard in case sortedTimings is empty
      }

      const grouped = [];
      let currentGroup = {
        days: [sortedTimings[0].day],
        opening_time: sortedTimings[0].opening_time,
        closing_time: sortedTimings[0].closing_time,
      };

      for (let i = 1; i < sortedTimings.length; i++) {
        const current = sortedTimings[i];
        const previousDayIndex = daysOrder.indexOf(sortedTimings[i - 1].day);
        const currentDayIndex = daysOrder.indexOf(current.day);

        // Check if timings are the same and days are consecutive
        if (
          current.opening_time === currentGroup.opening_time &&
          current.closing_time === currentGroup.closing_time &&
          currentDayIndex === previousDayIndex + 1
        ) {
          currentGroup.days.push(current.day);
        } else {
          grouped.push(currentGroup);
          currentGroup = {
            days: [current.day],
            opening_time: current.opening_time,
            closing_time: current.closing_time,
          };
        }
      }

      grouped.push(currentGroup); // Push the last group
      return grouped;
    };

    const result = groupConsecutiveDays(workingHours);
    setGroupedTimings(result);
  }, [SalonData]);

  const handleScrollToSection = (ref, index) => {
    updateActiveSalon(index);
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = ref.current.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <li
            className={activeSalon === 1 ? styles.active_salon_option : ""}
            onClick={() => handleScrollToSection(servicesRef, 1)}
          >
            Services
          </li>
          <li
            className={activeSalon === 2 ? styles.active_salon_option : ""}
            onClick={() => handleScrollToSection(aboutRef, 2)}
          >
            About
          </li>
          <li
            className={activeSalon === 3 ? styles.active_salon_option : ""}
            onClick={() => handleScrollToSection(offersRef, 3)}
          >
            Offers & Benefits
          </li>
          <li
            className={activeSalon === 4 ? styles.active_salon_option : ""}
            onClick={() => handleScrollToSection(teamRef, 4)}
          >
            Team
          </li>
          <li
            className={activeSalon === 5 ? styles.active_salon_option : ""}
            onClick={() => handleScrollToSection(reviewRef, 5)}
          >
            Reviews
          </li>
        </ul>
      </div>

      <div ref={servicesRef}>
        {SalonData?.services.length > 0 &&
          SalonData.services.map((x, y) => {
            if (x.mainCategories.length > 0) {
              return (
                <SalonServiceMain
                  key={y}
                  data={x}
                  addServices={addServices}
                  addedServices={addedServices}
                />
              );
            }
            return null;
          })}
      </div>

      <div id="about" ref={aboutRef} className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>About</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_aboutA}>
              {SalonData?.salons_description}
            </div>
            <div className={styles.salon_aboutB}>
              <div className={styles.salon_aboutBA}>Store timings</div>
              {groupedTimings?.length > 0 && (
                <div
                  className={`${styles.salon_aboutBC} ${styles.salonTimings}`}
                >
                  <>
                    {groupedTimings.map((group, index) => (
                      <p key={index}>
                        {group.days.length > 1
                          ? `${group?.days[0]} - ${
                              group?.days[group.days.length - 1]
                            }`
                          : group?.days[0]}{" "}
                        : {group?.opening_time} - {group?.closing_time}
                      </p>
                    ))}
                  </>
                </div>
              )}
            </div>
            <div className={styles.salon_aboutC}>
              <div className={styles.salon_aboutBA}>Location</div>
              <div className={styles.salon_aboutBB}>
                {SalonData?.salons_address}
              </div>
              <div className={styles.salon_aboutBC}>
                <SalonMap SalonData={SalonData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {data && !isLoading && !isError && data?.data?.length > 0 && (
        <div id="offers" ref={offersRef} className={styles.salon_sections}>
          <div>
            <span className={styles.salon_section_title}>
              Offers & Benefits
            </span>
            <div className={styles.salon_section_main}>
              <div className={styles.salon_offersA}>
                {data &&
                  !isLoading &&
                  !isError &&
                  data?.data?.map((v, i) => (
                    <SalonOffers offerData={v} key={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="team" ref={teamRef} className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Meet the team</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_teamA}>
              {SalonData?.stylists?.map((v, i) => (
                <SalonTeam stylistData={v} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="review" ref={reviewRef} className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Reviews</span>
          <div className={styles.salon_section_main}>
            {reviews &&
              !reviewsIsLoading &&
              !reviewsIswError &&
              reviews?.data?.length > 0 &&
              reviews?.data
                ?.sort((a, b) => new Date(b.created) - new Date(a.created))
                ?.map((v, i) => <SalonReview reviewData={v} key={i} />)}

            {reviews &&
              !reviewsIsLoading &&
              reviewsIswError &&
              reviews?.data?.length === 0 && (
                <NoDataDisplay message={"No Review"} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizeSalonMain = memo(SalonServiceMain);

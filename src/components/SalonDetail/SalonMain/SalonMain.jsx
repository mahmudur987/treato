import { useEffect, useState, useRef, memo } from "react";
import styles from "./SalonMain.module.css";
import SalonReview from "../SalonReview/SalonReview";
import SalonTeam from "../SalonTeam/SalonTeam";
import SalonOffers from "../SalonOffers/SalonOffers";
import SalonMap from "../SalonMap/SalonMap";
import SalonServiceMain from "../SalonServiceMain/SalonServiceMain";

export default function SalonServices({
  SalonData,
  addServices,
  addedServices,
}) {
  const [activeSalon, updateActiveSalon] = useState(1);
  const [sameTimingDays, setSameTimingDays] = useState(null);
  const [difTimingDays, setDifTimingDays] = useState(null);

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const offersRef = useRef(null);
  const teamRef = useRef(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    const workingHours = SalonData?.working_hours;

    const SameTimingDays = [];
    const difTimingDays = [];
    workingHours?.forEach((e, i) => {
      if (
        i === 0 ||
        (e.opening_time ===
          SameTimingDays[SameTimingDays.length - 1]?.opening_time &&
          e.closing_time ===
            SameTimingDays[SameTimingDays.length - 1]?.closing_time)
      ) {
        SameTimingDays.push({ ...e, i });
      } else {
        difTimingDays.push({ ...e, i });
      }
    });

    setSameTimingDays(SameTimingDays);
    setDifTimingDays(difTimingDays);
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
              {sameTimingDays?.length && (
                <div
                  className={`${styles.salon_aboutBC} ${styles.salonTimings}`}
                >
                  <span>
                    {sameTimingDays[0]?.day} -{" "}
                    {sameTimingDays[sameTimingDays?.length - 1].day}
                  </span>{" "}
                  : {sameTimingDays[0].opening_time} -{" "}
                  {sameTimingDays[0].closing_time}
                </div>
              )}
              {difTimingDays?.length > 0 &&
                difTimingDays.map((v, i) => (
                  <div
                    className={`${styles.salon_aboutBC} ${styles.salonTimings}`}
                    key={i}
                  >
                    <span>{v.day}</span> : {v.opening_time} - {v.closing_time}
                  </div>
                ))}
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
      <div id="offers" ref={offersRef} className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Offers & Benefits</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_offersA}>
              {SalonData?.salon_offers?.map((v, i) => (
                <SalonOffers offerData={v} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
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
            {SalonData?.reviews?.map((v, i) => (
              <SalonReview reviewData={v} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizeSalonMain = memo(SalonServiceMain);

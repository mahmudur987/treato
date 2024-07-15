import { useEffect, useState } from "react";
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
  let [activeSalon, updateActiveSalon] = useState(1);
  const [sameTimingDays, setSameTimingDays] = useState(null);
  const [difTimingDays, setDifTimingDays] = useState(null);
  useEffect(() => {
    let workingHours = SalonData?.working_hours;

    let SameTimingDays = [];
    let difTimingDays = [];
    let cal = workingHours?.map((e, i) => {
      if (i === 0) {
        SameTimingDays.push({ ...e, i });
        return;
      }
      if (
        e?.opening_time ===
          SameTimingDays[SameTimingDays?.length - 1]?.opening_time &&
        e?.closing_time ===
          SameTimingDays[SameTimingDays?.length - 1]?.closing_time
      ) {
        SameTimingDays.push({ ...e, i });
      } else {
        difTimingDays.push({ ...e, i });
      }
    });
    setSameTimingDays(SameTimingDays);
    setDifTimingDays(difTimingDays);
  }, [SalonData]);

  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <a href="#services" onClick={() => updateActiveSalon(1)}>
            <li className={activeSalon === 1 ? styles.active_salon_option : ""}>
              Services
            </li>
          </a>
          <a href="#about" onClick={() => updateActiveSalon(2)}>
            <li className={activeSalon === 2 ? styles.active_salon_option : ""}>
              About
            </li>
          </a>
          <a href="#offers" onClick={() => updateActiveSalon(3)}>
            <li className={activeSalon === 3 ? styles.active_salon_option : ""}>
              Offers & Benefits
            </li>
          </a>
          <a href="#team" onClick={() => updateActiveSalon(4)}>
            <li className={activeSalon === 4 ? styles.active_salon_option : ""}>
              Team
            </li>
          </a>
          <a href="#review" onClick={() => updateActiveSalon(5)}>
            <li className={activeSalon === 5 ? styles.active_salon_option : ""}>
              Reviews
            </li>
          </a>
        </ul>
      </div>

      {SalonData?.services.length > 0 &&
        SalonData?.services?.map((x, y) => {
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

      <div id="about" className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>About</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_aboutA}>
              {SalonData?.salons_description}
            </div>
            <div className={styles.salon_aboutB}>
              <div className={styles.salon_aboutBA}>Store timings</div>
              {difTimingDays?.length && (
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
              {difTimingDays?.length &&
                difTimingDays?.map((v, i) => (
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
      <div id="offers" className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Offers & Benefits</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_offersA}>
              {SalonData?.salon_offers?.map((v, i) => {
                return <SalonOffers offerData={v} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="team" className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Meet the team</span>
          <div className={styles.salon_section_main}>
            <div className={styles.salon_teamA}>
              {SalonData?.stylists?.map((v, i) => {
                return <SalonTeam stylistData={v} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="review" className={styles.salon_sections}>
        <div>
          <span className={styles.salon_section_title}>Reviews</span>
          <div className={styles.salon_section_main}>
            {SalonData?.reviews?.map((v, i) => {
              return <SalonReview reviewData={v} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

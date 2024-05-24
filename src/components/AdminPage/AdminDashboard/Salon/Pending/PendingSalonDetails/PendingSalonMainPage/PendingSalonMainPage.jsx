import { useState } from "react";
import styles from "./PendingSalonMainPage.module.css";
import SalonServiceMain from "../SalonService/SalonService";
import profileImg from "../../../../../../../assets/images/TeamDetails/ProfileImg.png";
import { useParams } from "react-router-dom";
import { useSalonDetailsServices } from "../../../../../../../services/superAdmin/Dashboard";
import LoadSpinner from "../../../../../../LoadSpinner/LoadSpinner";
import NoDataDisplay from "../../../../../../NodataToDisplay/NoDataDisplay";
import ErrorComponent from "../../../../../../ErrorComponent/ErrorComponent";
export default function PendingSalonMainPage({ addServices, addedServices }) {
  let [activeSalon, updateActiveSalon] = useState(1);

  let { id } = useParams();
  const { data, isLoading, isError, error } = useSalonDetailsServices(id);
  console.log(data?.data);
  return (
    <div className={styles.salon_main}>
      <div className={styles.salon_options}>
        <ul>
          <a onClick={() => updateActiveSalon(1)}>
            <li className={activeSalon === 1 ? styles.active_salon_option : ""}>
              Services
            </li>
          </a>
          <a onClick={() => updateActiveSalon(2)}>
            <li className={activeSalon === 2 ? styles.active_salon_option : ""}>
              About
            </li>
          </a>

          <a onClick={() => updateActiveSalon(3)}>
            <li className={activeSalon === 3 ? styles.active_salon_option : ""}>
              Team
            </li>
          </a>
        </ul>
      </div>
      <div id="services" className={styles.salon_sections}>
        <h2 className={styles.salon_section_title_wrapper}>
          <span className={styles.salon_section_title}>Services</span>
        </h2>
      </div>
      <>
        {isLoading && <LoadSpinner />}

        {data &&
          !isLoading &&
          !isError &&
          data?.data?.services.length > 0 &&
          data?.data?.services?.map((x, y) => {
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
          })}
        {data &&
          !isLoading &&
          !isError &&
          data?.data?.services.length === 0 && <NoDataDisplay />}

        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}
      </>

      <div id="about" className={styles.about}>
        <h2 className={styles.salon_section_title_wrapper}>
          <span className={styles.salon_section_title}>About</span>
        </h2>
        <p>{data?.data?.salons_description}</p>
      </div>

      <div className={styles.storeOpening}>
        {data?.data?.working_hours.map((x) => (
          <p>
            {x.day} : {x.opening_time} -{x.closing_time}
          </p>
        ))}
      </div>

      <div id="team" className={styles.about}>
        <h2 className={styles.salon_section_title_wrapper}>
          <span className={styles.salon_section_title}>Meet the team</span>
        </h2>
        <div className={styles.members}>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
          <div className={styles.member}>
            <img src={profileImg} alt="" />
            <h4>Nayanica</h4>
            <p>Hair Styling Specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

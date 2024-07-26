import { useState } from "react";
import styles from "../SalonMainPage/SalonMainPage.module.css";
import upIco from "../../../../../../assets/images/SalonDetail/chevron-up.svg";
import SalonServiceCard from "../SalonServiceCard/SalonServiceCard";
import { useEffect } from "react";

// ... (other imports)

export default function SalonServiceMain({ hideTitle, setCount, data }) {
  let [allServices, setAllServices] = useState(null);
  let [activeOption, updateActiveOption] = useState([
    { selected: true },
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
  ]);

  let activeOptFunc = (index) => {
    let allActiveOpt = [...activeOption];
    allActiveOpt.filter((v, i) =>
      index === i
        ? v.selected
          ? (v.selected = false)
          : (v.selected = true)
        : (v.selected = false)
    );
    updateActiveOption(allActiveOpt);
  };

  useEffect(() => {
    setAllServices(data?.mainCategories);
  }, [data]);

  return (
    <>
      <div
        id="services"
        className={
          hideTitle ? styles.serviceDetailClass : styles.salon_sections
        }
      >
        {hideTitle ? (
          ""
        ) : (
          <span className={styles.salon_section_title}>Services</span>
        )}
        <div
          className={
            hideTitle ? styles.serviceDetailClass : styles.salon_section_main
          }
        >
          <div className={styles.salon_service_option}>
            <ul>
              {allServices
                ? allServices?.map((v, i) => (
                    <li
                      key={i}
                      onClick={() => activeOptFunc(i)}
                      className={
                        activeOption[i]?.selected
                          ? styles.active_salon_service
                          : ""
                      }
                    >
                      {v.category_name}
                    </li>
                  ))
                : null}
            </ul>
          </div>
          {allServices
            ? allServices?.map((v, i) => (
                <div className={styles.salon_service_wrapper} key={i}>
                  <div
                    className={styles.salon_service_title}
                    onClick={() => activeOptFunc(i)}
                  >
                    <div>
                      {v?.category_name} ({v?.subCategories?.length} items)
                    </div>
                    <div>
                      <img
                        src={upIco}
                        alt="up arrow"
                        className={
                          activeOption[i]?.selected
                            ? styles.rotate_imgA
                            : styles.rotate_img
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.salon_serviceAB}>
                    <div
                      className={
                        activeOption[i]?.selected
                          ? `${styles.salon_serviceA} ${styles.showServices}`
                          : styles.salon_serviceA
                      }
                    >
                      {v?.subCategories.length
                        ? v?.subCategories.map((val, i) => (
                            <SalonServiceCard
                              salonServiceData={val}
                              key={i}
                              serviceCategory={v?.category_name}
                              salonId={data?._id}
                              setCount={setCount}
                            />
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

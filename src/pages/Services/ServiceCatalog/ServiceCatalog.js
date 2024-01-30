import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ServiceCatalog.module.css";
import CustomSelect from "../../../components/Select/CustomeSelect";
import ServicesDropDown from "../../../components/Services/ServiceCatalog/ServicesDropDown/ServicesDropDown";
import { serviceData } from "../../../utils/data";
const ServiceCatalog = () => {
  const [showAddMenu, setshowAddmenu] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Option 1");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const data = serviceData.data.find(
    (x) => x._id === "6512eb2766a528b5132f8ef0"
  );

  return (
    <main className={styles.mainContainer}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1>
            <span> Service catalog</span>
          </h1>

          <div className={styles.headerRight}>
            <div className={styles.serviceType}>
              <p>Service Type</p>
              <div className={styles.selectWrapper}>
                <CustomSelect
                  options={options}
                  value={selectedOption}
                  onChange={handleSelectChange}
                />
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
            <div className={styles.headerAction}>
              <button
                onClick={() => setshowAddmenu((pre) => !pre)}
                className={styles.submit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5V19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 12H19"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Add service</span>
              </button>
            </div>

            {showAddMenu && (
              <div className={styles.addMenu}>
                <Link to={"/service/addservice"}>Add a new Service</Link>
                <button>Add a new Category</button>
              </div>
            )}
          </div>
        </header>
        {/* details */}

        <div className={styles.content}>
          <ServicesDropDown data={data} />
        </div>
      </section>
    </main>
  );
};

export default ServiceCatalog;

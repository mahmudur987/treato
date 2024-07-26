import React, { useState } from "react";
import styles from "./TopService.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import { useQuery } from "react-query";
import axiosInstance from "../../../../services/axios";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
const TopService = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales/topServicesWithinNDays?", selectedOption],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance(
        `sales/topServicesWithinNDays?days=${Number(
          selectedOption.slice(5, 7)
        )}`,
        {
          headers,
        }
      );

      return data?.servicesWithPercentage;
    },
  });

  if (isLoading) {
    <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Top Service</h2>
          <p className={styles.selectWrapper}>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </p>
        </div>
        {data && (
          <div>
            {data?.slice(0, 5).map((item, index) => (
              <ProgressBar
                key={index}
                name={item.serviceName}
                quantity={item.count}
                progressWidth={item.percentage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopService;

const ProgressBar = ({ name, quantity, progressWidth }) => {
  // const progressWidth = (quantity / 25) * 100; // Assuming 25 is the maximum quantity

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progressWidth}%` }}
        ></div>
        <p className={styles.progressquantyty}>
          {quantity}({progressWidth}%){" "}
        </p>
      </div>
      <div className={styles.progressLabel}>{name}</div>
    </div>
  );
};

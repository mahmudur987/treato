import React from "react";
import styles from "./PageHeader.module.css";
import { useClientsReport } from "../../../../services/Report";
const ReportsPageHeader = ({ pageDetails, setPageDetails }) => {
  const headerData = ["Appointments", "Clients", "Billing & Payment"];
  const { refetch } = useClientsReport();
  const handlePrefetch = () => {
    refetch();
  };
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        {headerData.map((x) => (
          <h3
            onMouseEnter={handlePrefetch}
            style={{
              borderBottom: `${pageDetails === x ? "3px solid #0D69D7" : ""}`,
            }}
            onClick={() => setPageDetails(x)}
          >
            {x}
          </h3>
        ))}
      </div>
    </section>
  );
};

export default ReportsPageHeader;

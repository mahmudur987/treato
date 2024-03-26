import React, { useEffect, useState } from "react";
import styles from "./TeamSales.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useQuery } from "react-query";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import axiosInstance from "../../../../services/axios";

const TeamSales = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];
  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales/getStylistSalesAnalysis", selectedOption],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance(
        `sales/getStylistSalesAnalysis?days=${Number(
          selectedOption.slice(5, 7)
        )}`,
        {
          headers,
        }
      );
      const updatedStylists = data?.stylistSalesAnalysis?.map((stylist) => ({
        name: stylist.stylistName,
        color: generateRandomColor(),
        value: stylist.totalAmount,
        parcent: stylist.percentage,
      }));

      return updatedStylists;
    },
  });
  const COLORS = data?.map((x) => x.color) || [];

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
          <h2 className={styles.heading}>Team slaes breakup </h2>
          <p className={styles.selectWrapper}>
            <CustomSelect2
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
          </p>
        </div>

        <div className={styles.contents}>
          <div className={styles.chart}>
            {data && (
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={window.innerWidth < 700 ? 100 : 190}
                  cy={window.innerWidth < 700 ? 100 : 180}
                  innerRadius={window.innerWidth < 700 ? 80 : 150}
                  outerRadius={window.innerWidth < 700 ? 100 : 190}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS?.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            )}
          </div>
          <div className={styles.items}>
            {data &&
              data?.map((item, i) => (
                <div key={i} className={styles.item}>
                  <p className={styles.col1}>
                    <span style={{ backgroundColor: `${item.color}` }}></span>
                    <h3>{item.name}</h3>
                  </p>
                  <p className={styles.col2}>₹{item.value.toFixed(2)}</p>
                  <p className={styles.col3}>{item.parcent.slice(0, 5)}%</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSales;

import React, { useEffect, useState } from "react";
import styles from "./TeamSales.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const TeamSales = () => {
  const [selectedOption, setSelectedOption] = useState("last 30 days");
  const options = ["last 30 days", "last 50 days", "last 90 days"];
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={window.innerWidth < 700 ? 100 : 190}
                cy={window.innerWidth < 700 ? 100 : 150}
                innerRadius={window.innerWidth < 700 ? 80 : 150}
                outerRadius={window.innerWidth < 700 ? 100 : 190}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <p className={styles.col1}>
                <span></span>
                <h3>Naynika</h3>
              </p>
              <p className={styles.col2}>₹2.7K</p>
              <p className={styles.col3}>26%</p>
            </div>
            <div className={styles.item}>
              <p className={styles.col1}>
                <span></span>
                <h3>Naynika</h3>
              </p>
              <p className={styles.col2}>₹2.7K</p>
              <p className={styles.col3}>26%</p>
            </div>
            <div className={styles.item}>
              <p className={styles.col1}>
                <span></span>
                <h3>Naynika</h3>
              </p>
              <p className={styles.col2}>₹2.7K</p>
              <p className={styles.col3}>26%</p>
            </div>
            <div className={styles.item}>
              <p className={styles.col1}>
                <span></span>
                <h3>Naynika</h3>
              </p>
              <p className={styles.col2}>₹2.7K</p>
              <p className={styles.col3}>26%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSales;

import React from "react";
import styles from "./SalesTrand.module.css";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    uv: 590,
    pv: 800,
    cb: 9,
  },
  {
    name: "Mon",
    uv: 868,
    pv: 967,
    cb: 9,
  },
  {
    name: "Tue",
    uv: 1397,
    pv: 1098,
    cb: 9,
  },
  {
    name: "Wed",
    uv: 1480,
    pv: 1200,
    cb: 9,
  },
  {
    name: "Thu",
    uv: 1920,
    pv: 1108,
    cb: 9,
  },
  {
    name: "Fri",
    uv: 1400,
    pv: 680,
    cb: 9,
  },
  {
    name: "sat",
    uv: 1480,
    pv: 780,
    cb: 9,
  },
];

const SalesTrand = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Sales Trand</h2>
        <p>
          <span>{"<"}</span>
          {"11 Oct,2023"}- {"17 Oct,2023"}
          <span>{">"}</span>
        </p>
      </div>

      <div className={styles.rechart}>
        <ComposedChart
          width={550}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 0,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="pv" stackId="a" barSize={45} fill="gray" />
          {/* <Bar dataKey="cb" stackId="a" fill="#82ca9d" /> */}
          <Line type="monotone" dataKey="uv" stroke="blue" />
        </ComposedChart>
      </div>
    </div>
  );
};

export default SalesTrand;

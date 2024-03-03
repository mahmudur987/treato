import React, { useEffect, useState } from "react";
import styles from "./SalesTrand.module.css";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  BarChart,
  LineChart,
} from "recharts";

const data = [
  {
    name: "Sun",
    uv: 590,
    price: 800,
    cb: 5,
  },
  {
    name: "Mon",
    uv: 868,
    price: 967,
    cb: 8,
  },
  {
    name: "Tue",
    uv: 1397,
    price: 1098,
    cb: 15,
  },
  {
    name: "Wed",
    uv: 1480,
    price: 1200,
    cb: 9,
  },
  {
    name: "Thu",
    uv: 920,
    price: 1108,
    cb: 18,
  },
  {
    name: "Fri",
    uv: 1400,
    price: 680,
    cb: 7,
  },
  {
    name: "sat",
    uv: 1480,
    price: 780,
    cb: 9,
  },
];
const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};
const SalesTrand = () => {
  const [chartWidth, setChartWidth] = useState(600);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 700 ? 400 : 600;
      setChartWidth(newWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        <div className={styles.bar}>
          <BarChart
            width={chartWidth}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 55,
            }}
          >
            <XAxis dataKey="name" hide />
            <YAxis hide />

            <Bar dataKey="cb" stackId="a" barSize={45} fill="gray" unit="left">
              <LabelList dataKey={"cb"} content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </div>
        <div className={styles.line}>
          <LineChart
            width={chartWidth}
            height={420}
            data={data}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 0,
            }}
          >
            <XAxis dataKey="name" padding={{ left: 35, right: 30 }} />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              minPointSize={10}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default SalesTrand;

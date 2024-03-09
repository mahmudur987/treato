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
import { useQuery } from "react-query";
import axiosInstance from "../../../../services/axios";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";

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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance(
        `sales/getAppointmentandAmtPerDay?startDate=2024-03-03&endDate=2024-03-10`,
        {
          headers,
        }
      );

      return data?.appointmentsAndFinalAmount.map((x) => {
        return {
          name: new Date(x.date).toLocaleString("en-US", { weekday: "short" }),
          price: x.totalFinalAmount,
          cb: x.totalAppointments,
        };
      });
    },
  });

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
  if (isLoading) {
    <LoadSpinner />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <>
      {data && (
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

                <Bar
                  dataKey="cb"
                  stackId="a"
                  barSize={45}
                  fill="#6D747A"
                  unit="left"
                >
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
                  stroke="#52A2FF"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
          </div>
          <div className={styles.footer}>
            <p className={styles.footerLeft}>
              <span className={styles.salesColor}></span>
              <span>sales</span>
            </p>
            <p className={styles.footerRight}>
              <span className={styles.appointmentColor}></span>
              <span>Appoinment</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesTrand;

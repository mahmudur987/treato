import React from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./AppointmentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
const tableHeading = [
  {
    heading: "Txn ID.",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Client Name    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Service(s)",
  },
  {
    heading: "Employee",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Status ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Amount ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Type",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Invoice",
  },
];
const AppointmentsTable = () => {
  const tableData = [
    {
      txnId: "213541",
      date: "5-12-24",
      clientName: "Mahmud",
      services: "Hair cut",
      Employee: "Nayanica",
      status: "canceled",
      amount: "1.23",
      type: "offline",
    },
  ];

  return (
    <div className={sty.mainContainer}>
      <div className={sty.tableContainer}>
        <table className={sty.styledTable}>
          <thead>
            <tr>
              <td>
                <div className={sty.checkbox}>
                  <input type="checkbox" id="" />
                </div>
              </td>
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span style={{ marginLeft: "30px" }}>{item.heading}</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <img src={item.topImg} alt="" />
                      <img src={item.bottomImg} alt="" />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {tableData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>
                  <div className={sty.checkbox}>
                    <input type="checkbox" id="" />
                  </div>
                </td>
                <td>{x.txnId}</td>
                <td>{x.date}</td>
                <td>{x.clientName}</td>
                <td>{x.services}</td>
                <td>{x.Employee}</td>
                <td>{x.status}</td>
                <td>{x.amount}</td>
                <td>{x.type}</td>
                <td style={{ fontSize: "18px" }}>
                  <MdOutlineFileDownload />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;

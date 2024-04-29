import React from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./BillAndPaymentsTable.module.css";
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
    heading: "Amount",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Status ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Mode ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Paid On",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Taxes",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Comm.",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Invoice",
  },
];
const BillAndPaymentTable = () => {
  const tableData = [
    {
      txnId: "213541",
      date: "5-12-24",
      clientName: "Mahmud",
      services: "Hair cut",
      amount: "105",
      status: "canceled",
      Mode: "online",
      paidOn: "24 Dec 2023",
      tax: "34.8",
      comm: "3.8",
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
                <td>{x.amount}</td>
                <td>{x.status}</td>
                <td>{x.Mode}</td>
                <td>{x.paidOn}</td>
                <td>{x.tax}</td>
                <td>{x.comm}</td>
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

export default BillAndPaymentTable;

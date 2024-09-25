import React from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./PaymentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
const tableHeading = [
  {
    heading: "Txn ID.",
  },
  {
    heading: "Date",
  },
  {
    heading: "Client Name    ",
  },
  {
    heading: "Salon Name",
  },
  {
    heading: "Amount",
  },
  {
    heading: "Status ",
  },
  {
    heading: "Mode ",
  },

  {
    heading: "Paid On",
  },
  {
    heading: "Taxes",
  },
  {
    heading: "Comm.",
  },
];
const PaymentTable = () => {
  const tableData = [
    {
      txnId: "213541",
      date: "24 Dec,2023",
      clientName: "Mahmud",
      salon_name: "Gitanjali salon",
      amount: "₹1,199",
      status: "Paid",
      Mode: "online",
      paidOn: "24 Dec 2023",
      tax: "₹199",
      comm: "₹1",
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
                      <img loading="lazy" src={item.topImg} alt="" />
                      <img loading="lazy" src={item.bottomImg} alt="" />
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
                <td>{x.salon_name}</td>
                <td>{x.amount}</td>
                <td>{x.status}</td>
                <td>{x.Mode}</td>
                <td>{x.paidOn}</td>
                <td>{x.tax}</td>
                <td>{x.comm}</td>
                {/* <td style={{ fontSize: "18px" }}>
                  <MdOutlineFileDownload />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;

import React from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./CommissionHistoryTable.module.css";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "../../../../../../pages/AdminPages/Dashboard/AdminDashboard";
import { GoDownload } from "react-icons/go";
const tableHeading = [
  {
    heading: "Txn Id",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Client Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Salon Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Comm.Amount ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Comm. %",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Status",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Invoice  ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
];
const CommissionHistoryTable = ({ data }) => {
  const tableData = data.map((x) => {
    const data = {
      id: x._id,
      customerName: x.customer_name ?? "N/A",
      salonName: x.salon_name ?? "N/A",
      invoiceId: x.invoice ?? "N/A",
      date: formatDate(x.date) ?? x.data,
      location: x.location ?? "N/A",
      amount: x.amount ?? "N/A",
    };

    return data;
  });
  const billData = [
    {
      id: 1,
      txnId: "34545",
      date: "24 dec,2024",
      clientName: "mahmud",
      salonName: "Gitangali hair and beauty",
      commissionAmount: 600,
      commissionPercentage: "5%",
      status: "Received",
    },
  ];
  return (
    <div className={sty.mainContainer}>
      <div className={sty.tableContainer}>
        <table className={sty.styledTable}>
          <thead>
            <tr>
              <td>
                <p className={sty.bodyRow}>
                  <input type="checkbox" name="" id="" />
                </p>
              </td>
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span>{item.heading}</span>
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
              <td></td>
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {billData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>
                  <p className={sty.bodyRow}>
                    <input type="checkbox" name="" id="" />
                  </p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.txnId}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.date}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.clientName}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.salonName}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.commissionAmount}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.commissionPercentage}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.status}</p>
                </td>
                <td>
                  <p
                    className={sty.bodyRow}
                    style={{ fontSize: "20px", textAlign: "center" }}
                  >
                    <GoDownload />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionHistoryTable;

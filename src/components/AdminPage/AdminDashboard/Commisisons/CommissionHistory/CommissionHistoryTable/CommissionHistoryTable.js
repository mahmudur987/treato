import React from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./CommissionHistoryTable.module.css";
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
  const billData = data?.map((x) => {
    const { status, transaction_id, date, client_name, salon_name } = x || {};

    const data = {
      id: 1,
      txnId: transaction_id ?? "N/A",
      date: formatDate(date) ?? "N/A",
      clientName: client_name ?? "N/A",
      salonName: salon_name ?? "N/A",
      commissionAmount: 600,
      commissionPercentage: "5%",
      status: status ?? "N/A",
    };

    return data;
  });

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
                      className={sty.imageBox}
                    >
                      <img loading="lazy" src={item.topImg} alt="" />
                      <img loading="lazy" src={item.bottomImg} alt="" />
                    </div>
                  </div>
                </td>
              ))}
              <td></td>
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {billData.map((x) => (
              <tr  className={sty.tableHead} >
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
                    className={`${sty.bodyRow} ${sty.fontstyle}`}
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

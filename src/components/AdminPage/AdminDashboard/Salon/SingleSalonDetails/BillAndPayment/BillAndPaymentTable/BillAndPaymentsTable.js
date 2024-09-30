import React from "react";
import topImg from "../../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../../assets/images/TeamDetails/Vector.png";
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
const BillAndPaymentPartTable = ({ data }) => {
  const tableData = data?.map((x) => {
    const data = {
      txnId: "not in db",
      date: x.appointmentDate ?? "N/A",
      clientName: x.clientName ?? "N/A",
      services: x?.serviceData?.map((x) => x.service_name).join(" ,") ?? "N/A",
      amount: x.amount ?? "N/A",
      status: x.status ?? "N/A",
      Mode: x.paymentMode ?? "N/A",
      paidOn: x.painOn ?? "N/A",
      tax: x.tax ?? "N/A",
      comm: x.comm ?? "N/A",
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
                <div className={sty.checkbox}>
                  <input type="checkbox" id="" />
                </div>
              </td>
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span  className={sty.headingSpan} >{item.heading}</span>
                    <div
                      
                      className={sty.imageBox}
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
              <tr className={sty.tableBorder}  key={x.txnId}>
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
                <td  className={sty.tdfont}>
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

export default BillAndPaymentPartTable;

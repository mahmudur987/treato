import React from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./BillHistoryTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
const tableHeading = [
  {
    heading: "Customer Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Salon",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Invoice Id    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Location    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Amount",
    topImg: topImg,
    bottomImg: bottomImg,
  },
];
const BillHistoryTable = () => {
  const tableData = [
    {
      txnId: "surbah tripati",
      date: "5-12-24",
      clientName: "Mahmud",
      services: "Hair cut",
      amount: "Nayanica",
      status: "canceled",
    },
  ];

  return (
    <div className={sty.mainContainer}>
      <div className={sty.tableContainer}>
        <table className={sty.styledTable}>
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {tableData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
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
                  <p className={sty.bodyRow}>{x.services}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.amount}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillHistoryTable;

import React from "react";
import topImg from "../../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./BookingsPartTable.module.css";
import { BsThreeDots } from "react-icons/bs";
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
const BookingsPartTable = () => {
  const tableData = [
    {
      customerName: "Mahmud",
      salonName: "She hair and Spa",
      invoiceId: "546545",
      date: "21/5/24",
      location: "Mumbai",
      amount: "500",
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
              <td></td>
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {tableData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>
                  <p className={sty.bodyRow}>{x.customerName}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.salonName}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.invoiceId}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.date}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.location}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.amount}</p>
                </td>
                <td>
                  <p
                    className={sty.bodyRow}
                    style={{ fontSize: "20px", textAlign: "right" }}
                  >
                    <BsThreeDots />
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

export default BookingsPartTable;

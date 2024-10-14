import React from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./BillHistoryTable.module.css";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { formatDate } from "../../../../../../pages/AdminPages/Dashboard/AdminDashboard";

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
const BillHistoryTable = ({ data }) => {
  const tableData = data.map((x) => {
    const data = {
      id: x._id,
      customerName: x.customer_name ?? "N/A",
      profileImage: x?.userProfile?.public_url ?? process.env.REACT_APP_Image,
      salonName: x.salon_name ?? "N/A",
      invoiceId: x.invoice ?? "N/A",
      date: formatDate(x.date) ?? x.data,
      location: x.location ?? "N/A",
      amount: x.amount ?? "N/A",
    };

    return data;
  });

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
                    <div className={sty.xyBox}>
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
            {tableData.map((x) => (
              <tr className={sty.borderBottom}>
                <td>
                  <div className={sty.bodyRow}>
                    <p className={sty.wrapper}>
                      <figure className={sty.profile}>
                        <img
                          loading="lazy"
                          src={x?.profileImage}
                          alt="profile "
                          onError={(e) =>
                            e.target.src === process.env.REACT_APP_Image
                          }
                        />
                      </figure>

                      {x.customerName}
                    </p>
                  </div>
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
                  <p className={sty.bodyRow}>
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

export default BillHistoryTable;

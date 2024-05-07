import React from "react";
import topImg from "../../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./BookingsPartTable.module.css";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "../../../../../../../pages/AdminPages/Dashboard/AdminDashboard";
const tableHeading = [
  {
    heading: "Customer Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Services",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Amount   ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Stylist    ",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Status",
    topImg: topImg,
    bottomImg: bottomImg,
  },
];
const BookingsPartTable = ({ data }) => {
  console.log(data);

  const tableData = data?.map((x) => {
    const data = {
      customerName: x.customer_name ?? "N/A",
      customerImage: x?.customer_image[0]?.public_url,

      date: formatDate(x.appointment_date) ?? "N/A",
      serviceName:
        x?.serviceData?.map((service) => service.service_name).join("/") ??
        "N/A",
      amount: x.finale_amount ?? "N/A",
      stylist: x.stylist_name,
      status: x.booking_status,
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
              <td>
                <div className={sty.headingRow}>
                  <p
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Action</span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <img src={topImg} alt="" />
                      <img src={bottomImg} alt="" />
                    </span>
                  </p>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {tableData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>
                  <div className={sty.bodyRow}>
                    <p className={sty.profile}>
                      <img
                        className={sty.customerImage}
                        src={
                          x.customerImage
                            ? x.customerImage
                            : "https://lh3.googleusercontent.com/a/ACg8ocIfcL_LmzEgIGIfv9TfajznWdZAOu3OJf1FKMQ4d7jM=s96-c"
                        }
                        alt=""
                      />

                      {x.customerName}
                    </p>
                  </div>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.date}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.serviceName}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.amount}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.stylist}</p>
                </td>
                <td>
                  <p className={sty.bodyRow}>{x.status}</p>
                </td>
                <td>
                  <p
                    className={sty.bodyRow}
                    style={{ fontSize: "20px", textAlign: "center" }}
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

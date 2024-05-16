import React from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./AppointmentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
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
    heading: "Client Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Service(s)",
    topImg: topImg,
    bottomImg: bottomImg,
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
const AppointmentsTable = ({ data }) => {
  const tableData = data?.data?.map((x) => {
    const data = {
      txnId: x?.transactionId ?? "N/A",
      date: x?.dateforService ?? "N/A",
      clientName: x?.clientName ?? "N/A",
      services: x?.services[0] ?? "N/A",
      Employee: x?.stylist,
      status: x?.status ?? "N/A",
      amount: x?.final_amount ?? "N/A",
      type: x?.payment_mode ?? "N/A",
    };
    return data;
  });
  if (data?.data?.length === 0) {
    return <NoDataDisplay />;
  }
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
              {tableHeading?.map((item, i) => (
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
            {tableData?.map((x) => (
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

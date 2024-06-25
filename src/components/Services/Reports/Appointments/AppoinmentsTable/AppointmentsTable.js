import React, { useContext, useState } from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./AppointmentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
const tableHeading = [
  {
    heading: "Txn ID.",
  },
  {
    heading: "Date",
  },
  {
    heading: "Client Name",
  },
  {
    heading: "Service(s)",
  },
  {
    heading: "Employee",
  },
  {
    heading: "Status ",
  },
  {
    heading: "Amount ",
  },

  {
    heading: "Type",
  },

  {
    heading: "Invoice",
  },
];
const AppointmentsTable = ({ data }) => {
  const { selectedItems, setSelectedItems } = useContext(reportContext);
  const tableData = data?.data?.map((x) => {
    const data = {
      txnId: x?.transactionId ?? "N/A",
      date: x?.dateforService ?? "N/A",
      clientName: x?.clientName ?? "N/A",
      services: x?.services?.length > 0 ? x?.services[0] : "N/A",
      Employee: x?.stylist,
      status: x?.status ?? "N/A",
      amount: x?.final_amount ?? "N/A",
      type: x?.payment_mode ?? "N/A",
    };
    return data;
  });

  // Function to toggle selection of a single item
  const toggleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Function to select all items
  const selectAll = () => {
    if (selectedItems.length === tableData.length) {
      setSelectedItems([]);
    } else {
      const allIds = tableData.map((item) => item.txnId);
      setSelectedItems(allIds);
    }
  };

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
                  <input
                    onClick={() => selectAll()}
                    type="checkbox"
                    id=""
                    checked={selectedItems.length === tableData.length}
                  />
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
            {tableData.length > 0 &&
              tableData?.map((x) => (
                <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                  <td>
                    <div className={sty.checkbox}>
                      <input
                        onClick={() => toggleSelection(x.txnId)}
                        type="checkbox"
                        id=""
                        checked={selectedItems.includes(x.txnId)}
                      />
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

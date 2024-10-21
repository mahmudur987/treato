import React, { memo, useState } from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
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
    heading: "Order Amount",
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
const formatNumber = (num) =>
  !num || isNaN(num) ? "N/A" : parseFloat(num).toFixed(2);
const BillAndPaymentTable = ({ data }) => {
  // State to store selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const filteredArray = (array) => {
    const seenIds = new Set();
    return array.filter((item) => {
      if (seenIds.has(item._id)) {
        return false; // If the id is already in the set, skip it
      } else {
        seenIds.add(item._id); // If it's a new id, add it to the set
        return true; // Include the item in the filtered array
      }
    });
  };
  const uniqueObjects = filteredArray(data);
  const tableData = data
    ?.sort((a, b) => {
      return new Date(b.appointmentDate) - new Date(a.appointmentDate);
    })
    ?.map((x) => {
      const y = {
        txnId: x?._id ?? "",
        date: x?.appointmentDate ?? "N/A",
        clientName: x?.clientName ?? "",
        services:
          x?.serviceData.length > 0
            ? x?.serviceData.map((x) => x.service_name).join(", ")
            : "",
        amount: formatNumber(x?.amount),
        status: x?.status ?? "",
        Mode: x?.paymentMode ?? "",
        paidOn: x?.paidOn ?? "",
        tax: x?.tax ?? "",
        comm: x?.comm ?? "",
      };
      return y;
    });

  // Handle selecting/deselecting all rows
  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedRows(tableData.map((item) => item.txnId));
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  // Handle selecting/deselecting a single row
  const handleSelectRow = (txnId) => {
    if (selectedRows.includes(txnId)) {
      setSelectedRows(selectedRows.filter((id) => id !== txnId));
    } else {
      setSelectedRows([...selectedRows, txnId]);
    }
  };

  return (
    <>
      {data && (
        <div className={sty.mainContainer}>
          <div className={sty.tableContainer}>
            <table className={sty.styledTable}>
              <thead>
                <tr>
                  <td>
                    <div className={sty.checkbox}>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </td>
                  {tableHeading.map((item, i) => (
                    <td key={i}>
                      <div className={sty.headingRow}>
                        <span className={sty.marginSpan}>{item.heading}</span>
                        {item.topImg && (
                          <div className={sty.imageBox}>
                            <img loading="lazy" src={item.topImg} alt="" />
                            <img loading="lazy" src={item.bottomImg} alt="" />
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className={sty.tbody}>
                {tableData.map((x, i) => (
                  <tr key={i} className={sty.tableBorder}>
                    <td>
                      <div className={sty.checkbox}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(x.txnId)}
                          onChange={() => handleSelectRow(x.txnId)}
                        />
                      </div>
                    </td>
                    <td>{x.txnId}</td>
                    <td>{x.date}</td>
                    <td>{x.clientName}</td>
                    <td title={x?.services?.length > 20 && x.services}>
                      {" "}
                      {x.services.length > 20
                        ? `${x.services.slice(0, 20)} ....`
                        : x.services.slice(0, 20)}
                    </td>
                    <td>{x.amount}</td>
                    <td>{x.status}</td>
                    <td>{x.Mode}</td>
                    <td>{x.paidOn}</td>
                    <td>{x.tax}</td>
                    <td>{x.comm}</td>
                    <td className={sty.textSize}>
                      <MdOutlineFileDownload />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default BillAndPaymentTable;
export const MemoizedBillAndPaymentTable = memo(BillAndPaymentTable);

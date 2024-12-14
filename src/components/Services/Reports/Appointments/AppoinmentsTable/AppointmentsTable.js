import React, { memo, useContext, useState } from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./AppointmentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../services/axios";
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
    heading: "Service Amount ",
  },

  {
    heading: "Type",
  },

  {
    heading: "Invoice",
  },
];
const AppointmentsTable = ({ data }) => {
  const { selectedItems, setSelectedItems, AtransactionId } =
    useContext(reportContext);

  const tableData = data?.data
    ?.filter((x) => {
      if (AtransactionId) {
        return x.transactionId === AtransactionId;
      }
      return x;
    })
    ?.sort((a, b) => {
      return new Date(b.dateforService) - new Date(a.dateforService);
    })
    ?.map((x) => {
      let prices = x?.services.map((v, i) => {
        return v.price;
      });
      let totalPrice = prices.reduce((a, b) => a + b, 0);
      const data = {
        file: x?.fileurl,
        txnId: x?.transactionId ?? "N/A",
        date: x?.dateforService ?? "N/A",
        clientName: x?.clientName ?? "N/A",
        services:
          x?.services?.length > 0
            ? x?.services.map((x) => x.service_name).join(", ")
            : "N/A",
        Employee: x?.stylist,
        status: x?.status ?? "N/A",
        amount: totalPrice.toFixed(2) ?? "N/A",
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
  const handleDownLoad = async (url, fileName = "downloaded-file.pdf") => {
    try {
      if (!url) throw new Error("File URL is missing.");

      // Fetch the file data
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch the file.");

      // Convert the response into a Blob
      const blob = await response.blob();

      // Create a link element with the Blob URL
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName; // Set the filename for the downloaded file

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup

      // Show success toast
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      // Show error toast
      toast.error("An error occurred while downloading the PDF.");
      console.error("Error during download:", error);
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
                    type="checkbox"
                    id=""
                    onChange={(e) => selectAll(e.target.checked)}
                    checked={selectedItems.length === tableData.length}
                  />
                </div>
              </td>
              {tableHeading?.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span>{item.heading}</span>
                    <div className={sty.imageBox}>
                      <img loading="lazy" src={item.topImg} alt="" />
                      <img loading="lazy" src={item.bottomImg} alt="" />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {tableData.length > 0 &&
              tableData?.map((x) => (
                <tr className={sty.tableBorder}>
                  <td>
                    <div className={sty.checkbox}>
                      <input
                        onChange={(e) =>
                          toggleSelection(x.txnId, e.target.checked)
                        }
                        type="checkbox"
                        id=""
                        checked={selectedItems.includes(x.txnId)}
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
                      : x.services}
                  </td>
                  <td>{x.Employee}</td>
                  <td>{x.status}</td>
                  <td>{x.amount}</td>
                  <td>{x.type}</td>
                  <td
                    className={sty.textSize}
                    onClick={() => handleDownLoad(x.file)}
                  >
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
export const MemoizedAppointmentsTable = memo(AppointmentsTable);

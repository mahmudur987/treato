import React, { memo, useContext, useMemo } from "react";
import PropTypes from "prop-types";

import sty from "./AppointmentsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const tableData = useMemo(() => {
    if (!data?.data) return [];
    let filteredData = data.data;
    if (AtransactionId) {
      filteredData = filteredData.filter((x) =>
        x.transactionId.toLowerCase().includes(AtransactionId.toLowerCase())
      );
    }

    filteredData.sort((a, b) => {
      return new Date(b.dateforService) - new Date(a.dateforService);
    });

    return filteredData.map((x) => {
      let prices = x.services.map((v, i) => {
        return v.price;
      });
      let totalPrice = prices.reduce((a, b) => a + b, 0);
      const data = {
        file: x.fileurl,
        txnId: x.transactionId ?? "N/A",
        date: x.dateforService ?? "N/A",
        clientName: x.clientName ?? "N/A",
        services:
          x.services.length > 0
            ? x.services.map((x) => x.service_name).join(", ")
            : "N/A",
        Employee: x.stylist,
        status: x.status ?? "N/A",
        amount: totalPrice.toFixed(2) ?? "N/A",
        type: x.payment_mode ?? "N/A",
      };
      return data;
    });
  }, [data, AtransactionId]);

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
                  <td className={sty.textSize}>
                    <span
                      onClick={() => {
                        if (x.file) {
                          window.open(x.file, "_blank"); // Opens the URL in a new tab
                        } else {
                          toast.error("File Not Available");
                        }
                      }}
                    >
                      <MdOutlineFileDownload
                        style={{ cursor: "pointer", color: "#0D69D7" }}
                      />
                    </span>
                  </td>
                </tr>
              ))}

            {data?.data?.length === 0 && <NoDataDisplay />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AppointmentsTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AppointmentsTable;
export const MemoizedAppointmentsTable = memo(AppointmentsTable);

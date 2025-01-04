import React from "react";

import sty from "./PaymentsTable.module.css";

const tableHeading = [
  {
    heading: "Txn ID.",
  },
  {
    heading: "Date",
  },
  {
    heading: "Client Name    ",
  },
  {
    heading: "Salon Name",
  },
  {
    heading: "Amount",
  },
  {
    heading: "Status ",
  },
  {
    heading: "Mode ",
  },

  {
    heading: "Paid On",
  },
  {
    heading: "Taxes",
  },
  {
    heading: "Comm.",
  },
];
const PaymentTable = ({ data, selectedData, setSelectedData }) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedData(data.map((x) => x));
    } else {
      setSelectedData([]);
    }
  };

  const handleSelectSingle = (id) => {
    if (selectedData.includes(id)) {
      setSelectedData(
        selectedData.filter((x) => x?.transactionId !== id?.transactionId)
      );
    } else {
      setSelectedData([...selectedData, id]);
    }
  };
  console.log(selectedData);
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
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={selectedData.length === data.length}
                  />
                </div>
              </td>
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span className={sty.headingSpan}>{item.heading}</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
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
            {data.slice(0, 25).map((x) => {
              const {
                dateforService,
                commissionAmount,
                salonName,
                clientName,
                transactionId,
                status,
                payment_mode,
                amount,
                taxAmount,
                paidOn,
              } = x;

              return (
                <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                  <td>
                    <div className={sty.checkbox}>
                      <input
                        type="checkbox"
                        id={transactionId}
                        onChange={() => handleSelectSingle(x)}
                        checked={selectedData.includes(x)}
                      />
                    </div>
                  </td>
                  <td>{transactionId}</td>
                  <td>{dateforService}</td>
                  <td>{clientName}</td>
                  <td>{salonName}</td>
                  <td>{amount}</td>
                  <td>{status}</td>
                  <td>{payment_mode}</td>
                  <td>{paidOn}</td>
                  <td>{taxAmount}</td>
                  <td>{commissionAmount}</td>
                  {/* <td style={{ fontSize: "18px" }}>
  <MdOutlineFileDownload />
</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;

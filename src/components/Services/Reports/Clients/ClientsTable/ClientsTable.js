import React, { useContext } from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./ClientsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import NoDataDisplay from "../../../../NodataToDisplay/NoDataDisplay";
import { reportContext } from "../../../../../pages/partnerPages/Reports/Reports";
import { toast } from "react-toastify";
const tableHeading = [
  {
    heading: "Clients Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Email Address",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Gender",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date of Birth",
  },
  {
    heading: "Last Visit",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Top Service ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Life time Spend",
    topImg: topImg,
    bottomImg: bottomImg,
  },

  {
    heading: "Last Invoice",
  },
];
const ClientsTable = ({ data }) => {
  const { selectedClients, setSelectedClients } = useContext(reportContext);
  const tableData = data?.data?.map((x) => {
    const data = {
      clientName:
        x?.clientDetails?.first_name + " " + x?.clientDetails?.last_name ??
        "N/A",
      email: x?.clientDetails?.email ?? "N/A",
      gender: x?.clientDetails?.gender ?? "N/A",
      age: x?.clientDetails?.dob ?? "N/A",
      lastVisit: x?.lastVisit ?? "N/A",
      topService: x?.topService ?? "NID",
      spend: x?.totalAmount ?? "N/A",
    };
    return data;
  });
  const handleDownload = () => {
    toast.error("This features is under maintenance");
  };
  const toggleSelection = (itemId) => {
    if (selectedClients.includes(itemId)) {
      setSelectedClients(selectedClients.filter((id) => id !== itemId));
    } else {
      setSelectedClients([...selectedClients, itemId]);
    }
  };

  // Function to select all Clients
  const selectAll = () => {
    if (selectedClients.length === tableData.length) {
      setSelectedClients([]);
    } else {
      const allIds = tableData.map((item) => item.txnId);
      setSelectedClients(allIds);
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
                    onClick={() => selectAll()}
                    checked={selectedClients.length === tableData.length}
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
            {tableData?.map((x, i) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }} key={i}>
                <td>
                  <div className={sty.checkbox}>
                    <input
                      onClick={() => toggleSelection(x?.clientName)}
                      type="checkbox"
                      id=""
                      checked={selectedClients.includes(x.clientName)}
                    />
                  </div>
                </td>
                <td>{x.clientName}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
                <td>{x.age}</td>
                <td>{x.lastVisit}</td>
                <td>{x.topService}</td>
                <td>{x.spend}</td>
                <td style={{ fontSize: "18px" }} onClick={handleDownload}>
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

export default ClientsTable;

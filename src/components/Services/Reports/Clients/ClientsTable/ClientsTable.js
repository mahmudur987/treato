import React from "react";
import topImg from "../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./ClientsTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
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
    heading: "Age",
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
const ClientsTable = () => {
  const tableData = [
    {
      clientName: "Mahmud",
      email: "mahud@gmi.com",
      gender: "Male",
      age: "20 year",
      lastVisit: "20 dec 24",
      topService: "haircut",
      spend: "1.23",
    },
  ];

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
              {tableHeading.map((item, i) => (
                <td key={i}>
                  <div className={sty.headingRow}>
                    <span style={{ marginLeft: "30px" }}>{item.heading}</span>
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
            {tableData.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>
                  <div className={sty.checkbox}>
                    <input type="checkbox" id="" />
                  </div>
                </td>
                <td>{x.clientName}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
                <td>{x.age}</td>
                <td>{x.lastVisit}</td>
                <td>{x.topService}</td>
                <td>{x.spend}</td>
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

export default ClientsTable;

import React, { useEffect, useState } from "react";
import topImg from "../../../../../../assets/images/TeamDetails/Vector (1).png";
import bottomImg from "../../../../../../assets/images/TeamDetails/Vector.png";
import sty from "./SalonTable.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import Pagination from "../../../Dashboard/BillingHistory/pagination/Pagination";
const tableHeading = [
  {
    heading: "Salon",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Owner Name",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Address",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Date Joined",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Rating ",
    topImg: topImg,
    bottomImg: bottomImg,
  },
  {
    heading: "Net sales",
    topImg: topImg,
    bottomImg: bottomImg,
  },
];
const SalonTable = ({ tableData }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(5);
  const [itemPerPage, setItemPerPage] = useState(6);
  useEffect(() => {
    setCount(tableData.length);
  }, [tableData]);
  const getFilteredData = (x) => {
    const startIndex = (pageNumber - 1) * itemPerPage;
    const endIndex = startIndex + Number(itemPerPage);
    return x?.slice(startIndex, endIndex);
  };
  const SalonData = getFilteredData(tableData);

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
              <td></td>
            </tr>
          </thead>
          <tbody className={sty.tbody}>
            {SalonData?.map((x) => (
              <tr style={{ borderBottom: "1px solid #ebedf0" }}>
                <td>{x.salon_name}</td>
                <td>{x.salon_owner}</td>
                <td>{x.salon_address}</td>
                <td>{x.salon_joinDate}</td>
                <td>{x.salon_rating}</td>
                <td>{x.salon_NetSales}</td>

                <td>
                  <a
                    href="
                  "
                  >
                    view salon
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        count={count}
        itemPerPage={itemPerPage}
        setItemPerPage={setItemPerPage}
      />
    </div>
  );
};

export default SalonTable;

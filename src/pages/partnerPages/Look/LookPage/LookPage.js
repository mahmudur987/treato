import React, { useEffect, useState } from "react";
import styles from "./LookPage.module.css";
import LookCard, {
  MemoizedLookCard,
} from "../../../../components/Services/Look/LookCard/LookCard";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { Link, useNavigate } from "react-router-dom";
import { useAllForSalon, useAllLook } from "../../../../services/Look";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { useSingleSalon } from "../../../../services/salon";
import NoDataDisplay from "../../../../components/NodataToDisplay/NoDataDisplay";

const LookPage = () => {
  const navigate = useNavigate();
  const { data: looks, isLoading, isError, error } = useAllForSalon();

  const [data, setData] = useState([]);
  useEffect(() => {
    const looksData = looks?.data?.map((x) => {
      const data = {
        id: x._id,
        title: x?.name ?? "N/A",
        rating: x.rating ?? "N/A",
        image: x?.photo?.public_url ?? process.env.REACT_APP_Image,
      };
      return data;
    });

    setData(looksData);
  }, [looks]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.heading}>
        <span className={styles.icon}>
          <IoMdArrowRoundBack />
        </span>

        <h1>Looks</h1>
        <Link to={"/partner/dashboard/add-look"}>
          <button className={styles.top}>
            <span className={styles.iconColor}>
              <FaPlus />
            </span>
            <span>Add New Look</span>
          </button>
        </Link>
      </div>

      {isLoading && <LoadSpinner />}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
      <div className={styles.contents}>
        {data &&
          data.length > 0 &&
          data?.map((x, y) => <MemoizedLookCard key={y} data={x} />)}
        {looks && data?.length === 0 && <NoDataDisplay />}
      </div>
      <div
        className={styles.bottom}
        onClick={() => navigate("/partner/dashboard/add-look")}
      >
        <button className={styles.iconColor}>
          <FaPlus />
        </button>
      </div>
    </main>
  );
};

export default LookPage;

import React, { useEffect, useState } from "react";
import styles from "./LookPage.module.css";
import LookCard from "../../../../components/Services/Look/LookCard/LookCard";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { Link, useNavigate } from "react-router-dom";
import { useAllLook } from "../../../../services/Look";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { useSingleSalon } from "../../../../services/salon";
import NoDataDisplay from "../../../../components/NodataToDisplay/NoDataDisplay";

const LookPage = () => {
  const navigate = useNavigate();
  const { data: salon } = useSingleSalon();
  const { data: looks, isLoading, isError, error } = useAllLook();
  const [data, setData] = useState([]);
  useEffect(() => {
    const looksData = looks?.data
      ?.filter((x) => x.salon === salon?.salon?._id)
      ?.map((x) => {
        const data = {
          id: x._id,
          title: x?.name ?? "N/A",
          rating: x.rating ?? "N/A",
          image:
            x?.photo?.public_url ??
            "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        };
        return data;
      });

    setData(looksData);
  }, [salon, looks]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.heading}>
        <span className={styles.icon}>
          <IoMdArrowRoundBack />
        </span>

        <h1>Looks</h1>
        <Link to={"/partner/dashboard/add-look"}>
          <button className={styles.top}>
            <span style={{ color: "white" }}>
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
          data?.map((x, y) => <LookCard key={y} data={x} />)}
        {looks && data.length === 0 && <NoDataDisplay />}
      </div>
      <div
        className={styles.bottom}
        onClick={() => navigate("/partner/dashboard/add-look")}
      >
        <button style={{ color: "white" }}>
          <FaPlus />
        </button>
      </div>
    </main>
  );
};

export default LookPage;

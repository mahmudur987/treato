import React from "react";
import styles from "./LookPage.module.css";
import LookCard from "../../../../components/Services/Look/LookCard/LookCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAllLook } from "../../../../services/Look";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
const dataS = [
  {
    id: 1,
    title: "red,green,yellow,red,green,yellow,",
    rating: "4",
    image:
      "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    title: "red,green,yellow",
    rating: "4",
    image:
      "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    title: "red,green,yellow",
    rating: "4",
    image:
      "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    title: "red,green,yellow",
    rating: "4",
    image:
      "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    title: "red,green,yellow",
    rating: "4",
    image:
      "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const LookPage = () => {
  const navigate = useNavigate();
  const { data: looks, isLoading, isError, error } = useAllLook();
  const data = looks?.data?.map((x) => {
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
        {data && data?.map((x, y) => <LookCard key={y} data={x} />)}
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

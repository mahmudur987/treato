import React, { useEffect } from "react";
import AddNewReview from "./AddNewReview/AddNewReview";
import SingleReview from "./SingleReview/SingleReview";
import styles from "./ReviewsPart.module.css";
import { useSalonReviews } from "../../../../../../services/superAdmin/Dashboard";
import { useParams } from "react-router-dom";
import LoadSpinner from "../../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../../../NodataToDisplay/NoDataDisplay";
import { useDispatch } from "react-redux";
import { updateAdminPage } from "../../../../../../redux/slices/AdminSlice";

const ReviewsPart = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSalonReviews(id);
  const reviewData = data?.data?.map((x) => {
    const data = {
      name: x.name ?? "N/A",
      profile_Img: "",
      rating: x.rating ?? "N/A",
      description: x.comment ?? "N/A",
      date: x.time ?? "N/A",
    };
    return data;
  });
  useEffect(() => {
    dispatch(updateAdminPage());
  }, [data]);
  return (
    <section className={styles.mainContainer}>
      <AddNewReview />
      {/* reviews */}

      {isLoading && <LoadSpinner />}

      {data && !isLoading && !isError && data?.data.length > 0 && (
        <div className={styles.container}>
          <h3>Reviews</h3>
          <div className={styles.reviews}>
            {reviewData.map((x, i) => (
              <SingleReview key={i} data={x} />
            ))}
          </div>
        </div>
      )}
      {data && !isLoading && !isError && data?.data?.length === 0 && (
        <NoDataDisplay message={"No Reviews"} />
      )}
      {isError && <ErrorComponent message={error ? error.message : "Error"} />}
    </section>
  );
};

export default ReviewsPart;

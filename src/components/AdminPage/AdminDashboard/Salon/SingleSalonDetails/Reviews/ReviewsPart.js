import React from "react";
import AddNewReview from "./AddNewReview/AddNewReview";
import SingleReview from "./SingleReview/SingleReview";
import styles from "./ReviewsPart.module.css";
const reviewData = [
  {
    name: "John Doe",
    rating: 4,
    description:
      "Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.Great experience! Would definitely recommend.",
    date: "2024-04-28",
  },
  {
    name: "Jane Smith",
    rating: 3,
    description: "Good service but could be improved.",
    date: "2024-04-30",
  },
  {
    name: "Alice Johnson",
    rating: 5,
    description: "Absolutely fantastic! Will come back again.",
    date: "2024-05-01",
  },
];

const ReviewsPart = () => {
  return (
    <section className={styles.mainContainer}>
      <AddNewReview />
      {/* reviews */}
      <div className={styles.container}>
        <h3>Reviews</h3>

        <div className={styles.reviews}>
          {reviewData.map((x, i) => (
            <SingleReview key={i} data={x} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsPart;

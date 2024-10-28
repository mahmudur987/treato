import styles from "../SalonMain/SalonMain.module.css";
import SalonStar from "../SalonStar/SalonStar";
import pp2 from "../../../assets/images/SalonDetail/profilepic2.webp";
import { useEffect, useState } from "react";

export default function SalonReview({ reviewData }) {
  let starData = [1, 2, 3, 4, 5];
  const [timeAgoText, setTimeAgoText] = useState("");
  // Function to calculate the time ago
  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };
  useEffect(() => {
    const updateTimeAgo = () => setTimeAgoText(timeAgo(reviewData?.created));
    updateTimeAgo(); // Update immediately on mount
    const intervalId = setInterval(updateTimeAgo, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className={styles.salon_reviewsA}>
      <div className={styles.salon_reviewsAA}>
        <div className={styles.salon_reviewsAAA}>
          <img
            loading="lazy"
            src={reviewData.user_id?.avatar?.public_url ?? pp2}
            alt=""
          />
        </div>
        <div className={styles.salon_reviewsAAB}>
          <div>
            {reviewData.user_id?.first_name +
              "  " +
              reviewData.user_id?.last_name}
          </div>
          <div>{timeAgoText}</div>
        </div>
      </div>
      <div className={styles.salon_reviewsAB}>
        <div>
          {Math.ceil(reviewData.rating) === reviewData.rating
            ? reviewData.rating + ".0"
            : reviewData.rating}
        </div>
        <div>
          {starData.map((v, i) => {
            if (i < reviewData?.service_rate["$numberDecimal"]) {
              return <SalonStar fill="#08090A" key={i} />;
            } else {
              return <SalonStar fill="#EAEFF2" key={i} />;
            }
          })}
        </div>
      </div>
      <div className={styles.salon_reviewsAC}>{reviewData.description}</div>
    </div>
  );
}
// {
//     "user": "661659a4b3525694b6b030cd",
//     "name": "treato undefined",
//     "comment": "She Hair & Beauty is a luxurious hair spa nestled in the heart of Ejipura, Bengaluru. Step into a haven of relaxation and rejuvenation, where expert stylists and therapists pamper you with personalized treatments, from haircare to beauty services. Experience the perfect blend of modern techniques and traditional remedies at She Hair & Beauty",
//     "rating": 5,
//     "created_at": "2024-05-10T10:14:31.862Z",
//     "_id": "663df3874664757b81d0daf5"
// }

import React from "react";
import styles from "./NoSubscription.module.css";
import check from "../../../assets/images/partner/check.png";
import { useGetAlSubscription } from "../../../services/static";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
const NoSubscription = () => {
  const { data, isLoading, isError } = useGetAlSubscription();
  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>
            No subscription fees - it’s <span>FREE!</span>
          </h2>
          <p>Unlimited usage with no subscription charges for your business.</p>
        </div>
        {data && !isLoading && !isError && (
          <div className={styles.bottom}>
            {" "}
            <div className={styles.left}>
              <ul>
                {data?.data?.slice(0, 3)?.map((x, i) => (
                  <li className={styles.listItem}>
                    <img src={x?.icon?.public_url} alt="check" />{" "}
                    <p>
                      <strong> {x.mainTitle} </strong>
                      <span> {x?.SmallTitle} </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.right}>
              <ul>
                {data?.data?.slice(3, 6)?.map((x, i) => (
                  <li className={styles.listItem}>
                    <img src={x?.icon?.public_url} alt="check" />{" "}
                    <p>
                      <strong> {x.mainTitle} </strong>
                      <span> {x?.SmallTitle} </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default NoSubscription;

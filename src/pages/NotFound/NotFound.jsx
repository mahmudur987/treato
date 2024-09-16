import React from "react";
import styles from "./NotFound.module.css";
import notFoundImage from "../../assets/404.jpg";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Page Not Found" className={styles.image} />
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/" className={styles.homeLink}>
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;

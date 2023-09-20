import React from "react";
import styles from "./BlogCard.module.css"
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.png";

const BlogCard = ({blog}) => {
  return (
    <div className={styles["blog"]}>
      <img className={styles["blogImage"]} src={blog?.blog_Img?.public_url} alt="blogImage"/>
      <div className={styles["blogDetails"]}>
        <div className={styles["postedByContainer"]}>
          <div className={styles["userInfo"]}>
            <img className={styles["userImg"]} src={blog?.blog_Img?.public_url} alt="userImg"/>
            <span className={styles["userName"]}>{blog?.writer_name}</span>
          </div>
          <a href="/" className={styles["more"]}>
            <img src={moreHorizontal} alt="more" />
          </a>
        </div>
        <h1 className={styles["blogTitle"]}>{blog?.blog_title}</h1>
        <p className={styles["blogDescription"]}>{blog?.blog_description}</p>
      </div>
    </div>
  );
};

export default BlogCard;

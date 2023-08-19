import React from "react";
import styles from "./BlogCard.module.css"
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.png";

const BlogCard = ({blog}) => {
  return (
    <div className={styles["blog"]} key={blog.id}>
      <img className={styles["blogImage"]} src={blog.image} alt="blogImage"/>
      <div className={styles["blogDetails"]}>
        <div className={styles["postedByContainer"]}>
          <div className={styles["userInfo"]}>
            <img className={styles["userImg"]} src={blog.userImg} alt="userImg"/>
            <span className={styles["userName"]}>{blog.author}</span>
          </div>
          <a href="/" className={styles["more"]}>
            <img src={moreHorizontal} alt="more" />
          </a>
        </div>
        <h1 className={styles["blogTitle"]}>{blog.title}</h1>
        <p className={styles["blogDescription"]}>aaa{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;

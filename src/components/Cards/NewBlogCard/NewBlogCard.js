import React from "react";
import styles from "./NewBlogCard.module.css"
import { Link } from "react-router-dom";

const NewBlogCard = ({ blog }) => {
  return (
    <div className={styles["NewBlogCardMain"]}>
      <Link to={`/blogs/${blog._id}`}>
        <div className={styles["NewBlogCardA"]}>
          <img className={styles["blogImage"]} src={blog ? blog?.blog_Img?.public_url : ''} alt="blogImage" />
        </div>
      </Link>
      <div className={styles["blogDetails"]}>
        <Link to={`/blogs/${blog._id}`}>
          <h1 className={styles["blogTitle"]}>{blog ? blog?.blog_title : ''}</h1>
        </Link>
        <h1 className={styles["blogDate"]}>{"July 12, 2023"}</h1>
      </div>
    </div>
  );
};

export default NewBlogCard;

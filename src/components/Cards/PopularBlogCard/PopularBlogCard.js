import React from "react";
import styles from "./PopularBlogCard.module.css"
import { Link } from "react-router-dom";
import Timer from "../../../assets/icons/timer.svg";

const PopularBlogCard = ({ blog }) => {
  return (<>
  <div className={styles["popular-blog"]}>
      <Link to={`/blogs/${blog._id}`}><header> {blog.blog_title} </header></Link>
      <div className={styles["popular-blog-content"]}>
        <p className={styles["popular-blog-author"]}>
          {" "}
          {blog.writer_name}{" "}
        </p>
        <img loading="lazy" src={Timer} alt="timer" />
        <p className={styles["popular-blog-duration"]}>
          {" "}
          {'9 min read'}{" "}
        </p>
      </div>
    </div>
  </>
    
  );
};

export default PopularBlogCard;

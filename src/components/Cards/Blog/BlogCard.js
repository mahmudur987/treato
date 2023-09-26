import React from "react";
import styles from "./BlogCard.module.css"
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.png";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, blogDetail, blogPage }) => {
  return (

    <div className={blogDetail ? `${styles["blog"]} ${styles["blogBig"]}` : blogPage?`${styles["blog"]} ${styles["blogPage"]}` : styles["blog"]}>
      <Link to={`/blogs/${blog._id}`}>
        <img className={styles["blogImage"]} src={blog ? blog.blog_Img.public_url : ''} alt="blogImage" />
      </Link>
      <div className={styles["blogDetails"]}>
        <div className={styles["postedByContainer"]}>
          <div className={styles["userInfo"]}>
            <img className={styles["userImg"]} src={blog ? blog.blog_Img.public_url : ''} alt="userImg" />
            <span className={styles["userName"]}>{blog ? blog.writer_name : ''}</span>
          </div>
          <div href="/" className={styles["more"]}>
            <img src={moreHorizontal} alt="more" />
          </div>
        </div>

        <Link to={`/blogs/${blog._id}`}>
          <h1 className={styles["blogTitle"]}>{blog ? blog.blog_title : ''}</h1>
        </Link>
        <p className={styles["blogDescription"]}>{blog ? blog.blog_description : ''}</p>
      </div>
    </div>
  );
};

export default BlogCard;

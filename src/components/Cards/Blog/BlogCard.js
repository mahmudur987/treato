import React, { memo, useState } from "react";
import styles from "./BlogCard.module.css";
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.webp";
import share_forward from "../../../assets/images/icons/share_forward.svg";
import share_forward_white from "../../../assets/images/icons/share_forward_white.svg";
import { Link, useLocation } from "react-router-dom";
import ShareBlog from "../../_modals/ShareBlog/ShareBlog";

const BlogCard = ({
  blog,
  blogDetail,
  blogPage,
  shareBlog,
  setShareBlog,
  setActiveShare,
  setShareModal,
  activeShare,
  setBlogUrl,
}) => {
  const location = window.location.href;

  if (setShareBlog) {
    window.onclick = (e) => {
      if (shareBlog !== null && e.target.classList[0] !== "moreImg") {
        setShareBlog(null);
      }
    };
  }
  const locationBlog = () => {
    setShareBlog(blog._id);
    setBlogUrl(`${location}blogs/${blog._id}`);
  };
  return (
    <div
      className={
        blogDetail
          ? `${styles["blog"]} ${styles["blogBig"]}`
          : blogPage
          ? `${styles["blog"]} ${styles["blogPage"]}`
          : styles["blog"]
      }
    >
      <Link to={`/blogs/${blog._id}`} className={styles["blogImage"]}>
        <img
          loading="lazy"
          className={styles["blogImage"]}
          src={blog ? blog?.blog_Img?.public_url : ""}
          alt="blogImage"
        />
      </Link>
      <div className={styles["blogDetails"]}>
        <div className={styles["postedByContainer"]}>
          <div className={styles["userInfo"]}>
            <img
              loading="lazy"
              className={styles["userImg"]}
              src={blog ? blog?.blog_Img?.public_url : ""}
              alt="userImg"
            />
            <span className={styles["userName"]}>
              {blog ? blog?.writer_name : ""}
            </span>
          </div>

          <div className={styles["more"]} onClick={locationBlog}>
            <img
              loading="lazy"
              src={moreHorizontal}
              alt="more"
              className="moreImg"
            />
            <div
              className={
                shareBlog === blog._id ? styles["shareMain"] : styles["d_none"]
              }
              onMouseOver={() => setActiveShare(true)}
              onMouseOut={() => setActiveShare(false)}
              onClick={() => {
                setShareModal(true);
                setShareBlog(null);
              }}
            >
              <img
                loading="lazy"
                src={activeShare ? share_forward_white : share_forward}
                alt="share"
              />
              <div>Share blog</div>
            </div>
            <></>
          </div>
        </div>

        <Link to={`/blogs/${blog._id}`}>
          <h1 className={styles["blogTitle"]}>
            {blog ? blog?.blog_title : ""}
          </h1>
        </Link>
        <p className={styles["blogDescription"]}>
          {blog ? blog?.blog_description : ""}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

export const MemoizedBlogCard = memo(BlogCard);

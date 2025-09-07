import React, { memo } from "react";
import styles from "./BlogCard.module.css";
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.webp";
import share_forward from "../../../assets/images/icons/share_forward.svg";
import share_forward_white from "../../../assets/images/icons/share_forward_white.svg";
import { Link } from "react-router-dom";
import { blogImages } from "../../../assets/images/HomeLatestBlogs";

const BlogCard = ({
  blog,
  shareBlog,
  setShareBlog,
  setActiveShare,
  activeShare,
  setShareModal,
  setBlogUrl,
}) => {
  const location = window.location.href;

  const locationBlog = () => {
    setShareBlog(blog._id);
    setBlogUrl(`${location}blogs/${blog._id}`);
  };

  const handleToggle = () => {
    setShareModal(true);
    setShareBlog(null);
  };

  return (
    <div className={styles.blog}>
      <Link to={`/blogs/${blog._id}`} className={styles.blogImage}>
        <img loading="lazy" src={blogImages.blogImg4} alt="blogImage" />
      </Link>

      <div className={styles.blogDetails}>
        <div className={styles.postedByContainer}>
          <div className={styles.userInfo}>
            <img
              loading="lazy"
              src={blog.blog_Img?.public_url ?? ""}
              alt="userImg"
            />
            <span className={styles.userName}>{blog.writer_name}</span>
          </div>

          <div className={styles.more} onClick={locationBlog}>
            <img loading="lazy" src={moreHorizontal} alt="more" />
            {shareBlog === blog._id && (
              <div
                className={styles.shareMain}
                onMouseOver={() => setActiveShare(true)}
                onMouseOut={() => setActiveShare(false)}
                onClick={handleToggle}
              >
                <img
                  loading="lazy"
                  src={activeShare ? share_forward_white : share_forward}
                  alt="share"
                />
                <div>Share blog</div>
              </div>
            )}
          </div>
        </div>

        <Link to={`/blogs/${blog._id}`}>
          <h1 className={styles.blogTitle}>{blog.blog_title}</h1>
        </Link>
        <p className={styles.blogDescription}>{blog.blog_description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
export const MemoizedBlogCard = memo(BlogCard);

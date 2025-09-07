import React, { memo, useState } from "react";
import styles from "./LatestBlog.module.css";
import chevronLeft from "../../../assets/images/HomeLatestBlogs/chevronLeft.webp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "../../Cards/Blog/BlogCard";
import { Link } from "react-router-dom";
import Title from "../../Typography/Title/Title";
import ShareBlog from "../../_modals/ShareBlog/ShareBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dummyBlogs } from "../../../assets/Data/Data";

const LatestBlog = () => {
  const [shareBlog, setShareBlog] = useState(null);
  const [activeShare, setActiveShare] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [BlogUrl, setBlogUrl] = useState(null);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const blogData = dummyBlogs; // use static data

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title>Latest from our blog</Title>
          <Link to="/blogs" className={styles.headerViewAll}>
            View all <img loading="lazy" src={chevronLeft} />
          </Link>
        </div>

        <div className={styles.blogWrapper}>
          {blogData.slice(0, 3).map((blog, i) => (
            <BlogCard
              blog={blog}
              key={i}
              shareBlog={shareBlog}
              setShareBlog={setShareBlog}
              activeShare={activeShare}
              setActiveShare={setActiveShare}
              setShareModal={setShareModal}
              setBlogUrl={setBlogUrl}
            />
          ))}
        </div>

        {/* <div id="blogWrapper_mobo" className={styles.blogWrapper_mobo}>
          <Carousel
            responsive={responsive}
            showDots
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {blogData.map((blog, i) => (
              <BlogCard
                blog={blog}
                key={i}
                shareBlog={shareBlog}
                setShareBlog={setShareBlog}
                activeShare={activeShare}
                setActiveShare={setActiveShare}
                setShareModal={setShareModal}
                setBlogUrl={setBlogUrl}
              />
            ))}
          </Carousel>
        </div> */}
      </div>

      <ToastContainer />
      {shareModal && (
        <ShareBlog setShareModal={setShareModal} BlogUrl={BlogUrl} />
      )}
    </>
  );
};

export default LatestBlog;

export const MemoizedLatestBlog = memo(LatestBlog);

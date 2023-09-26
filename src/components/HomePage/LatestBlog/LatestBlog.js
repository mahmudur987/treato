import React, { useEffect } from "react";
import styles from "./LatestBlog.module.css";
import BlogImg1 from "../../../assets/images/HomeLatestBlogs/BlogImg1.png";
import BlogImg2 from "../../../assets/images/HomeLatestBlogs/BlogImg2.png";
import user1 from "../../../assets/images/HomeLatestBlogs/user1.png";
import user2 from "../../../assets/images/HomeLatestBlogs/user2.png";
import chevronLeft from "../../../assets/images/HomeLatestBlogs/chevronLeft.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "../../Cards/Blog/BlogCard";
import { Link } from "react-router-dom";
import { AllBlogs } from "../../../services/blog";
import { useState } from "react";
import Title from "../../Typography/Title/Title";
const LatestBlog = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let [blogData, setBlogData] = useState([]);

  useEffect(() => {
    let getBlogs = async () => {
      const { res, err } = await AllBlogs()
      setBlogData(res.data.blogs)
    }
    getBlogs();
  }, [])

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <Title>Latest from our blog</Title>
        <Link to="/blogs" className={styles["headerViewAll"]}>
          View all <img src={chevronLeft} />
        </Link>
      </div>
      <div className={styles["blogWrapper"]}>
        {
          blogData.length ?
            blogData.map((blog, i) => {
              if (i <= 2) {
                return (
                  <BlogCard blog={blog} key={i} />
                )
              }
            })
            :
            ''
        }
      </div>

      <div className={styles["blogWrapper_mobo"]}>
        {
          blogData.length ?
            <Carousel
              responsive={responsive}
              showDots={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {
                blogData.map((blog, i) => {
                  return (
                    <BlogCard blog={blog} key={i} />
                  )
                })
              }
            </Carousel>
            :
            ''
        }
      </div>
    </div>
  );
};

export default LatestBlog;

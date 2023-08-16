import React from "react";
import styles from "./LatestBlog.module.css";
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.png";
import BlogImg1 from "../../../assets/images/HomeLatestBlogs/BlogImg1.png";
import BlogImg2 from "../../../assets/images/HomeLatestBlogs/BlogImg2.png";
import user1 from "../../../assets/images/HomeLatestBlogs/user1.png";
import user2 from "../../../assets/images/HomeLatestBlogs/user2.png";
import chevronLeft from "../../../assets/images/HomeLatestBlogs/chevronLeft.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "../../Cards/Blog/BlogCard";
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

  const blogData = [
    {
      id: 1,
      author: "Preeti Ajgaonkar",
      title:
        "The Science of Skincare: Decoding Niacinamide for Acne-Prone Skin",
      description:
        "Acne can be a frustrating and stubborn skin concern that affects people of all ages. If you've q...",
      image: BlogImg1,
      userImg: user1,
    },
    {
      id: 2,
      author: "Anshul Sharma",
      title: "How Ashwagandha Can Transform Your Stress Levels and Skin Health",
      description:
        "In this article, we uncover the power of adaptogens and take a closer look at ashwagandha—a herb known fo...",
      image: BlogImg2,
      userImg: user2,
    },
    {
      id: 3,
      author: "Preeti Ajgaonkar",
      title: "How Ashwagandha Can Transform Your Stress Levels and Skin Health",
      description:
        "In this article, we uncover the power of adaptogens and take a closer look at ashwagandha—a herb known fo...",
      image: BlogImg1,
      userImg: user1,
    },
  ];
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h3 className={styles["headerText"]}> latest from our blog</h3>
        <a href="#" className={styles["headerViewAll"]}>
          View all <img src={chevronLeft} />
        </a>
      </div>
      <div className={styles["blogWrapper"]}>
        {blogData.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </div>

      <div className={styles["blogWrapper_mobo"]}>
        <Carousel
          responsive={responsive}
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {blogData.map((blog) => (
            <BlogCard blog={blog} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LatestBlog;

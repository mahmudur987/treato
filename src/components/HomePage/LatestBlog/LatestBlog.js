import React from "react";
import styles from "./LatestBlog.module.css";
import moreHorizontal from "../../../assets/images/HomeLatestBlogs/moreHorizontal.png";
import BlogImg1 from "../../../assets/images/HomeLatestBlogs/BlogImg1.png";
import BlogImg2 from "../../../assets/images/HomeLatestBlogs/BlogImg2.png";
import user1 from "../../../assets/images/HomeLatestBlogs/user1.png";
import user2 from "../../../assets/images/HomeLatestBlogs/user2.png";
import chevronLeft from "../../../assets/images/HomeLatestBlogs/chevronLeft.png";

const LatestBlog = () => {
  const blogData = [
    {
      id: 1,
      author: "Preeti Ajgaonkar",
      title: "The Science of Skincare: Decoding Niacinamide for Acne-Prone Skin",
      description: "Acne can be a frustrating and stubborn skin concern that affects people of all ages. If you've q...",
      image: BlogImg1,
      userImg:user1,
    },
    {
      id: 2,
      author: "Anshul Sharma",
      title: "How Ashwagandha Can Transform Your Stress Levels and Skin Health",
      description: "In this article, we uncover the power of adaptogens and take a closer look at ashwagandha—a herb known fo...",
      image: BlogImg2,
      userImg:user2,
    },
    {
      id: 3,
      author: "Preeti Ajgaonkar",
      title: "How Ashwagandha Can Transform Your Stress Levels and Skin Health",
      description: "In this article, we uncover the power of adaptogens and take a closer look at ashwagandha—a herb known fo...",
      image: BlogImg1,
      userImg:user1,
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
          <div href="" className={styles["blog"]} key={blog.id}>
            <img className={styles["blogImage"]} src={blog.image} />
            <div className={styles["blogDetails"]}>
              <div className={styles["postedByContainer"]}>
                <div className={styles["userInfo"]}>
                  <img
                    className={styles["userImg"]}
                    src={blog.userImg}
                  />
                  <span className={styles["userName"]}>{blog.author}</span>
                </div>
                <a href="#" className={styles["more"]}>
                  <img src={moreHorizontal} alt="more" />
                </a>
              </div>
              <h1 className={styles["blogTitle"]}>{blog.title}</h1>
              <p className={styles["blogDescription"]}>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;

import React from "react";
import styles from "./BlogDetail.module.css";

import Timer from "../../assets/icons/timer.svg";
import Facebook from "../../assets/icons/social-media/facebook.svg";
import Twitter from "../../assets/icons/social-media/twitter.svg";
import Linkedin from "../../assets/icons/social-media/linkedin.svg";
import Instagram from "../../assets/icons/social-media/instagram.svg";
import CopyLink from "../../assets/icons/social-media/copy-link.svg";

import image from "../../assets/images/testimonialsImages/mask1.png";
import { getFormattedDate } from "../../utils/utils";
import BlogImg from "../../assets/images/ContactusImages/contactusBanner.png";
import Title from "../../components/Typography/Title/Title";

import BlogImg1 from "../../assets/images/HomeLatestBlogs/BlogImg1.png";
import BlogImg2 from "../../assets/images/HomeLatestBlogs/BlogImg2.png";
import user1 from "../../assets/images/HomeLatestBlogs/user1.png";
import user2 from "../../assets/images/HomeLatestBlogs/user2.png";
import BlogCard from "../../components/Cards/Blog/BlogCard";
import Carousel from "react-multi-carousel";

const detail = {
  title:
    "Revitalizing Locks: The Ultimate Guide to Hair Rejuvenation Treatment",
  image: image,
  title2: "Team Treato",
  created_at: new Date(),
  duration: "6-min read",
};
const popularBlogs = [
  {
    title: "Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion",
    author: "Priya Sharma",
    duration: "9-min read",
  },
  {
    title: "Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion",
    author: "Priya Sharma",
    duration: "9-min read",
  },
  {
    title: "Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion",
    author: "Priya Sharma",
    duration: "9-min read",
  },
  {
    title: "Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion",
    author: "Priya Sharma",
    duration: "9-min read",
  },
  {
    title: "Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion",
    author: "Priya Sharma",
    duration: "9-min read",
  },
];
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

const tempData = [
  {
    id: 1,
    author: "Preeti Ajgaonkar",
    title: "The Science of Skincare: Decoding Niacinamide for Acne-Prone Skin",
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

export default function BlogDetail(props) {
  let date = getFormattedDate(detail.created_at);

  return (
    <div className={`${styles["container"]} page-section page-container`}>
      <div className={styles["wrapper"]}>
        <div className={styles.titleWrapper}>
          <Title className={styles["title"]}>{detail.title}</Title>

          <header className={styles["header"]}>
            <div className={styles["header-left"]}>
              <img src={detail.image} />
              <div className={styles["header-content"]}>
                <p className={styles["author"]}> {detail.title2} </p>
                <p className={styles["header-date"]}>
                  {date}
                  <img src={Timer} alt="timer" />
                  <span className={styles["header-duration"]}>
                    {detail.duration}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles["header-right"]}>
              <p>Share:</p>
              <div className={styles["social-icons"]}>
                <img src={Facebook} alt="Facebook" />
                <img src={Twitter} alt="Twitter" />
                <img src={Linkedin} alt="Linkedin" />
                <img src={Instagram} alt="Instagram" />
                <img src={CopyLink} alt="CopyLink" />
              </div>
            </div>
          </header>

          <div className={styles["line"]}> </div>
        </div>
        <div className={styles.blogWrapper}>
          <div className={styles.sectionLeft}>
            <img
              src={BlogImg}
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
              Are you tired of dealing with hair loss or lackluster locks? Do
              you dream of having thicker, healthier hair that exudes confidence
              and vitality? Look no further! In this blog post, we'll unveil the
              incredible benefits of hair rejuvenation treatment and how it can
              transform your hair and boost your self-esteem. Get ready to
              discover the key to unlocking luscious locks and reclaiming your
              crowning glory!
            </p>
            <h4 className={styles["blog-header"]}>Regain Your Confidence</h4>
            <p className={styles["blog-text"]}>
              Hair rejuvenation treatments work wonders in stimulating hair
              growth. PRP therapy, for instance, utilizes the power of your
              body's own platelets to promote hair follicle regeneration. The
              growth factors present in the platelets activate dormant hair
              follicles, leading to new hair growth and increased density.
              Witness the transformation as your hair becomes fuller and more
              voluminous.
            </p>
            <h4 className={styles["blog-header"]}>Stimulate Hair Growth</h4>
            <p className={styles["blog-text"]}>
              Hair rejuvenation treatments work wonders in stimulating hair
              growth. PRP therapy, for instance, utilizes the power of your
              body's own platelets to promote hair follicle regeneration. The
              growth factors present in the platelets activate dormant hair
              follicles, leading to new hair growth and increased density.
              Witness the transformation as your hair becomes fuller and more
              voluminous.
            </p>
            <img
              src={BlogImg}
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
              Are you tired of dealing with hair loss or lackluster locks? Do
              you dream of having thicker, healthier hair that exudes confidence
              and vitality? Look no further! In this blog post, we'll unveil the
              incredible benefits of hair rejuvenation treatment and how it can
              transform your hair and boost your self-esteem. Get ready to
              discover the key to unlocking luscious locks and reclaiming your
              crowning glory!
            </p>
            <div className={styles["line"]}> </div>

            <div
              className={`${styles["header-right"]} ${styles["share-container"]} `}
            >
              <p>Share:</p>
              <div className={styles["social-icons"]}>
                <img src={Facebook} alt="Facebook" />
                <img src={Twitter} alt="Twitter" />
                <img src={Linkedin} alt="Linkedin" />
                <img src={Instagram} alt="Instagram" />
                <img src={CopyLink} alt="CopyLink" />
              </div>
            </div>
          </div>
          <div className={styles["section-right"]}>
            <h3>Popular blogs</h3>
            <div className={styles["popular-blogs"]}>
              {popularBlogs.map((item) => {
                return (
                  <div className={styles["popular-blog"]}>
                    <header> {item.title} </header>
                    <div className={styles["popular-blog-content"]}>
                      <p className={styles["popular-blog-author"]}>
                        {" "}
                        {item.author}{" "}
                      </p>
                      <img src={Timer} alt="timer" />
                      <p className={styles["popular-blog-duration"]}>
                        {" "}
                        {item.duration}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.relatedTreatment}>
              <h1 className={styles.relatedTitle}> Find related treatments</h1>
              <div className={styles.relatedTags}>
                <a>Hair</a>
                <a>Hair removal</a>
                <a>Nail care</a>
                <a>Facials & Skincare</a>
                <a>Makeup</a>
                <a>Massage</a>
                <a>Massage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["blog-section-container"]}>
        <Title className={styles["header"]}>Related Blogs</Title>
        <div className={styles["blogs-container"]}>
          <Carousel
            responsive={responsive}
            showDots={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {tempData.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

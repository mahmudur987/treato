import React, { useEffect, useState } from "react";
import styles from "./BlogDetail.module.css";
import Timer from "../../assets/icons/timer.svg";
import Facebook from "../../assets/icons/social-media/facebook.svg";
import Twitter from "../../assets/icons/social-media/twitter.svg";
import Linkedin from "../../assets/icons/social-media/linkedin.svg";
import Instagram from "../../assets/icons/social-media/instagram.svg";
import CopyLink from "../../assets/icons/social-media/copy-link.svg";
import image from "../../assets/images/testimonialsImages/mask1.png";
import { getFormattedDate } from "../../utils/utils";
import Title from "../../components/Typography/Title/Title";
import BlogCard from "../../components/Cards/Blog/BlogCard";
import Carousel from "react-multi-carousel";
import { AllBlogs } from "../../services/blog";
import { getAllServices } from "../../services/Services";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import PopularBlogCard from "../../components/Cards/PopularBlogCard/PopularBlogCard";
import { SingleBlog } from "../../services/SingleBlog";
import { toast } from "react-toastify";

export default function BlogDetail(props) {
  let [shareBlog, setShareBlog] = useState(null);
  let [BlogUrl, setBlogUrl] = useState(null);
  let [activeShare, setActiveShare] = useState(false);
  let [shareModal, setShareModal] = useState(false);
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
  const detail = {
    title:
      "Revitalizing Locks: The Ultimate Guide to Hair Rejuvenation Treatment",
    image: image,
    title2: "Team Treato",
    created_at: new Date(),
    duration: "6-min read",
  };

  let blogId = useParams();

  let date = getFormattedDate(detail.created_at);
  let [blogData, setBlogData] = useState([]);
  let [mainBlogData, setMainBlogData] = useState([]);
  let [serviceData, setServiceData] = useState([]);
  let { pathname } = useLocation();

  useEffect(() => {
    let getBlogs = async () => {
      const { res, err } = await AllBlogs();
      if (res) {
        setBlogData(res.data.blogs);
      }
    };
    let getServices = async () => {
      const { res, err } = await getAllServices();
      if (res) {
        const uniqueDataArray = res?.data?.data.reduce(
          (uniqueArray, currentItem) => {
            // Check if there's already an object with the same 'name' in uniqueArray
            if (
              !uniqueArray.some(
                (item) => item.service_name === currentItem.service_name
              )
            ) {
              // If not found, add this object to uniqueArray
              uniqueArray.push(currentItem);
            }
            return uniqueArray;
          },
          []
        );

        setServiceData(uniqueDataArray);
      }
    };
    let getBlogData = async () => {
      const { res, err } = await SingleBlog(blogId.id);
      if (res) {
        setMainBlogData(res.data.data);
      }
    };
    getBlogs();
    getServices();
    getBlogData();
  }, [pathname]);
  const shareOnFacebook = () => {
    try {
      // Construct the share URL
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        "https://treato.netlify.app"
      )}`;

      // Open the share dialog in a new window
      window.open(shareUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Facebook:", error);
    }
  };
  const shareOnTwitter = () => {
    try {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        "https://treato.netlify.app"
      )}&text=${encodeURIComponent(mainBlogData[0].blog_title)}`;
      window.open(shareUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Twitter:", error);
    }
  };
  const shareOnLinkedin = () => {
    try {
      const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        "https://treato.netlify.app"
      )}&title=${encodeURIComponent(mainBlogData[0].blog_title)}`;
      window.open(shareUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Linkedin:", error);
    }
  };
  const shareOnInstagram = () => {
    try {
      const caption = encodeURIComponent("Check out this awesome blog post!"); // Customize the caption
      const shareUrl = `https://www.instagram.com/`;
      window.open(shareUrl, "_blank");
    } catch (error) {
      console.error("Error sharing on Instagram :", error);
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info(`Link copied to clipboard!`);
  };
  const navigate = useNavigate();
  const handleServiceClick = (serviceName) => {
    navigate(`/salons?service=${serviceName}&lat=&lng=&location=`);
  };

  return (
    <div className={`${styles["container"]} page-section page-container`}>
      <BackButton />
      <div className={styles["wrapper"]}>
        <div className={styles.titleWrapper}>
          <Title className={styles["title"]}>
            {mainBlogData?.length ? mainBlogData[0]?.blog_title : ""}
          </Title>

          <header className={styles["header"]}>
            <div className={styles["header-left"]}>
              <img loading="lazy"
                src={
                  mainBlogData?.length
                    ? mainBlogData[0]?.blog_Img?.public_url
                    : ""
                }
              />
              <div className={styles["header-content"]}>
                <p className={styles["author"]}>
                  {" "}
                  {mainBlogData?.length
                    ? mainBlogData[0]?.writer_name
                    : ""}{" "}
                </p>
                <p className={styles["header-date"]}>
                  {date}
                  <img loading="lazy" src={Timer} alt="timer" />
                  <span className={styles["header-duration"]}>
                    {detail.duration}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles["header-right"]}>
              <p>Share:</p>
              <div className={styles["social-icons"]}>
                {/* <div className={styles.allborder}> */}
                <button onClick={shareOnFacebook}>
                  <img loading="lazy" src={Facebook} alt="Facebook" />
                </button>
                <button onClick={shareOnTwitter}>
                  <img loading="lazy" src={Twitter} alt="Twitter" />
                </button>
                <button onClick={shareOnLinkedin}>
                  <img loading="lazy" src={Linkedin} alt="Linkedin" />
                </button>
                <button onClick={shareOnInstagram}>
                  <img loading="lazy" src={Instagram} alt="Instagram" />
                </button>
                <button onClick={copyLinkToClipboard}>
                  <img loading="lazy" src={CopyLink} alt="CopyLink" />
                </button>
                {/* </div> */}
              </div>
            </div>
          </header>

          <div className={styles["line"]}> </div>
        </div>
        <div className={styles.blogWrapper}>
          <div className={styles.sectionLeft}>
            <img loading="lazy"
              src={
                mainBlogData?.length
                  ? mainBlogData[0]?.blog_Img?.public_url
                  : ""
              }
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
              {mainBlogData?.length ? mainBlogData[0]?.blog_description : ""}
            </p>
            <h4 className={styles["blog-header"]}>
              {mainBlogData?.length ? mainBlogData[0]?.blog_title : ""}
            </h4>
            <p className={styles["blog-text"]}>
              {mainBlogData?.length ? mainBlogData[0]?.blog_description : ""}
            </p>
            <h4 className={styles["blog-header"]}>
              {mainBlogData.length ? mainBlogData[0]?.blog_title : ""}
            </h4>
            <p className={styles["blog-text"]}>
              {mainBlogData?.length ? mainBlogData[0]?.blog_description : ""}
            </p>
            <img loading="lazy"
              src={
                mainBlogData?.length
                  ? mainBlogData[0]?.blog_Img?.public_url
                  : ""
              }
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
              {mainBlogData?.length ? mainBlogData[0]?.blog_description : ""}
            </p>
            <div className={styles["line"]}> </div>

            <div
              className={`${styles["header-right"]} ${styles["share-container"]} `}
            >
              <p>Share:</p>
              <div className={styles["social-icons"]}>
                <button onClick={shareOnFacebook}>
                  <img loading="lazy" src={Facebook} alt="Facebook" />
                </button>
                <button onClick={shareOnTwitter}>
                  <img loading="lazy" src={Twitter} alt="Twitter" />
                </button>
                <button onClick={shareOnLinkedin}>
                  <img loading="lazy" src={Linkedin} alt="Linkedin" />
                </button>
                <button onClick={shareOnInstagram}>
                  <img loading="lazy" src={Instagram} alt="Instagram" />
                </button>
                <button onClick={copyLinkToClipboard}>
                  <img loading="lazy" src={CopyLink} alt="CopyLink" />
                </button>
              </div>
            </div>
          </div>
          <div className={styles["section-right"]}>
            <h3>Popular blogs</h3>
            <div className={styles["popular-blogs"]}>
              {blogData.length
                ? blogData.map((v, i) => {
                    if (i <= 5) {
                      return <PopularBlogCard blog={v} key={i} />;
                    }
                  })
                : ""}
            </div>
            <div className={styles.relatedTreatment}>
              <h1 className={styles.relatedTitle}> Find related treatments</h1>
              <div className={styles.relatedTags}>
                {serviceData.length
                  ? serviceData.map((v) => {
                      return (
                        <Link
                          to={`/salons?service=${v?.service_name}&lat=&lng=&location=`}
                          key={v._id}
                        >
                          {v.service_name}
                        </Link>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["blog-section-container"]}>
        <Title className={styles["header"]}>Related Blogs</Title>
        <div className={`${styles["blogs-container"]} customSlickDiv`}>
          {blogData.length ? (
            <Carousel
              responsive={responsive}
              showDots={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {/* blog={blog} key={i} activeShare={activeShare}  setActiveShare={setActiveShare} setShareModal={setShareModal} shareBlog={shareBlog} setShareBlog={setShareBlog}   setBlogUrl={setBlogUrl} */}
              {blogData.map((blog, i) => {
                return (
                  <BlogCard
                    blog={blog}
                    key={i}
                    blogDetail={true}
                    setActiveShare={setActiveShare}
                    activeShare={activeShare}
                    setShareModal={setShareModal}
                    shareModal={shareModal}
                    setShareBlog={setShareBlog}
                    shareBlog={shareBlog}
                    setBlogUrl={setBlogUrl}
                    BlogUrl={BlogUrl}
                  />
                );
              })}
            </Carousel>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

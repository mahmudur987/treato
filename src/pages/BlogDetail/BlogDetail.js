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
import { Link, useLocation } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton/BackButton";

export default function BlogDetail(props) {
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

  let urlLoc = useLocation()
  let blogId = urlLoc.pathname.split('/').pop()

  let date = getFormattedDate(detail.created_at);
  let [blogData, setBlogData] = useState([]);
  let [mainBlogData,setMainBlogData] = useState([])
  let [serviceData,setServiceData] = useState([])
  let {pathname} = useLocation()

  useEffect(() => {
    let getBlogs = async () => {
      const { res, err } = await AllBlogs()
      setBlogData(res.data.blogs)
      let mainBlog = res.data.blogs.filter((v)=>v._id===blogId)
      setMainBlogData(mainBlog)
    }
    let getServices = async () => {
      const { res, err } = await getAllServices()
      setServiceData(res.data.data)
    }
    getBlogs();
    getServices();
  }, [pathname])

  return (
    <div className={`${styles["container"]} page-section page-container`}>
      <BackButton/>
      <div className={styles["wrapper"]}>
        <div className={styles.titleWrapper}>
          <Title className={styles["title"]}>{mainBlogData.length?mainBlogData[0].blog_title:''}</Title>

          <header className={styles["header"]}>
            <div className={styles["header-left"]}>
              <img src={mainBlogData.length?mainBlogData[0].blog_Img.public_url:''} />
              <div className={styles["header-content"]}>
                <p className={styles["author"]}> {mainBlogData.length?mainBlogData[0].writer_name:''} </p>
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
              src={mainBlogData.length?mainBlogData[0].blog_Img.public_url:''}
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
              {mainBlogData.length?mainBlogData[0].blog_description:''}
            </p>
            <h4 className={styles["blog-header"]}>{mainBlogData.length?mainBlogData[0].blog_title:''}</h4>
            <p className={styles["blog-text"]}>
            {mainBlogData.length?mainBlogData[0].blog_description:''}
            </p>
            <h4 className={styles["blog-header"]}>{mainBlogData.length?mainBlogData[0].blog_title:''}</h4>
            <p className={styles["blog-text"]}>
            {mainBlogData.length?mainBlogData[0].blog_description:''}
            </p>
            <img
              src={mainBlogData.length?mainBlogData[0].blog_Img.public_url:''}
              alt="blog-image"
              className={styles["blog-image"]}
            />
            <p className={styles["blog-text"]}>
            {mainBlogData.length?mainBlogData[0].blog_description:''}
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
              {
                blogData.length?
                blogData.map((v,i)=>{
                  if(i<=5){
                    return (
                      <div className={styles["popular-blog"]} key={i}>
                        <Link to={`/blogs/${v._id}`}><header> {v.blog_title} </header></Link>
                        <div className={styles["popular-blog-content"]}>
                          <p className={styles["popular-blog-author"]}>
                            {" "}
                            {v.writer_name}{" "}
                          </p>
                          <img src={Timer} alt="timer" />
                          <p className={styles["popular-blog-duration"]}>
                            {" "}
                            {'9 min read'}{" "}
                          </p>
                        </div>
                      </div>
                    )
                  }
                })
                :
                ''
              }
            </div>
            <div className={styles.relatedTreatment}>
              <h1 className={styles.relatedTitle}> Find related treatments</h1>
              <div className={styles.relatedTags}>
                {
                  serviceData.length?
                  serviceData.map((v)=>{
                    return(
                      <a key={v._id}>{v.service_name[0]}</a>
                    )
                  })
                  :
                  ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["blog-section-container"]}>
        <Title className={styles["header"]}>Related Blogs</Title>
        <div className={styles["blogs-container"]}>
          {
            blogData.length ?
              <Carousel
                responsive={responsive}
                showDots={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {blogData.map((blog, i) => {
                  return (
                    <BlogCard blog={blog} key={i} blogDetail={true}/>
                  )
                })
                }
              </Carousel>
              :
              ''
          }
        </div>
      </div>
    </div>
  );
}

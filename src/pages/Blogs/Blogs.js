import React, { useEffect, useState } from "react";
import Title from "../../components/Typography/Title/Title";
import { AllBlogs } from "../../services/blog";
import BlogCard from "../../components/Cards/Blog/BlogCard";
import styles from "../BlogDetail/BlogDetail.module.css"
import NewBlogCard from "../../components/Cards/NewBlogCard/NewBlogCard";
import { ellipse } from "../../assets/images/icons";
import { Link } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton/BackButton";

export default function Blogs(props) {

   let [blogData, setBlogData] = useState([]);
   let [firstBlogData,setFirstBlogData] = useState('');

   useEffect(() => {
      let getBlogs = async () => {
         const { res, err } = await AllBlogs()
         if(err === null){
            setBlogData(res.data.blogs)
            setFirstBlogData(res.data.blogs[0])
         }
      }
      getBlogs();
   }, [])

   return (
      <div className={styles["AllBlogsPage"]}>
         <BackButton/>
         <div className={styles["blog-section-container"]}>
            <Title className={styles["BlogsBigTitle"]}>Latest on Treato Blog</Title>
            <div className={styles["Allblogs-container"]}>
               <Link to={firstBlogData ? `/blogs/${firstBlogData._id}`:''} className={`${styles["AllBlogsPageA"]} ${styles["blogMainPc"]}`}>
                  <div className={styles["AllBlogsPageAA"]}>
                     <img src={firstBlogData ? firstBlogData.blog_Img.public_url:''} alt="" />
                  </div>
                  <div className={styles["AllBlogsPageAB"]}>{firstBlogData ? firstBlogData.blog_title:''}</div>
                  <div className={styles["AllBlogsPageAC"]}>
                     <img src={firstBlogData ? firstBlogData.blog_Img.public_url:''} alt="" />
                     <div>{firstBlogData ? firstBlogData.blog_title:''}</div>
                     <img src={ellipse} alt="" />
                     <div>July 12, 2023</div>
                  </div>
               </Link>
               <div className={`${styles["AllBlogsPageA"]} ${styles["blogMainMob"]}`}>
                  {firstBlogData ? <BlogCard blog={firstBlogData} blogPage={true}/> : ''}
               </div>
               <div className={styles["AllBlogsPageB"]}>
                  {
                     blogData.length ?
                        blogData.map((blog, i) => {
                           if (i <= 3) {
                              return (
                                 <NewBlogCard blog={blog} key={i}/>
                              )
                           }
                        })
                        :
                        ''
                  }
               </div>
            </div>
         </div>
         <div className={styles["blog-section-container"]}>
            <Title className={styles["header"]}>Popular Blogs</Title>
            <div className={styles["Allblogs-container"]}>
               {
                  blogData.length ?
                     blogData.map((blog, i) => {
                        return (
                           <BlogCard blog={blog} key={i} blogPage={true}/>
                        )
                     })
                     :
                     ''
               }
            </div>
         </div>
      </div>
   )
}

import React, { useEffect, useState } from "react";
import Title from "../../components/Typography/Title/Title";
import { AllBlogs } from "../../services/blog";
import BlogCard from "../../components/Cards/Blog/BlogCard";
import styles from "../BlogDetail/BlogDetail.module.css"
import NewBlogCard from "../../components/Cards/NewBlogCard/NewBlogCard";
import { ellipse } from "../../assets/images/icons";
import { Link } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import { chevronLeft } from "../../assets/images/icons";

export default function Blogs(props) {

   let [blogData, setBlogData] = useState([]);
   let [firstBlogData, setFirstBlogData] = useState('');
   let [showBlogs, setShowBlogs] = useState([]);
   let [totalPage, setTotalPage] = useState([]);
   let [currentPage,setCurrentPage] = useState(1);

   const perPage = 6;
   useEffect(() => {
      let getBlogs = async () => {
         const { res, err } = await AllBlogs()
         if (err === null) {
            setBlogData(res.data.blogs)
            setFirstBlogData(res.data.blogs[0])
         }
      }
      getBlogs();
   }, [])

   useEffect(() => {
      if (blogData.length) {
         let pages = Math.ceil(blogData.length / perPage);
         let blogArr = []
         let pageArr = [];
         for (let index = 1; index <= pages; index++) {
            pageArr.push(index);
         }
         for (let j = 0; j < perPage; j++) {
            blogArr.push(blogData[j]);
         }
         setTotalPage(pageArr);
         setShowBlogs(blogArr)
      }
   }, [blogData])

   let handlePagination = (pageNum = 1) => {
      if (blogData.length) {
         let startNum = 0;
         let blogArr = []
         if (pageNum !== 1) {
            let diff = pageNum*perPage - blogData.length
            startNum = pageNum>2?blogData.length-diff:perPage;
            for (let index = startNum; index < (pageNum>2?startNum+diff:startNum+perPage); index++) {
               blogArr.push(blogData[index])
            }
         }else{
            for (let index = startNum; index < perPage; index++) {
               blogArr.push(blogData[index])
            }
         }
         setCurrentPage(pageNum);
         setShowBlogs(blogArr)
      }
   }

   return (
      <div className={styles["AllBlogsPage"]}>
         <BackButton />
         <div className={styles["blog-section-container"]}>
            <Title className={styles["BlogsBigTitle"]}>Latest on Treato Blog</Title>
            <div className={styles["Allblogs-container"]}>
               <Link to={firstBlogData ? `/blogs/${firstBlogData._id}` : ''} className={`${styles["AllBlogsPageA"]} ${styles["blogMainPc"]}`}>
                  <div className={styles["AllBlogsPageAA"]}>
                     <img src={firstBlogData ? firstBlogData?.blog_Img?.public_url : ''} alt="" />
                  </div>
                  <div className={styles["AllBlogsPageAB"]}>{firstBlogData ? firstBlogData.blog_title : ''}</div>
                  <div className={styles["AllBlogsPageAC"]}>
                     <img src={firstBlogData ? firstBlogData?.blog_Img?.public_url : ''} alt="" />
                     <div>{firstBlogData ? firstBlogData.blog_title : ''}</div>
                     <img src={ellipse} alt="" />
                     <div>July 12, 2023</div>
                  </div>
               </Link>
               <div className={`${styles["AllBlogsPageA"]} ${styles["blogMainMob"]}`}>
                  {firstBlogData ? <BlogCard blog={firstBlogData} blogPage={true} /> : ''}
               </div>
               <div className={styles["AllBlogsPageB"]}>
                  {
                     blogData.length ?
                        blogData.map((blog, i) => {
                           if (i <= 3) {
                              return (
                                 <NewBlogCard blog={blog} key={i} />
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
                  showBlogs.length ?
                     showBlogs.map((blog, i) => {
                        return (
                           <BlogCard blog={blog} key={i} blogPage={true} />
                        )
                     })
                     :
                     ''
               }
            </div>
         </div>
         {
            totalPage.length ?
               <div className={styles.pagination}>
                  <button
                     className={currentPage===totalPage[0]?`${styles.prev} ${styles.lowOpacity}`:styles.prev}
                     onClick={()=>handlePagination(currentPage===1?1:currentPage-1)}
                  >
                     <img src={chevronLeft} alt={'left'} /> Prev
                  </button>
                  <div className={styles.paginationButton}>
                     {
                        totalPage.map((v,i) => {
                           return (
                              <button
                                 className={v===currentPage?styles.active:null}
                                 onClick={()=>handlePagination(v)}
                                 key={i}
                              >
                                 {v}
                              </button>
                           )
                        })
                     }
                  </div>
                  <button
                     className={currentPage===totalPage[totalPage.length-1]?`${styles.next} ${styles.lowOpacity}`:styles.next}
                     onClick={()=>handlePagination(currentPage===totalPage[totalPage.length-1]?currentPage:currentPage+1)}
                  >
                     Next <img src={chevronLeft} alt={'right'} />
                  </button>
               </div>
               :
               null
         }
      </div>
   )
}

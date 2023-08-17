import React from 'react'
import styles from './BlogDetail.module.css'

import Timer from '../../assets/icons/timer.svg'
import Facebook from '../../assets/icons/social-media/facebook.svg'
import Twitter from '../../assets/icons/social-media/twitter.svg'
import Linkedin from '../../assets/icons/social-media/linkedin.svg'
import Instagram from '../../assets/icons/social-media/instagram.svg'
import CopyLink from '../../assets/icons/social-media/copy-link.svg'

import image from '../../assets/images/testimonialsImages/mask1.png'
import { getFormattedDate } from '../../utils/utils'
import BlogImg from '../../assets/images/ContactusImages/contactusBanner.png'
import Title from '../../components/Typography/Title/Title'

const detail = {
   title: 'Revitalizing Locks: The Ultimate Guide to Hair Rejuvenation Treatment',
   image: image,
   title2: 'Team Treato',
   created_at: new Date(),
   duration: '6-min read'
}
const popularBlogs = [
   {
      title: 'Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion',
      author: 'Priya Sharma',
      duration: '9-min read'
   },
   {
      title: 'Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion',
      author: 'Priya Sharma',
      duration: '9-min read'
   },
   {
      title: 'Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion',
      author: 'Priya Sharma',
      duration: '9-min read'
   },
   {
      title: 'Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion',
      author: 'Priya Sharma',
      duration: '9-min read'
   },
   {
      title: 'Age-Defying Skincare: Secrets to a Youthful and Radiant Complexion',
      author: 'Priya Sharma',
      duration: '9-min read'
   },
]

export default function BlogDetail(props) {


   let date = getFormattedDate(detail.created_at)

   return (
      <div className={`${styles['container']} page-section page-container`}>
         <div className={styles['wrapper']} >
            <div className={styles['section-left']}>
               <Title className={styles['title']}>
                  {detail.title}
               </Title>

               <header className={styles['header']}>
                  <div className={styles['header-left']}>
                     <img src={detail.image} />
                     <div className={styles['header-content']}>
                        <p className={styles['author']}> {detail.title2} </p>
                        <p className={styles['header-date']}>
                           {date}
                           <img src={Timer} alt='timer' />
                           <span className={styles['header-duration']}>
                              {detail.duration}
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className={styles['header-right']}>
                     <p>
                        Share:
                     </p>
                     <div className={styles['social-icons']}>
                        <img src={Facebook} alt='Facebook' />
                        <img src={Twitter} alt='Twitter' />
                        <img src={Linkedin} alt='Linkedin' />
                        <img src={Instagram} alt='Instagram' />
                        <img src={CopyLink} alt='CopyLink' />
                     </div>
                  </div>

               </header>

               <div className={styles['line']}> </div>

               <div>
                  <img src={BlogImg} alt='blog-image' className={styles['blog-image']} />
                  <p className={styles['blog-text']}>
                     Are you tired of dealing with hair loss or lackluster locks? Do you dream of having thicker, healthier hair that exudes confidence and vitality? Look no further! In this blog post, we'll unveil the incredible benefits of hair rejuvenation treatment and how it can transform your hair and boost your self-esteem. Get ready to discover the key to unlocking luscious locks and reclaiming your crowning glory!
                  </p>
                  <h4 className={styles['blog-header']}>
                     Regain Your Confidence
                  </h4>
                  <p className={styles['blog-text']}>
                     Hair rejuvenation treatments work wonders in stimulating hair growth. PRP therapy, for instance, utilizes the power of your body's own platelets to promote hair follicle regeneration. The growth factors present in the platelets activate dormant hair follicles, leading to new hair growth and increased density. Witness the transformation as your hair becomes fuller and more voluminous.
                  </p>
                  <h4 className={styles['blog-header']}>
                     Stimulate Hair Growth
                  </h4>
                  <p className={styles['blog-text']}>
                     Hair rejuvenation treatments work wonders in stimulating hair growth. PRP therapy, for instance, utilizes the power of your body's own platelets to promote hair follicle regeneration. The growth factors present in the platelets activate dormant hair follicles, leading to new hair growth and increased density. Witness the transformation as your hair becomes fuller and more voluminous.
                  </p>
                  <img src={BlogImg} alt='blog-image' className={styles['blog-image']} />
                  <p className={styles['blog-text']}>
                     Are you tired of dealing with hair loss or lackluster locks? Do you dream of having thicker, healthier hair that exudes confidence and vitality? Look no further! In this blog post, we'll unveil the incredible benefits of hair rejuvenation treatment and how it can transform your hair and boost your self-esteem. Get ready to discover the key to unlocking luscious locks and reclaiming your crowning glory!
                  </p>

               </div>

               <div className={styles['line']}> </div>

               <div className={`${styles['header-right']} ${styles['share-container']} `}>
                  <p>
                     Share:
                  </p>
                  <div className={styles['social-icons']}>
                     <img src={Facebook} alt='Facebook' />
                     <img src={Twitter} alt='Twitter' />
                     <img src={Linkedin} alt='Linkedin' />
                     <img src={Instagram} alt='Instagram' />
                     <img src={CopyLink} alt='CopyLink' />
                  </div>
               </div>
            </div>
            <div className={styles['section-right']}>
               <h3>
                  Popular Blogs
               </h3>
               <div className={styles['popular-blogs']}>
                  {popularBlogs.map(item => {
                     return (
                        <div className={styles['popular-blog']}>
                           <header> {item.title} </header>
                           <div className={styles['popular-blog-content']}>
                              <p className={styles['popular-blog-author']} > {item.author} </p>
                              <img src={Timer} alt='timer' />
                              <p className={styles['popular-blog-duration']} > {item.duration} </p>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

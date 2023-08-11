import React from 'react'
import styles from './home.module.css'
import HeroSection from '../../components/HomePage/Hero/heroSection'
import RecommendedSection from '../../components/HomePage/RecommendedSection/RecommendedSection'

export default function Home(props) {

   return (
      <div className={styles['container']} >
         <HeroSection />
         <RecommendedSection />
      </div>
   )
}

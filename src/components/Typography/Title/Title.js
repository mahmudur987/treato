import React from 'react'
import styles from './title.module.css'

export default function Title({ className, children }) {

   return (
      <h3 className={`${styles.title} ${className ? className : ''} `}>
         {children}
      </h3>
   )
}

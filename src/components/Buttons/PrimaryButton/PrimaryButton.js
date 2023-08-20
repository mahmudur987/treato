import React from 'react'
import styles from './primaryButton.module.css'

//filled button
export default function PrimaryButton({ children, className ,onClick}) {

   return (
      <button className={`${styles['container']} ${className ? className : ''} `} onClick={onClick}>
         {children}
      </button>
   )
}

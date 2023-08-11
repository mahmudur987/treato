import React from 'react'
import styles from './primaryButton.module.css'

//filled button
export default function PrimaryButton({ children, className }) {

   return (
      <button className={`${styles['container']} ${className ? className : ''} `} >
         {children}
      </button>
   )
}

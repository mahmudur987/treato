import React from 'react'
import styles from './secondaryButton.module.css'

//outlined button
export default function SecondaryButton({ children, className, onClick}) {

   return (
      <button className={`${styles['container']} ${className ? className : ''} `} onClick={onClick} >
         {children}
      </button>
   )
}

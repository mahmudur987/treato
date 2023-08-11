import React from 'react'
import styles from './secondaryButton.module.css'

//outlined button
export default function PrimaryButton({ children, className }) {

   return (
      <button className={`${styles['container']} ${className ? className : ''} `} >
         {children}
      </button>
   )
}

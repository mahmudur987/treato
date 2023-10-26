import React from 'react'
import styles from './primaryButton.module.css'

//filled button
export default function PrimaryButton({ children, className ,onClick,form}) {

   return (
      <button className={`${styles['container']} ${className ? className : ''} `} onClick={onClick} form={form?form:null}>
         {children}
      </button>
   )
}

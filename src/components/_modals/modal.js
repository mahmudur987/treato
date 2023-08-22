import React from 'react'
import styles from './modal.module.css'

export default function Modal({ open, onClose, children }) {


   return (
      <div className={`${styles['container']} ${open ? styles['modal-active'] : ''} `}>
         {children}
         <div className={styles['custom-backdrop']} onClick={onClose} ></div>
      </div>
   )
}

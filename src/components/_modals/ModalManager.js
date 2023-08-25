import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './modal.module.css'
import CloseIcon from '../../assets/icons/timer.svg'
import Modal from './modal'
import { closeModal } from '../../redux/slices/modal'
import Filter from './Filter/Filter'


const ModalManager = () => {
   const dispatch = useDispatch()
   const { activeModal, closable } = useSelector(
      (state) => state.modal,
   )

   function handleClose() {
      dispatch(closeModal())
   }

   useEffect(() => {
      if (activeModal !== null) document.body.style.overflow = 'hidden'
      else
         setTimeout(() => {
            document.body.style.overflow = 'auto'
         }, 500)
   }, [activeModal])

   const escFunction = useCallback((event) => {
      if (event.key === 'Escape') {
         handleClose()
      }
   }, [])

   useEffect(() => {
      document.addEventListener('keydown', escFunction, false)
      return () => {
         document.removeEventListener('keydown', escFunction, false)
      }
   }, [escFunction])

   const handleBgClick = (event) => {
      // event.preventDefault()
      if (event.target === event.currentTarget) {
         handleClose()
      }
   }

   return (

      <Modal
         open={Boolean(activeModal)}
         onClose={() => handleClose(true)}
      >
         <div
            className={`${styles['modal-wrapper']} `}
         >
            <main>
               {
                  activeModal === 'filter' &&
                  <Filter />
               }
               {/* Modal Close Icon */}
               {closable && (
                  <img src={CloseIcon}
                     alt='close'
                     className={styles['modal-close-icon']}
                     onClick={handleClose}
                  />
               )}
            </main>
         </div>
      </Modal>
   )
}

export default ModalManager

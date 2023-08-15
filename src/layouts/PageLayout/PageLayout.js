import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useDispatch, useSelector } from "react-redux";
import ModalDesktop from '../../components/_modals/filterSalon/modalDesktop/ModalDesktop';
export default function PageLayout({ children }) {

   const showModal = useSelector((state) => state.modal.showModal);
   return (
      <div>
         <Navbar />
        {showModal && <ModalDesktop />}
         {children}
                 {/* Desktop Modal */}

      </div>
   )
}

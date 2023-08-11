import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function PageLayout({ children }) {


   return (
      <div>
         <Navbar />
         {children}
      </div>
   )
}

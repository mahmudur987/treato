import React, { useState, useEffect } from 'react';
import style from './SalonTiming.module.css'; // Import the CSS module

const SalonTimingModal = ({setShowTiming, SalonData}) => {
  const [isOpen, setIsOpen] = useState(true);


  useEffect(()=>{console.log(SalonData?.working_hours  )})

  const toggleModal = () => {
    setShowTiming(!isOpen);
  };

  return (
    <div>
      

      
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <h2>Salon Timings</h2>
              <button className={style.closeBtn} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={style.modalBody}>
                <div className={style.TableHeader} >
                    <h3>Days</h3>
                    <div className={style.timeSlots} >
                        <h3>Opening Time</h3>
                        <h3>Closing Time</h3>
                    </div>
                </div>
              {SalonData &&
              SalonData?.working_hours.map((item)=>{
                return<>
                <div className={style.DataTableHeader} >
                    <h3>{item.day}</h3>
                    <div className={style.DatatimeSlots} >
                        <h3>{item.opening_time}</h3>
                        <h3>{item.closing_time}</h3>
                    </div>
                </div>
                </>
              })
              }
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default SalonTimingModal;

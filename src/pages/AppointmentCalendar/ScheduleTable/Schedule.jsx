import React, { useState } from 'react';
import style from './schedule.module.css';


const ScheduleTable = ({ profiles }) => {

  const [openMenus, setOpenMenus] = useState({});
  const [timeDuration, setDurations] = useState([{
    time: "6:00 AM"
  },
  {
    time: "6:00 AM"
  }, {
    time: "6:00 AM"
  },
  {
    time: "6:00 AM"
  },
  {
    time: "6:00 AM"
  },
  {
    time: "6:00 AM"
  },
  {
    time: "6:00 AM"
  }])



  const toggleMenu = (id) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: !prevOpenMenus[id]
    }));
  };

  let box = document.querySelector('#header');
  const nextProfile = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + 170;
  };

  const prevProfile = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - 170;
  };

  const convertTime = (timeString) => {
    const timeParts = timeString.split(' ');
    let totalMinutes = 0;
    let totalHeight = 72;

    for (let i = 0; i < timeParts.length; i += 2) {
      if (timeParts[i + 1] === 'hr') {
        totalMinutes += parseInt(timeParts[i], 10) * 60;
      } else if (timeParts[i + 1] === 'mins') {
        totalMinutes += parseInt(timeParts[i], 10);
      }
    }
    if (totalMinutes <= 15) {
      return totalHeight;
    }
    else if (totalMinutes <= 30) {
      return 2 * totalHeight;
    }
    else if (totalMinutes <= 45) {
      return 3 * totalHeight;
    }
    else {
      return 4 * totalHeight;
    }


  };

  return (<>
    <div className={style.durationsBox}>
      {timeDuration &&
        timeDuration.map((ele) => <p>{ele.time}</p>)}

    </div>
    <div className={style.header} >
      <button className={style.prev} onClick={nextProfile}>&#10094;</button>
      <div className={style.carousel} id='header'>
        {profiles &&

          profiles.map((profile, index) => {
            
            return (

              <div className={style.profileContainer} >
                <div key={index} className={style.profileBox}>
                  <img src={profile.stylistImage?.public_url} alt="" />
                  <p>{profile.stylistName}</p>
                </div>
                <div className={style.slides} >
                  {profile.appointments.map((ele, z) => {

                    return <>
                      {ele.services.map((item, appointmentIndex) => {

                        const heights = convertTime(item.time_takenby_service);
                        // console.log(heights);
                        return <>
                          <div className={style.appointmentBox} key={item._id} style={{
                            height: `${heights}px`,
                            backgroundColor: `${ele.color}`
                          }} >
                            <div className={style.clientDetailsBox} >

                              <div>
                                <p className={style.timeDurations} >{item.time_takenby_service}</p>
                                <p className={style.serviceNames} >{item.service_name}</p>
                                <p className={style.clientNames} >{ele.ClientName}</p>
                              </div>

                              <svg
                                onClick={() => toggleMenu(item._id)}
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                              </svg>

                              {openMenus[item._id] && (
                                <div className={style.dropdowncontent}>
                                  <div className={style.inputContainer}>
                                    <input className={style.otpBox} type="text" placeholder='OTP' />
                                    </div>
                                    <div className={style.editButton} >Edit Details </div>
                                  
                                  <div className={style.started} >Started</div>
                                  <div className={style.started} >No-Show</div>
                                  <div className={style.started} >Completed</div>
                                  <div className={style.started} >Cancel Appointment</div>
                                </div>
                              )}


                            </div>
                          </div></>

                      })}

                    </>

                  })}


                </div>
              </div>
            )
          })}
      </div>


      <button className={style.next} onClick={prevProfile} >&#10095;</button>
    </div>


  </>
  );
};

export default ScheduleTable;

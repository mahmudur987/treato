import React, { useState } from 'react';
import style from './schedule.module.css'

// ScheduleTable component
const ScheduleTable = () => {
  // Define state variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setPersons] = useState([{
    name: "first",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "krishna",
    image: "ddhfkjh"
  },
  {
    name: "last",
    image: "ddhfkjh"
  }]);
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
  let box = document.querySelector('#header');
  let box1 = document.querySelector('#slots');
  const nextProfile = () => {
    let width = box.clientWidth;
    let width1 = box1.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    box1.scrollLeft = box1.scrollLeft + width1;
  };

  const prevProfile = () => {
    let width = box.clientWidth;
    let width1 = box1.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    box1.scrollLeft = box1.scrollLeft - width1;
    // console.log(width)
  };
  return (<>
    <div className={style.header} >
      <button className={style.prev} onClick={nextProfile}>&#10094;</button>
      <div className={style.carousel} id='header'>
        {profiles.map((profile, index) => (
          <div key={index} className={style.profileBox}>
            <img width={41} height={24} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSasIydkiFM8Nmx5KTx2iAshCaV_YINqfc5TBrUhN9KA&s" alt="" />
            <p>{profile.name}{index}</p>
          </div>
        ))}
      </div>


      <button className={style.next} onClick={prevProfile} >&#10095;</button>
    </div>
    <div className={style.durationsBox}>
      {timeDuration &&
        timeDuration.map((ele) => <p>{ele.time}</p>)}

    </div>
    <div className={style.middleBox}>
      <div className={style.timeSlots} id='slots'>
        {profiles &&
          profiles.map((ele, index)=>{
            return(<div className={style.slides} >{index}

            </div>)
          })
        }
        

      </div>

    </div>
  </>
  );
};

export default ScheduleTable;

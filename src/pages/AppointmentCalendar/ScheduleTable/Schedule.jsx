import React, { useState , useEffect } from 'react';
import style from './schedule.module.css';
import { GetCalenderdata } from '../../../services/calender';

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
  
// useEffect( async ()=>{
// //  const {res, err} = await GetCalenderdata()
// //  if(res){
// //   console.log(res)
// //  }
// //  else{
// //   console.log(err);
// //  }
// },[])




  let box = document.querySelector('#header');
  const nextProfile = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + 170;
  };

  const prevProfile = () => {
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - 170;
  };
  return (<>
  <div className={style.durationsBox}>
      {timeDuration &&
        timeDuration.map((ele) => <p>{ele.time}</p>)}

    </div>
    <div className={style.header} >
      <button className={style.prev} onClick={nextProfile}>&#10094;</button>
      <div className={style.carousel} id='header'>
        {profiles.map((profile, index) => (<div className={style.profileContainer} >
          <div key={index} className={style.profileBox}>
            <img width={41} height={24} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSasIydkiFM8Nmx5KTx2iAshCaV_YINqfc5TBrUhN9KA&s" alt="" />
            <p>{profile.name}{index}</p>
          </div>
          <div className={style.slides} >{index}

          </div></div>
        ))}
      </div>


      <button className={style.next} onClick={prevProfile} >&#10095;</button>
    </div>
    
    
  </>
  );
};

export default ScheduleTable;

import React, { useEffect, useState, useRef } from "react";
import style from "./Style.module.css";
import { Link } from "react-router-dom";
import image1 from "../../../../src/assets/images/Careers/image1.png";
import image2 from "../../../../src/assets/images/Careers/placeholder.png";
import { GetPostDetails } from "../../../services/careers";
import { FaArrowRight } from "react-icons/fa6";
import { useGetCarer } from "../../../services/static";

function CurrentOpenings() {
  const [postdata, setPostData] = useState();
  const currentOpeningRef = useRef(null);
  const { data, isError, isLoading } = useGetCarer();

  const getdata = async () => {
    const { res, err } = await GetPostDetails();
    if (err) {
      console.error("Error fetching post details:", err);
      setPostData([]);
    } else {
      setPostData(res);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const scrollToCurrentOpenings = () => {
    currentOpeningRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const splitExperience = (experience) => {
    const regex = /(\d+)\s*(years?|months?|days?)/i;
    const match = experience.match(regex);
    if (match) {
      return {
        number: match[1],
        unit: match[2],
      };
    }
    return {
      number: 0,
      unit: "",
    };
  };

  return (
    <>
      <div className={style.careerBuildBox}>
        <div className={style.joinus}>
          <div className={style.subHeader}>
            <p>Careers</p>
            <h3>Join us and build the future of Treato</h3>
          </div>
          <img
            loading="lazy"
            src={image1}
            className={style.careerMimage}
            alt=""
          />
          <p className={style.para}>
            If you’re looking for a promising career in the beauty & wellness
            industry that allows you to work and make an impact in the offline
            as well as digital space, you’ve come to the right place.
          </p>
          <button
            className={style.viewPositions}
            onClick={scrollToCurrentOpenings}
          >
            <b>View open positions</b>
          </button>
        </div>
        <img loading="lazy" src={image1} className={style.careerimage} alt="" />
      </div>
      <div className={style.currentJobBox} ref={currentOpeningRef}>
        <div className={style.currentOpeningBox}>
          <h3>Current Openings</h3>
          <div className={style.jobBox}>
            {postdata &&
              postdata.jobs.map((ele) => {
                const updatedAtDate = new Date(ele.updatedAt);
                const currentDate = new Date();
                const timeDifference =
                  currentDate.getTime() - updatedAtDate.getTime();
                const daysDifference = Math.floor(
                  timeDifference / (1000 * 60 * 60 * 24)
                );
                const experience = splitExperience(ele.role_experience);
                return (
                  <div className={style.jobContainer} key={ele._id}>
                    <div className={style.infoBox}>
                      <h4>{ele.job_title}</h4>
                      <div className={style.jobDetails}>
                        <div className={style.location}>
                          <svg
                            className={`${style.locationIcons} w-6 h-6 text-gray-800 dark:text-white`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                            />
                          </svg>
                          <p>{ele.job_location}</p>
                        </div>
                        <div className={style.postDetails}>
                          <p>
                            Experience: {experience?.number}+ {experience?.unit}
                          </p>
                          <div className={style.verticalLine}></div>
                          <p>{ele.job_worffrom}</p>
                          <div className={style.verticalLine}></div>
                          <p>Posted {daysDifference} days ago</p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/careers/jobdescription/${ele._id}`}>
                      <FaArrowRight className={style.arrow} />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentOpenings;

import React, { useState } from "react";
import style from "./AboutUsDetails.module.css";
import aboutusImage from "../../../assets/images/AboutUs/aboutus.webp";
import image1 from "../../../assets/icons/Aboutus/image1.webp";
import image2 from "../../../assets/icons/Aboutus/image2.webp";
import image3 from "../../../assets/icons/Aboutus/image3.webp";
import {
  useGetAllStatus,
  useGetAllTeam,
  useGetAllTitle,
} from "../../../services/static";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
function AboutUsDetails() {
  const [toggle, setToggle] = useState(false);

  const {
    data: team,
    isLoading: teamIsLoading,
    isError: teamIsError,
  } = useGetAllTeam();

  const {
    data: status,
    isLoading: statusIsLoading,
    isError: statusIsError,
  } = useGetAllStatus();
  const {
    data: title,
    isLoading: titleIsLoading,
    isError: titleIsError,
  } = useGetAllTitle();

  const [AboutUs, OurVision] = title?.data || [];

  let box = document.querySelector("#header");
  const scrollAmountInPixels = 684;
  const nextProfile = () => {
    box?.scrollBy({ left: scrollAmountInPixels, behavior: "smooth" });
  };

  const prevProfile = () => {
    box?.scrollBy({ left: -scrollAmountInPixels, behavior: "smooth" });
  };
  const toggleOurVision = () => {
    setToggle(false);
  };
  const toggleOurMission = () => {
    setToggle(true);
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.aboutcontainer}>
          <h3 className={style.title}>About us</h3>
          <div className={style.aboutcontent}>
            <img
              loading="lazy"
              src={aboutusImage}
              className={style.imagemobile}
              alt=""
              srcset=""
            />
            <p>
              Immerse yourself in the calming ambience as we curate an oasis for
              your mind, body, and soul. We believe in the power of simplicity,
              and our spa reflects this philosophy. Every detail, from the
              soothing decor to the user-friendly online experience, is designed
              to enhance your wellness journey.Immerse yourself in the calming
              ambience as we curate an oasis for your mind, body, and soul. We
              believe in the power of simplicity, and our spa reflects this
              philosophy. Every detail, from the soothing decor to the
              user-friendly online experience, is designed to enhance your
              wellness journey.
            </p>
          </div>
          <div className={style.info}>
            <div className={style.box1}>
              <h4>500+</h4>
              <p>Salons</p>
            </div>
            <hr className={style.verticlalbar} />
            <div className={style.box2}>
              <h4>1000+</h4>
              <p>Happy Clients</p>
            </div>
            <hr className={style.verticlalbar} />
            <div className={style.box3}>
              <h4>20+</h4>
              <p>Cities Services Offered</p>
            </div>
          </div>
        </div>
        <div className={style.backeffect}></div>
        <img
          loading="lazy"
          src={aboutusImage}
          className={style.aboutimage}
          alt=""
          srcset=""
        />
        <div className={style.OurTeamBox}>
          <div className={style.ourTeamHeader}>
            <h3>Our Team</h3>
            <div  className={style.btns}>
              <div  className={style.Arrowbtn} onClick={prevProfile}>
                <svg
                  className={style.arrows}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
              </div>
              <div className={style.Arrowbtn} onClick={nextProfile}>
                <svg
                  className={style.arrows}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div  className={style.outTeamContent} id="header">
            <div  className={style.contentBox}>
              <img
                loading="lazy"
                src={image1}
                width={203}
                height={202}
                alt=""
                srcset=""
              />
              <div className={style.ourTeamInfo}>
                <h3>Krishna</h3>
                <p className={style.subHeading}>CEO, Wipro</p>
                <p className={style.contentPara}>
                  Immerse yourself in the calming ambience as we curate an oasis
                  for your mind, body, and soul. We believe in the power of
                  simplicity, and our spa reflects this philosophy. Every
                  detail, from the soothing decor to the user-friendly online
                  experience, is designed to enhance your wellness journey.
                </p>
              </div>
            </div>
            <div className={style.contentBox}>
              <img
                loading="lazy"
                src={image1}
                width={203}
                height={202}
                alt=""
                srcset=""
              />
              <div className={style.ourTeamInfo}>
                <h3>Krishna</h3>
                <p className={style.subHeading}>CEO, Wipro</p>
                <p className={style.contentPara}>
                  Immerse yourself in the calming ambience as we curate an oasis
                  for your mind, body, and soul. We believe in the power of
                  simplicity, and our spa reflects this philosophy. Every
                  detail, from the soothing decor to the user-friendly online
                  experience, is designed to enhance your wellness journey.
                </p>
              </div>
            </div>
            <div className={style.contentBox}>
              <img
                loading="lazy"
                src={image1}
                width={203}
                height={202}
                alt=""
                srcset=""
              />
              <div className={style.ourTeamInfo}>
                <h3>vivek</h3>
                <p className={style.subHeading}>CEO, Wipro</p>
                <p className={style.contentPara}>
                  Immerse yourself in the calming ambience as we curate an oasis
                  for your mind, body, and soul. We believe in the power of
                  simplicity, and our spa reflects this philosophy. Every
                  detail, from the soothing decor to the user-friendly online
                  experience, is designed to enhance your wellness journey.
                </p>
              </div>
            </div>
            <div className={style.contentBox}>
              <img
                loading="lazy"
                src={image1}
                width={203}
                height={202}
                alt=""
                srcset=""
              />
              <div className={style.ourTeamInfo}>
                <h3>Nitin</h3>
                <p className={style.subHeading}>CEO, Wipro</p>
                <p className={style.contentPara}>
                  Immerse yourself in the calming ambience as we curate an oasis
                  for your mind, body, and soul. We believe in the power of
                  simplicity, and our spa reflects this philosophy. Every
                  detail, from the soothing decor to the user-friendly online
                  experience, is designed to enhance your wellness journey.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.ourVisionBox}>
          {toggle ? (
            <>
              <div className={style.visionContentBox}>
                <img loading="lazy" src={image3} alt="" srcset="" />
                <div className={style.visionText}>
                  <h3>Our Mission</h3>
                  <img loading="lazy" src={image3} alt="" srcset="" />
                  <p className={style.ourMissionText}>
                    Immerse yourself in the calming ambience as we curate an
                    oasis for your mind, body, and soul. We believe in the power
                    of simplicity, and our spa reflects this philosophy. Every
                    detail, from the soothing decor to the user-friendly online
                    experience, is designed to enhance your wellness
                    journey.Immerse yourself in the calming ambience as we
                    curate an oasis for your mind, body, and soul.{" "}
                  </p>
                </div>
                <div className={style.togglebtn}>
                  <div
                    className={`${style.roundbtn} ${toggle ? "" : ""}`}
                    onClick={toggleOurVision}
                  ></div>
                  <div className={style.verticalLine}></div>
                  <div
                    className={`${style.roundbtn} ${
                      toggle ? style.changeColor : ""
                    }`}
                    onClick={toggleOurMission}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={style.visionContentBox}>
                <img loading="lazy" src={image2} alt="" srcset="" />
                <div className={style.visionText}>
                  <h3>Our Vision</h3>
                  <img loading="lazy" src={image2} alt="" srcset="" />
                  <p>
                    Immerse yourself in the calming ambience as we curate an
                    oasis for your mind, body, and soul. We believe in the power
                    of simplicity, and our spa reflects this philosophy. Every
                    detail, from the soothing decor to the user-friendly online
                    experience, is designed to enhance your wellness
                    journey.Immerse yourself in the calming ambience as we
                    curate an oasis for your mind, body, and soul.{" "}
                  </p>
                </div>
                <div className={style.togglebtn}>
                  <div
                    className={`${style.roundbtn} ${
                      toggle ? "" : style.changeColor
                    }`}
                    onClick={toggleOurVision}
                  ></div>
                  <div className={style.verticalLine}></div>
                  <div
                    className={style.roundbtn}
                    onClick={toggleOurMission}
                  ></div>
                </div>
              </div>
            </>
          )}
          <div className={`${style.visionContentBox} ${style.forMobileView}`}>
            <img loading="lazy" src={image3} alt="" srcset="" />
            <div className={style.visionText}>
              <h3>Our Mission</h3>
              <img loading="lazy" src={image3} alt="" srcset="" />
              <p>
                Immerse yourself in the calming ambience as we curate an oasis
                for your mind, body, and soul. We believe in the power of
                simplicity, and our spa reflects this philosophy. Every detail,
                from the soothing decor to the user-friendly online experience,
                is designed to enhance your wellness journey.Immerse yourself in
                the calming ambience as we curate an oasis for your mind, body,
                and soul.{" "}
              </p>
            </div>
            <div className={style.togglebtn}>
              <div
                className={`${style.roundbtn} ${toggle ? "" : ""}`}
                onClick={toggleOurVision}
              ></div>
              <div className={style.verticalLine}></div>
              <div
                className={`${style.roundbtn} ${
                  toggle ? style.changeColor : ""
                }`}
                onClick={toggleOurMission}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsDetails;

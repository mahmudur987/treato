import React, { useState } from "react";
import style from "./AboutUsDetails.module.css";
import aboutusImage from "../../../assets/images/AboutUs/aboutus.png";
import image1 from "../../../assets/icons/Aboutus/image1.png";
import image2 from "../../../assets/icons/Aboutus/image2.png";
import image3 from "../../../assets/icons/Aboutus/image3.png";
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
        {title && !titleIsLoading && !titleIsError && (
          <div className={style.aboutcontainer}>
            <h3 className={style.title}> {AboutUs?.title} </h3>
            <div className={style.aboutcontent}>
              <img
                src={AboutUs?.Image?.public_url}
                className={style.imagemobile}
                alt=""
                srcset=""
              />
              <p>{AboutUs?.para}</p>
            </div>
            {status && !statusIsLoading && !statusIsError && (
              <div className={style.info}>
                <div className={style.box1}>
                  <h4> {status?.data?.countSalons} </h4>
                  <p>Salons</p>
                </div>
                <hr className={style.verticlalbar} />
                <div className={style.box2}>
                  <h4> {status?.data?.happyClients} </h4>
                  <p>Happy Clients</p>
                </div>
                <hr className={style.verticlalbar} />
                <div className={style.box3}>
                  <h4> {status?.data?.citiesOffer} </h4>
                  <p>Cities Services Offered</p>
                </div>
              </div>
            )}
          </div>
        )}
        <div className={style.backeffect}></div>
        <img src={aboutusImage} className={style.aboutimage} alt="" srcset="" />
        {team && !teamIsLoading && !teamIsError && team?.data?.length > 0 && (
          <div className={style.OurTeamBox}>
            <div className={style.ourTeamHeader}>
              <h3>Our Team</h3>
              <div className={style.btns}>
                <div className={style.Arrowbtn} onClick={prevProfile}>
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
            <div className={style.outTeamContent} id="header">
              {team &&
                !teamIsLoading &&
                !teamIsError &&
                team?.data?.map((x) => (
                  <div className={style.contentBox}>
                    <img
                      src={x?.Image?.public_url}
                      width={203}
                      height={202}
                      alt=""
                      srcset=""
                    />
                    <div className={style.ourTeamInfo}>
                      <h3>{x.Mname}</h3>
                      <p className={style.subHeading}>{x.Mposition}</p>
                      <p className={style.contentPara}>{x?.Mdetail}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {teamIsLoading && <LoadSpinner />}

        {title && !titleIsLoading && !titleIsError && (
          <div className={style.ourVisionBox}>
            {toggle ? (
              <>
                <div className={style.visionContentBox}>
                  <img src={image3} alt="" srcset="" />
                  <div className={style.visionText}>
                    <h3>Our Mission</h3>
                    <img src={image3} alt="" srcset="" />
                    <p className={style.ourMissionText}>
                      Immerse yourself in the calming ambience as we curate an
                      oasis for your mind, body, and soul. We believe in the
                      power of simplicity, and our spa reflects this philosophy.
                      Every detail, from the soothing decor to the user-friendly
                      online experience, is designed to enhance your wellness
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
                  <img src={image2} alt="" srcset="" />
                  <div className={style.visionText}>
                    <h3> {OurVision?.title} </h3>
                    <img src={OurVision?.Image?.public_url} alt="" srcset="" />
                    <p>{OurVision?.para}</p>
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
              <img src={image3} alt="" srcset="" />
              <div className={style.visionText}>
                <h3>Our Mission</h3>
                <img src={image3} alt="" srcset="" />
                <p>
                  Immerse yourself in the calming ambience as we curate an oasis
                  for your mind, body, and soul. We believe in the power of
                  simplicity, and our spa reflects this philosophy. Every
                  detail, from the soothing decor to the user-friendly online
                  experience, is designed to enhance your wellness
                  journey.Immerse yourself in the calming ambience as we curate
                  an oasis for your mind, body, and soul.{" "}
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
        )}
      </div>
    </>
  );
}

export default AboutUsDetails;

import React, { useRef, useState, useEffect } from "react";
// import styles"./Slider.module.css";
import styles from "./styles.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Makeup,
  fingernail,
  hair,
  hairRemoval,
  massage,
  skincare,
  spa,
} from "../../../assets/images/recommendImages";
import Title from "../../Typography/Title/Title";
import { getAllServices } from "../../../services/Services";

export default function RecommendedSection({ mainData }) {
  const [allServices, setAllServices] = useState([]);
  const [error, setError] = useState(null);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 }, // Adjust this for better mobile display
  };

  const CustomDot = ({ onMove, index, onClick, active }) => {
    return (
      <button
        className={`${styles.carouselDot} ${active ? styles.dotActive : ""}`}
        onClick={() => onClick()}
      ></button>
    );
  };
  const CustomRight = ({ onClick }) => (
    <button className={styles.rightArrow} onClick={onClick}></button>
  );
  const CustomLeft = ({ onClick }) => (
    <button className={styles.leftArrow} onClick={onClick}></button>
  );

  //api fetching
  useEffect(() => {
    // Call the getAllServices function when the component mounts
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();

        if (res) {
          // If the request was successful, update the state with the data

          const uniqueDataArray = res?.data?.data.reduce(
            (uniqueArray, currentItem) => {
              // Check if there's already an object with the same 'name' in uniqueArray
              if (
                !uniqueArray.some(
                  (item) => item.service_name === currentItem.service_name
                )
              ) {
                // If not found, add this object to uniqueArray
                uniqueArray.push(currentItem);
              }
              return uniqueArray;
            },
            []
          );

          setAllServices(uniqueDataArray); // Assuming the response data contains a "data" property
        } else {
          // If there was an error, handle it and set the error state
          setError(err);
        }
      } catch (error) {
        // Handle unexpected errors here
        setError(error);
      }
    }

    fetchAllServices();
  }, []);

  return (
    <section id="recommended" className={styles.container}>
      <div className={styles.recommended}>
        <Title>Recommended for you</Title>
        <Carousel
          responsive={responsive}
          customRightArrow={<CustomRight />}
          customLeftArrow={<CustomLeft />}
          showDots={true}
          removeArrowOnDeviceType={["mobile"]}
          dotListClass={styles["custom-dot-list-style"]}
          className={styles.rmdWrapper}
          draggable={false}
          swipeable={false}
          renderDotsOutside
          customDot={<CustomDot />}
        >
          {allServices.map((service, index) => (
            <a key={index} className={styles.rmdItem}>
              <img
                src={service?.service_img?.public_url ?? fingernail}
                alt={service.service_name[0]}
              />
              <h4>{service.service_name}</h4>
            </a>
          ))}
        </Carousel>
        {/* <div className={styles.rmdWrapperMobo}>
        {allServices.map((service, index) => (
            <a key={index} className={styles.rmdItem}>
              <img src={service?.service_img?.public_url} alt={service.service_name[0]} />
              <h4>{service.service_name}</h4>
            </a>
          ))}
        </div> */}
      </div>
    </section>
  );
}

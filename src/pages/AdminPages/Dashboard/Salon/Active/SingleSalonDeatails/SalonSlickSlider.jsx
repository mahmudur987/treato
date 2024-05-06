import styles from "./SalonSlickSlider.module.css";
import Slider from "react-slick";

import { useRef, useState } from "react";
export default function SalonSlickSLider({ SalonData }) {
  let [activeImg, updateActiveImg] = useState(0);
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    afterChange: (current) => {
      updateActiveImg(current);
    },
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className={styles.mainContainer}>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {SalonData?.salon_image?.map((v, i) => {
          return <img src={v.public_url} alt="salon image" key={i} />;
        })}
      </Slider>
      <p onClick={next} className={styles.next}></p>
      <p onClick={previous} className={styles.prev}></p>
      <div className={styles.salon_slider_index}>
        {activeImg + 1}/{SalonData?.salon_image?.length}
      </div>
    </div>
  );
}

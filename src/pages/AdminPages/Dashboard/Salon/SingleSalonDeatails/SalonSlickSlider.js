import styles from "./SalonSlickSlider.module.css";
import Slider from "react-slick";

import { useState } from "react";
export default function SalonSlickSLider({
  gallery,
  setShowGallery,
  SalonData,
}) {
  let [activeImg, updateActiveImg] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.mainContainer}>
      <Slider {...settings}>
        <div>1</div>
        <div>12</div>
        <div>123</div>
      </Slider>

      <div
        className={styles.salon_slider_index}
        onClick={() => setShowGallery(true)}
      >
        {activeImg + 1}/{SalonData?.salon_Img?.length}
      </div>
    </div>
  );
}

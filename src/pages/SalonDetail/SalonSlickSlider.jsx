import styles from "./SalonDetail.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SalonSlickSlider.css";
import { memo, useState } from "react";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",

        color: "black",
      }}
      onClick={onClick}
    />
  );
}
export default function SalonSlickSLider({
  gallery,
  setShowGallery,
  SalonData,
}) {
  let [activeImg, updateActiveImg] = useState(0);

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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      {SalonData ? (
        <Slider {...settings}>
          {SalonData?.salon_Img?.map((v, i) => {
            return (
              <div>
                <img loading="lazy"
                  src={v.public_url}
                  alt="salon images"
                  key={i}
                  width={400}
                  height={400}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        ""
      )}
      <div
        className={styles.salon_slider_index}
        onClick={() => setShowGallery(true)}
      >
        {activeImg + 1}/{SalonData?.salon_Img?.length}
      </div>
    </>
  );
}

export const MemoizeSalonSlickSlider = memo(SalonSlickSLider);

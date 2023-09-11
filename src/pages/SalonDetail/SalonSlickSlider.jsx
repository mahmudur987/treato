import slide1 from "../../assets/images/SalonDetail/slide1.png"
import slide2 from "../../assets/images/SalonDetail/slide2.png"
import slide3 from "../../assets/images/SalonDetail/slide3.png"
import slide4 from "../../assets/images/SalonDetail/slide4.png"
import styles from './SalonDetail.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SalonSlickSlider.css'
import { useState } from 'react'

export default function SalonSlickSLider() {
    let [activeImg, updateActiveImg] = useState(0)

    const settings = {
        afterChange: (current) => {
            updateActiveImg(current)
        },
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    const Images = [
        { img: slide1 },
        { img: slide2 },
        { img: slide3 },
        { img: slide4 },
    ]

    return (
        <>
            <Slider {...settings}>
                {
                    Images.map((v, i) => {
                        return (
                            <img src={v.img} alt="" key={i} />
                        )
                    })
                }
            </Slider>
            <div className={styles.salon_slider_index}>
                {activeImg + 1}/{Images.length}
            </div>
        </>
    )
}
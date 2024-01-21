import styles from './SalonDetail.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SalonSlickSlider.css'
import { useState } from 'react'

export default function SalonSlickSLider({gallery,setShowGallery,SalonData}) {
    let [activeImg, updateActiveImg] = useState(0)

    const settings = {
        afterChange: (current) => {
            updateActiveImg(current)
        },
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    return (
        <>
        {
            SalonData?
            <Slider {...settings}>
                {
                    SalonData?.salon_Img?.map((v, i) => {
                        return (
                            <img src={v.public_url} alt="salon image" key={i} />
                        )
                    })
                }
            </Slider>
            :
            ''
        }
            <div className={styles.salon_slider_index} onClick={()=>setShowGallery(true)}>
                {activeImg + 1}/{SalonData?.salon_Img?.length}
            </div>
        </>
    )
}
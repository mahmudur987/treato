import styles from './SalonDetail.module.css'
import star from "../../assets/images/SalonDetail/star_line.svg"
import ellipse from "../../assets/images/SalonDetail/Ellipse.svg"
import slide1 from "../../assets/images/SalonDetail/slide1.png"
import slide2 from "../../assets/images/SalonDetail/slide2.png"
import slide3 from "../../assets/images/SalonDetail/slide3.png"
import slide4 from "../../assets/images/SalonDetail/slide4.png"
import slide5 from "../../assets/images/SalonDetail/slide5.png"
import SalonMain from '../../components/SalonDetail/SalonMain/SalonMain'
import SalonCard from '../../components/SalonDetail/SalonCard/SalonCard'
import BackButton from '../../components/Buttons/BackButton/BackButton'
import BookNow from '../../components/SalonDetail/BookNow/BookNow'
import SalonSlickSLider from './SalonSlickSlider'
import SalonGallery from '../../components/SalonDetail/SalonGallery/SalonGallery'
import { useState } from 'react'

export default function SalonDetail() {
    const gallery = [slide1, slide2, slide3, slide4, slide5, slide1, slide2, slide3, slide4, slide5, slide1, slide2, slide3, slide4, slide5, slide1, slide2, slide3, slide4, slide5];
    let [showGallery, setShowGallery] = useState(false)

    return (
        <div className={showGallery ? `${styles.salon_page} ${styles.overHidden}` : styles.salon_page}>
            <BackButton />
            <div className={styles.salon_pcView}>
                <div className={styles.salon_name}>
                    She Hair & Beauty
                </div>
                <div className={styles.salon_info}>
                    <div className={styles.salon_star}>4.8 <img src={star} alt="" /></div>
                    <div>(1,361 ratings)</div>
                    <img src={ellipse} alt="" />
                    <div>Ejipura, Bengaluru (570 m away)</div>
                </div>
            </div>
            <div className={styles.salon_images}>
                <div className={`${styles.salon_image_slider} salon_slick`}>
                    <SalonSlickSLider setShowGallery={setShowGallery} gallery={gallery} />
                </div>
                <div className={styles.salon_images_right}>
                    <img src={slide2} alt="" />
                    <img src={slide3} alt="" />
                    <img src={slide4} alt="" />
                    <div className={styles.salon_imagesA}>
                        <div onClick={() => setShowGallery(true)}>
                            <div>View <span>22</span></div>
                            <div>images</div>
                        </div>
                        <img src={slide5} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.salon_mobView}>
                <div className={styles.salon_name}>
                    She Hair & Beauty
                </div>
                <div className={styles.salon_info}>
                    <div className={styles.salon_star}>4.8 <img src={star} alt="" /> (1,361 ratings)</div>
                    <div className={styles.salon_infoA}>
                        <div>Ejipura, Bengaluru (570 m away)</div>
                        <div>View map</div>
                    </div>
                    <div className={styles.salon_infoB}>
                        <div>Closed</div>
                        <img src={ellipse} alt="" />
                        <div>Opens 9:00 AM Monday</div>
                    </div>
                </div>
            </div>
            <div className={styles.salon_middle}>
                <SalonMain />
                <SalonCard />
            </div>
            <div className={styles.book_flowMob}>
                <BookNow SalonDetails={true} />
            </div>
            {
                showGallery ?
                    <SalonGallery gallery={gallery} setShowGallery={setShowGallery} />
                    :
                    ''
            }
        </div>
    )
}
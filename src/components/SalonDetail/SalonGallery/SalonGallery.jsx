import styles from './SalonGallery.module.css'
import './SalonCarousel.css'
import arrowleft from '../../../assets/images/icons/white-arrow-left.svg'
import blackArrowleft from '../../../assets/images/icons/arrow-left.svg'
import blackArrowright from '../../../assets/images/icons/arrow-right.svg'
import cross from '../../../assets/images/icons/white-cross.svg'
import SalonGalleryCard from '../../Cards/SalonGalleryCard/SalonGalleryCard'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { useState } from 'react';

export default function SalonGallery({ gallery, setShowGallery }) {
    let winWidth = window.innerWidth;
    let [lightBox, setLightBox] = useState(
        {
            open: false,
            index: 0,
            src: ''
        }
    )
    const images = gallery.map((v) => ({
        src: v
    }));
    if (lightBox.src !== '') {
        gallery.map((v, i) => {
            if (lightBox.src === v) {
                lightBox.index = i
            }
        })
    }
    return (
        <div className={styles.salon_GalleryMain}>
            {
                lightBox.open&&winWidth>767 ?
                    <div className={'salon_LightBox'}>
                        <img src={cross} alt="" className={styles.lightBoxClose} onClick={() => setLightBox({ open: false, index: 0, src: '' })} />
                        <Carousel canAutoPlay={false} index={lightBox.index} images={images} style={{ height: 500, width: 800 }} isMaximized={true} hasSizeButton={false} hasMediaButton={false} hasIndexBoard={false} leftIcon={<img src={blackArrowleft} alt="" className={styles.lightBoxLeft} />} rightIcon={<img src={blackArrowright} alt="" className={styles.lightBoxRight} />} />
                    </div>
                    :
                    <>
                        <div className={styles.salon_GalleryA}>
                            <div>
                                <img src={arrowleft} alt="" onClick={() => setShowGallery(false)} />
                                <div>Images {" "}<span>({gallery ? gallery.length : ''})</span></div>
                            </div>
                            <div>
                                <img src={cross} alt="" onClick={() => setShowGallery(false)} />
                            </div>
                        </div>
                        <div className={styles.salon_GalleryB}>
                            {
                                gallery ?
                                    gallery.map((v, i) => {
                                        return (
                                            <SalonGalleryCard image={v} key={i} setLightBox={setLightBox} />
                                        )
                                    })
                                    :
                                    ''
                            }
                        </div>
                    </>

            }
        </div>
    )
}

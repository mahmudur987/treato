import React, { useState } from 'react';
import sty from "./SalonPictures.module.css";
import arrowLeft from "../../../../assets/images/AccountSettings/arrow-left.svg";
import slide1 from "../../../../assets/images/partner/partnerSetting/Edit_Picture (3).png";
import slide2 from "../../../../assets/images/SalonDetail/slide1.png";
import slide3 from "../../../../assets/images/partner/partnerSetting//Edit_Picture (1).png";
import slide4 from "../../../../assets/images/SalonDetail/slide4.png";
import slide5 from "../../../../assets/images/SalonDetail/slide5.png";
import moreVertical from "../../../../assets/images/AccountSettings/more-vertical.svg";
import RightIcon from "../../../../assets/images/AccountSettings/chevron-right.svg";
import { Link } from 'react-router-dom';
import SalonPicModal from '../../../../components/_modals/SalonePic/SalonPicModal';

const Pictures = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide2,
    slide4,
    slide3,
    slide2,
    slide5,
    slide3,
    slide5,
    slide4,
];

const PicturesGallery = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const toggleModalOpen = (index) => {
        setSelectedImageIndex(index);
        setIsOpen(true);
    };

    const toggleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={sty.container}>
                <div className={sty.imgarrowLeft}>
                    <Link to={"/service/PartnerAccountSetting"}>
                        <img src={arrowLeft} alt="arrowLeft" className={sty.Pictures} />
                    </Link>
                    Pictures
                </div>

                <div className={sty.gridContainer}>
                    {Pictures.map((item, i) => (
                        <div key={i} className={sty.mapPic}>
                            <img
                                src={item}
                                alt=""
                                className={sty.mapPic}
                                onMouseEnter={() => setIsHovered(true)}
                                // onMouseLeave={() => setIsHovered(false)}
                                onClick={isHovered ? () => toggleModalOpen(i) : undefined}
                            />
                            {item !== slide1 && isHovered && (
                                <img
                                    src={moreVertical}
                                    alt="moreVertical"
                                    className={sty.modalLeft}
                                    onClick={() => toggleModalOpen(i)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isOpen && <SalonPicModal toggleModalClose={toggleModalClose} selectedIndex={selectedImageIndex} />}
        </>
    );
};

export default PicturesGallery;

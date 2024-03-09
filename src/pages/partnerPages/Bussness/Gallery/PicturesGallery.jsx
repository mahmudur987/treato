import React, { useState } from 'react';
import sty from "./SalonPictures.module.css";
import arrowLeft from "../../../../assets/images/AccountSettings/arrow-left.svg";
import moreVertical from "../../../../assets/images/AccountSettings/more-vertical.svg";
import { Link } from 'react-router-dom';
import slide1 from "../../../../assets/images/partner/partnerSetting/Edit_Picture (3).png";
import slide2 from "../../../../assets/images/SalonDetail/slide1.png";
import slide3 from "../../../../assets/images/partner/partnerSetting//Edit_Picture (1).png";

const Pictures = [
    {
        id: '2',
        img: slide2
    },
    {
        id: '3',
        img: slide3
    },
    {
        id: '4',
        img: slide2
    },
    {
        id: '5',
        img: slide3
    },
    {
        id: '6',
        img: slide2
    },
    {
        id: '7',
        img: slide3
    },
    {
        id: '8',
        img: slide2
    },
    {
        id: '9',
        img: slide3
    },
];

const PicturesGallery = () => {
    const [isOpen, setIsOpen] = useState(null);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

    const toggleDropdown = (index) => {
        setHoveredImageIndex(index);
        setIsOpen(index); // Open dropdown when hovering over the image
    };

    const closeDropdown = () => {
        setHoveredImageIndex(null);
        setIsOpen(null); // Close dropdown when mouse leaves the image
    };

    return (
        <>
            <div className={sty.container}>
                <div className={sty.imgarrowLeft}>
                    <Link to={"/partner/dashboard/PartnerAccountSetting"}>
                        <img src={arrowLeft} alt="arrowLeft" className={sty.Pictures} />
                    </Link>
                    Pictures
                </div>

                <div className={sty.gridContainer}>
                    <div className={sty.UploadImg}>
                        <img src={slide1} alt="slide1" className={sty.UploadInp} />

                    </div>
                    {Pictures.map((item, i) => (
                        <div key={i} className={sty.mapPic} onMouseLeave={closeDropdown}>
                            <img
                                src={item.img}
                                alt="img"
                                className={sty.mapPic}
                                onMouseEnter={() => toggleDropdown(i)}
                            />
                            {hoveredImageIndex === i && isOpen === i && (
                                <div className={sty.dropdownContainer}>
                                    <div className={sty.dropdown}>
                                        <button className={sty.dropbtn}>
                                            <img
                                                src={moreVertical}
                                                alt="moreVertical"
                                                className={sty.modalLeft}
                                            />
                                        </button>

                                        <div className={sty.dropdownContent}>
                                            <a href="/" className={sty.dropdownContentA}>Make Primary</a>
                                            <a href="/" className={sty.dropdownContentA}>Replace</a>
                                            <a href="/" className={sty.Delete}>Delete</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PicturesGallery;



import React, { useRef, useState } from "react";
import sty from "./SalonPictures.module.css";
import arrowLeft from "../../../../assets/images/AccountSettings/arrow-left.svg";
import moreVertical from "../../../../assets/images/AccountSettings/more-vertical.svg";
import { Link } from "react-router-dom";
import slide1 from "../../../../assets/images/partner/partnerSetting/Edit_Picture (3).png";

import { useSingleSalon } from "../../../../services/salon";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";

const PicturesGallery = () => {
  const { data, isLoading, isError, error, refetch } = useSingleSalon();
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const toggleDropdown = (index, item) => {
    setHoveredImageIndex(index);
    setKey(item.key);
  };

  const closeDropdown = () => {
    setHoveredImageIndex(null);
    setIsOpen(null);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const formData = new FormData();
    Array.from(event.target.files).forEach((image) => {
      formData.append(`salon_Img`, image);
    });

    let url = "salon/uploadImages ";
    setLoading(true);
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    try {
      const { data } = await axiosInstance.post(url, formData, { headers });
      console.log(data);
      refetch();
      toast.success("Images upload successfully");
    } catch (error) {
      toast.error(error ? error.message : "Error happen");
    }

    setLoading(false);
  };

  const handleReplaceImg = async (e) => {
    const replaceImage = e.target.files[0];
    if (!replaceImage) {
      return toast.error("please select a image");
    } else {
      setLoading(true);
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const formData = new FormData();
      formData.append("salon_Img", replaceImage);
      try {
        const { data } = await axiosInstance.put(
          `salon/updateSalonImg?key=${key}`,
          formData,
          { headers }
        );
        console.log(data);
        refetch();
        setIsOpen(0);

        toast.success("Image replace successfully");
      } catch (error) {
        toast.error(error ? error.message : "Error happen");
      }

      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    try {
      const { data } = await axiosInstance.delete(
        `salon/deleteSalonImg?key=${key}`,

        { headers }
      );
      console.log(data);
      refetch();
      setIsOpen(0);

      toast.success("image delete successfully");
    } catch (error) {
      toast.error(error ? error.message : "Error happen");
    }
    setLoading(false);
  };
  const handleMakePrimary = async () => {
    setLoading(true);
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    try {
      const { data } = await axiosInstance.patch(
        `salon/markImagePrimary?key=${key}`,
        {},
        { headers }
      );
      console.log(data);
      refetch();
      setIsOpen(0);
      toast.success("make this image primary successfully");
    } catch (error) {
      toast.error(error ? error.message : "Error happen");
    }
    setLoading(false);
  };

  if (isLoading || loading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <ErrorComponent message={error ? error : "Error"} />;
  }

  return (
    <>
      <div className={sty.container}>
        <div className={sty.imgarrowLeft}>
          <Link to={"/partner/dashboard/serviceBussness"}>
            <img loading="lazy" src={arrowLeft} alt="arrowLeft" className={sty.Pictures} />
          </Link>
          Pictures
        </div>

        <div className={sty.gridContainer}>
          <div onClick={handleFileUpload} className={sty.UploadImg}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
            <img loading="lazy" src={slide1} alt="slide1" className={sty.UploadInp} />
          </div>
          {data &&
            !isError &&
            data?.salon?.salon_Img
              ?.sort((a, b) => {
                if (a.isPrimary && !b.isPrimary) return -1; // a is primary, b is not
                if (!a.isPrimary && b.isPrimary) return 1; // b is primary, a is not
                return 0; // both are primary or both are not primary
              })
              .map((item, i) => (
                <div
                  key={i}
                  className={sty.mapPic}
                  onMouseLeave={closeDropdown}
                >
                  <img loading="lazy"
                    src={item.public_url}
                    alt="img"
                    className={sty.mapPic}
                    onMouseEnter={() => toggleDropdown(i, item)}
                  />
                  {hoveredImageIndex === i && (
                    <div className={sty.dropdownContainer}>
                      <div className={sty.dropdown}>
                        <button
                          className={sty.dropbtn}
                          onClick={() =>
                            setIsOpen((pre) => (pre === i ? 0 : i))
                          }
                        >
                          <img loading="lazy"
                            src={moreVertical}
                            alt="moreVertical"
                            className={sty.modalLeft}
                          />
                        </button>

                        {isOpen === i && (
                          <div className={sty.dropdownContent}>
                            <button
                              onClick={handleMakePrimary}
                              className={sty.dropdownContentA}
                            >
                              Make Primary
                            </button>
                            <input
                              type="file"
                              ref={replaceInputRef}
                              style={{ display: "none" }}
                              onChange={handleReplaceImg}
                            />
                            <button
                              onClick={() => replaceInputRef.current.click()}
                              className={sty.dropdownContentA}
                            >
                              Replace
                            </button>
                            <button
                              onClick={handleDelete}
                              className={sty.Delete}
                            >
                              Delete
                            </button>
                          </div>
                        )}
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

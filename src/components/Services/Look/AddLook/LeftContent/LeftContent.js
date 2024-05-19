import React, { useContext, useRef } from "react";
import styles from "./LeftContent.module.css";
import { addLookContext } from "../../../../../pages/partnerPages/Look/AddALook/AddLook";
import { FaImage } from "react-icons/fa6";
import replace from "../../../../../assets/icons/partner/replace.png";
const LeftContent = () => {
  const { image, setImage } = useContext(addLookContext);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Style image</h2>

      <p className={styles.description}>
        Add a real customer image from your salon which showcases the look
      </p>

      <div className={styles.uploadContainer}>
        {image ? (
          <div className={styles.preview}>
            <img src={image} alt="Preview" className={styles.image} />

            <div className={styles.replace} onClick={handleButtonClick}>
              <img className={styles.replaceIcon} src={replace} />
              <button type="button">Replace Image</button>
            </div>
          </div>
        ) : (
          <div className={styles.upload}>
            <span className={styles.imageIcon}>
              <FaImage />
            </span>

            <button onClick={handleButtonClick} className={styles.uploadButton}>
              Upload Image
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default LeftContent;

import React, { useState } from "react";
import styles from "./ProfilePicture.module.css";
import camera from "../../../assets/images/icons/cameraIcon.svg";
const ProfilePicture = ({ placeholderImage, onImageSubmit }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ file, preview: imageUrl });
      onImageSubmit(file);
    }
  };

  const handleSubmit = () => {
    if (image?.file) {
      onImageSubmit(image.file); // Pass the image file to the parent component
    } else {
      alert("No image selected!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={image?.preview || placeholderImage}
          alt="Profile"
          className={styles.image}
        />
        <label className={styles.uploadButton}>
          <img src={camera} alt="" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePicture;

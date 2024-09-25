import React, { useEffect, useState } from "react";
import styles from "./ChangeProfile.module.css";
import Grey_Close from "../../../assets/images/icons/Grey_Close.svg";
import gallery from "../../../assets/images/icons/gallery.svg";
import camera from "../../../assets/images/icons/camera.svg";
import deleteIcon from "../../../assets/images/icons/deleteIcon.svg";
import userImg from "../../../assets/images/AccountSettings/userImg.png";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";

export default function ChangeProfile({
  setProfileModal,
  updateInputVal,
  inputVal,
  setShowSave,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const userDetails = useSelector((state) => state?.user?.user);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = React.useRef(null);

  useEffect(() => {
    setSelectedImage(userDetails?.avatar?.public_url);
  }, [userDetails]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setSelectedImage(imageDataUrl);
        const avatar = { public_url: imageDataUrl };
        updateInputVal({ ...inputVal, avatar, avatarFile: file });
        setShowSave(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    const avatar = { public_url: "" };
    setSelectedImage(null);
    updateInputVal({ ...inputVal, avatar });
  };

  const capture = React.useCallback(() => {
    const imageDataUrl = webcamRef.current.getScreenshot();
    setIsCameraOpen(false);
    setSelectedImage(imageDataUrl);
    const avatar = { public_url: imageDataUrl };
    updateInputVal({ ...inputVal, avatar });
    setShowSave(true);
  }, [webcamRef, updateInputVal, inputVal, setShowSave]);

  const handleCancel = () => {
    setProfileModal(false);
  };

  const handleSave = () => {
    setProfileModal(false);
  };

  const videoConstraints = {
    width: "80vw",
    height: "60vh",
    facingMode: "user",
  };

  return (
    <div className={`${styles.profileMain} `}>
      {isCameraOpen && (
        <div className={styles.webcamContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture</button>
        </div>
      )}
      <div
        className={`${styles.profileA} ${isCameraOpen ? styles.hidden : ""}`}
      >
        <div className={styles.profileB}>
          <div className={styles.profileBA}>Profile picture</div>
          <div className={styles.profileBB}>
            <img
              loading="lazy"
              src={Grey_Close}
              alt=""
              onClick={handleCancel}
            />
          </div>
        </div>
        <div className={styles.profileC}>
          <img loading="lazy" src={selectedImage || userImg} alt="" />
        </div>
        <div className={styles.profileD}>
          <div className={styles.profileDA} htmlFor="uploadImageInput">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.mageUpload}
              id="uploadImageInput"
            />
            <label htmlFor="uploadImageInput" className={styles.uploadLabel}>
              <div className={styles.profileDAA}>
                <img loading="lazy" src={gallery} alt="gallery" />
              </div>
              <div>Upload</div>
            </label>
          </div>
          <div
            className={styles.profileDA}
            onClick={() => setIsCameraOpen(true)}
          >
            <div className={styles.profileDAA}>
              <img loading="lazy" src={camera} alt="camera" />
            </div>
            <div>Camera</div>
          </div>
          <div className={styles.profileDA} onClick={handleDelete}>
            <div className={styles.profileDAA}>
              <img loading="lazy" src={deleteIcon} alt="deleteIcon" />
            </div>
            <div>Delete</div>
          </div>
        </div>
        <div className={styles.saveButtons}>
          <SecondaryButton className={styles.cancelbtn} onClick={handleCancel}>
            Cancel
          </SecondaryButton>
          <PrimaryButton className={styles.cancelbtn} onClick={handleSave}>
            Update
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

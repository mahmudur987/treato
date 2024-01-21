import React, { useEffect, useState } from 'react'
import styles from './ChangeProfile.module.css'
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg'
import gallery from '../../../assets/images/icons/gallery.svg'
import camera from '../../../assets/images/icons/camera.svg'
import deleteIcon from '../../../assets/images/icons/deleteIcon.svg'
import userImg from "../../../assets/images/AccountSettings/userImg.png"
import { useSelector } from 'react-redux'
import Webcam from "react-webcam";
export default function ChangeProfile({setProfileModal,updateInputVal, inputVal,setShowSave}) {
    const [selectedImage, setSelectedImage] = useState(null);
  const userDetails = useSelector((state) => state?.user?.user);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        setSelectedImage(userDetails?.avatar?.public_url)
    }, [userDetails])
    
    const handleImageUpload = (e) => {
        console.log("assa");
        const file = e.target.files[0];
        console.log(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageDataUrl = reader.result;
            // Update the state with the selected image data
            setSelectedImage(imageDataUrl);
            let avatar={public_url:imageDataUrl}
            console.log({...inputVal,avatar});
            updateInputVal({...inputVal,avatar,avatarFile:file})
            console.log(imageDataUrl);
            setShowSave(true)
          };
          reader.readAsDataURL(file);
        }
      };
      const handleDelete=()=>{
          let avatar={public_url:""}
          setSelectedImage(null)
         updateInputVal({...inputVal,avatar})
      }
      const videoConstraints = {
        width: "80vw",
        height: "60vh",
        facingMode: "user"
      };
      const webcamRef = React.useRef(null);
      const capture = React.useCallback(
        () => {
          const imageDataUrl = webcamRef.current.getScreenshot();
          console.log(imageDataUrl);
          setIsCameraOpen(false)
          setSelectedImage(imageDataUrl);
          let avatar={public_url:imageDataUrl}
          updateInputVal({...inputVal,avatar})
          setShowSave(true)
        },
        [webcamRef]
      );
    return (
        <div className={`${styles.profileMain} `}>
  {isCameraOpen &&       <div className={styles.webcamContainer}>
             <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
<button onClick={capture}>Capture</button>
            </div>}
            <div className={`${styles.profileA} ${isCameraOpen?styles.hidden:""}`}>
                <div className={styles.profileB}>
                    <div className={styles.profileBA}>Profile picture</div>
                    <div className={styles.profileBB}><img src={Grey_Close} alt="" onClick={()=>setProfileModal(false)}/></div>
                </div>
                <div className={styles.profileC}>
                <img src={selectedImage || userImg} alt="" />
                </div>
                <div className={styles.profileD}>
                    <div className={styles.profileDA} htmlFor="uploadImageInput">
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="uploadImageInput" />
                    <label htmlFor="uploadImageInput" className={styles.uploadLabel}>
                        <div className={styles.profileDAA}><img src={gallery} alt="gallery" /></div>
                        <div>Upload</div>
                    </label>
                    </div>
                    <div className={styles.profileDA} onClick={()=>setIsCameraOpen(true)}>
                        <div className={styles.profileDAA}><img src={camera} alt="camera" /></div>
                        <div>Camera</div>
                    </div>
                    <div className={styles.profileDA} onClick={handleDelete}>
                        <div className={styles.profileDAA}><img src={deleteIcon} alt="deleteIcon" /></div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

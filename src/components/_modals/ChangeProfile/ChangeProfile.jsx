import React from 'react'
import styles from './ChangeProfile.module.css'
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg'
import gallery from '../../../assets/images/icons/gallery.svg'
import camera from '../../../assets/images/icons/camera.svg'
import deleteIcon from '../../../assets/images/icons/deleteIcon.svg'
import userImg from "../../../assets/images/AccountSettings/userImg.png"

export default function ChangeProfile({setProfileModal}) {
    return (
        <div className={styles.profileMain}>
            <div className={styles.profileA}>
                <div className={styles.profileB}>
                    <div className={styles.profileBA}>Profile picture</div>
                    <div className={styles.profileBB}><img src={Grey_Close} alt="" onClick={()=>setProfileModal(false)}/></div>
                </div>
                <div className={styles.profileC}>
                    <img src={userImg} alt="" />
                </div>
                <div className={styles.profileD}>
                    <div className={styles.profileDA}>
                        <div className={styles.profileDAA}><img src={gallery} alt="gallery" /></div>
                        <div>Upload</div>
                    </div>
                    <div className={styles.profileDA}>
                        <div className={styles.profileDAA}><img src={camera} alt="camera" /></div>
                        <div>Camera</div>
                    </div>
                    <div className={styles.profileDA}>
                        <div className={styles.profileDAA}><img src={deleteIcon} alt="deleteIcon" /></div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

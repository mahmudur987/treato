import React from 'react'
import styles from './ShareBlog.module.css'
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg'
import facebook_black from "../../../assets/images/icons/facebook_black.svg"
import twitter_black from "../../../assets/images/icons/twitter_black.svg"
import linkedin_black from "../../../assets/images/icons/linkedin_black.svg"
import instagram_black from "../../../assets/images/icons/instagram_black.svg"

export default function ShareBlog({setShareModal}) {
    return (
        <div className={styles.shareMain}>
            <div className={styles.shareA}>
                <div className={styles.shareB}>
                    <img src={Grey_Close} alt="close" onClick={()=>setShareModal(false)}/>
                </div>
                <div className={styles.shareC}>
                Share blog via
                </div>
                <div className={styles.shareD}>
                    <div className={styles.shareDA}>
                        <div className={styles.shareDAA}><img src={facebook_black} alt="facebook" /></div>
                        <div>Facebook</div>
                    </div>
                    <div className={styles.shareDA}>
                        <div className={styles.shareDAA}><img src={twitter_black} alt="twitter" /></div>
                        <div>Twitter</div>
                    </div>
                    <div className={styles.shareDA}>
                        <div className={styles.shareDAA}><img src={linkedin_black} alt="linkedin" /></div>
                        <div>LinkedIn</div>
                    </div>
                    <div className={styles.shareDA}>
                        <div className={styles.shareDAA}><img src={instagram_black} alt="instagram" /></div>
                        <div>Instagram</div>
                    </div>
                </div>
                <div className={styles.shareE}>
                    <div className={styles.shareEA}>www.treato.in/share/brand/d67h3...</div>
                    <div className={styles.shareEB}>Copy link</div>
                </div>
            </div>
        </div>
    )
}

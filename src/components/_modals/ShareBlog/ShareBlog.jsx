import React from "react";
import styles from "./ShareBlog.module.css";
import Grey_Close from "../../../assets/images/icons/Grey_Close.svg";
import facebook_black from "../../../assets/images/icons/facebook_black.svg";
import twitter_black from "../../../assets/images/icons/twitter_black.svg";
import linkedin_black from "../../../assets/images/icons/linkedin_black.svg";
import instagram_black from "../../../assets/images/icons/instagram_black.svg";
import { toast } from "react-toastify";

export default function ShareBlog({ setShareModal, BlogUrl }) {

const shareModal=()=>{
  setShareModal(false)
}
const navigateBlog =()=>{
  navigator.clipboard.writeText(BlogUrl ? BlogUrl : "");
              toast.success("Copied URL");
}
  return (
    <div className={styles.shareMain}>
      <div className={styles.shareA}>
        <div className={styles.mob_d_none}>
          <div className={styles.shareB}>
            <img
              loading="lazy"
              src={Grey_Close}
              alt="close"
              onClick={shareModal}
            />
          </div>
          <div className={styles.shareC}>Share blog via</div>
        </div>
        <div className={styles.pc_d_none}>
          <div className={styles.shareB}>
            <img
              loading="lazy"
              src={Grey_Close}
              alt="close"
              onClick={shareModal}
            />
          </div>
          <div className={styles.shareC}>Share blog via</div>
        </div>
        <div className={styles.shareD}>
          <a
            className={styles.shareDA}
            href={`https://www.facebook.com/sharer/sharer.php?u=${
              BlogUrl ? BlogUrl : ""
            }`}
            target="_blank"
          >
            <div className={styles.shareDAA}>
              <img loading="lazy" src={facebook_black} alt="facebook" />
            </div>
            <div>Facebook</div>
          </a>
          <a
            className={styles.shareDA}
            href={`https://twitter.com/intent/tweet?text=${
              BlogUrl ? BlogUrl : ""
            }`}
            target="_blank"
          >
            <div className={styles.shareDAA}>
              <img loading="lazy" src={twitter_black} alt="twitter" />
            </div>
            <div>Twitter</div>
          </a>
          <a
            className={styles.shareDA}
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${
              BlogUrl ? BlogUrl : ""
            }`}
            target="_blank"
          >
            <div className={styles.shareDAA}>
              <img loading="lazy" src={linkedin_black} alt="linkedin" />
            </div>
            <div>LinkedIn</div>
          </a>
          <a
            className={styles.shareDA}
            href={"https://www.instagram.com/"}
            target="_blank"
          >
            <div className={styles.shareDAA}>
              <img loading="lazy" src={instagram_black} alt="instagram" />
            </div>
            <div>Instagram</div>
          </a>
        </div>
        <div className={styles.shareE}>
          <div className={styles.shareEA}>{BlogUrl ? BlogUrl : ""}</div>
          <div
            className={styles.shareEB}
            onClick={navigateBlog}
          >
            Copy link
          </div>
        </div>
      </div>
    </div>
  );
}

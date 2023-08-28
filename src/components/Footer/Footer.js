import React from "react";
import styles from "./Footer.module.css";
import {
  DownloadAppStore,
  DownloadPlayStore,
  Treato,
  facebook,
  instagram,
  linkedin,
  search,
  twitter,
} from "../../assets/images/icons";

const Footer = () => {
  const footerLinks = ["Blogs", "Careers", "FAQs", "Pricing", "Contact us"];
  const socialLinks = [
    { icon: facebook, alt: "facebook" },
    { icon: instagram, alt: "instagram" },
    { icon: linkedin, alt: "linkedin" },
    { icon: twitter, alt: "twitter" },
  ];
  const legalLinks = ["Privacy policy", "Terms of service", "Terms of use"];
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <a href="/">
        <img src={Treato} alt="Treato" className={styles.logo} />
        </a>
        <div className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
            <img src={search} alt="searchIcon" className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search treatments, venues and more..."
            />
          </div>
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.stores}>
          <h4 className={styles.heading}>Get the app</h4>
          <div className={styles.downloads}>
            <a href="#">
            <img src={DownloadAppStore} alt="DownloadAppStore" />
            </a>
            <a href="#">
            <img src={DownloadPlayStore} alt="DownloadPlayStore" />
            </a>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <h4 className={styles.heading}>About Treato</h4>
          <div className={styles.links}>
            {footerLinks.map((link, index) => (
              <a key={index} href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.legalLinks}>
          <h4 className={styles.heading}>Legal</h4>
          <div className={styles.links}>
            {legalLinks.map((link, index) => (
              <a key={index} href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.social}>
          <h4 className={styles.heading}>Follow us on</h4>
          <div className={styles.sociallinks}>
            {socialLinks.map((socialMedia, index) => (
              <a key={index} href="#">
                <img
                  src={socialMedia.icon}
                  alt={socialMedia.alt}
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2023 Treato, Inc. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

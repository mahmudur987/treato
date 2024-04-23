import React from "react";
import styles from "./Footer.module.css";
import {
  DownloadAppStore,
  DownloadPlayStore,
  Treato,
  facebook,
  instagram,
  linkedin,
  searchGrey,
  twitter,
} from "../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const footerLinks = ["Blogs", "Careers", "FAQs", "Pricing", "Contact us"];
  const socialLinks = [
    { icon: facebook, alt: "facebook" },
    { icon: instagram, alt: "instagram" },
    { icon: linkedin, alt: "linkedin" },
    { icon: twitter, alt: "twitter" },
  ];
  const legalLinks = ["Privacy policy", "Terms of service", "Terms of use"];

  const handleFooterLinkClick = (link) => {
    if (link === "Contact us" && link==="Blogs") {
      // Scroll to the "contactUs" section when "Contact Us" is clicked
      navigate("/"); // Navigate to the home page
      setTimeout(() => {
        const section = document.getElementById("contactUs");
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 50,
            behavior: "smooth",
          });
        }
      }, 450);
    } else if(link === "Careers") {
      navigate("/careers/currentopenings");
      console.log(link);
    }
     else if(link === "Terms of use") {
      navigate("/Privacy/Termofuse");
    }
     else  {
      // Handle other links as needed
      // For example, you can navigate to a different page
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <a href="/">
          <img src={Treato} alt="Treato" className={styles.logo} />
        </a>
        <div className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
            <img
              src={searchGrey}
              alt="searchIcon"
              className={styles.searchIcon}
            />
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
              <Link
                key={index}
                to="#"
                onClick={() => handleFooterLinkClick(link)}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.legalLinks}>
          <h4 className={styles.heading}>Legal</h4>
          <div className={styles.links}>
            <Link to="/Privacy/policy">Privacy policy</Link>
            <Link>Terms of service</Link>
            <Link to="/Privacy/Termofuse" >Terms of use</Link>
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

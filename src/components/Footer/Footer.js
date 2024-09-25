import React, {useState} from "react";
import styles from "./Footer.module.css";
import { toast } from "react-toastify";
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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const Footer = () => {
  const navigate = useNavigate(); 
  const [locationLat, setlocationLat] = useState("");
  const [locationLng, setlocationLng] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [treatmentInputValue, setTreatmentInputValue] = useState("");

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

  const handleSearch = () => {
    if (treatmentInputValue === "") {
      // Navigate to /salons with services and location as query parameters
      toast.info("Please fill input fields to proceed. !");
    } else {
      console.log(treatmentInputValue);
      
        //if we  dont have value in location input
        navigate(
          `/salons?service=${treatmentInputValue}&lat=${locationLat}&lng=${locationLng}&location=${locationInputValue}`
        );
      }
    }
 


  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <a href="/">
          <img loading="lazy" src={Treato} alt="Treato" className={styles.logo} />
        </a>
        <div className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
            <img loading="lazy"
              src={searchGrey}
              alt="searchIcon"
              className={styles.searchIcon}
            />
            <input
              className={styles.searchInput}
              value={treatmentInputValue}
              onChange={(e)=>setTreatmentInputValue(e.target.value)}
              placeholder="Search treatments, venues and more..."
            />
          </div>
          <button className={styles.searchButton} onClick={handleSearch} >Search</button>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.stores}>
          <h4 className={styles.heading}>Get the app</h4>
          <div className={styles.downloads}>
            <a href="#">
              <img loading="lazy" src={DownloadAppStore} alt="DownloadAppStore" />
            </a>
            <a href="#">
              <img loading="lazy" src={DownloadPlayStore} alt="DownloadPlayStore" />
            </a>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <h4 className={styles.heading}><Link to="/Aboutuspage" >About Treato</Link></h4>
          <div className={styles.links}>
          <Link to="/blogs" >Blog</Link>
              <Link to="/careers/currentopenings" >Careers</Link>
              <Link to="/frequentlyaskedquestions" >FAQs</Link>
              <Link to="/Pricing" >Pricing</Link>
              <Link to="/contactus" >Contact us</Link>
            
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
                <img loading="lazy"
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
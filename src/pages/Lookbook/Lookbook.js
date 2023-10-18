import React from "react";
import Masonry from "react-masonry-css";
import styles from "./Lookbook.module.css";
import ModalImage from "react-modal-image";
import img1 from "../../assets/images/LookbookImages/Lookbook1.png";
import img2 from "../../assets/images/LookbookImages/Lookbook2.png";
import img3 from "../../assets/images/LookbookImages/Lookbook3.png";
import img4 from "../../assets/images/LookbookImages/Lookbook4.png";
import img5 from "../../assets/images/LookbookImages/Lookbook5.png";
import img6 from "../../assets/images/LookbookImages/Lookbook6.png";
import MainSearchBar from "../../components/Input/mainSearchBar/MainSearchBar";
import { starBlack } from "../../assets/images/SalonsPageImages";
import { useState } from "react";
import {
  closeIcon,
  expandMoboImage,
  mapPin,
  x,
} from "../../assets/images/icons";
import { useEffect } from "react";
import { salon } from "../../services/salon";
import { useSelector } from "react-redux";
import { getAllServices } from "../../services/Services";
const ImageWithDetails = ({ src, alt, rating }) => (
  <div className={styles.imageContainer}>
    <ModalImage
      small={src}
      large={src}
      alt={alt}
      className={styles.masonryImage}
    />
    <span className={styles.imageRating}>
      <img src={starBlack} alt="starIcon" /> {rating}
    </span>
    <span className={styles.expandbutton}>
      <img src={expandMoboImage} />
    </span>
    <p className={styles.imageText}>
      A subtle salmon tinge on curled hairs. Golden long, waist length,
      straight.
    </p>
  </div>
);
const Lookbook = () => {
  const salonsState = useSelector((state) => state.salons);
  const [activeButton, setActiveButton] = useState("Hair");
  const [locationInput, setLocationInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [allSalonList, setallSalonList] = useState([]);
  const [filteredSalonData, setFilteredSalonData] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [allServices, setallServices] = useState([]);
  const locationOptions = [
    "Bengaluru, Karnataka, India",
    "Bengaluru Palace, Bengaluru, Karnataka, India",
    "Bengaluru International Centre (BIC), 4th Main Road, Stage 2, Domlur, Bengaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
    "Bengaluru, Karnataka, India",
    "Bengaluru Palace, Bengaluru, Karnataka, India",
    "Bengaluru International Centre (BIC), 4th Main Road, Stage 2, Domlur, Bengaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
    "Bengaluru, Karnataka, India",
    "Bengaluru Palace, Bengaluru, Karnataka, India",
    "Bengaluru International Centre (BIC), 4th Main Road, Stage 2, Domlur, Bengaluru, Karnataka, India",
    "Kempegowda International Airport Bengaluru (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India",
  ];
  //lookbook image object
  const images = [
    { src: img1, alt: "Image 1", rating: 4 },
    { src: img2, alt: "Image 2", rating: 3 },
    { src: img3, alt: "Image 3", rating: 5 },
    { src: img4, alt: "Image 4", rating: 3.2 },
    { src: img5, alt: "Image 5", rating: 3.4 },
    { src: img6, alt: "Image 6", rating: 4.2 },
    { src: img1, alt: "Image 7", rating: 4 },
    { src: img2, alt: "Image 8", rating: 3 },
    { src: img3, alt: "Image 9", rating: 5 },
    { src: img4, alt: "Image 10", rating: 3.2 },
    { src: img5, alt: "Image 11", rating: 3.4 },
    { src: img6, alt: "Image 12", rating: 4.2 },
    { src: img4, alt: "Image 13", rating: 3.2 },
    { src: img5, alt: "Image 14", rating: 3.4 },
    { src: img6, alt: "Image 15", rating: 4.2 },
    { src: img1, alt: "Image 16", rating: 4 },
    { src: img2, alt: "Image 17", rating: 3 },
    { src: img3, alt: "Image 18", rating: 5 },
    { src: img4, alt: "Image 19", rating: 3.2 },
    { src: img5, alt: "Image 20", rating: 3.4 },
    { src: img6, alt: "Image 21", rating: 4.2 },
    { src: img4, alt: "Image 22", rating: 3.2 },
    { src: img5, alt: "Image 23", rating: 3.4 },
    { src: img6, alt: "Image 24", rating: 4.2 },
  ];

  // Define an object with button names as an array
  const buttons = [
    "Hair",
    "Hair removal",
    "Nail care",
    "Facials&Skincare",
    "Makeup",
  ];

  // Function to handle button clicks and set the active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  // Function to handle input changes and set the locationInput state
  const handleLocationInputChange = (event) => {
    const inputValue = event.target.value;
    setLocationInput(inputValue);

    // Filter the salon data based on the input value
    const filteredSalons = allSalonList.filter((salon) => {
      return salon.locationText
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });

    setFilteredSalonData(filteredSalons);
    setIsDropdownVisible(true);
  };

  const handleLocationOptionClick = (location) => {
    setLocationInput(location);
    setIsDropdownVisible(false); // Hide the dropdown when an option is clicked
    setFilteredSalonData(allSalonList);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 2,
  };
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const result = await salon();
        if (result.res) {
          const { data } = result.res; // Destructure 'data' from 'result.res'
          const { salons } = data; // Destructure 'salons' from 'data'
          setallSalonList(salons);
          setFilteredSalonData(salons);
          console.log(salons);
        }
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching salons:", error);
      }
    };

    fetchSalons();
  }, []);
  useEffect(() => {
    // Call the getAllServices function when the component mounts
    async function fetchAllServices() {
     try {
       const { res, err } = await getAllServices();
 
       if (res) {
         // If the request was successful, update the state with the data
         setallServices(res?.data?.data); // Assuming the response data contains a "data" property
       } 
     } catch (error) {
       // Handle unexpected errors here
       setError(error);
     }
   }
 
   fetchAllServices();
 }, [])
  return (
    <div className={styles.lookbookContainer}>
      <h1>
        <span>1500+ </span> looks curated just for you
      </h1>
      <h2>
        Hand-crafted looks from our best stylists. Book your dream look
        directly.
      </h2>
      <div className={styles.inputWrapper}>
        <img src={mapPin} alt="locationIcon" />
        <input
          placeholder="Search by location"
          value={locationInput}
          onChange={handleLocationInputChange}
          onClick={() => setIsDropdownVisible(true)}
        />
        {isDropdownVisible && (
          <img
            src={closeIcon}
            onClick={() => {
              setLocationInput("");
              setIsDropdownVisible(false);
              setFilteredSalonData(allSalonList);
            }}
          />
        )}
        <button
          className={`${styles.submitLocation} ${
            locationInput ? styles.blueBg : ""
          }`}
        >
          GO
        </button>
        {isDropdownVisible && (
          <div className={styles.dropdownWrapper}>
            {filteredSalonData?.map((location, index) => (
              <div
                key={index}
                value={location}
                onClick={() => handleLocationOptionClick(location.locationText)}
                className={styles.locationItem}
              >
                {location.locationText}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.serviceButtonWrapper}>
 
        {buttons.map((buttonName, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(buttonName)}
            className={
              activeButton === buttonName ? `${styles.activeServiceType}` : ""
            }
          >
            {buttonName}
          </button>
        ))}
      </div>
      <Masonry breakpointCols={breakpointColumnsObj} className={styles.masonry}>
        {images.map((image, index) => (
          <ImageWithDetails
            key={index}
            src={image.src}
            alt={image.alt}
            rating={image.rating}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default Lookbook;

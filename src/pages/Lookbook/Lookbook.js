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
import { useRef } from "react";
const Lookbook = () => {
  const modalImageRef = useRef();
  
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
      {/* <span className={styles.expandbutton}>
        <img src={expandMoboImage} />
      </span> */}
      <p className={styles.imageText}>
        A subtle salmon tinge on curled hairs. Golden long, waist length,
        straight.
      </p>
    </div>
  );
  const salonsState = useSelector((state) => state.salons);
  const [activeButton, setActiveButton] = useState("All");
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
    {
      src: img1,
      alt: "Image 1",
      rating: 4,
      serviceType: "Hair",
      location: "Pune, Maharashtra",
    },
    {
      src: img2,
      alt: "Image 2",
      rating: 3,
      serviceType: "Hair Removal",
      location: "Telangana, Hyderabada",
    },
    {
      src: img3,
      alt: "Image 3",
      rating: 5,
      serviceType: "Nail care",
      location: "Telangana, Hyderabada",
    },
    {
      src: img4,
      alt: "Image 4",
      rating: 3.2,
      serviceType: "Hair Removal",
      location: "Telangana, Hyderabada",
    },
    {
      src: img5,
      alt: "Image 5",
      rating: 3.4,
      serviceType: "Nail care",
      location: "Telangana, Hyderabada",
    },
    {
      src: img6,
      alt: "Image 6",
      rating: 4.2,
      serviceType: "Spa",
      location: "Telangana, Hyderabada",
    },
    {
      src: img1,
      alt: "Image 7",
      rating: 4,
      serviceType: "Hair Removal",
      location: "Pune, Maharashtra",
    },
    {
      src: img2,
      alt: "Image 8",
      rating: 3,
      serviceType: "Nail care",
      location: "Pune, Maharashtra",
    },
    {
      src: img3,
      alt: "Image 9",
      rating: 5,
      serviceType: "Hair",
      location: "Pune, Maharashtra",
    },
    {
      src: img4,
      alt: "Image 10",
      rating: 3.2,
      serviceType: "Makeup",
      location: "Pune, Maharashtra",
    },
    {
      src: img5,
      alt: "Image 11",
      rating: 3.4,
      serviceType: "Hair",
      location: "Pune, Maharashtra",
    },
    {
      src: img6,
      alt: "Image 12",
      rating: 4.2,
      serviceType: "Hair Removal",
      location: "Pune, Maharashtra",
    },
    {
      src: img4,
      alt: "Image 13",
      rating: 3.2,
      serviceType: "Nail care",
      location: "Pune, Maharashtra",
    },
    {
      src: img5,
      alt: "Image 14",
      rating: 3.4,
      serviceType: "Makeup",
      location: "Agra, Uttar Pradesh",
    },
    {
      src: img6,
      alt: "Image 15",
      rating: 4.2,
      serviceType: "Spa",
      location: "Agra, Uttar Pradesh",
    },
    {
      src: img1,
      alt: "Image 16",
      rating: 4,
      serviceType: "Hair",
      location: "Agra, Uttar Pradesh",
    },
    {
      src: img2,
      alt: "Image 17",
      rating: 3,
      serviceType: "Hair Removal",
      location: "Agra, Uttar Pradesh",
    },
    {
      src: img3,
      alt: "Image 18",
      rating: 5,
      serviceType: "Nail care",
      location: "Pune, Maharashtra",
    },
    {
      src: img4,
      alt: "Image 19",
      rating: 3.2,
      serviceType: "Makeup",
      location: "Pune, Maharashtra",
    },
    {
      src: img5,
      alt: "Image 20",
      rating: 3.4,
      serviceType: "Hair",
      location: "Pune, Maharashtra",
    },
    {
      src: img6,
      alt: "Image 21",
      rating: 4.2,
      serviceType: "Spa",
      location: "Pune, Maharashtra",
    },
    {
      src: img4,
      alt: "Image 22",
      rating: 3.2,
      serviceType: "Hair Removal",
      location: "Pune, Maharashtra",
    },
    {
      src: img5,
      alt: "Image 23",
      rating: 3.4,
      serviceType: "Nail care",
      location: "Pune, Maharashtra",
    },
    {
      src: img6,
      alt: "Image 24",
      rating: 4.2,
      serviceType: "Hair",
      location: "Pune, Maharashtra",
    },
  ];

  // Function to handle button clicks and set the active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    const filteredImages = filterImages();
    setFilteredServiceData(filteredImages);
  }, [activeButton]);

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
  // Function to filter images based on locationInput and serviceType
  const filterImages = () => {
    let filteredImages = images; // Start with all images

    if (locationInput != "") {
      // Filter based on locationInput
      filteredImages = filteredImages.filter((image) =>
        image.location.toLowerCase().includes(locationInput.toLowerCase())
      );
    }

    if (activeButton !== "All") {
      // Filter based on the activeButton (serviceType)
      filteredImages = filteredImages.filter(
        (image) => image.serviceType === activeButton
      );
    }

    return filteredImages;
  };
  const handleGoButtonClick = () => {
    // Get the filtered images
    const filteredImages = filterImages();
    // Update the state with filtered images
    setFilteredServiceData(filteredImages);
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
        console.log(error);
      }
    }

    fetchAllServices();
    setFilteredServiceData(images);
    handleGoButtonClick();
  }, []);

  const masonryRef = useRef(null);
  const applyCustomMargins = () => {
    const masonryContainer = document.querySelector(".masonryContainer");
    if (filteredServiceData?.length >= 5) {
      // If images length is greater or equal to 5, add a class to the container
      masonryContainer?.classList.add("images-length-greater-equal-5");
    } else {
      // If images length is less than 5, remove the class from the container
      masonryContainer?.classList.remove("images-length-greater-equal-5");
    }

    if (filteredServiceData?.length >= 5) {
      // Apply custom margins to specific elements when images.length is greater or equal to 5
      const masonryDivs = document.querySelectorAll(".masonryContainer > div");
      if (masonryDivs.length >= 1) {
        masonryDivs[0].classList.add("masonry-div-1");
      }
      if (masonryDivs.length >= 2) {
        masonryDivs[1].classList.add("masonry-div-2");
      }
      if (masonryDivs.length >= 4) {
        masonryDivs[3].classList.add("masonry-div-4");
      }
    }
  };

  // Function to log the div elements inside Masonry
  const applyIdsToMasonryDivs = () => {
    const divs = document.querySelectorAll(".masonryContainer > div ");
    divs.forEach((div, index) => {
      div.classList.add(`masonry-div-${index + 1}`); // Add an id attribute
    });
  };

  useEffect(() => {
    applyIdsToMasonryDivs();
    applyCustomMargins();
  }, [filteredServiceData]);

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
              setFilteredServiceData(images);
            }}
          />
        )}
        <button
          className={`${styles.submitLocation} ${
            locationInput ? styles.blueBg : ""
          }`}
          onClick={handleGoButtonClick}
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
        {allServices.map((service, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(service?.service_name)}
            className={
              activeButton === service?.service_name
                ? `${styles.activeServiceType}`
                : ""
            }
          >
            {service?.service_name}
          </button>
        ))}
      </div>
      {filteredServiceData.length === 0 && (
        <div className={styles.zeroResponse}>
          No results match the selected criteria
        </div>
      )}
      <Masonry
        id="masonry-container"
        ref={masonryRef}
        breakpointCols={breakpointColumnsObj}
        className={`${styles.masonry} masonryContainer`}
      >
        {filteredServiceData?.length > 0 &&
          filteredServiceData.map((image, index) => (
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

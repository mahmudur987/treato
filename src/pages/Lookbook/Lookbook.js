import React from "react";
import Masonry from "react-masonry-css";
import styles from "./Lookbook.module.css";
import ModalImage from "react-modal-image";
import { chevronDown, starBlack } from "../../assets/images/SalonsPageImages";
import { useState } from "react";
import {
  arrowleft,
  closeIcon,
  mapPin,
  mapPinBlue,
} from "../../assets/images/icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllServices } from "../../services/Services";
import { useRef } from "react";
import Search_MoboModal from "../../components/HomePage/Hero/Search_MoboModal/Search_MoboModal";
import { Link } from "react-router-dom";
import {
  getAllLookbooksLocations,
  getLookbooksByLocations,
  getNearByUserLookbooks,
} from "../../services/lookbook";
const Lookbook = () => {
  const [allLookbook, setallLookbook] = useState(null);
  const [activeButton, setActiveButton] = useState("Hair");
  const [locationInput, setLocationInput] = useState("");
  const [loc_MoboModal, setloc_MoboModal] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredSalonData, setFilteredSalonData] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [allServices, setallServices] = useState([]);
  const [allLookbookLocations, setAllLookbookLocations] = useState([]);
  const [locationInputValue, setLocationInputValue] =
    useState("select location");
  const [itemsToShow, setItemsToShow] = useState(10);
  const [isServiceListExpanded, setisServiceListExpanded] = useState(false);
  const [uniqueLocText, setuniqueLocText] = useState([]);
  const [isCurrentLocationActive, setisCurrentLocationActive] = useState(false);
  const userDetails = useSelector((state) => state.user);
  const masonryRef = useRef(null);
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 2,
  };
  const ImageWithDetails = ({ src, alt, rating, description, lookbookID }) => (
    <div className={styles.imageContainer}>
      <ModalImage
        small={src}
        large={src}
        alt={alt}
        className={styles.masonryImage}
      />
      <Link
        className={styles.imgDetails}
        to={`/lookbook-details/${lookbookID}`}
      >
        View details
      </Link>
      <span className={styles.imageRating}>
        <img src={starBlack} alt="starIcon" /> {rating}
      </span>
      <p className={styles.imageText}>{description}</p>
    </div>
  );
  //handling readMore Button
  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 10); // Increase by 10 when the button is clicked
  };
  // Function to handle button clicks and set the active button
  const handleButtonClick = (categoryName) => {
    let data;
    if (isCurrentLocationActive) {
      data = {
        categoryName,
        latitude: userDetails?.user?.latitude,
        longitude: userDetails?.user?.longitude,
      };
      getNearByUserLookbooks(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
        console.log("currentlocation", response);
      });
    } else {
      data = {
        categoryName,
        location: locationInput,
      };
      getLookbooksByLocations(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
        console.log(response);
      });
    }
    setActiveButton(categoryName);
  };
  const handleLocationOptionClick = (location) => {
    setLocationInput(location);
    setIsDropdownVisible(false); // Hide the dropdown when an option is clicked
  };
  // Function to handle input changes and set the locationInput state
  const handleLocationInputChange = (event) => {
    const inputValue = event.target.value;
    setLocationInput(inputValue);
    // Create a Set to store unique locationText values

    // Filter the data and add unique locationText values to the Set
    const filtered = allLookbookLocations.filter((item) => {
      const locationText = item.toLowerCase();
      console.log(item, locationText);
      if (locationText.includes(inputValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    // setIsDropdownVisible(true);
    setuniqueLocText(filtered);
  };

  const handleLocationInput = (e) => {
    const inputValue = e.target.value;
    setLocationInputValue(inputValue);

    // Create a Set to store unique locationText values

    // Filter the data and add unique locationText values to the Set
    const filtered = allLookbookLocations.filter((item) => {
      const locationText = item.toLowerCase();
      if (locationText.includes(inputValue.toLowerCase())) {
        return true;
      }
      return false;
    });
    setuniqueLocText(filtered);
    // setFilteredSalonData(filtered);
  };

  //handle search lookbook button
  const handleGoButtonClick = () => {
    let data;
    if (isCurrentLocationActive) {
      data = {
        categoryName: activeButton,
        latitude: userDetails?.user?.latitude,
        longitude: userDetails?.user?.longitude,
      };
      getNearByUserLookbooks(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
      });
    } else {
      data = {
        categoryName: activeButton,
        location: locationInput,
      };
      if (data) {
        getLookbooksByLocations(data).then((res) => {
          let response = res?.res?.data?.data;
          setallLookbook(response);
        });
      }
    }
    setIsDropdownVisible(false);
  };
  //function to close desktop location dropdown
  const handleCloseLocationDropdown = () => {
    setLocationInput("");
    setIsDropdownVisible(false);
    let data = {
      categoryName: activeButton,
      location: "",
    };
    if (data) {
      getLookbooksByLocations(data).then((res) => {
        let response = res?.res?.data?.data;
        setallLookbook(response);
        console.log(response);
      });
    }
  };
  //function to close mobile location dropdown
  const handle_closeloc_Modal = () => {
    setloc_MoboModal(false);
    document.body.style.overflow = "auto";
  };

  //function to handle current location button
  const handleCurrentLocation = () => {
    let data = {
      categoryName: activeButton,
      latitude: userDetails?.user?.latitude,
      longitude: userDetails?.user?.longitude,
    };
    getNearByUserLookbooks(data).then((res) => {
      let response = res?.res?.data?.data;
      setallLookbook(response);
    });
    setLocationInput("Current Location");
    setIsDropdownVisible(false);
  };

  // function to handle lookbook image position
  const applyCustomMargins = () => {
    const masonryContainer = document.querySelector(".masonryContainer");
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 768) {
      if (allLookbook?.length >= 5) {
        // If images length is greater or equal to 5, add a class to the container
        masonryContainer?.classList.add("images-length-greater-equal-5");
      } else {
        // If images length is less than 5, remove the class from the container
        masonryContainer?.classList.remove("images-length-greater-equal-5");
      }

      if (allLookbook?.length >= 5) {
        // Apply custom margins to specific elements when images.length is greater or equal to 5
        const masonryDivs = document.querySelectorAll(
          ".masonryContainer > div"
        );
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
    } else {
      if (allLookbook?.length > 1) {
        // If images length is greater or equal to 5, add a class to the container
        masonryContainer?.classList.add("images-length-greater-equal-5");
      } else {
        // If images length is less than 5, remove the class from the container
        masonryContainer?.classList.remove("images-length-greater-equal-5");
      }

      if (allLookbook?.length > 1) {
        // Apply custom margins to specific elements when images.length is greater or equal to 5
        const masonryDivs = document.querySelectorAll(
          ".masonryContainer > div"
        );
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
    }
  };
  const applyIdsToMasonryDivs = () => {
    const divs = document.querySelectorAll(".masonryContainer > div ");
    divs.forEach((div, index) => {
      div.classList.add(`masonry-div-${index + 1}`); // Add an id attribute
    });
  };
  useEffect(() => {
    applyIdsToMasonryDivs();
    applyCustomMargins();
  }, [allLookbook]);

  // function to get list of available services
  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();

        if (res) {
          setallServices(res?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllServices();
  }, []);
  // Checking if the user selected the current location search option
  useEffect(() => {
    const isCurrentLocationActive =
      locationInput === "Current Location" ||
      locationInputValue === "Current Location";
    setisCurrentLocationActive(isCurrentLocationActive);
  }, [locationInput, locationInputValue]);

  //fetching lookbook initial content
  useEffect(() => {
    // TODO: setting temporary location input value as "Mumbai, Maharashtra" for use who allowed location will be dynamic once we get google map api key
    let data;
    if (userDetails?.user?.isLocationAllow) {
      setLocationInput("Mumbai, Maharashtra"); //desktop State
      setLocationInputValue("Mumbai, Maharashtra"); //mobile State
      data = {
        categoryName: activeButton,
        location: "Mumbai, Maharashtra",
      };
    } else {
      data = {
        categoryName: activeButton,
        location: "",
      };
    }
    getLookbooksByLocations(data).then((res) => {
      let response = res?.res?.data?.data;
      setallLookbook(response);
      console.log(data);
      console.log(response);
    });
  }, [userDetails?.user]);

  // fetching all avialable lookbook locations to display in location dropdown
  useEffect(() => {
    getAllLookbooksLocations().then((res) => {
      let response = res?.res?.data?.data;
      setuniqueLocText(response);
      setAllLookbookLocations(response);
    });
  }, []);
  return (
    <div className={styles.lookbookContainer}>
      <div className={styles.headerWrapper}>
        <button className={styles.backIcon}>
          <img src={arrowleft} alt="back" />
        </button>
        <div
          className={styles.locationWrap}
          onClick={() => setloc_MoboModal(true)}
        >
          {locationInputValue}
          <img src={chevronDown} alt="downArrow" />
        </div>
        {loc_MoboModal && (
          <Search_MoboModal
            handle_close={handle_closeloc_Modal}
            setShow_Modal={setloc_MoboModal}
            show_Modal={loc_MoboModal}
            title="Search by location"
            placeholderText="Current location"
            icon={mapPin}
            setLocationInputValue={setLocationInputValue}
            handleLocationInput={handleLocationInput}
            allSalonList={filteredSalonData}
            setLocationInput={setLocationInput}
            pageName="Lookbook"
            uniqueLocText={uniqueLocText}
            activeButton={activeButton}
            setallLookbook={setallLookbook}
          />
        )}
      </div>
      {/* services Button Mobo version */}
      <div
        className={`${styles.serviceButtonWrapperMobo} ${isServiceListExpanded ? styles.expandList : ""
          }`}
      >
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
        <div
          className={`${styles.expandServicesList}`}
          onClick={() => setisServiceListExpanded(!isServiceListExpanded)}
        >
          <img
            src={chevronDown}
            className={`${isServiceListExpanded && styles.rotate180}`}
          />
        </div>
      </div>

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
          <img src={closeIcon} onClick={() => handleCloseLocationDropdown()} />
        )}
        <button
          className={`${styles.submitLocation} ${locationInput ? styles.blueBg : ""
            }`}
          onClick={handleGoButtonClick}
        >
          GO
        </button>
        {isDropdownVisible && (
          <div className={styles.dropdownWrapper}>
            {userDetails?.user?.isLocationAllow && (
              <div
                className={styles.currentLocation}
                onClick={handleCurrentLocation}
              >
                <img src={mapPinBlue} />
                <h4>Current Location</h4>
              </div>
            )}
            {uniqueLocText &&
              uniqueLocText?.map((location, index) => (
                <div
                  key={index}
                  value={location}
                  onClick={() => handleLocationOptionClick(location)}
                  className={styles.locationItem}
                >
                  {location}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={`${styles.serviceButtonWrapper}`}>
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
      {allLookbook?.length === 0 && (
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
        {allLookbook?.length > 0 &&
          allLookbook
            .slice(0, itemsToShow)
            .map((lookbook, index) => (
              <ImageWithDetails
                key={index}
                src={lookbook.photo.public_url}
                alt={lookbook.alt}
                rating={lookbook.rating}
                description={lookbook.description}
                lookbookID={lookbook._id}
              />
            ))}
      </Masonry>
      <button className={styles.showMore} onClick={handleShowMore}>
          See more results
        </button>
      {/* {itemsToShow < filteredServiceData?.length && (
        <button className={styles.showMore} onClick={handleShowMore}>
          See more results
        </button>
      )} */}
    </div>
  );
};

export default Lookbook;

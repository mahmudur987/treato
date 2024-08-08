import React, { useState, useEffect } from "react";
import styles from "./ServiceLocation.module.css";
import BasicInputs from "../Input/BasicInputs";
import map from "../../../assets/images/partner/partnerSetting/Input_Field_Icons.png";
import CollaseIcon from "../../../assets/images/TeamDetails/chevron-down.png";
import PartnerLocationMap from "./Map/PartnerLocationMap";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const ServiceLocation = ({
  setSalonData,
  salonData,
  position,
  setPosition,
  defaultProps,
  updateDefaultProps,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  useEffect(() => {
    if (data.length > 0) {
      setShow(true);
    }
  }, [data]);

  const handleSelect =
    ({ description }) =>
    () => {
      console.log(description);
      setValue(description, false);
      setSalonData({ ...salonData, location: description });
      clearSuggestions();
      setShow(false);
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        defaultProps = {
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 10,
        };
        updateDefaultProps(defaultProps);
        setPosition({ lat, lng });
      });
    };

  const renderSuggestions = () => {
    return data?.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.locationList}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };
  const handleSearch = async (e) => {
    setSalonData({ ...salonData, location: e.target.value });
    setValue(e.target.value);
    getGeocode({ address: e.target.value })
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log({ lat, lng });
        defaultProps = {
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 10,
        };
        updateDefaultProps(defaultProps);

        setPosition({ lat, lng });
      })
      .catch((err) => console.log("geocode Error", err));
  };
  const handleDocumentClick = () => {
    setShow(false);
  };

  // useEffect to add event listener for document click
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  return (
    <>
      <div>
        <div className={styles.collapseForSmallScreen}>
          <div>
            <h1>Location</h1>
            <p>Add and edit salon location details.</p>
          </div>
          <div className={styles.CollaseIconImg1}>
            <img
              src={CollaseIcon}
              alt="CollapseIcon"
              onClick={toggleCollapse}
              className={styles.CollaseIconImg}
            />
          </div>
        </div>
        <div>
          <h3 className={styles.Heading1}>Location Details</h3>
        </div>

        {isCollapsed && (
          <div className={styles.mainDiv}>
            <div className={styles.Inputs}>
              <div className={styles.wrapper}>
                <div className={styles.inputtextLoc}>
                  <label htmlFor="location">
                    <div className={styles.labelText}>Business Location</div>
                    <BasicInputs
                      type="text"
                      NAME="location"
                      value={salonData.location}
                      onChange={(e) => handleSearch(e)}
                      placeholder="Search location"
                      styles={`${styles.locationInput}`}
                    />
                  </label>
                  <img src={map} alt="map" className={styles.mapLogo} />
                </div>
                {show && (
                  <div className={styles.suggestions}>
                    {renderSuggestions()}
                  </div>
                )}
              </div>
              <div>
                <div className={styles.inputtextNumber}>
                  <label htmlFor="building_number">
                    <div className={styles.labelText}>Building Number</div>
                    <BasicInputs
                      type="text"
                      NAME="building_number"
                      value={salonData.building_number}
                      onChange={(e) =>
                        setSalonData({
                          ...salonData,
                          building_number: e.target.value,
                        })
                      }
                      placeholder="Search location"
                      styles={`${styles.BasicInputsFild}`}
                    />
                  </label>
                  <label htmlFor="landmark">
                    <div className={styles.labelText}>
                      Landmark{" "}
                      <span className={styles.optional}>(optional)</span>
                    </div>
                    <BasicInputs
                      type="text"
                      NAME="landmark"
                      value={salonData.landmark}
                      onChange={(e) =>
                        setSalonData({ ...salonData, landmark: e.target.value })
                      }
                      placeholder="Search location"
                      styles={`${styles.BasicInputsFild}`}
                    />
                  </label>
                </div>
                <div className={`${styles.inputtext} ${styles.inputtextForSS}`}>
                  <label htmlFor="city" className={styles.inputtextCity}>
                    <div className={styles.labelText}>City</div>
                    <BasicInputs
                      type="text"
                      NAME="city"
                      value={salonData.city}
                      onChange={(e) =>
                        setSalonData({ ...salonData, city: e.target.value })
                      }
                      placeholder="Search location"
                      styles={`${styles.BasicInputsFild}`}
                    />
                  </label>
                  <label htmlFor="postal_code" className={styles.inputtextCode}>
                    <div className={styles.labelText}>Postal Code</div>
                    <BasicInputs
                      type="text"
                      NAME="postal_code"
                      value={salonData.postal_code}
                      onChange={(e) =>
                        setSalonData({
                          ...salonData,
                          postal_code: e.target.value,
                        })
                      }
                      placeholder="Search location"
                      styles={`${styles.BasicInputsFild}`}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.mapConTainer}>
              <p className={styles.mapImg1}>
                Drag the pin to the correct location
              </p>
              <PartnerLocationMap
                salonData={salonData}
                setSalonData={setSalonData}
                position={position}
                setPosition={setPosition}
                defaultProps={defaultProps}
                updateDefaultProps={updateDefaultProps}
              />
            </div>
          </div>
        )}

        <div className={styles.horizontalLine}></div>
      </div>
    </>
  );
};

export default ServiceLocation;

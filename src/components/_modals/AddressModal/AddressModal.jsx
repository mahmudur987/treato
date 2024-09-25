import React from "react";
import styles from "./AddressModal.module.css";
import DarkCross from "../../../assets/images/icons/DarkCross.svg";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import BasicInput from "../../Input/BasicInput/BasicInput";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { updateUser } from "../../../services/updateUser";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function AddressModal({
  setAddressModal,
  updateInputVal,
  inputVal,
  setShowSave,
  addressModal,
  setlocationModal,
  setuserAddressText,
  userAddressText,
}) {
  const [position, setPosition] = useState(null);
  let [defaultProps, updateDefaultProps] = useState({
    center: {
      lat: "",
      lng: "",
    },
    zoom: 10,
  });
  const userDetails = useSelector((state) => state.user);

  let getLatLng = async () => {
    let lat =
      parseFloat(userDetails.user.latitude) !== NaN
        ? parseFloat(userDetails.user.latitude)
        : "";
    let lng =
      parseFloat(userDetails.user.longitude) !== NaN
        ? parseFloat(userDetails.user.longitude)
        : "";
    defaultProps = {
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: 10,
    };
    updateDefaultProps(defaultProps);
  };

  useEffect(() => {
    getLatLng();
  }, []);

  const isLoaded = defaultProps.center.lat !== "" ? true : false;

  let updateAddress = (e) => {
    e.preventDefault();
    const userJWt = localStorage.getItem("jwtToken");
    let house = e.target.house.value;
    let landmark = e.target.landmark.value;
    let address = {
      house_type: e.target.house_type.value,
      landmark: landmark ? landmark : "",
      house: house ? house : "",
      place: userAddressText ? userAddressText : "",
    };

    let allData = { ...inputVal, address, ...address };
    console.log(allData);
    updateInputVal(allData);
    setAddressModal(false);
    setShowSave(true);
  };

  let editAddress = (e) => {
    e.preventDefault();
    let allData = { ...inputVal };
    allData.house = e.target.house.value;
    allData.landmark = e.target.landmark.value;
    allData.house_type = e.target.house_type.value;
    allData.place = e.target?.place?.value;
    setAddressModal(false);
    updateInputVal(allData);
    console.log("editAddress", allData);
    setShowSave(true);
  };
  let [updateSave, setUpdateSave] = useState(false);
  let [locType, setLocType] = useState(0);
  let [inputs, updateInputs] = useState({
    house: "",
    landmark: "",
    house_type: "",
  });
  useEffect(() => {
    if (addressModal.data) {
      updateInputs({
        place: addressModal?.data?.place,
        house: addressModal?.data?.house,
        landmark: addressModal?.data?.landmark,
        house_type: locType === 1 ? "Home" : "Other",
      });
      setLocType(addressModal.data.house_type === "Home" ? 1 : 2);
    }
  }, []);
  let onChangeInput = (e) => {
    let data = { ...inputs };
    data[e.target.name] = e.target.value;
    updateInputs(data);
  };
  let handleChange = () => {
    setAddressModal({ active: false, data: null });
    setlocationModal(true);
  };

  const containerStyle = {
    width: "100%",
    height: "260px",
  };

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // You can use a reverse geocoding API to get the address based on latLng
    // For simplicity, let's assume you have such a function available
    const clickedAddress = getAddressFromLatLng(lat, lng);
    console.log(clickedAddress);
    setPosition({ lat, lng });
  };

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setuserAddressText(data?.results[0]?.formatted_address);
        return data.results[0].formatted_address;
      } else {
        throw new Error("No address found for the given coordinates");
      }
    } catch (error) {
      console.error("Error fetching address:", error.message);
      return `Address for ${lat}, ${lng}`;
    }
  };
  console.log(addressModal);
  return (
    <>
      {addressModal?.data ? (
        <div class={styles.addressContainer}>
          <div className={styles.addressMain}>
            <div className={styles.addressBack}>
              <div className={styles.addressA}>
                <div className={styles.addressAA}>Edit address</div>
                <img loading="lazy"
                  src={DarkCross}
                  alt="close"
                  onClick={() => setAddressModal({ active: false, data: null })}
                />
              </div>
              <div className={styles.addressB}>
                <div className={styles.addressBA}>
                  {userAddressText && userAddressText}
                </div>
                <div className={styles.addressBB} onClick={handleChange}>
                  <SecondaryButton
                    children={"Change"}
                    className={styles.addressBB_btn}
                  />
                </div>
              </div>
              <div className={styles.addressC}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: userDetails?.user?.isLocationAllow
                      ? userDetails?.user?.latitude
                      : 19.2856,
                    lng: userDetails?.user?.isLocationAllow
                      ? userDetails?.user?.longitude
                      : 72.8691,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: userDetails?.user?.isLocationAllow
                        ? userDetails?.user?.latitude
                        : 19.2856,
                      lng: userDetails?.user?.isLocationAllow
                        ? userDetails?.user?.longitude
                        : 72.8691,
                    }}
                  />
                </GoogleMap>
              </div>
              <form id="addressForm" onSubmit={editAddress}>
                <div
                  className={styles.addressD}
                  onChange={() => setUpdateSave(true)}
                >
                  <label htmlFor="house">
                    <div className={styles.addressDA}>House/Flat Number*</div>
                    <BasicInput
                      PlaceHolder={"House or flat number"}
                      NAME={"house"}
                      required={true}
                      id={"house"}
                      VALUE={inputs.house}
                      onChange={onChangeInput}
                    />
                  </label>
                </div>
                <div className={styles.addressD}>
                  <label
                    htmlFor="landmark"
                    onChange={() => setUpdateSave(true)}
                  >
                    <div className={styles.addressDA}>Landmark (optional)</div>
                    <BasicInput
                      PlaceHolder={"e.g. opp. AXN Center"}
                      NAME={"landmark"}
                      id={"landmark"}
                      VALUE={inputs.landmark}
                      onChange={onChangeInput}
                    />
                  </label>
                </div>
                <div className={styles.addressE}>
                  <div className={styles.addressEA}>Save as</div>
                  <div className={styles.addressEB}>
                    <label
                      htmlFor="home"
                      onChange={() => setUpdateSave(true)}
                      onClick={() => setLocType(1)}
                    >
                      <BasicInput
                        Type={"radio"}
                        className={styles.d_none}
                        id="home"
                        NAME={"house_type"}
                        VALUE={"Home"}
                      />
                      <div
                        className={
                          locType === 1
                            ? `${styles.addressEBB} ${styles.addressEBA}`
                            : styles.addressEBA
                        }
                      >
                        Home
                      </div>
                    </label>
                    <label
                      htmlFor="other"
                      onChange={() => setUpdateSave(true)}
                      onClick={() => setLocType(2)}
                    >
                      <BasicInput
                        Type={"radio"}
                        className={styles.d_none}
                        id="other"
                        NAME={"house_type"}
                        VALUE={"Other"}
                      />
                      <div
                        className={
                          locType === 2
                            ? `${styles.addressEBB} ${styles.addressEBA}`
                            : styles.addressEBA
                        }
                      >
                        Other
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles.addressF}>
                  <PrimaryButton
                    children={"Save Address"}
                    className={updateSave ? null : styles.saveInactive}
                    form="addressForm"
                    disabled={updateSave ? false : true}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div class={styles.addressContainer}>
          <div className={styles.addressMain}>
            <div className={styles.addressBack}>
              <div className={styles.addressA}>
                <div className={styles.addressAA}>Add new address</div>
                <img loading="lazy"
                  src={DarkCross}
                  alt="close"
                  onClick={() => setAddressModal({ active: false, data: null })}
                />
              </div>
              <div className={styles.addressB}>
                <div className={styles.addressBA}>
                  {userAddressText && userAddressText}
                </div>
                <div className={styles.addressBB} onClick={handleChange}>
                  <SecondaryButton
                    children={"Change"}
                    className={styles.addressBB_btn}
                  />
                </div>
              </div>
              <div className={styles.addressC}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: userDetails?.user?.isLocationAllow
                      ? userDetails?.user?.latitude
                      : 19.2856,
                    lng: userDetails?.user?.isLocationAllow
                      ? userDetails?.user?.longitude
                      : 72.8691,
                  }}
                  zoom={15}
                  onClick={handleMapClick}
                >
                  {position && (
                    <Marker position={position} label="Clicked Point" />
                  )}
                </GoogleMap>
              </div>
              <form id="addressForm" onSubmit={updateAddress}>
                <div
                  className={styles.addressD}
                  onChange={() => setUpdateSave(true)}
                >
                  <label htmlFor="house">
                    <div className={styles.addressDA}>House/Flat Number*</div>
                    <BasicInput
                      PlaceHolder={"House or flat number"}
                      NAME={"house"}
                      required={true}
                      id={"house"}
                    />
                  </label>
                </div>
                <div className={styles.addressD}>
                  <label
                    htmlFor="landmark"
                    onChange={() => setUpdateSave(true)}
                  >
                    <div className={styles.addressDA}>Landmark (optional)</div>
                    <BasicInput
                      PlaceHolder={"e.g. opp. AXN Center"}
                      NAME={"landmark"}
                      id={"landmark"}
                    />
                  </label>
                </div>
                <div className={styles.addressE}>
                  <div className={styles.addressEA}>Save as</div>
                  <div className={styles.addressEB}>
                    <label
                      htmlFor="home"
                      onChange={() => setUpdateSave(true)}
                      onClick={() => setLocType(1)}
                    >
                      <BasicInput
                        Type={"radio"}
                        className={styles.d_none}
                        id="home"
                        NAME={"house_type"}
                        VALUE={"Home"}
                        required={true}
                      />
                      <div
                        className={
                          locType === 1
                            ? `${styles.addressEBB} ${styles.addressEBA}`
                            : styles.addressEBA
                        }
                      >
                        Home
                      </div>
                    </label>
                    <label
                      htmlFor="other"
                      onChange={() => setUpdateSave(true)}
                      onClick={() => setLocType(2)}
                    >
                      <BasicInput
                        Type={"radio"}
                        className={styles.d_none}
                        id="other"
                        NAME={"house_type"}
                        VALUE={"Other"}
                        required={true}
                      />
                      <div
                        className={
                          locType === 2
                            ? `${styles.addressEBB} ${styles.addressEBA}`
                            : styles.addressEBA
                        }
                      >
                        Other
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles.addressF}>
                  <PrimaryButton
                    children={"Add Address"}
                    className={updateSave ? null : styles.saveInactive}
                    form="addressForm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

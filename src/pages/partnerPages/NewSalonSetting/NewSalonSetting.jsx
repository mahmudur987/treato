import React, { useEffect, useState } from "react";
import BasicDetailsPartner from "./BasicDetailsPartner";
import ServiceOffer from "./ServiceOffer";
import ServiceLocation from "./ServiceLocation";
import SalonPictures from "./Gallery/SalonPictures";
import sty from "./NewSalonSetting.module.css";

const NewSalonSetting = () => {
  const [salonData, setSalonData] = useState({
    salon_name: "",
    salons_description: "",
    salons_address: "",
    website: "",
    services_provided: [],
    location: "",
    building_number: "",
    landmark: "",
    city: "",
    postal_code: "",
    locationText: "",
    type: "",
    coordinates: 0,
    salons_phone_number: "",
    salon_email: "",
    account_number: "",
    bank_name: "",
    account_holder_name: "",
    IFSC_code: "",
    day: "",
    opening_time: "",
    closing_time: "",
    lat: "",
    lng: "",
  });
  const [workingHours, setWorkingHours] = useState([]);
  const [position, setPosition] = useState({
    lat: 17.37853177941969,
    lng: 78.49555492401123,
  });
  let [defaultProps, updateDefaultProps] = useState({
    center: {
      lat: 17.37853177941969,
      lng: 78.49555492401123,
    },
    zoom: 10,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      salon_name: salonData.salon_name,
      salons_description: salonData.salons_description,
      salons_address: salonData.salons_address,
      location_details: {
        location: salonData.location,
        building_number: salonData.building_number,
        landmark: salonData.landmark,
        city: salonData.city,
        postal_code: salonData.postal_code,
      },
      working_hours: workingHours,
      location: {
        type: "Point",
        coordinates: [position.lat, position.lng],
      },
    };
    console.log(submitData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalonData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={sty.container}>
        <form onSubmit={handleSubmit}>
          <BasicDetailsPartner
            salonData={salonData}
            setSalonData={setSalonData}
            handleChange={handleChange}
          />
          <div className={sty.ServiceOfferSmallScreen}>
            <ServiceOffer
              salonData={salonData}
              setSalonData={setSalonData}
              setWorkingHours={setWorkingHours}
            />
          </div>
          <div className={sty.ServiceLocationSmallScreen}>
            <ServiceLocation
              salonData={salonData}
              setSalonData={setSalonData}
              position={position}
              setPosition={setPosition}
              defaultProps={defaultProps}
              updateDefaultProps={updateDefaultProps}
            />
          </div>
          <div className={sty.SalonPicturesSmallScreen}>
            <SalonPictures salonData={salonData} setSalonData={setSalonData} />
          </div>

          {/* <SalonPictures /> */}
          <div className={sty.saveBtnDiv}>
            <button
              style={{ cursor: "pointer" }}
              type="submit"
              className={sty.saveBtn}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewSalonSetting;

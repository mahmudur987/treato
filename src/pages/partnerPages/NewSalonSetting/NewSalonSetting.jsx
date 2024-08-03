import React, { useEffect, useState } from "react";
import BasicDetailsPartner from "./BasicDetailsPartner";
import ServiceOffer from "./ServiceOffer";
import ServiceLocation from "./ServiceLocation";
import SalonPictures from "./Gallery/SalonPictures";
import sty from "./NewSalonSetting.module.css";
import { createSalon } from "../../../services/salon";
import { toast } from "react-toastify";

const NewSalonSetting = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileScreen, setMobileScreen] = useState(true);
  const [PcScreen, setPcScreen] = useState(true);
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
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setMobileScreen(true);
      setPcScreen(false);
    } else {
      setMobileScreen(false);
      setPcScreen(true);
    }
  };
  console.log(PcScreen);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobileScreen) {
      if (currentStep < 4) {
        return setCurrentStep((pre) => pre + 1);
      }
    }

    if (salonData.salon_name === "") {
      return toast.error("write your salon name");
    }

    if (salonData.salons_description === "") {
      return toast.error("write something about  your salon");
    }

    if (salonData.location === "") {
      return toast.error("choose your location");
    }
    if (salonData.building_number === "") {
      return toast.error("write your building number");
    }
    if (salonData.landmark === "") {
      return toast.error("write your landmark");
    }
    if (salonData.postal_code === "") {
      return toast.error("write your post code");
    }
    if (workingHours.length < 1) {
      return toast.error("select your salon schedule");
    }
    if (salonData.services_provided.length < 1) {
      return toast.error("select your provided service");
    }

    const submitData = {
      salon_name: salonData.salon_name,
      salons_description: salonData.salons_description,
      salons_address: salonData.location,
      services_provided: salonData.services_provided,
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
    const { res, err } = await createSalon(submitData);

    if (res) {
      console.log(res);
    }
    if (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Error");
    }
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
        <div className={sty.usr_detail_head}>
          <h1>Set up your account</h1>
          <p>
            Tell us about your business. You can always edit the details later.
          </p>

          <div className={sty.steps}>
            <span
              onClick={() => setCurrentStep(1)}
              className={sty.step}
              style={{ background: `${currentStep === 1 ? "#0D69D7" : ""}` }}
            ></span>
            <span
              className={sty.step}
              onClick={() => setCurrentStep(2)}
              style={{ background: `${currentStep === 2 ? "#0D69D7" : ""}` }}
            ></span>
            <span
              className={sty.step}
              onClick={() => setCurrentStep(3)}
              style={{ background: `${currentStep === 3 ? "#0D69D7" : ""}` }}
            ></span>
            <span
              className={sty.step}
              onClick={() => setCurrentStep(4)}
              style={{ background: `${currentStep === 4 ? "#0D69D7" : ""}` }}
            ></span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={sty.form}>
          {(PcScreen || (mobileScreen && currentStep === 1)) && (
            <div className={sty.ServiceOfferSmallScreen}>
              <BasicDetailsPartner
                salonData={salonData}
                setSalonData={setSalonData}
                handleChange={handleChange}
              />
            </div>
          )}

          <div className={sty.ServiceOfferSmallScreen}>
            <ServiceOffer
              salonData={salonData}
              setSalonData={setSalonData}
              setWorkingHours={setWorkingHours}
              PcScreen={PcScreen}
              mobileScreen={mobileScreen}
              currentStep={currentStep}
            />
          </div>

          {(PcScreen || (mobileScreen && currentStep === 3)) && (
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
          )}
          {(PcScreen || (mobileScreen && currentStep === 4)) && (
            <div className={sty.SalonTeamDetails}>
              <h3 className={sty.teamDetailsH}>Team details</h3>

              <div className={sty.inputWrapper}>
                <label
                  htmlFor="
  "
                >
                  Number of team members
                </label>

                <input type="text" value={5} />
              </div>

              <p className={sty.description}>
                We’ll setup Sonia as a dummy team member. You can always
                add/edit team members and their details on your Teams page.
              </p>
            </div>
          )}

          <div className={sty.saveBtnDiv}>
            <button
              style={{ cursor: "pointer" }}
              type="submit"
              className={sty.saveBtn}
            >
              Save
            </button>
            <button
              style={{
                cursor: "pointer",
                background: `${currentStep === 4 ? "black" : ""}`,
                color: `${currentStep === 4 ? "white" : ""}`,
              }}
              type="submit"
              className={sty.Proceed}
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewSalonSetting;

import React, { useEffect, useState } from "react";
import BasicDetailsPartner from "./BasicDetailsPartner";
import ServiceOffer from "./ServiceOffer";
import ServiceLocation from "./ServiceLocation";

import sty from "./NewSalonSetting.module.css";
import {
  createSalon,
  UpdateSalon,
  useSingleSalon,
} from "../../../services/salon";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import { getUserProfile } from "../../../services/auth";
import {
  updateIsLoggedIn,
  updateUserDetails,
} from "../../../redux/slices/user";

const NewSalonSetting = () => {
  const { newPartner } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileScreen, setMobileScreen] = useState(false);
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
    teamMemberCount: 0,
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

  useEffect(() => {
    if (newPartner.isProfileComplete) {
      navigate("/partner/dashboard");
    }
  }, [newPartner, navigate]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSubmit = async () => {
    if (mobileScreen) {
      if (currentStep < 4) {
        return setCurrentStep((pre) => pre + 1);
      }
    }

    if (!salonData.salon_name) {
      return toast.error("write your salon name");
    }

    if (!salonData.salons_description) {
      return toast.error("write something about  your salon");
    }
    if (salonData?.services_provided?.length < 1) {
      return toast.error("select your provided service");
    }
    if (workingHours.length < 1) {
      return toast.error("select your salon schedule");
    }
    if (!salonData.location) {
      return toast.error("choose your location");
    }
    if (!salonData.building_number) {
      return toast.error("write your building number");
    }
    if (!salonData.landmark) {
      return toast.error("write your landmark");
    }
    if (!salonData.city) {
      return toast.error("write your City");
    }
    if (!salonData.postal_code) {
      return toast.error("write your post code");
    }
    // setLoading(true);
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
        coordinates: [position.lng, position.lat],
      },
      teamMemberCount: Number(salonData?.teamMemberCount),
    };
    console.log(submitData);

    const { res, err } = await createSalon(submitData);
    if (res) {
      console.log("create salon", res);
      let isTokenExist = localStorage.getItem("jwtToken");
      if (isTokenExist) {
        getUserProfile(isTokenExist)
          .then((res) => {
            dispatch(updateIsLoggedIn(true));
            dispatch(updateUserDetails(res?.res?.data));
            toast.success("salon created successfully");
            navigate("/partner/dashboard");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Error");
          });
      }
    }
    if (err) {
      console.log(err);
      setLoading(false);
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

  if (loading) {
    return <LoadSpinner />;
  }

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
        <div className={sty.form}>
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

                <input
                  type="number"
                  value={salonData.teamMemberCount}
                  onChange={(e) =>
                    setSalonData({
                      ...salonData,
                      teamMemberCount: e.target.value,
                    })
                  }
                />
              </div>

              <p className={sty.description}>
                We’ll setup Sonia as a dummy team member. You can always
                add/edit team members and their details on your Teams page.
              </p>
            </div>
          )}

          <div className={sty.saveBtnDiv}>
            {PcScreen && (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={handleSubmit}
                className={sty.saveBtn}
              >
                Save
              </button>
            )}
            {mobileScreen && (
              <button
                style={{
                  cursor: "pointer",
                  background: `${currentStep === 4 ? "black" : ""}`,
                  color: `${currentStep === 4 ? "white" : ""}`,
                }}
                type="button"
                onClick={handleSubmit}
                className={sty.Proceed}
              >
                Proceed
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSalonSetting;

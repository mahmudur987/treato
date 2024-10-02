import React, { useEffect, useState } from "react";
import { MemoizedBasicDetailsPartner } from "./BasicDetailsPartner";
import { MemoizedServiceOffer } from "./ServiceOffer";
import { MemoizedServiceLocation } from "./ServiceLocation";
import ServiceLocation from "./ServiceLocation";
import SalonPictures from "./Gallery/SalonPictures";
import sty from "./Bussness.module.css";
import { useDispatch, useSelector } from "react-redux";
import { adminBasicDetails } from "../../../redux/slices/adminSlice/adminBasicAction";
import { useSingleSalon } from "../../../services/salon";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { toast } from "react-toastify";
import { getReadableAddress } from "../../../utils/getReadAbleAddress";

const Business = () => {
  const { data, isLoading, isError, error, refetch } = useSingleSalon();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.adminBasicData.loading);
  const updateError = useSelector((state) => state.adminBasicData.error);
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
  const [position, setPosition] = useState(null);
  let [defaultProps, updateDefaultProps] = useState({
    center: {
      lat: "",
      lng: "",
    },
    zoom: 10,
  });
  // useEffect(()=>console.log(data))
  useEffect(() => {
    if (position) {
      getReadableAddress(position.lat, position.lng)
        .then((res) => {
          const parts = res.split(", ");
          const newAddress = parts.slice(1).join(", ");

          setSalonData({
            ...salonData,
            salons_address: newAddress,
            locationText: newAddress,
          });
        })
        .catch((error) => {
          console.error("readable address error", error);
        });
    }
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields and show toast messages
    if (!salonData.salon_name) {
      return toast.error("Salon Name is required");
    }
    if (!salonData.salons_description) {
      return toast.error("Salon Description is required");
    }
    if (!salonData.salons_address) {
      return toast.error("Salon Address is required");
    }
    if (!salonData.location) {
      return toast.error("Location is required");
    }
    if (!salonData.building_number) {
      return toast.error("Building Number is required");
    }
    if (!salonData.city) {
      return toast.error("City is required");
    }
    if (!salonData.postal_code) {
      return toast.error("Postal Code is required");
    }
    if (workingHours.length === 0) {
      console.log(workingHours.length)
      return toast.error("Working Hours are required");
    }
    if (!position.lat || !position.lng) {
      return toast.error("Location coordinates are required");
    }
    if (!salonData.locationText) {
      return toast.error("Location Text is required");
    }
  
    // If all validations pass, create the submit data
    const submitData = {
      salon_name: salonData.salon_name,
      salons_description: salonData.salons_description,
      salons_address: salonData.salons_address,
      location_details: {
        location: salonData.location,
        building_number: salonData.building_number,
        landmark: salonData.landmark, // Landmark is optional
        city: salonData.city,
        postal_code: salonData.postal_code,
      },
      working_hours: workingHours,
      location: {
        type: "Point",
        coordinates: [position.lat, position.lng],
      },
      locationText: salonData.locationText,
    };
  
    // Dispatch the action to update salon details
    dispatch(adminBasicDetails(submitData));
    console.log(submitData)
    refetch();
  
    // Handle success and error messages
    if (!updateError) {
      toast.success("Salon details updated successfully.", { id: 5 });
    }
    if (updateError) {
      toast.error(updateError ? updateError : "Error");
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalonData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (data && !position) {
      const salon = data?.salon;
      const newData = {
        salon_name: salon?.salon_name,
        salons_description: salon?.salons_description,
        salons_address: salon?.salons_address,
        website: salon?.website,
        services_provided: salon?.services?.map((x) => x?.service_name),
        location: salon?.location_details?.location,
        building_number: salon?.location_details?.building_number,
        landmark: salon?.location_details?.landmark,
        city: salon?.location_details?.city,
        postal_code: salon?.location_details?.postal_code,
        locationText: salon?.locationText,
        type: salon?.location?.type,
        coordinates: salon?.location?.coordinates,
        salons_phone_number: salon?.salon_phone_number,
        salon_email: salon?.salon_email,
        account_number: salon?.bank_details?.account_number,
        bank_name: salon?.bank_details?.bank_name,
        account_holder_name: salon?.bank_details?.account_holder_name,
        IFSC_code: salon?.bank_details?.IFSC_code,
        day: "",
        opening_time: "",
        closing_time: "",
      };
      setSalonData(newData);
      setPosition({
        lat:
          salon?.location?.coordinates.length === 2
            ? salon?.location?.coordinates[0]
            : "28.7041",
        lng:
          salon?.location?.coordinates.length === 2
            ? salon?.location?.coordinates[1]
            : "77.1025",
      });
      let defaultProps = {
        center: {
          lat:
            salon?.location?.coordinates.length === 2
              ? salon?.location?.coordinates[0]
              : "28.7041",
          lng:
            salon?.location?.coordinates.length === 2
              ? salon?.location?.coordinates[1]
              : "77.1025",
        },
        zoom: 10,
      };
      updateDefaultProps(defaultProps);
    }

    setWorkingHours(data?.salon?.working_hours);
  }, [data]);
  // console.log(workingHours);

  if (isLoading || loading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <ErrorComponent message={error ? error : "Error"} />;
  }

  return (
    <>
      <div className={sty.container}>
        <form onSubmit={handleSubmit}>
          <MemoizedBasicDetailsPartner
            salonData={salonData}
            setSalonData={setSalonData}
            handleChange={handleChange}
          />
          <div className={sty.ServiceOfferSmallScreen}>
            <MemoizedServiceOffer
              salonData={salonData}
              setSalonData={setSalonData}
              setWorkingHours={setWorkingHours}
              workingHours={workingHours}
            />
          </div>
          <div className={sty.ServiceLocationSmallScreen}>
            <MemoizedServiceLocation
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
            <button type="submit" className={sty.saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Business;

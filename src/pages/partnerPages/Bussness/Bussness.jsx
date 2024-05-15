import React, { useEffect, useState } from "react";
import BasicDetailsPartner from "./BasicDetailsPartner";
import ServiceOffer from "./ServiceOffer";
import ServiceLocation from "./ServiceLocation";
import SalonPictures from "./Gallery/SalonPictures";
import sty from "./Bussness.module.css";
import { useDispatch, useSelector } from "react-redux";
import { adminBasicDetails } from "../../../redux/slices/adminSlice/adminBasicAction";
import { useSingleSalon } from "../../../services/salon";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { toast } from "react-toastify";

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
  });

  const [workingHours, setWorkingHours] = useState([]);

  const handleSubmit = async () => {
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
        working_hours: workingHours,
      },
    };
    dispatch(adminBasicDetails(submitData));
    refetch();
    toast.success("Salon details updated successfully.", { id: 5 });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalonData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
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
  }, [data]);
  if (isLoading || loading) {
    return <LoadSpinner />;
  }

  if (isError || updateError) {
    return (
      <ErrorComponent
        message={error ? error : updateError ? updateError : "Error"}
      />
    );
  }

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

export default Business;

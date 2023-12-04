import React, { useState } from "react";
import styles from "./Search_MoboModal.module.css";
import Locations from "../SearchContent/Locations";
import Treatments from "../SearchContent/Treatments";
import Venues from "../SearchContent/Venues";
import { arrowleft, closeIcon, mapPin, search, x } from "../../../../assets/images/icons";
import { getAllServices } from "../../../../services/Services";
import { useEffect } from "react";

const Search_MoboModal = (props) => {
  const {
    handle_close,
    setShow_Modal,
    show_Modal,
    title,
    placeholderText,
    icon,
    setTreatmentInputValue,
    setLocationInputValue,
    allSalonList,
    handleLocationInput,
    setLocationInput,
    pageName,
    uniqueLocText,
    activeButton,
    setallLookbook
  } = props;
  const [allServices, setallServices] = useState([]);
  const [filteredServiceData, setFilteredServiceData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    if(title==="Treatment or venue"){
      const inputValue = e.target.value;
      setInputValue(inputValue);
    
      // Filter the data based on the input value
      const filtered = allServices.filter((item) =>
        item.service_name.toLowerCase().includes(inputValue.toLowerCase())
      );
    
      setFilteredServiceData(filtered);
    }
    else{
      handleLocationInput(e)
    }
  };


  useEffect(() => {
    // Call the getAllServices function when the component mounts
    async function fetchAllServices() {
     try {
       const { res, err } = await getAllServices();
 
       if (res) {
         // If the request was successful, update the state with the data
         setallServices(res?.data?.data); // Assuming the response data contains a "data" property
         setFilteredServiceData(res?.data?.data)
       } else {
         // If there was an error, handle it and set the error state
         setError(err);
       }
     } catch (error) {
       // Handle unexpected errors here
       setError(error);
     }
   }
 
   fetchAllServices();
 }, [])



  return (
    <div className={styles["container"]}>
      <div className={styles["modalNav"]}>
        <img
          src={arrowleft}
          className={styles["arrowLeft"]}
          onClick={handle_close}
          alt="arrowLeft"
        />
      </div>
      <div className={styles["modalHeader"]}>
        <h2>{title}</h2>
        <div className={styles["inputWrapper"]}>
          <img
            src={icon}
            className={styles["loc_Icon"]}
            onClick={handle_close}
            alt="search"
          />
          <input  className={styles["loc_Input"]} onChange={handleInputChange} placeholder={placeholderText}/>
          <img
            src={closeIcon}
            className={styles["closeInput"]}
            onClick={handle_close}
            alt="closeModal"
          />
        </div>
      </div>
        <div className={styles["modalContent"]}>
          <div className={styles["loc_Results"]}>
            {title!="Treatment or venue"?<Locations allSalonList={allSalonList} setLocationInputValue={setLocationInputValue} handle_close={handle_close} pageName={pageName} setLocationInput={setLocationInput}  uniqueLocText={uniqueLocText} activeButton={activeButton} setallLookbook={setallLookbook}/>:
            <>
            <Treatments allServices={filteredServiceData} setTreatmentInputValue={setTreatmentInputValue} handle_close={handle_close}/>
            <Venues/>
            </>
            }
            
          </div>
        </div>
    </div>
  );
};

export default Search_MoboModal;

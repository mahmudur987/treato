import React, { useState } from "react";
import styles from "./Search_MoboModal.module.css";
import Locations from "../SearchContent/Locations";
import Treatments from "../SearchContent/Treatments";
import Venues from "../SearchContent/Venues";
import { arrowleft, closeIcon, mapPin, search, x } from "../../../../assets/images/icons";

const Search_MoboModal = (props) => {
  const {
    handle_close,
    setShow_Modal,
    show_Modal,
    title,
    placeholderText,
    icon,
  } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["modalNav"]}>
        <img
          src={arrowleft}
          className={styles["arrowLeft"]}
          onClick={handle_close}
          alt="arrowLeft"
        />
        <img
          src={x}
          className={styles["closeModal"]}
          onClick={handle_close}
          alt="closeModal"
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
          <input className={styles["loc_Input"]} onChange={handleInputChange} placeholder={placeholderText}/>
          <img
            src={closeIcon}
            className={styles["closeInput"]}
            onClick={handle_close}
            alt="closeModal"
          />
        </div>
      </div>
      {inputValue && (
        <div className={styles["modalContent"]}>
          <div className={styles["loc_Results"]}>
            {title!="Treatment or venue"?<Locations />:
            <>
            <Treatments/>
            <Venues/>
            </>
            }
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Search_MoboModal;

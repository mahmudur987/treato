import { useState } from "react";
import styles from "./PhoneInput.module.css";

export default function PhoneInput({
  PlaceHolder,
  Type,
  VALUE,
  DISABLED,
  ID,
  NAME,
  updateInputVal,
  inputVal,
  onChange,
  setPhone, // Ensure setPhone is destructured correctly
}) {
  const [country, setCountry] = useState("+91");
  const [errorMessage, setErrorMessage] = useState("");

  const countryPhoneLengths = {
    "+91": 10,
    "+88": 10,
    "+66": 9,
  };

  function validatePhoneNumber(phoneNumber) {
    const numberWithoutCountryCode = phoneNumber.replace(country, "");
    const isNumeric = /^\d+$/.test(numberWithoutCountryCode);
    const isValidLength =
      numberWithoutCountryCode.length <= countryPhoneLengths[country];

    if (!isNumeric) {
      return "The phone number should contain only digits.";
    }
    if (!isValidLength) {
      return `The phone number should be up to ${countryPhoneLengths[country]} digits long.`;
    }
    return "";
  }

  function inputValue(e) {
    const phoneNumber = country + e.target.value;
    const validationError = validatePhoneNumber(phoneNumber);
    setErrorMessage("");
    if (validationError) {
      setErrorMessage(validationError);
      console.log(validationError);
    } else {
      setErrorMessage("");
      if (typeof setPhone === "function") {
        // Ensure setPhone is a function
        setPhone(phoneNumber);
      }
    }
    if (updateInputVal) {
      let allValue = { ...inputVal };
      allValue[e.target.name] = e.target.value;
      updateInputVal(allValue);
    }
  }

  return (
    <>
      <div className={styles.phone_inputMain}>
        <select
          onChange={(e) => setCountry(e.target.value)}
          name="country"
          id=""
          className={styles.phone_select}
        >
          <option value="+91">+91</option>
          <option value="+88">+88</option>
          <option value="+66">+66</option>
        </select>
        <div className={styles.phone_inputBorder}></div>
        <input
          type={Type ? Type : "text"}
          placeholder={PlaceHolder ? PlaceHolder : ""}
          className={styles.phone_input}
          value={VALUE ? VALUE.replace(country, "") : ""}
          disabled={DISABLED ? DISABLED : false}
          id={ID ? ID : ""}
          name={NAME ? NAME : ""}
          onChange={onChange ? onChange : inputValue}
        />
      </div>
      {errorMessage && (
        <div className={styles.error_message}>{errorMessage}</div>
      )}
    </>
  );
}

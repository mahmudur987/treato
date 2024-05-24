import React from "react";
// import styles from "./CreateAccountPage.module.css";
import styles from "./CountrySelect.module.css";

import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const CountrySelect = ({ value, onChange, labels, phone, ...rest }) => {
  return (
    <select
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined);
      }}
      className={`${styles.countryCodeOptions} ${
        phone.length ? styles.bglightGray : ""
      }`}
    >
      <option value="">+91</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
};
export default CountrySelect;

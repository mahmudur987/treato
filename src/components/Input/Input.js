import React from "react";
import inputStyles from "./Input.module.css";

const InputField = ({
  name,
  value,
  onChange,
  type,
  placeholder,
  checked,
  styles,
  label,
  setValue,
  error,
}) => {
  return (
    <label className={inputStyles.label}>
      {type === "checkbox" ? (
        <>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className={""}
          />
        </>
      ) : type === "textarea" ? (
        <>
          {label}
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles}
          />
        </>
      ) : (
        <>
          {label}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputStyles.input}
          />
        </>
      )}
    </label>
  );
};

export default InputField;

import React, { memo } from "react";
import inputStyles from "./Input.module.css";

const InputField = (props) => {
  const {
    name,
    value,
    onChange,
    type,
    placeholder,
    checked,
    styles,
    label,
    disabled,
  } = props;
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
            disabled={disabled}
          />
        </>
      )}
    </label>
  );
};

export default InputField;

export const MemoizedInputField = memo(InputField);

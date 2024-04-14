import React from 'react';
import inputStyles from "./Input.module.css"

const InputField = (props) => {
  const { name, value, onChange, type, placeholder, checked, styles,label, setValue, error } = props;
  return (
    <label className={inputStyles.label}>
      {type === 'checkbox' ? (
        <>
          <input type="checkbox" name={name} checked={checked} onChange={onChange} className={""} />
        </>
      ) : type === 'textarea' ? (
        <>
          {props.label}
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
          {props.label}
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

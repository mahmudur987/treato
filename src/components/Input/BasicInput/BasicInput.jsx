import styles from "./BasicInput.module.css";

export default function BasicInput({
  PlaceHolder = "",
  Type = "text",
  VALUE, // Optional
  DISABLED = false,
  id = "",
  NAME = "",
  updateInputVal,
  inputVal = {},
  required = false,
  className = "",
  onChange,
}) {
  const inputValue = (e) => {
    const { name, value } = e.target;
    if (updateInputVal) {
      updateInputVal({ ...inputVal, [name]: value });
    }

    if (onChange) {
      onChange(e); // Call parent-provided onChange if available
    }
  };

  return (
    <input
      type={Type}
      placeholder={PlaceHolder}
      className={`${className} ${styles.basic_input}`}
      {...(VALUE !== undefined ? { value: VALUE } : {})} // Use value only if provided
      disabled={DISABLED}
      id={id}
      name={NAME}
      required={required}
      onChange={inputValue} // Always use inputValue as the handler
    />
  );
}

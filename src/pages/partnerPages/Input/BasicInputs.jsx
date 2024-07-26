import styles from "./BasicInputs.module.css";

export default function BasicInputs({
  placeholder,
  type,
  value,
  DISABLED,
  id,
  NAME,
  updateInputVal,
  inputVal,
  required,
  className,
  onChange,
  checked,
  label,
  style,
}) {
  function inputValue(e) {
    if (updateInputVal) {
      let allValue = { ...inputVal };
      allValue[e.target.name] = e.target.value;
      updateInputVal(allValue);
    }
  }
  return (
    <>
      <label className={styles.label}>
        {type === "checkbox" ? (
          <>
            <input
              type="checkbox"
              name={NAME}
              checked={checked}
              onChange={onChange}
            />
          </>
        ) : type === "textarea" ? (
          <>
            <textarea
              name={NAME}
              defaultValue={value}
              onChange={onChange}
              placeholder={placeholder}
              className={style}
              disabled={DISABLED}
            />
          </>
        ) : (
          <>
            <input
              type={type}
              name={NAME}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={styles.input}
              disabled={DISABLED}
            />
          </>
        )}
      </label>
    </>
  );
}

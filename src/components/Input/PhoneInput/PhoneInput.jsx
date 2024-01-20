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
}) {
  const [value, setValue] = useState("");

  function inputValue(e) {
    setValue(e.target.value);
    if (updateInputVal) {
      let allValue = { ...inputVal };
      allValue[e.target.name] = e.target.value;
      updateInputVal(allValue);
    }
  }

  return (
    <div className={styles.phone_inputMain}>
      <select name="country" id="" className={styles.phone_select}>
        <option value="+91">+91</option>
        <option value="+88">+88</option>
        <option value="+66">+66</option>
      </select>
      <div className={styles.phone_inputBorder}></div>
      <input
        type={Type ? Type : "text"}
        placeholder={PlaceHolder ? PlaceHolder : ""}
        className={styles.phone_input}
        value={VALUE ? VALUE : value}
        disabled={DISABLED ? DISABLED : false}
        id={ID ? ID : ""}
        name={NAME ? NAME : ""}
        onChange={inputValue}
      />
    </div>
  );
}

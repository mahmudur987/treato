import React from "react";
import styles from "./primaryButton.module.css";

//filled button
export default function PrimaryButton({
  children,
  className,
  onClick,
  form,
  disabled,
  type,
}) {
  return (
    <button
      className={`${styles["container"]} ${className ? className : ""}`}
      style={{ backgroundColor: `${disabled ? "gray" : ""}` }}
      onClick={onClick}
      form={form ? form : null}
      disabled={disabled ? disabled : false}
      type={type}
    >
      {children}
    </button>
  );
}

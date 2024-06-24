import styles from "./TextArea.module.css";

export default function TextArea({ PlaceHolder, onChange }) {
  return (
    <textarea
      name=""
      id=""
      placeholder={PlaceHolder ? PlaceHolder : ""}
      className={styles.text_area}
      onChange={onChange}
    ></textarea>
  );
}

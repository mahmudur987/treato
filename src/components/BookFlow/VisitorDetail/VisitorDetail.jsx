import { memo, useEffect, useState } from "react";
import { useRef } from "react";
import styles from "../../../pages/BookFlow/BookFlow.module.css";
import BasicInput from "../../Input/BasicInput/BasicInput";
import RadioInput from "../../Input/RadioInput/RadioInput";
import TextArea from "../../Input/TextArea/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { updateVisitorContent } from "../../../redux/slices/VisitorDetails";

export default function VisitorDetail() {
  const dispatch = useDispatch();
  const [guest, setGuest] = useState(false);
  const [visitorPhone, setvisitorPhone] = useState("");
  const [countryCode, setcountryCode] = useState("+91");
  const { contact } = useSelector((state) => state?.VisitorDetails);

  const isFirstRender = useRef(null);
  const [err, setErr] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");
  useEffect(() => {
    // Click the label when the component mounts
    isFirstRender.current.click();
  }, []);
  // console.log(userDetails);
  const handleRadioChange = (value) => {
    setGuest(value);
    dispatch(
      updateVisitorContent({
        guest: value,
      })
    );
  };

  const handleInputChange = (field, value) => {
    if (field === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setvisitorPhone(numericValue);
      value = numericValue.slice(0, 11);
      value = `${countryCode}${value}`;

      if (value.length !== 13) {
        setErr("write a correct phone number");
      } else {
        setErr("");
      }
    }
    if (field === "email") {
      const isValid = /\S+@\S+\.\S+/.test(value);

      if (!isValid) {
        setIsValidEmail("write a correct email");
      } else {
        setIsValidEmail("");
      }
    }

    dispatch(
      updateVisitorContent({
        guest,
        contact: {
          ...contact,
          [field]: value,
        },
      })
    );
  };

  return (
    <div className={styles.visitor_detailMain}>
      <div className={styles.visitor_detailA}>
        <div className={styles.visitor_detailAA}>Who are you booking for?</div>
        <div className={styles.visitor_detailAB} ref={isFirstRender}>
          <RadioInput
            Type={"radio"}
            NAME={"visitor"}
            setGuest={handleRadioChange}
            guest={false}
            checked={!guest}
          />
          <div>Booking for myself</div>
        </div>
        <div className={styles.visitor_detailAB}>
          <RadioInput
            Type={"radio"}
            NAME={"visitor"}
            setGuest={handleRadioChange}
            guest={true}
            checked={guest}
          />
          <div>Booking for someone else (guest)</div>
        </div>
      </div>
      <div className={styles.visitor_detailA}>
        <div className={`${styles.visitor_detailAA} ${styles.mb_0}`}>
          {guest ? "Enter details of guest" : "Enter contact details"}
        </div>
        <div className={styles.visitor_detailAB}>
          You may need this phone number at the salon for OTP purposes
        </div>
        <div className={styles.visitor_detailAC}>
          <div className={styles.visitor_detailACA}>Name</div>
          <div className={styles.visitor_detailACB}>
            <BasicInput
              Type={"text"}
              PlaceHolder={"Shreyas Awasthi"}
              VALUE={contact?.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
        </div>
        <div className={styles.visitor_detailAC}>
          <div className={styles.visitor_detailACA}>Phone</div>
          {err && <p  className={styles.showError} >{err}</p>}
          <div
            className={`${styles.visitor_detailACB} ${styles.visitor_detailAC_opt}`}
          >
            <div className={styles.phone_inputMain}>
              <select
                name="country"
                id=""
                className={styles.phone_select}
                onChange={(e) => setcountryCode(e.target.value)}
              >
                <option
                  selected={contact?.phone?.slice(0, 3) === "+91"}
                  value="+91"
                >
                  +91
                </option>
                <option
                  selected={contact?.phone?.slice(0, 3) === "+88"}
                  value="+88"
                >
                  +88
                </option>
                <option
                  selected={contact?.phone?.slice(0, 3) === "+66"}
                  value="+66"
                >
                  +66
                </option>
              </select>
              <div className={styles.phone_inputBorder}></div>

              <input
                value={contact?.phone?.slice(3, 14)}
                type="tel"
                placeholder={"Enter your phone number"}
                maxLength={11}
                className={styles.phone_input}
                name={"phone"}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.visitor_detailAC}>
          <div className={styles.visitor_detailACA}>Email</div>
          {isValidEmail && <p className={styles.showError}>{isValidEmail}</p>}

          <div className={styles.visitor_detailACB}>
            <BasicInput
              VALUE={contact?.email}
              Type={"email"}
              PlaceHolder={"shreya2716@gmail.com"}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required={true}
            />
          </div>
        </div>
        <div className={styles.visitor_detailAC}>
          <div className={styles.visitor_detailACA}>Preferences (optional)</div>
          <div className={styles.visitor_detailACB}>
            <TextArea
              VALUE={contact?.preferences}
              PlaceHolder={"Anything specific you want to share"}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizeVisitorsDetails = memo(VisitorDetail);

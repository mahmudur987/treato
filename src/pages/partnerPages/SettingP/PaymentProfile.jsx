import React, { useEffect, useState } from "react";
import styles from "./PaymentProfile.module.css";
import InputField from "../../../components/Input/Input";
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg";
import { Link } from "react-router-dom";
import { useSingleSalon } from "../../../services/salon";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { useDispatch } from "react-redux";
import { adminBasicDetails } from "../../../redux/slices/adminSlice/adminBasicAction";
import { toast } from "react-toastify";

const PaymentProfile = () => {
  const { data, isLoading, isError, error, refetch } = useSingleSalon();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    IFSC_code: "",
    account_holder_name: "",
    account_number: "",
    bank_name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bank_details: formData,
    };

    dispatch(adminBasicDetails(data));
    refetch();
    toast.success("Salon update successfully", { id: 5 });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setFormData(data?.salon?.bank_details);
  }, [data]);

  if (isLoading || loading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <ErrorComponent message={error ? error : "Error"} />;
  }
  return (
    <>
      <section className={styles["container"]}>
        <div className={styles["contactWrapper"]}>
          <div className={styles["formContainer"]}>
            <div className={styles["heading"]}>
              <Link to={"/partner/dashboard/PartnerAccountSetting"}>
                <span>
                  <img
                    src={arrowLeft}
                    alt="arrowLeft"
                    className={styles["arrowLeft"]}
                  />
                </span>
              </Link>
              Payments
            </div>

            <form onSubmit={handleSubmit} className={styles["formFields"]}>
              <div className={styles["inputField"]}>
                <InputField
                  label="Account Number"
                  type="text"
                  name="bank_name"
                  value={formData?.bank_name}
                  onChange={handleChange}
                  placeholder="Enter Bank Name"
                  // styles={styles.input}
                />
              </div>
              <div className={styles["inputField"]}>
                <InputField
                  label="Account Number"
                  type="text"
                  name="account_number"
                  value={formData?.account_number}
                  onChange={handleChange}
                  placeholder="Enter 11-digit bank account number"
                  // styles={styles.input}
                />
              </div>
              <div className={styles["inputField"]}>
                <InputField
                  label="Name of the Account Holder"
                  type="text"
                  name="account_holder_name"
                  value={formData?.account_holder_name}
                  onChange={handleChange}
                  placeholder="ABC Ventures Pvt. Ltd."
                  // styles={styles.input}
                />
              </div>
              <div className={styles["inputField"]}>
                <InputField
                  label="IFSC Code"
                  type="text"
                  name="IFSC_code"
                  value={formData?.IFSC_code}
                  onChange={handleChange}
                  placeholder="SBIN0001234"
                  // styles={styles.input}
                />
              </div>

              <button className={styles["paymentSubmit"]}>Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentProfile;

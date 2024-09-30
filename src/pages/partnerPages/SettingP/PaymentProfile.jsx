import React, { useEffect, useState } from "react";
import styles from "./PaymentProfile.module.css";
import InputField, {
  MemoizedInputField,
} from "../../../components/Input/Input";
import arrowLeft from "../../../assets/images/AccountSettings/arrow-left.svg";
import { Link } from "react-router-dom";
import { useSingleSalon } from "../../../services/salon";
import LoadSpinner from "../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { useDispatch } from "react-redux";
import { adminBasicDetails } from "../../../redux/slices/adminSlice/adminBasicAction";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

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

  const [editableFields, setEditableFields] = useState({
    IFSC_code: false,
    account_holder_name: false,
    account_number: false,
  });

  const banks = [
    "Bank of India",
    "State Bank Of India",
    "Punjab National Bank",
    "ICICI Bank",
    "HDFC Bank",
    // Add more banks as needed
  ];

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      bank_details: formData,
    };
    dispatch(adminBasicDetails(data));
    refetch();
    toast.success("Bank details updated successfully", { id: 5 });
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
    if (data?.salon?.bank_details) {
      setFormData(data.salon.bank_details);
    }
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
                    loading="lazy"
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
                <label>Bank Name</label>
                <select
                  name="bank_name"
                  value={formData.bank_name || ""}
                  onChange={handleChange}
                  className={styles["dropdown"]}
                >
                  <option value="" disabled>
                    Select Bank
                  </option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["inputField"]}>
                <label>Account Number</label>
                <div className={styles["editableContainer"]}>
                  <InputField
                    type="text"
                    name="account_number"
                    value={formData.account_number || ""}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const nonNumericRegex = /[^0-9]/;

                      if (nonNumericRegex.test(inputValue)) {
                        return window.alert("Please enter numbers only.");
                      }

                      if (inputValue.length > 16) {
                        return window.alert(
                          "Account number cannot exceed 16 digits."
                        );
                      }

                      handleChange(e);
                    }}
                    placeholder="Enter 11-digit bank account number"
                    disabled={!editableFields.account_number}
                  />
                  <MdEdit
                    className={styles["editIcon"]}
                    onClick={() => handleEditClick("account_number")}
                  />
                </div>
              </div>
              <div className={styles["inputField"]}>
                <label>Name of the Account Holder</label>
                <div className={styles["editableContainer"]}>
                  <MemoizedInputField
                    type="text"
                    name="account_holder_name"
                    value={formData.account_holder_name || ""}
                    onChange={handleChange}
                    placeholder="ABC Ventures Pvt. Ltd."
                    disabled={!editableFields.account_holder_name}
                  />
                  <MdEdit
                    className={styles["editIcon"]}
                    onClick={() => handleEditClick("account_holder_name")}
                  />
                </div>
              </div>
              <div className={styles["inputField"]}>
                <label>IFSC Code</label>
                <div className={styles["editableContainer"]}>
                  <MemoizedInputField
                    type="text"
                    name="IFSC_code"
                    value={formData.IFSC_code || ""}
                    onChange={handleChange}
                    placeholder="SBIN0001234"
                    disabled={!editableFields.IFSC_code}
                  />
                  <MdEdit
                    className={styles["editIcon"]}
                    onClick={() => handleEditClick("IFSC_code")}
                  />
                </div>
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

import React from "react";
import styles from "./AuthChoicePage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom"; // Import useNavigate
import { chooseRole } from "../../../redux/slices/authChoice";
import { briefcase, user, arrowright, arrowleft } from "../../../assets/images/icons";
import AuthLayout from "../AuthLayout";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton/SecondaryButton";
const AuthChoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleRoleChoice = (role) => {
    dispatch(chooseRole({ role }));
    navigate("/create-account"); // Navigate to Create Account page
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <AuthLayout>
      <div className={styles.container}>
        <img src={arrowleft} className={styles.arrowleft} onClick={handleBack}/>
        <h1 className={styles.heading}>Create your Treato account</h1>
        <div className={styles.choiceButtons}>
          <PrimaryButton
            onClick={() => handleRoleChoice("customer")}
            className={styles.customer}
          >
            <div>
              <div className={styles.info}>
                <img src={user} alt="User Icon"  className={styles.userIcon}/>
                Customer
              </div>
              <p className={styles.desc}>Explore and book salons near you</p>
            </div>
            <img
              src={arrowright}
              className={styles.arrowright1}
              alt="Arrow Right Icon"
            />
          </PrimaryButton>
          <SecondaryButton
            onClick={() => handleRoleChoice("business")}
            className={styles.businesses}
          >
            <div>
              <div className={styles.info}>
                <img src={briefcase} alt="Briefcase Icon" />
                Businesses
              </div>
              <p className={styles.desc}>
                Manage and grow your business with Treato
              </p>
            </div>
            <img
              src={arrowright}
              className={styles.arrowright2}
              alt="Arrow Right Icon"
            />
          </SecondaryButton>
        </div>
        <h4 className={styles.signLink}>
          Already have an account? <a className={styles.link} href="/login">Sign in</a>
        </h4>
      </div>
    </AuthLayout>
  );
};

export default AuthChoicePage;

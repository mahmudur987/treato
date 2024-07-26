import React from "react";
import styles from "./AuthChoice.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  briefcase,
  user,
  arrowright,
  arrowleft,
} from "../../../../assets/images/icons";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../components/Buttons/SecondaryButton/SecondaryButton";
import AuthPage from "../../../../layouts/AuthPageLayout/AuthPage";
import { chooseRole } from "../../../../redux/slices/authChoice";
const AuthChoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleRoleChoice = (role) => {
    dispatch(chooseRole({ role }));
    navigate("/create-account"); // Navigate to Create Account page
  };

  return (
    <AuthPage>
      <div className={styles.container}>
        <h1 className={styles.heading}>Create your Treato account</h1>
        <div className={styles.choiceButtons}>
          <SecondaryButton
            onClick={() => handleRoleChoice("normal")}
            className={styles.customer}
          >
            <div>
              <div className={styles.info}>
                <img src={user} alt="User Icon" />
                Customers
              </div>
              <p className={styles.desc}>Explore and book salons near you</p>
            </div>
            <img
              src={arrowright}
              className={styles.arrowright2}
              alt="Arrow Right Icon"
            />
          </SecondaryButton>
          <PrimaryButton
            onClick={() => handleRoleChoice("partner")}
            className={styles.businesses}
          >
            <div>
              <div className={styles.info}>
                <img
                  src={briefcase}
                  alt="Briefcase Icon"
                  className={styles.userIcon}
                />
                Businesses
              </div>
              <p className={styles.desc}>
                Manage and grow your business with Treato
              </p>
            </div>
            <img
              src={arrowright}
              className={styles.arrowright1}
              alt="Arrow Right Icon"
            />
          </PrimaryButton>
        </div>
        <h4 className={styles.signLink}>
          Already have an account?{" "}
          <Link className={styles.link} to="/login">
            Sign in
          </Link>
        </h4>
      </div>
    </AuthPage>
  );
};

export default AuthChoice;

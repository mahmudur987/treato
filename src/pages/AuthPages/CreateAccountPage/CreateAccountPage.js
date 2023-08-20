import React from 'react';
import PrimaryButton from '../../../components/Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton/SecondaryButton';
import styles from './CreateAccountPage.module.css';
import AuthLayout from '../AuthLayout';

const CreateAccountPage = () => {
  return (
    <AuthLayout>
    <div className={styles.container}>
      <h2>Let’s get started!</h2>
      <p>Create your account in minutes to start booking</p>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" name="lastName" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <p className={styles.alreadyHaveAccount}>
          Already have an account? <a href="/login">Log in</a>
        </p>
        <div className={styles.actions}>
          <PrimaryButton>Create Account</PrimaryButton>
        </div>
      </form>
      <p className={styles.continueWith}>Or simply continue with</p>
      <div className={styles.socialButtons}>
        <SecondaryButton>Google</SecondaryButton>
        <SecondaryButton>Facebook</SecondaryButton>
      </div>
      <p className={styles.terms}>
        By creating an account, you agree to our <a href="#">Terms of use</a> and{" "}
        <a href="#">Privacy policy</a>
      </p>
    </div>
    </AuthLayout>
  );
};

export default CreateAccountPage;


import React from 'react';
import style from './modal.module.css'
import { FaCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ContactUsModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modaloverlay}>
      <div className={style.modal}>
        <div className={style.header}>
        <h1 className={style.heading} >Thank you</h1>
        <button className={style.closebutton} onClick={onClose}>
          &times;
        </button>
        </div>
        <div className={style.rightLogo}>
        <FaCheck className={style.checkIcon} />
        </div>
        <p className={style.messageBox}>We have successfully received your message and will get back to you soon.</p>
        <Link to="/" ><p className={style.homeButton}>Back to Home</p></Link>
      </div>
    </div>
  );
};

export default ContactUsModal;

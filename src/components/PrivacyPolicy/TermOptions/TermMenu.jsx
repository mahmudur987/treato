import React, { useState } from 'react';
import style from '../PrivacyPolicy/Privacy.module.css';

function Termoptions() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80; // Adjust this value according to the height of your fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return (
        <>
            <div className={style.container}>
                <h5 className={style.tablename}>Table of Contents</h5>
                <div className={style.optionBox}>
                    <h6
                        className={selectedOption === 'Option 1' ? style.selected : style.unSelected}
                        onClick={() => {
                            scrollToSection('introduction');
                            handleOptionClick('Option 1');
                        }}
                    >Introduction</h6>
                    <h6
                        className={selectedOption === 'Option 2' ? style.selected : style.unSelected}
                        onClick={() => {
                            scrollToSection('feedback');
                            handleOptionClick('Option 2');
                        }}
                    >Feedback and information</h6>
                    <h6
                        className={selectedOption === 'Option 3' ? style.selected : style.unSelected}
                        onClick={() => {
                            scrollToSection('privacy');
                            handleOptionClick('Option 3');
                        }}
                    >Privacy</h6>
                    <h6
                        className={selectedOption === 'Option 4' ? style.selected : style.unSelected}
                        onClick={() => {
                            scrollToSection('access');
                            handleOptionClick('Option 4');
                        }}
                    >Access to the site</h6>
                    <h6
                        className={selectedOption === 'Option 5' ? style.selected : style.unSelected}
                        onClick={() => {
                            scrollToSection('Age');
                            handleOptionClick('Option 5');
                        }}
                    >Age requirement</h6>
                </div>
            </div>
            <hr className={style.verticalLine} />
            <div className={style.rightContainer}>
                <h2 className={style.header}>Term of use</h2>
                <section id="introduction" className={style.section}>
                    <h2>Introduction</h2>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                </section>
                <section id="feedback" className={style.section}>
                    <h2>Feedback and information</h2>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                </section>
                <section id="privacy" className={style.section}>
                    <h2>Privacy</h2>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                </section>
                <section id="access" className={style.section}>
                    <h2>Access to the site</h2>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                    <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                </section>
                <section id="Age" className={style.section}>
                    <h2>Age requirement</h2>
                    <p>Content for age requirement goes here...</p>
                </section>
            </div>
        </>
    );
}

export default Termoptions;

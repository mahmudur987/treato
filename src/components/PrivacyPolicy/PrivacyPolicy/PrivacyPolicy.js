import React, { useState } from 'react'
import style from './Privacy.module.css';


function PrivacyService() {
    const [selectedOption, setSelectedOption] = useState(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (<>
        <div className={style.container} >
            <h5 className={style.tablename}  >Table of Contents</h5>
            <div className={style.optionBox} >
                <h6
                    className={selectedOption === 'Option 1' ? `${style.selected}` : style.unSelected}
                    onClick={(() => {
                        scrollToSection('introduction');
                        handleOptionClick('Option 1');
                    })

                    }>Introduction</h6>
                <h6
                    className={selectedOption === 'Option 2' ? `${style.selected}` : style.unSelected}
                    width={214}
                    onClick={(() => {
                        scrollToSection('feedback');
                        handleOptionClick('Option 2')
                    })}  >Feedback and information</h6>
                <h6 width={59}
                    className={selectedOption === 'Option 3' ? `${style.selected}` : style.unSelected}
                    onClick={(() => {
                        scrollToSection('privacy');
                        handleOptionClick('Option 3')
                    })}
                >Privacy</h6>
                <h6
                    className={selectedOption === 'Option 4' ? `${style.selected}` : style.unSelected}
                    width={141}
                    onClick={(() => {
                        scrollToSection('access');
                        handleOptionClick('Option 4')
                    })}
                >Access to the site</h6>
                <h6
                    className={selectedOption === 'Option 5' ? `${style.selected}` : style.unSelected}
                    width={137}
                    onClick={(() => {
                        scrollToSection('Age');
                        handleOptionClick('Option 5')
                    })}
                >Age requirement</h6>
            </div>
        </div>
        <hr className={style.verticalLine} />
        <div className={style.rightContainer}>
            <h2 className={style.header}>Privacy Policy</h2>
            <section id="introduction">
                <h2>Introduction</h2>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
            </section>
            <div className={style.horizontal} ></div>
            <section id="feedback">
                <h2>Feedback and information</h2>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>

            </section>
            <div className={style.horizontal} ></div>
            <section id="privacy">
                <h2>Privacy</h2>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
            </section>
            <div className={style.horizontal} ></div>
            <section id="access">
                <h2>Access to the site</h2>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
                <p>Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey.</p>
            </section>
            <div className={style.horizontal} ></div>
            <section id="Age">
                <h2>Age requirment</h2>
                <p>Content for feedback goes here...</p>
            </section>

        </div></>
    )
}

export default PrivacyService;


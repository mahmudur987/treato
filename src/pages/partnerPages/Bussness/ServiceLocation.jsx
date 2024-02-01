import React from 'react';
import mapImg from "../../../assets/images/partner/Screenshot 2023-08-07 at 2.01 1.png";
import styles from "./ServiceLocation.module.css"
import LoctionFrom from './LoctionFrom';
import BasicInputs from '../Input/BasicInputs';

const ServiceLocation = () => {
    return (<>
        {/* <div className={styles.container}>
            <div className={styles.mainDiv}>


                <div >
                    <div className={styles.inputtextLoc}>
                        <BasicInputs />
                    </div>

                    <div className={styles.inputtext}>
                        <BasicInputs />
                        <BasicInputs />
                    </div>
                    <div className={styles.inputtext}>
                        <BasicInputs />
                        <BasicInputs />
                    </div>

                </div>

                <div>
                    <div>
                        <p className={styles.mapImg}>Drag the pin to the correct location</p>
                        <img src={mapImg} alt="" />
                    </div>
                </div>
            </div>
        </div> */}
        <section className={styles["container"]} id="contactUs">
            <h1 className={styles["heading"]}>Contact us</h1>

            <div className={styles["contactWrapper"]}>
                <div className={styles["Image"]}>

                    <div className={styles["formFields"]}>
                        <div className={styles["emailField"]}>
                            <BasicInputs
                                label="Email"
                                type="email"
                                name="email"
                                // value={formData.email}
                                // onChange={handleChange}
                                placeholder="e.g. person@gmail.com"
                            // styles={styles.input}
                            />
                        </div>
                        <div className={styles["nameFields"]}>
                            <BasicInputs
                                label="First Name"
                                type="text"
                                name="firstName"
                                // value={formData.firstName}
                                // onChange={handleChange}
                                placeholder="First name"
                                styles={`${styles.firstnameInput}`}
                            />
                            <BasicInputs
                                label="Last Name"
                                type="text"
                                name="lastName"
                                // value={formData.lastName}
                                // onChange={handleChange}
                                placeholder="Last name"
                                styles={` ${styles.lastnameInput}`}
                            />
                        </div>
                        <div className={styles["nameFields"]}>
                            <BasicInputs
                                label="First Name"
                                type="text"
                                name="firstName"
                                // value={formData.firstName}
                                // onChange={handleChange}
                                placeholder="First name"
                                styles={`${styles.firstnameInput}`}
                            />
                            <BasicInputs
                                label="Last Name"
                                type="text"
                                name="lastName"
                                // value={formData.lastName}
                                // onChange={handleChange}
                                placeholder="Last name"
                                styles={` ${styles.lastnameInput}`}
                            />
                        </div>



                    </div>
                </div>

                <div className={styles["formContainer"]}>


                    <img src={mapImg} alt="Contact Us Banner" />
                </div>
            </div>
        </section>

    </>
    )
}

export default ServiceLocation
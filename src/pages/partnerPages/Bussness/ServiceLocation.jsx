import React, { useState, useEffect } from 'react';
import mapImg from "../../../assets/images/partner/Screenshot 2023-08-07 at 2.01 1.png";
import styles from "./ServiceLocation.module.css"
import BasicInputs from '../Input/BasicInputs';
import map from "../../../assets/images/partner/partnerSetting/Input_Field_Icons.png";
import CollaseIcon from "../../../assets/images/TeamDetails/chevron-down.png";

const ServiceLocation = () => {
    const handleChange = () => {
    }
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsCollapsed(false); // Set to false on small screens
            } else {
                setIsCollapsed(true); // Set to true on browser screens
            }
        };

        // Initial check on component mount
        handleResize();

        // Listen to window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };


    return (<>
        <div >
            <div className={styles.collapseForSmallScreen}>
                <div>
                    <h1>Location</h1>
                    <p>Add and edit salon location details.</p>
                </div>
                <div className={styles.CollaseIconImg1}>
                    <img src={CollaseIcon} alt="CollapseIcon" onClick={toggleCollapse} className={styles.CollaseIconImg} />
                </div>
            </div>
            <div>
                <h3 className={styles.Heading1}>Location Details</h3>

            </div>

            {isCollapsed && <div className={styles.mainDiv}>

                <div className={styles.Inputs}>

                    <div className={styles.inputtextLoc}>

                        <label htmlFor="">
                            <div className={styles.labelText}>Business Location</div>
                            <BasicInputs
                                type="text"
                                name="landmark"
                                // value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Search location"
                                styles={`${styles.locationInput}`}
                            />
                        </label>
                        <img src={map} alt="" className={styles.mapLogo} />
                    </div>

                    <div>
                        <div className={styles.inputtextNumber}>
                            <label htmlFor="">
                                <div className={styles.labelText}>Building Number</div>
                                <BasicInputs
                                    type="text"
                                    name="buildingNumber"
                                    //   value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>
                            <label htmlFor="">
                                <div className={styles.labelText}>Landmark <span className={styles.optional}>(optional)</span></div>
                                <BasicInputs

                                    type="text"
                                    name="landmark"
                                    // value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>

                        </div>
                        <div className={`${styles.inputtext} ${styles.inputtextForSS}`}>
                            <label htmlFor="" className={styles.inputtextCity}>
                                <div className={styles.labelText}>City</div>
                                <BasicInputs
                                    type="text"
                                    name="city"
                                    // value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>
                            <label htmlFor="" className={styles.inputtextCode}>
                                <div className={styles.labelText}>Postal Code</div>
                                <BasicInputs
                                    type="text"
                                    name="postaCode"
                                    // value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Search location"

                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>


                        </div>
                    </div>
                </div>
                <div >
                    <p className={styles.mapImg1}>Drag the pin to the correct location</p>
                    <img src={mapImg} alt="mapImg" className={styles.mapImg} />
                </div>
            </div>}

            <div className={styles.horizontalLine}></div>
        </div>


    </>
    )
}

export default ServiceLocation
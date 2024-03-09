import React, { useState, useEffect } from 'react';
import mapImg from "../../../assets/images/partner/Screenshot 2023-08-07 at 2.01 1.png";
import styles from "./ServiceLocation.module.css"
import BasicInputs from '../Input/BasicInputs';
import map from "../../../assets/images/partner/partnerSetting/Input_Field_Icons.png";
import CollaseIcon from "../../../assets/images/TeamDetails/chevron-down.png";
import { GoogleMap, Marker } from '@react-google-maps/api';

const ServiceLocation = ({ setSalonData, salonData }) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsCollapsed(false);
            } else {
                setIsCollapsed(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

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

                        <label htmlFor="location">
                            <div className={styles.labelText}>Business Location</div>
                            <BasicInputs
                                type="text"
                                NAME="location"

                                value={salonData.location}
                                onChange={e => setSalonData({ ...salonData, location: e.target.value })}
                                placeholder="Search location"
                                styles={`${styles.locationInput}`}
                            />
                        </label>
                        <img src={map} alt="map" className={styles.mapLogo} />
                    </div>

                    <div>
                        <div className={styles.inputtextNumber}>
                            <label htmlFor="building_number">
                                <div className={styles.labelText}>Building Number</div>
                                <BasicInputs
                                    type="text"
                                    NAME="building_number"
                                    value={salonData.building_number}
                                    onChange={e => setSalonData({ ...salonData, building_number: e.target.value })}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>
                            <label htmlFor="landmark">
                                <div className={styles.labelText}>Landmark <span className={styles.optional}>(optional)</span></div>
                                <BasicInputs

                                    type="text"
                                    NAME="landmark"
                                    value={salonData.landmark}
                                    onChange={e => setSalonData({ ...salonData, landmark: e.target.value })}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>

                        </div>
                        <div className={`${styles.inputtext} ${styles.inputtextForSS}`}>
                            <label htmlFor="city" className={styles.inputtextCity}>
                                <div className={styles.labelText}>City</div>
                                <BasicInputs
                                    type="text"
                                    NAME="city"
                                    value={salonData.city}
                                    onChange={e => setSalonData({ ...salonData, city: e.target.value })}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>
                            <label htmlFor="postal_code" className={styles.inputtextCode}>
                                <div className={styles.labelText}>Postal Code</div>
                                <BasicInputs
                                    type="text"
                                    NAME="postal_code"
                                    value={salonData.postal_code}
                                    onChange={e => setSalonData({ ...salonData, postal_code: e.target.value })}
                                    placeholder="Search location"
                                    styles={`${styles.BasicInputsFild}`}

                                />
                            </label>


                        </div>
                    </div>
                </div>
                <div >
                    <p className={styles.mapImg1}>Drag the pin to the correct location</p>
                    {/* <GoogleMap
                        mapContainerStyle={{
                            width: '400px',
                            height: '400px'
                        }}
                        // center={{
                        //     lat: userDetails?.user?.isLocationAllow
                        //         ? userDetails?.user?.latitude
                        //         : 19.2856,
                        //     lng: userDetails?.user?.isLocationAllow
                        //         ? userDetails?.user?.longitude
                        //         : 72.8691,
                        // }}

                        zoom={15}
                    >
                        <Marker
                        // position={{
                        //     lat: userDetails?.user?.isLocationAllow
                        //         ? userDetails?.user?.latitude
                        //         : 19.2856,
                        //     lng: userDetails?.user?.isLocationAllow
                        //         ? userDetails?.user?.longitude
                        //         : 72.8691,
                        // }}
                        />
                    </GoogleMap> */}
                    <img src={mapImg} alt="mapImg" className={styles.mapImg} />
                </div>
            </div>}

            <div className={styles.horizontalLine}></div>
        </div>


    </>
    )
}

export default ServiceLocation
import { useState } from 'react';
import styles from '../SalonMain/SalonMain.module.css'
import upIco from "../../../assets/images/SalonDetail/chevron-up.svg"
import SalonServiceCard from '../SalonServiceCard/SalonServiceCard'

export default function SalonServiceMain({hideTitle}) {
    let [activeOption, updateActiveOption] = useState(1);
    let [hideOptions, hideOptionsStatus] = useState(1);
    return (
        <>
            <div id='services' className={hideTitle?styles.serviceDetailClass:styles.salon_sections}>
                {
                    hideTitle ?
                    ''
                    :
                    <span className={styles.salon_section_title}>Services</span>
                }
                <div className={hideTitle?styles.serviceDetailClass:styles.salon_section_main}>
                    <div className={styles.salon_service_option}>
                        <ul>
                            <li onClick={() => { updateActiveOption(1); hideOptionsStatus(1) }} className={activeOption === 1 ? styles.active_salon_service : ''}>Colours & Highlights</li>
                            <li onClick={() => { updateActiveOption(2); hideOptionsStatus(2) }} className={activeOption === 2 ? styles.active_salon_service : ''}>Cutting & Styling</li>
                            <li onClick={() => { updateActiveOption(3); hideOptionsStatus(3) }} className={activeOption === 3 ? styles.active_salon_service : ''}>Hair Treatments</li>
                            <li onClick={() => { updateActiveOption(4); hideOptionsStatus(4) }} className={activeOption === 4 ? styles.active_salon_service : ''}>Hair extension & removal</li>
                            <li onClick={() => { updateActiveOption(5); hideOptionsStatus(5) }} className={activeOption === 5 ? styles.active_salon_service : ''}>Head Massage & Others</li>
                        </ul>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Colours and Highlights (7 items)</div>
                            <div><img src={upIco} alt="" onClick={() => { hideOptions === 1 ? hideOptionsStatus(-1) : hideOptionsStatus(1) }} className={hideOptions === 1 ? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={hideOptions === 1 ? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Cutting & Styling (11 items)</div>
                            <div><img src={upIco} alt="" onClick={() => { hideOptions === 2 ? hideOptionsStatus(-1) : hideOptionsStatus(2) }} className={hideOptions === 2 ? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={hideOptions === 2 ? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Hair treatments (3 items)</div>
                            <div><img src={upIco} alt="" onClick={() => { hideOptions === 3 ? hideOptionsStatus(-1) : hideOptionsStatus(3) }} className={hideOptions === 3 ? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={hideOptions === 3 ? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Hair extension and removal (9 items)</div>
                            <div><img src={upIco} alt="" onClick={() => { hideOptions === 4 ? hideOptionsStatus(-1) : hideOptionsStatus(4) }} className={hideOptions === 4 ? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={hideOptions === 4 ? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Head massage and others (6 items)</div>
                            <div><img src={upIco} alt="" onClick={() => { hideOptions === 5 ? hideOptionsStatus(-1) : hideOptionsStatus(5) }} className={hideOptions === 5 ? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={hideOptions === 5 ? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                                <SalonServiceCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
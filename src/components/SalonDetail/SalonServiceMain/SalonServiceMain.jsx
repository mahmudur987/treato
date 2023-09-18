import { useState } from 'react';
import styles from '../SalonMain/SalonMain.module.css'
import upIco from "../../../assets/images/SalonDetail/chevron-up.svg"
import SalonServiceCard from '../SalonServiceCard/SalonServiceCard'

export default function SalonServiceMain({hideTitle}) {
    let [activeOption, updateActiveOption] = useState(
        [
            {selected : true},
            {selected : false},
            {selected : false},
            {selected : false},
            {selected : false},
        ]
    );

    let activeOptFunc = (index)=>{
        let allActiveOpt = [...activeOption];
        allActiveOpt.filter((v,i)=>index===i?v.selected?v.selected=false:v.selected=true:v.selected=false);
        updateActiveOption(allActiveOpt)
    }


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
                            <li onClick={() => activeOptFunc(0)} className={activeOption[0].selected? styles.active_salon_service : ''}>Colours & Highlights</li>
                            <li onClick={() => activeOptFunc(1)} className={activeOption[1].selected? styles.active_salon_service : ''}>Cutting & Styling</li>
                            <li onClick={() => activeOptFunc(2)} className={activeOption[2].selected? styles.active_salon_service : ''}>Hair Treatments</li>
                            <li onClick={() => activeOptFunc(3)} className={activeOption[3].selected? styles.active_salon_service : ''}>Hair extension & removal</li>
                            <li onClick={() => activeOptFunc(4)} className={activeOption[4].selected? styles.active_salon_service : ''}>Head Massage & Others</li>
                        </ul>
                    </div>
                    <div>
                        <div className={styles.salon_service_title}>
                            <div>Colours and Highlights (7 items)</div>
                            <div><img src={upIco} alt="" onClick={() => activeOptFunc(0)} className={activeOption[0].selected? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={activeOption[0].selected? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
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
                            <div><img src={upIco} alt="" onClick={() => activeOptFunc(1)} className={activeOption[1].selected? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={activeOption[1].selected? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
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
                            <div><img src={upIco} alt="" onClick={() => activeOptFunc(2)} className={activeOption[2].selected? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={activeOption[2].selected? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
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
                            <div><img src={upIco} alt="" onClick={() => activeOptFunc(3)} className={activeOption[3].selected? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={activeOption[3].selected? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
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
                            <div><img src={upIco} alt="" onClick={() => activeOptFunc(4)} className={activeOption[4].selected? styles.rotate_imgA : styles.rotate_img} /></div>
                        </div>
                        <div className={styles.salon_serviceAB}>
                            <div className={activeOption[4].selected? `${styles.salon_serviceA} ${styles.showServices}` : styles.salon_serviceA}>
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
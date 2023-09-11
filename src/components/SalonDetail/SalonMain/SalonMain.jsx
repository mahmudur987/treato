import { useState } from 'react'
import styles from './SalonMain.module.css'
import SalonReview from '../SalonReview/SalonReview'
import SalonTeam from '../SalonTeam/SalonTeam'
import SalonOffers from '../SalonOffers/SalonOffers'
import SalonMap from '../SalonMap/SalonMap'
import SalonServiceMain from '../SalonServiceMain/SalonServiceMain'

export default function SalonServices() {
    let [activeSalon,updateActiveSalon] = useState(1)

    return (
        <div className={styles.salon_main}>
            <div className={styles.salon_options}>
                <ul>
                <a href="#services" onClick={()=>updateActiveSalon(1)}><li className={activeSalon===1?styles.active_salon_option:''}>Services</li></a>
                <a href="#about" onClick={()=>updateActiveSalon(2)}><li className={activeSalon===2?styles.active_salon_option:''}>About</li></a>
                <a href="#offers" onClick={()=>updateActiveSalon(3)}><li className={activeSalon===3?styles.active_salon_option:''}>Offers & Benefits</li></a>
                <a href="#team" onClick={()=>updateActiveSalon(4)}><li className={activeSalon===4?styles.active_salon_option:''}>Team</li></a>
                <a href="#review" onClick={()=>updateActiveSalon(5)}><li className={activeSalon===5?styles.active_salon_option:''}>Reviews</li></a>
                </ul>
            </div>
            <SalonServiceMain/>
            <div id='about' className={styles.salon_sections}>
                <div>
                    <span className={styles.salon_section_title}>About</span>
                    <div className={styles.salon_section_main}>
                        <div className={styles.salon_aboutA}>
                            She Hair & Beauty is a luxurious hair spa nestled in the heart of Ejipura, Bengaluru. Step into a haven of relaxation and rejuvenation, where expert stylists and therapists pamper you with personalized treatments, from haircare to beauty services. Experience the perfect blend of modern techniques and traditional remedies at She Hair & Beauty.
                            She Hair & Beauty is a luxurious hair spa nestled in the heart of Ejipura, Bengaluru. Step into a haven of relaxation and rejuvenation.
                        </div>
                        <div className={styles.salon_aboutB}>
                            <div className={styles.salon_aboutBA}>
                                Store timings
                            </div>
                            <div className={styles.salon_aboutBB}>
                                Monday - Saturday: 9:00 AM - 9:00 PM
                            </div>
                            <div className={styles.salon_aboutBC}>
                                Sunday: 9:00 AM - 5:30PM
                            </div>
                        </div>
                        <div className={styles.salon_aboutC}>
                            <div className={styles.salon_aboutBA}>
                                Location
                            </div>
                            <div className={styles.salon_aboutBB}>
                                3rd Main Road, Ejipura, Bengaluru - 110058
                            </div>
                            <div className={styles.salon_aboutBC}>
                                <SalonMap/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='offers' className={styles.salon_sections}>
                <div>
                    <span className={styles.salon_section_title}>Offers & Benefits</span>
                    <div className={styles.salon_section_main}>
                        <div className={styles.salon_offersA}>
                            <SalonOffers />
                            <SalonOffers />
                            <SalonOffers />
                        </div>
                    </div>
                </div>
            </div>
            <div id='team' className={styles.salon_sections}>
                <div>
                    <span className={styles.salon_section_title}>Meet the team</span>
                    <div className={styles.salon_section_main}>
                        <div className={styles.salon_teamA}>
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                            <SalonTeam />
                        </div>
                    </div>
                </div>
            </div>
            <div id='review' className={styles.salon_sections}>
                <div>
                    <span className={styles.salon_section_title}>Reviews</span>
                    <div className={styles.salon_section_main}>
                        <SalonReview />
                        <SalonReview />
                        <SalonReview />
                    </div>
                </div>
            </div>
        </div>
    )
}
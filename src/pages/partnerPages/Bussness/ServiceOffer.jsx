import React, { useState, useEffect } from 'react'
import sty from "./ServiceOffer.module.css"
import CollaseIcon from "../../../assets/images/TeamDetails/chevron-down.png"


const ServiceOffer = () => {
    const [selectedDays, setSelectedDays] = useState([]);

    const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const handleDayClick = (day) => {
        const updatedDays = selectedDays.includes(day)
            ? selectedDays.filter((selectedDay) => selectedDay !== day)
            : [...selectedDays, day];

        setSelectedDays(updatedDays);
    };

    const handleSelectAll = () => {
        if (selectedDays.length === allDays.length) {
            return setSelectedDays([]);
        } else setSelectedDays(allDays);
    };

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
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


    return (
        <div>
            <div className={sty.collapseForSmallScreen}>
                <div>
                    <h1>Store timings</h1>
                    <p>Manage opening and closing hours.</p>
                </div>
                <div className={sty.CollaseIconImg1}>
                    <img src={CollaseIcon} alt="CollapseIcon" onClick={toggleCollapse} className={sty.CollaseIconImg} />
                </div>
            </div>
            {isCollapsed && <div className={sty.mainDiv}>
                <div className={sty.offerTitle}>

                    <h3>What services do you offer?</h3>
                    <p >You can add/edit service items within these categories anytime by visiting your Services page.</p>
                    <div className={sty.gridContainer}>
                        <div className={sty.offerDiv}>Hair Styling</div>
                        <div className={sty.offerDiv}>Hair Removal</div>
                        <div className={sty.offerDiv}>Nail Care</div>
                        <div className={sty.offerDiv}>Facials&Skincare</div>
                        <div className={sty.offerDiv}>Makeup</div>
                        <div className={sty.offerDiv}>Massage</div>
                        <div className={sty.offerDiv}>Spa</div>

                    </div>
                </div>

                <div className={sty.scheHeading1}>
                    <div className={sty.scheHeading}>
                        <h2>Store open timings</h2>
                        <p>Your salon will appear Open/Closed as per the below schedule (except on set holidays), unless marked closed.</p>

                    </div>
                    <div className={sty.CheckBoxForm}>

                        <label className={sty.topLabel}>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedDays.length === allDays.length}
                            />
                            <span>Every day of the week</span>
                        </label>
                        <div className={sty.horizontalLineSelete}></div>

                        <div className={sty.days}>
                            {allDays.map((day) => (
                                <div className={`${sty.date} ${selectedDays.includes(day) ? sty.selectedDay : ""}`} key={day}>
                                    <label className={sty.topLabel}>
                                        <input
                                            type="checkbox"
                                            onClick={() => handleDayClick(day)}
                                            checked={selectedDays.includes(day)}
                                        />
                                        <span>{day}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className={sty.horizontalLineSelete}></div>

                        {/* slescts  */}

                        <div className={sty.selectsContainer}>
                            <div className={sty.content}>
                                <h3>Available from (optional)</h3>
                                <h4>Open from</h4>
                                <div className={sty.selectWrapper}>
                                    <select name="" id="" className={sty.selectWrapperOption}>
                                        <option value="30minn">09:00 AM</option>
                                        <option value="30minn">08:00 AM</option>
                                        <option value="30minn">07:00 AM</option>
                                    </select>

                                </div>
                            </div>

                            <div className={sty.content}>
                                <h3>Till (optional)</h3>
                                <h4>Till</h4>
                                <div className={sty.selectWrapper}>
                                    <select name="" id="" className={sty.selectWrapperOption}>
                                        <option value="30minn">06.00 PM </option>
                                        <option value="30minn">04.00 PM </option>
                                        <option value="30minn">05.00 PM</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={sty.store_closed_today}>

                            <p>Mark store closed for today</p>


                            <label className={sty.toggle} id='toggle'>
                                <input type="checkbox" />
                                <span className={sty.toggleSlider}></span>
                            </label>
                        </div>
                        <div className={sty.HolidaysDiv}>Manage Holidays</div>
                    </div>

                </div>

            </div>}



            <div className={sty.horizontalLine}></div>
        </div>
    );
};
export default ServiceOffer
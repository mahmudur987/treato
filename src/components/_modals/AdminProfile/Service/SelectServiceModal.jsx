import React, { useState } from 'react'
import styles from './SelectServiceModal.module.css'
import Grey_Close from '../../../../assets/images/icons/Grey_Close.svg'
// import search from "../../../../assets/images/TeamDetails/search.png"
import search from "../../../../assets/images/TeamDetails/search.png"
import Ellipse from "../../../../assets/images/TeamDetails/Ellipse 294.png"
import { toast } from 'react-toastify';
import BasicInputTeam from '../../../../pages/partnerPages/Team/TeamData/AddTeamMember/input/BasicInputTeam'

export default function SelectServiceModal({ onClose }) {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const allService = [
        { service: "Colours and Highlights (7 items)", },
        { service: "Hair cut ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Hair cut ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Blow drying ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Hair cut ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Blow drying ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Hair cut ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },
        { service: "Cutting & Styling (11 items)", },
        { service: "Hair cut ladies", time: "1 hr 15 mins", price: "₹499", Ellipse },

    ];

    const filteredPeople = allService.filter((person) =>
        person.service.toLowerCase().includes(filterValue.toLowerCase())
    );

    const handleCheckboxChange = (person) => {
        const isSelected = selectedCheckboxes.includes(person);

        let updatedCheckboxes;

        if (isSelected) {
            // If the person is already selected, remove them
            updatedCheckboxes = selectedCheckboxes.filter(
                (selectedPerson) => selectedPerson !== person
            );
        } else {
            // If the person is not selected, add them
            updatedCheckboxes = [...selectedCheckboxes, person];
        }

        setSelectedCheckboxes(updatedCheckboxes);
    };
    const handleSelectAll = () => {
        if (selectedCheckboxes.length === filteredPeople.length) {
            setSelectedCheckboxes([]);
        } else {
            setSelectedCheckboxes(filteredPeople.map((person) => person.service));
        }
    };
    return (
        <div className={styles.shareMain}>
            <div className={styles.shareA}>
                <form>
                    <div className={styles.ModalHeader}>
                        <div className={styles.mob_d}>
                            <div className={styles.crossIcon}>
                                <img src={Grey_Close} alt="close" onClick={onClose} />
                            </div>
                            <div className={styles.SelectHeading}>
                                Select services
                            </div>
                        </div>
                        <div className={styles.searchBox1}>
                            <span className={styles.searchBox}>

                                <img src={search} alt="search" className={styles.searchBoxImg} />
                                <input type="search" placeholder='Find service' className={styles.searchInp} />
                            </span>
                        </div>

                        <div className={styles.SelectAllDiv}>
                            <label className={styles.topLabel}>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedCheckboxes.length === filteredPeople.length}
                                />
                                <span>Select all (53 items)</span>
                            </label>
                            <input
                                type="text"
                                placeholder=""
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.peoples}>

                        {filteredPeople.map((person) => (<div>

                            <div className={styles.serviceMain}>

                                <label key={person.name} className={styles.people}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(person.service)}
                                        checked={selectedCheckboxes.includes(person.service)}
                                    />

                                    <p>

                                        <span className={styles.serviceName}>{person.service}</span>

                                    </p>
                                </label>
                                <div>
                                    <span className={styles.timing}>{person.time}</span>
                                    <span className={styles.dot}> <img src={person.Ellipse} alt="" /></span>
                                    <span className={styles.prices}>{person.price}</span>
                                </div>
                            </div>
                            <div className={styles.horizontalLine}></div>
                        </div>
                        ))}
                    </div>
                    <div className={styles.horizontalLine}></div>
                    <div className={styles.SubmitBtn}>
                        <button className={styles.CancelBtn} onClick={onClose}>Cancel</button>
                        <button className={styles.SaveBtn}>Apply</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import Styles from "./DropDown.module.css"
import RightIcon from "../../../assets/images/AccountSettings/chevron-right.svg"

const Dropdown = ({ com }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (<>

        <div className={Styles.dropdown}>
            <button onClick={toggleDropdown}><img src={RightIcon} alt="RightIcon" className={Styles.RightIcon} /></button>
            {isOpen && (
                <div className={Styles.dropdownContent}>
                    {com}

                </div>
            )}
        </div>

    </>


    );
};

export default Dropdown;

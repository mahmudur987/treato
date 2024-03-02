import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../../assets/images/TeamDetails/calenderImg.png";
import sty from "./Pic.module.css"

const Pick = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const inputRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleInputClick = () => {
        inputRef.current.focus();
    };

    return (
        <div className={sty.maindiv}>

            <DatePicker

                className={sty.dateInp}
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText='DD/MM/YYYY'
                popperPlacement="bottom-end"
                toggleCalendarOnIconClick
                showIcon
                icon={
                    <img
                        className={sty.calIcon}
                        src={calendarIcon}
                        alt='icon'
                    />
                }
            // popperModifiers={[
            //     {
            //         name: 'offset',
            //         options: {
            //             offset: ["5px", "10px"],
            //         },
            //     },
            //     {
            //         name: 'preventOverflow',
            //         options: {
            //             enabled: true,
            //             escapeWithReference: false,
            //             boundariesElement: "viewport",
            //         },
            //     },
            // ]}

            />
        </div>
    );
};

export default Pick;





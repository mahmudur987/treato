import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months} from "./customCanlendar"
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import style from './calendar.module.css';

 function CalendarModal({setDate, setShowCalendar}) {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

    useEffect(() => {
        setDate(selectDate.toDate());
    }, [selectDate]);

	return (
		<div className={style.flexcontainer}>
			<div className={style.calendarcontainer}>
				<div className={style.calendarheader}>
					<h1 className={style.calendarmonthyear}>
						{months[today.month()]}, {today.year()}
					</h1>
					<div className={style.calendarnavigation}>
						<GrFormPrevious
							className={style.calendarnavbtn}
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						
						<GrFormNext
							className={style.calendarnavbtn}
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className={style.daysgrid }>
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className={style.day }
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className={style.datesgrid }>
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className={style.day}
								>
									<h1
										className={cn(
											currentMonth ? "" : `${style.changecolor}`,
											today
												? `${style.today}`
												: "",
											selectDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? `${style.selecteddate}`
												: "",
											`${style.customtailwindstyles}`
										)}
										onClick={() => {
											setSelectDate(date);
                                            
										}}
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
			</div>
			
		</div>
	);
}
export default CalendarModal
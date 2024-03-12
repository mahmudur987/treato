import React from 'react'
import style from "./PartnerAccountSetting.module.css";
import RightIcon from "../../../assets/images/AccountSettings/chevron-right.svg"
import { Link } from 'react-router-dom';
import Bussness from '../Bussness/Bussness';
import ServiceLocation from '../Bussness/ServiceLocation';

const PartnerAccountSetting = () => {
    const AccountData = [
        {
            profile: "Business Profile",
            content: "View and edit salon details - name, location, pictures, descriptions and more.",
            link: <Link to="/partner/dashboard/serviceBussness" ><img src={RightIcon} alt="" /></Link>,
            line: <div className={style.horizontalLine}></div>

        },
        {
            profile: "Payments",
            content: "View and edit bank accounts and payment details.",
            link: <Link to="/partner/dashboard/PaymentProfile"><img src={RightIcon} alt="" /></Link>,
            line: <div className={style.horizontalLine}></div>

        },
        {
            profile: "Services",
            content: "Add/edit service items or categories on your Services page.",
            link: <Link to="/partner/dashboard/"><img src={RightIcon} alt="" /></Link>,
            line: <div className={style.horizontalLine}></div>

        },
        {
            profile: "Team",
            content: "Add/edit team members and details on your Team page.",
            link: <Link to="/partner/dashboard/"><img src={RightIcon} alt="" /></Link>,
            line: <div className={style.horizontalLine}></div>

        },

    ]
    return (<>
        <div className={style.container}>
            <h1 className={style.mainTitle}>Account Settings</h1>
            {AccountData.map((item, i) => <>
                <div className={style.Business}>
                    <div className={style.Business1}>
                        <p className={style.BusinessProfile}>{item.profile}</p>
                        <p className={style.BusinessContent}>{item.content}</p>
                    </div>
                    <div className={style.link}>
                        {item.link}
                    </div>
                </div>
                <p className={style.horizontalLine}>{item.line}</p>
            </>)}


        </div>


    </>
    )
}

export default PartnerAccountSetting
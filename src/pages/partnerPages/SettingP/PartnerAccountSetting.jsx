import React from "react";
import style from "./PartnerAccountSetting.module.css";
import RightIcon from "../../../assets/images/AccountSettings/chevron-right.svg";
import { Link } from "react-router-dom";

const PartnerAccountSetting = () => {
  const AccountData = [
    {
      profile: "Business Profile",
      content:
        "View and edit salon details - name, location, pictures, descriptions and more.",
      link: (
        <Link to="/partner/dashboard/serviceBussness">
          <img loading="lazy" src={RightIcon} alt="" />
        </Link>
      ),
      line: <div className={style.horizontalLine}></div>,
    },
    {
      profile: "Personal Details",
      content:
        "View and edit business owner details - such as name, contact details and more.",
      link: (
        <Link to="/partner/dashboard/personalDetails">
          <img loading="lazy" src={RightIcon} alt="" />
        </Link>
      ),
      line: <div className={style.horizontalLine}></div>,
    },
    {
      profile: "Payments",
      content: "View and edit bank accounts and payment details.",
      link: (
        <Link to="/partner/dashboard/PaymentProfile">
          <img loading="lazy" src={RightIcon} alt="" />
        </Link>
      ),
      line: <div className={style.horizontalLine}></div>,
    },
    {
      profile: "Services",
      content: "Add/edit service items or categories on your Services page.",
      link: (
        <Link to="/partner/dashboard/service">
          <img loading="lazy" src={RightIcon} alt="" />
        </Link>
      ),
      line: <div className={style.horizontalLine}></div>,
    },
    {
      profile: "Team",
      content: "Add/edit team members and details on your Team page.",
      link: (
        <Link to="/partner/dashboard/TeamManageMent">
          <img loading="lazy" src={RightIcon} alt="" />
        </Link>
      ),
      line: <div className={style.horizontalLine}></div>,
    },
  ];
  return (
    <>
      <div className={style.container}>
        <h1 className={style.mainTitle}>Account Settings</h1>
        {AccountData.map((item, i) => (
          <>
            <div className={style.Business}>
              <div className={style.Business1}>
                <p className={style.BusinessProfile}>{item.profile}</p>
                <p className={style.BusinessContent}>{item.content}</p>
              </div>
              <div className={style.link}>{item.link}</div>
            </div>
            <p className={style.horizontalLine}>{item.line}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default PartnerAccountSetting;

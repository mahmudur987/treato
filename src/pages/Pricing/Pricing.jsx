import React, { useState } from "react";
import style from "./pricing.module.css";
import i from "../../assets/svgs/icon (34).svg";
function Pricing() {
  const [infoData, setInfo] = useState([
    {
      heading: "Track and grow your sales with ease",
      subheading: "Attract new customers with 24X7 online booking",
    },
    {
      heading: "Limitless appointment bookings",
      subheading:
        "Everything you need to manage your business in one easy-to-use solution",
    },
    {
      heading: "Add all your team members, no limits!",
      subheading: "Attract new customers with 24X7 online booking",
    },
    {
      heading: "Attract new customers with 24X7 booking",
      subheading:
        "Everything you need to manage your business in one easy-to-use solution",
    },
    {
      heading: "All your data and reporting in one place.",
      subheading:
        "Everything you need to manage your business in one easy-to-use solution",
    },
    {
      heading: "Don’t miss out on walk-in appointments.",
      subheading: "Attract new customers with 24X7 booking",
    },
  ]);

  return (
    <>
      <div className={style.container}>
        <h2>
          No subscription fees - it’s <span>FREE!</span>
        </h2>
        <b>Unlimited usage with no subscription charges for your business.</b>
      </div>
      <div className={style.optionBox}>
        {infoData &&
          infoData.map((item) => {
            return (
              <div className={style.contentBox}>
                <img src={i} alt="" />
                <div>
                  <h4>{item.heading}</h4>
                  <p>{item.subheading}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Pricing;

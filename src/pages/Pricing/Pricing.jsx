import React, { useState } from "react";
import style from "./pricing.module.css";

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
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
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

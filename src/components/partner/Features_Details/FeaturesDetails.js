import React from "react";
import style from "./FeaturesDetails.module.css";
import img1 from "../../../assets/icons/partner/icon1.png";
import img2 from "../../../assets/icons/partner/icon2.png";
import img3 from "../../../assets/icons/partner/icon3.png";
import img4 from "../../../assets/icons/partner/icon4.png";
import img5 from "../../../assets/icons/partner/icon5.png";
import img6 from "../../../assets/icons/partner/icon6.png";
const features = [
  {
    logo: img2,
    header: "Add unlimited services",
    description:
      "Venturing into a new service category at your existing salon? Want to create a new sub-category that’s in demand? Or promote specific looks & styles hand-crafted by your top stylists? Do all this and more!      ",
  },
  {
    logo: img1,
    header: "Appointment Scheduling",
    description:
      "Our solutions are engineered to optimize the workflows and provide a simple interaction with the system to take away the complexities of the daily operations      ",
  },
  {
    logo: img3,
    header: "Sales Reporting & Analytics",
    description:
      "Our solutions are engineered to optimize the workflows and provide a simple interaction with the system to take away the complexities of the daily operations   ",
  },
  {
    logo: img4,
    header: "Manage Business Operations",
    description:
      "Our solutions are engineered to optimize the workflows and provide a simple interaction with the system to take away the complexities of the daily operations",
  },
  {
    logo: img5,
    header: "Billing & Payments",
    description:
      "Our solutions are engineered to optimize the workflows and provide a simple interaction with the system to take away the complexities of the daily operations.     ",
  },
  {
    logo: img6,
    header: "Privacy of Data",
    description:
      "With Treato, you don’t have to worry about the safety and security of your data. We do not share your or your clients’ data with unaffiliated third parties for their own purposes.",
  },
];

const FeaturesDetails = () => {
  return (
    <main className={style.mainContainer}>
      <section className={style.header}>
        <h1>
          Manage and grow your salon business online with our end-to-end
          solution
        </h1>
        <p>
          Built for scale, made by experts and secure by design. Packed with
          features you need to boost sales, manage your calendar and retain
          clients so you can focus on what you do best
        </p>
      </section>

      <section className={style.cardSection}>
        <div className={style.cardContainer}>
          {features.map((company, index) => {
            const { logo, header, description } = company;
            return (
              <div key={index} className={style.card}>
                <figure className={style.logo}>
                  <img loading="lazy" src={logo} alt={`${header} Logo`} />
                </figure>
                <h2 className={style.cardHeader}>{header}</h2>
                <p className={style.description}>{description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default FeaturesDetails;

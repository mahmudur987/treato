import React, { memo, useEffect, useState } from "react";
import styles from "./ServicesDropDown.module.css";
import { Link } from "react-router-dom";
import Menu, { MemoizedMenu } from "../Menu/Menu";
import { MemoizedNoDataDisplay } from "../../../NodataToDisplay/NoDataDisplay";
import icon1 from "../../../../assets/svgs/icon (20).svg";
import icon2 from "../../../../assets/svgs/icon (21).svg";
import icon3 from "../../../../assets/svgs/icon (22).svg";
import icon4 from "../../../../assets/svgs/icon (23).svg";
import icon5 from "../../../../assets/svgs/icon (24).svg";
import icon6 from "../../../../assets/svgs/icon (25).svg";
import { downArrow } from "../../../Select/ColorSelect/ColorSelect";
export const upArrow = icon4;
const ServicesDropDown = ({ data }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showbtnMenu, setShowBtnMenu] = useState("");
  const [mobile, setIsMobile] = useState(false);
  const toggleCategory = (categoryId) => {
    setOpenCategory((prevOpenCategory) =>
      prevOpenCategory === categoryId ? null : categoryId
    );
  };
  useEffect(() => {
    const checkWindowWidth = () => {
      const newIsMobile = window.innerWidth < 700;
      setIsMobile(newIsMobile);
    };
    checkWindowWidth();
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        {mobile ? (
          // mobile
          <div className={styles.accordionContainer}>
            {data?.mainCategories?.map((category) => (
              <div key={category._id} className={styles.accordion}>
                <div className={styles.accordionTop}>
                  <button
                    className={styles.categoryButton}
                    onClick={() => toggleCategory(category._id)}
                  >
                    <span>
                      {" "}
                      {category.category_name} ({category.subCategories.length})
                    </span>
                  </button>
                  {/* menu button */}
                  <button
                    onClick={() =>
                      setShowBtnMenu((pre) =>
                        pre === category._id ? null : category._id
                      )
                    }
                    className={styles.menuButton}
                  >
                    <img src={icon1} alt="" />
                  </button>
                  {category._id === showbtnMenu && (
                    <MemoizedMenu setShowBtnMenu={setShowBtnMenu} />
                  )}
                </div>
                {category._id === showbtnMenu && (
                  <div className={styles.overlay}></div>
                )}

                <div className={styles.accordionContent}>
                  {category.subCategories.map((service) => (
                    <div key={service._id} className={styles.serviceItem}>
                      <div className={styles.serviceDetails}>
                        <p>{service.service_name}</p>
                        <p>
                          <span>{service.time_takenby_service}</span>
                          <img src={icon2} alt="" />
                          <span>₹ {service.price}</span>
                        </p>
                      </div>
                      <Link
                        to={`/service/editservice?servicetype=${data._id}&category=${category._id}&subcategory=${service._id}`}
                      >
                        <button className={styles.editButton}>
                          <img src={icon3} alt="" />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // for pc
          <div className={styles.accordionContainer}>
            {data?.mainCategories?.map((category) => (
              <div key={category._id} className={styles.accordion}>
                <div className={styles.accordionTop}>
                  <button
                    className={styles.categoryButton}
                    onClick={() => toggleCategory(category._id)}
                  >
                    <span>
                      {" "}
                      {category.category_name} ({category.subCategories.length}{" "}
                      items)
                    </span>

                    {category._id === openCategory ? (
                      <span>
                        <img src={downArrow} alt="" />
                      </span>
                    ) : (
                      <span>
                        <img src={upArrow} alt="" />
                      </span>
                    )}
                  </button>

                  {/* menu button */}
                  <button
                    onClick={() =>
                      setShowBtnMenu((pre) =>
                        pre === category._id ? null : category._id
                      )
                    }
                    className={styles.menuButton}
                  >
                    <img src={icon5} alt="" />
                  </button>
                  {category._id === showbtnMenu && (
                    <Menu
                      setShowBtnMenu={setShowBtnMenu}
                      data={data}
                      category={category}
                    />
                  )}
                </div>
                {openCategory === category._id && (
                  <div className={styles.accordionContent}>
                    {category.subCategories.map((service) => (
                      <div key={service._id} className={styles.serviceItem}>
                        <div className={styles.serviceDetails}>
                          <p>{service.service_name}</p>
                          <p>
                            <span>{service.time_takenby_service}</span>
                            <img src={icon2} alt="" />
                            <span>₹ {service.price}</span>
                          </p>
                        </div>
                        <Link
                          to={`/partner/dashboard/service/editservice?servicetype=${data._id}&category=${category._id}&subcategory=${service._id}`}
                        >
                          <button className={styles.editButton}>
                            <img src={icon6} alt="" />
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {data?.mainCategories?.length === 0 && (
        <MemoizedNoDataDisplay message={"No Category Available"} />
      )}
    </section>
  );
};

export default ServicesDropDown;
export const MemoizedServicesDropDown = memo(ServicesDropDown);

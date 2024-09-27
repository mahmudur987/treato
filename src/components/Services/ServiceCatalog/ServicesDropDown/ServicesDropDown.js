import React, { memo, useEffect, useState } from "react";
import styles from "./ServicesDropDown.module.css";
import { Link } from "react-router-dom";
import Menu, { MemoizedMenu } from "../Menu/Menu";
import NoDataDisplay, {
  MemoizedNoDataDisplay,
} from "../../../NodataToDisplay/NoDataDisplay";
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                          >
                            <circle cx="2" cy="2.5" r="2" fill="#08090A" />
                          </svg>
                          <span>₹ {service.price}</span>
                        </p>
                      </div>
                      <Link
                        to={`/service/editservice?servicetype=${data._id}&category=${category._id}&subcategory=${service._id}`}
                      >
                        <button className={styles.editButton}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.422 2.60727C12.6409 1.82622 11.3746 1.82622 10.5936 2.60727L10.1222 3.07867L13.422 6.37851L13.8934 5.9071C14.6745 5.12605 14.6745 3.85973 13.8934 3.07867L13.422 2.60727ZM12.4792 7.32133L9.17932 4.02149L3.11869 10.0821C2.98616 10.2147 2.89355 10.3818 2.85141 10.5644L2.16604 13.5343C2.05513 14.0149 2.48586 14.4455 2.96634 14.3346L5.93628 13.6493C6.1189 13.6071 6.286 13.5145 6.41852 13.382L12.4792 7.32133Z"
                              fill="#0D69D7"
                            />
                          </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M18 15L12 9L6 15"
                            stroke="#08090A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="#08090A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        stroke="#08090A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                            >
                              <circle cx="2" cy="2.5" r="2" fill="#08090A" />
                            </svg>
                            <span>₹ {service.price}</span>
                          </p>
                        </div>
                        <Link
                          to={`/partner/dashboard/service/editservice?servicetype=${data._id}&category=${category._id}&subcategory=${service._id}`}
                        >
                          <button className={styles.editButton}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.422 2.60727C12.6409 1.82622 11.3746 1.82622 10.5936 2.60727L10.1222 3.07867L13.422 6.37851L13.8934 5.9071C14.6745 5.12605 14.6745 3.85973 13.8934 3.07867L13.422 2.60727ZM12.4792 7.32133L9.17932 4.02149L3.11869 10.0821C2.98616 10.2147 2.89355 10.3818 2.85141 10.5644L2.16604 13.5343C2.05513 14.0149 2.48586 14.4455 2.96634 14.3346L5.93628 13.6493C6.1189 13.6071 6.286 13.5145 6.41852 13.382L12.4792 7.32133Z"
                                fill="#0D69D7"
                              />
                            </svg>
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

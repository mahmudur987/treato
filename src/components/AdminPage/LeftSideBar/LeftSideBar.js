import React, { useEffect, useState } from "react";
import styles from "./LeftSideBar.module.css";
import treao from "../../../assets/icons/services/treato.webp";
import treato from "../../../assets/images/superAdmin/Treato.webp";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import salonIcon from "../../../assets/icons/admin/salonIcon.webp";
import icon1 from "../../../assets/svgs/icon (8).svg";
import icon2 from "../../../assets/svgs/icon (9).svg";
import { useSelector } from "react-redux";
const LeftSideBar = () => {
  const [show, setShow] = useState(true);
  const [salonMenu, setSalonMenu] = useState(false);
  const { pathname } = useLocation();
  const [pageHeight, setPageHeight] = useState(0);
  const { updatePage } = useSelector((state) => state.admin);

const toggleSalonMenu =()=>{
  setSalonMenu((pre) => !pre)
}

  useEffect(() => {
    function handleResize() {
      const height = Math.max(
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      setPageHeight(height);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname, updatePage]);

  return (
    <section className={styles.mainContainer}>
      <div
        style={{ minHeight: pageHeight }}
        className={`${show ? styles.containerHover : styles.container}`}
      >
        {/* logo */}
        {!show && (
          <div className={styles.imageWrapper}>
            <Link to={"/admin/dashboard"}>
              <img loading="lazy" src={treao} alt="" />
            </Link>
          </div>
        )}
        {show && (
          <div className={styles.imageWrapper1}>
            <Link to={"/admin/dashboard"}>
              <img loading="lazy" src={treato} alt="" />
            </Link>
          </div>
        )}
        {/* routes */}

        {show && (
          <>
            <Link
              to={"/admin"}
              style={{
                backgroundColor: `${pathname === "/admin" ? "#0D69D7" : ""}`,
              }}
            >
              <img
                src={icon1}
                alt=""
                style={{ margin: `${show ? "" : "auto"}` }}
              />
              <span>Dashboard</span>
            </Link>

            <p
              onClick={toggleSalonMenu}
              style={{
                backgroundColor: `${
                  pathname === "/admin/salon" ? "#0D69D7" : ""
                }`,
              }}
            >
              <img loading="lazy" src={salonIcon} alt="" />

              <span className={styles.xName}>Salons</span>
              <span className={styles.downIcon}>
                {salonMenu ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </p>
            {salonMenu && (
              <div className={styles.salon}>
                <Link
                  to={"/admin/salon/active"}
                  style={{
                    backgroundColor: `${
                      pathname === "/admin/salon/active" ? "#0D69D7" : ""
                    }`,
                  }}
                >
                  <span>Active</span>
                </Link>
                <Link
                  to={"/admin/salon/pending"}
                  style={{
                    backgroundColor: `${
                      pathname === "/admin/salon/pending" ? "#0D69D7" : ""
                    }`,
                  }}
                >
                  <span>Pending</span>
                </Link>
                <Link
                  to={"/admin/salon/deactivated"}
                  style={{
                    backgroundColor: `${
                      pathname === "/admin/salon/deactivated" ? "#0D69D7" : ""
                    }`,
                  }}
                >
                  <span>Deactivated</span>
                </Link>
              </div>
            )}

            <Link
              to={"/admin/payment"}
              style={{
                backgroundColor: `${
                  pathname === "/admin/payment" ? "#0D69D7" : ""
                }`,
              }}
            >
              <img
                src={icon2}
                alt=""
                style={{ margin: `${show ? "" : "auto"}` }}
              />

              <span>Payment</span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;

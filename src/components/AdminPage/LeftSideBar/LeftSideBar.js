import React, { useEffect, useState } from "react";
import styles from "./LeftSideBar.module.css";
import treao from "../../../assets/icons/services/treato.png";
import treato from "../../../assets/images/superAdmin/Treato.png";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import salonIcon from "../../../assets/icons/admin/salonIcon.png";
import { useSelector } from "react-redux";
const LeftSideBar = () => {
  const [show, setShow] = useState(true);
  const [salonMenu, setSalonMenu] = useState(false);
  const { pathname } = useLocation();
  const [pageHeight, setPageHeight] = useState(0);
  const { updatePage } = useSelector((state) => state.admin);

  useEffect(() => {
    function handleResize() {
      const height = Math.max(
        // document.body.scrollHeight,
        // document.documentElement.scrollHeight,
        // document.body.offsetHeight,
        // document.documentElement.offsetHeight,
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
              <img src={treao} alt="" />
            </Link>
          </div>
        )}
        {show && (
          <div className={styles.imageWrapper1}>
            <Link to={"/admin/dashboard"}>
              <img src={treato} alt="" />
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
              <svg
                style={{ margin: `${show ? "" : "auto"}` }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM19 5H5V8H19V5ZM5 19V10H9V19H5ZM11 19H19V10H11V19Z"
                  fill="white"
                />
              </svg>
              <span>Dashboard</span>
            </Link>

            <p
              onClick={() => setSalonMenu((pre) => !pre)}
              style={{
                backgroundColor: `${
                  pathname === "/admin/salon" ? "#0D69D7" : ""
                }`,
              }}
            >
              <img src={salonIcon} alt="" />

              <span style={{ fontWeight: "600" }}>Salons</span>
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
              <svg
                style={{ margin: `${show ? "" : "auto"}` }}
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2396 0.0207062C18.7021 0.0207062 19.898 1.16241 19.9845 2.60318L19.9896 2.77071V11.2758C19.9896 12.7383 18.8478 13.9342 17.4071 14.0208L17.2396 14.0258H2.76172C1.29919 14.0258 0.103315 12.8841 0.0167377 11.4433L0.0117188 11.2758V2.77071C0.0117188 1.30817 1.15342 0.112302 2.5942 0.0257249L2.76172 0.0207062H17.2396ZM18.4887 5.99471H1.51072L1.51172 11.2758C1.51172 11.923 2.00359 12.4553 2.63391 12.5193L2.76172 12.5258H17.2396C17.8868 12.5258 18.4191 12.0339 18.4831 11.4036L18.4896 11.2758L18.4887 5.99471ZM16.2536 9.5C16.6678 9.5 17.0036 9.83578 17.0036 10.25C17.0036 10.6297 16.7214 10.9435 16.3553 10.9932L16.2536 11H13.7536C13.3394 11 13.0036 10.6642 13.0036 10.25C13.0036 9.8703 13.2857 9.55651 13.6518 9.50685L13.7536 9.5H16.2536ZM17.2396 1.52071H2.76172C2.11451 1.52071 1.58219 2.01258 1.51817 2.6429L1.51172 2.77071L1.51072 4.49471H18.4887L18.4896 2.77071C18.4896 2.1235 17.9977 1.59117 17.3674 1.52716L17.2396 1.52071Z"
                  fill="white"
                />
              </svg>

              <span>Payment</span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;

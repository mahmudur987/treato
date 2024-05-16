import React, { useEffect, useState } from "react";
import styles from "./LeftSideBar.module.css";
import treao from "../../../assets/icons/services/treato.png";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import salonIcon from "../../../assets/icons/admin/salonIcon.png";
import { useSelector } from "react-redux";
const LeftSideBar = () => {
  const [show, setShow] = useState(false);
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
    <section
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        setShow(false);
        setSalonMenu(false);
      }}
      className={styles.mainContainer}
    >
      <div
        style={{ minHeight: pageHeight }}
        className={`${show ? styles.containerHover : styles.container}`}
      >
        {/* logo */}
        <div className={styles.imageWrapper}>
          <Link to={"/admin/dashboard"}>
            <img src={treao} alt="" />
          </Link>
        </div>
        {/* routes */}

        {!show && (
          <>
            <Link
              to={"/admin"}
              style={{
                backgroundColor: `${pathname === "/admin" ? "blue" : ""}`,
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
            </Link>
            <Link to="/admin/appointment/calendar" style={{
              backgroundColor: `${pathname === "/admin/appointment/calendar" ? "blue" : ""}`,
            }}>
              <svg 
              style={{ margin: `${show ? "" : "auto"}` }}
              class="w-6 h-6 text-gray-800 white:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>

            </Link>
            <Link
              style={{
                backgroundColor: `${pathname === "/admin/salon" ? "blue" : ""}`,
              }}
            >
              <img src={salonIcon} alt="" />
            </Link>

            <Link
              to={"/admin/payment"}
              style={{
                backgroundColor: `${pathname === "/admin/payment" ? "blue" : ""
                  }`,
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
                  d="M16 3C16.5128 3 16.9355 3.38604 16.9933 3.88338L17 4V5H19C20.0544 5 20.9182 5.81588 20.9945 6.85074L21 7V19C21 20.0544 20.1841 20.9182 19.1493 20.9945L19 21H5C3.94564 21 3.08183 20.1841 3.00549 19.1493L3 19V7C3 5.94564 3.81588 5.08183 4.85074 5.00549L5 5H7V4C7 3.44772 7.44772 3 8 3C8.51283 3 8.93551 3.38604 8.99327 3.88338L9 4V5H15V4C15 3.44772 15.4477 3 16 3ZM19 12H5V19H19V12ZM19 7H5V10H19V7Z"
                  fill="white"
                />
              </svg>
            </Link>
          </>
        )}
        {show && (
          <>
            <Link
              to={"/admin"}
              style={{
                backgroundColor: `${pathname === "/admin" ? "blue" : ""}`,
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
            <Link to="/admin/appointment/calendar" style={{
              backgroundColor: `${pathname === "/admin/appointment/calendar" ? "blue" : ""}`,
            }}>
              <svg 
              style={{ margin: `${show ? "" : "auto"}` }}
              class="w-6 h-6 text-gray-800 white:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>
              <span>Calendar</span>

            </Link>
            <p
              onMouseEnter={() => setSalonMenu(true)}
              style={{
                backgroundColor: `${pathname === "/admin/salon" ? "blue" : ""}`,
              }}
            >
              <img src={salonIcon} alt="" />

              <span>Salon</span>
              <span className={styles.downIcon}>
                {salonMenu ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </p>
            {salonMenu && (
              <div
                className={styles.salon}
                onMouseLeave={() => setSalonMenu(!salonMenu)}
              >
                <Link
                  to={"/admin/salon/active"}
                  style={{
                    backgroundColor: `${pathname === "/admin/salon/active" ? "blue" : ""
                      }`,
                  }}
                >
                  <span>Active</span>
                </Link>
                <Link
                  to={"/admin/salon/pending"}
                  style={{
                    backgroundColor: `${pathname === "/admin/salon/pending" ? "blue" : ""
                      }`,
                  }}
                >
                  <span>Pending</span>
                </Link>
                <Link
                  to={"/admin/salon/deactivated"}
                  style={{
                    backgroundColor: `${pathname === "/admin/salon/deactivated" ? "blue" : ""
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
                backgroundColor: `${pathname === "/admin/payment" ? "blue" : ""
                  }`,
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
                  d="M16 3C16.5128 3 16.9355 3.38604 16.9933 3.88338L17 4V5H19C20.0544 5 20.9182 5.81588 20.9945 6.85074L21 7V19C21 20.0544 20.1841 20.9182 19.1493 20.9945L19 21H5C3.94564 21 3.08183 20.1841 3.00549 19.1493L3 19V7C3 5.94564 3.81588 5.08183 4.85074 5.00549L5 5H7V4C7 3.44772 7.44772 3 8 3C8.51283 3 8.93551 3.38604 8.99327 3.88338L9 4V5H15V4C15 3.44772 15.4477 3 16 3ZM19 12H5V19H19V12ZM19 7H5V10H19V7Z"
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

import React, { useState } from "react";
import styles from "./LeftSideBar.module.css";
import treao from "../../../assets/icons/services/treato.png";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
const LeftSideBar = () => {
  const [show, setShow] = useState(false);
  const [salonMenu, setSalonMenu] = useState(false);

  const links = [
    {
      to: "/admin",
      svg: (
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
      ),
      text: "Dashboard",
    },
    {
      to: "/admin/dashboard/addappoinment",
      svg: (
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
      ),
      text: "Calender",
    },
    {
      to: "/admin/dashboard/service",
      svg: (
        <svg
          style={{ margin: `${show ? "" : "auto"}` }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 18C20.5523 18 21 18.4477 21 19C21 19.5128 20.614 19.9355 20.1166 19.9933L20 20H4C3.44772 20 3 19.5523 3 19C3 18.4872 3.38604 18.0645 3.88338 18.0067L4 18H20ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H20Z"
            fill="white"
          />
        </svg>
      ),
      text: "Services",
    },
    {
      to: "/admin/T",
      svg: (
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
            d="M13 13C15.2091 13 17 14.7909 17 17V19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V17C15 15.8954 14.1046 15 13 15H6C4.89543 15 4 15.8954 4 17V19C4 19.5523 3.55228 20 3 20C2.44772 20 2 19.5523 2 19V17C2 14.7909 3.79086 13 6 13H13ZM18.9999 13.0002C20.6568 13.0002 21.9999 14.3434 21.9999 16.0002V18.0002C21.9999 18.5525 21.5522 19.0002 20.9999 19.0002C20.4477 19.0002 19.9999 18.5525 19.9999 18.0002V16.0002C19.9999 15.448 19.5522 15.0002 18.9999 15.0002H17.5841C17.2362 14.204 16.687 13.5159 16.0008 13.0002H18.9999ZM9.49998 3C11.9853 3 14 5.01472 14 7.5C14 9.98528 11.9853 12 9.49998 12C7.01469 12 4.99998 9.98528 4.99998 7.5C4.99998 5.01472 7.01469 3 9.49998 3ZM18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12C16.3431 12 15 10.6569 15 9C15 7.34315 16.3431 6 18 6ZM9.49998 5C8.11926 5 6.99998 6.11929 6.99998 7.5C6.99998 8.88071 8.11926 10 9.49998 10C10.8807 10 12 8.88071 12 7.5C12 6.11929 10.8807 5 9.49998 5ZM18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
            fill="white"
          />
        </svg>
      ),
      text: "Team",
    },
    {
      to: "/admin/reports",
      svg: (
        <svg
          style={{ margin: `${show ? "" : "auto"}` }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 4C4.51283 4 4.93551 4.38604 4.99327 4.88338L5 5V18H20C20.5523 18 21 18.4477 21 19C21 19.5128 20.614 19.9355 20.1166 19.9933L20 20H4C3.48717 20 3.06449 19.614 3.00673 19.1166L3 19V5C3 4.44772 3.44772 4 4 4ZM20.1935 6.81813C21.0933 6.81813 21.5439 7.90606 20.9076 8.54231L15.3386 14.1114C14.909 14.541 14.2125 14.541 13.7829 14.1114L11.0252 11.3537L7.48969 14.8892C7.09916 15.2797 6.466 15.2797 6.07547 14.8892C5.68495 14.4987 5.68495 13.8655 6.07547 13.475L10.2474 9.30305C10.677 8.87347 11.3735 8.87348 11.803 9.30305L14.5608 12.0608L17.8034 8.81813H17.3892C16.8369 8.81813 16.3892 8.37041 16.3892 7.81813C16.3892 7.26584 16.8369 6.81813 17.3892 6.81813H20.1935Z"
            fill="white"
          />
        </svg>
      ),
      text: "Reports",
    },
    {
      to: "/admin/dashboard/look",
      svg: (
        <svg
          style={{ margin: `${show ? "" : "auto"}` }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_8174_36570)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 3C16.9706 3 21 7.02944 21 12V18C21 19.6569 19.6569 21 18 21H16.618C15.8985 21 15.2376 20.6138 14.8828 19.9945C13.9472 20.6335 12.916 21 12 21C11.084 21 10.0528 20.6335 9.11722 19.9944C8.76242 20.6138 8.10152 21 7.38197 21H6C4.34315 21 3 19.6569 3 18V12C3 7.02944 7.02944 3 12 3ZM12 4.5C8.13401 4.5 4.5 8.13401 4.5 12V18C4.5 18.5523 5.44772 19.5 6 19.5H6.44048C6.99122 19.5 7.46871 19.119 7.59096 18.582C6.66115 17.4286 6 15.8799 6 14C6 13.2091 6.13344 12.4256 6.37336 11.6879C6.51091 11.265 6.9112 10.9837 7.35569 10.9977C8.86025 11.0449 10.3154 10.3183 11.1824 9.08727C11.3697 8.82129 11.6747 8.66304 12 8.66304C12.3253 8.66304 12.6303 8.8213 12.8176 9.08728C13.6845 10.3184 15.1397 11.0449 16.6443 10.9977C17.0888 10.9838 17.4891 11.2651 17.6267 11.688C17.8666 12.4256 18 13.2091 18 14C18 15.8799 17.3389 17.4286 16.409 18.582C16.5313 19.119 17.0087 19.5 17.5595 19.5H18C18.5523 19.5 19.5 18.5523 19.5 18V12C19.5 8.13401 15.866 4.5 12 4.5ZM12 10.5C10.9684 11.4897 9.0079 12.8615 7.5 13C7.433 13.3407 7.59096 13.6579 7.59096 14C7.59096 15.6183 8.26783 17.1447 9.11722 18C9.99758 18.8865 11.3951 19.5 12 19.5C12.6049 19.5 14.0024 18.8865 14.8828 18C15.7321 17.1447 16.5 15.6183 16.5 14C16.5 13.6579 16.476 13.313 16.409 12.9724C14.9011 12.8338 13.0315 11.4898 12 10.5Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_8174_36570">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      text: "Looks",
    },
    {
      to: "/admin/dashboard/adminAccountSetting",
      svg: (
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
            d="M13.4151 2.10141C12.6341 1.32036 11.3678 1.32036 10.5867 2.10141L8.68719 4.0009H6.00088C4.89631 4.0009 4.00088 4.89633 4.00088 6.0009V8.68721L2.10141 10.5867C1.32036 11.3678 1.32036 12.6341 2.1014 13.4152L4.00088 15.3146V18.001C4.00088 19.1055 4.89631 20.001 6.00088 20.001H8.68719L10.5867 21.9004C11.3678 22.6815 12.6341 22.6815 13.4151 21.9004L15.3146 20.001H18.0009C19.1055 20.001 20.0009 19.1055 20.0009 18.001V15.3147L21.9004 13.4152C22.6815 12.6341 22.6815 11.3678 21.9004 10.5867L20.0009 8.68717V6.0009C20.0009 4.89633 19.1055 4.0009 18.0009 4.0009H15.3146L13.4151 2.10141ZM12.0009 3.51562L13.9004 5.41511C14.2755 5.79019 14.7842 6.0009 15.3146 6.0009H18.0009V8.68717C18.0009 9.21761 18.2116 9.72632 18.5867 10.1014L20.4862 12.001L18.5867 13.9005C18.2116 14.2755 18.0009 14.7842 18.0009 15.3147V18.001H15.3146C14.7842 18.001 14.2755 18.2117 13.9004 18.5867L12.0009 20.4862L10.1014 18.5867C9.72633 18.2117 9.21763 18.001 8.68719 18.001H6.00088V15.3146C6.00088 14.7842 5.79017 14.2755 5.41509 13.9004L3.51562 12.001L5.41509 10.1015C5.79017 9.72635 6.00088 9.21765 6.00088 8.68721V6.0009H8.68719C9.21762 6.0009 9.72633 5.79019 10.1014 5.41511L12.0009 3.51562ZM10.0009 12.0009C10.0009 10.8963 10.8964 10.0009 12.0009 10.0009C13.1055 10.0009 14.0009 10.8963 14.0009 12.0009C14.0009 13.1055 13.1055 14.0009 12.0009 14.0009C10.8964 14.0009 10.0009 13.1055 10.0009 12.0009ZM12.0009 8.00085C9.79177 8.00085 8.00091 9.79171 8.00091 12.0009C8.00091 14.21 9.79177 16.0009 12.0009 16.0009C14.2101 16.0009 16.0009 14.21 16.0009 12.0009C16.0009 9.79171 14.2101 8.00085 12.0009 8.00085Z"
            fill="white"
          />
        </svg>
      ),
      text: "Account Settings",
    },
  ];

  const { pathname } = useLocation();

  return (
    <section
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => {
        setShow(false);

        setSalonMenu(false);
      }}
      className={styles.mainContainer}
      style={{ height: window.innerHeight }}
    >
      <div className={`${show ? styles.containerHover : styles.container}`}>
        {/* logo */}
        <div className={styles.imageWrapper}>
          <Link to={"/admin/dashboard"}>
            <img src={treao} alt="" />
          </Link>
        </div>
        {/* routes */}
        {!show &&
          links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              style={{
                backgroundColor: `${pathname === link.to ? "blue" : ""}`,
              }}
            >
              {link.svg}
            </Link>
          ))}
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
            <p
              onMouseEnter={() => setSalonMenu(!salonMenu)}
              style={{
                backgroundColor: `${pathname === "/admin/salon" ? "blue" : ""}`,
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
                    backgroundColor: `${
                      pathname === "/admin/salon/active" ? "blue" : ""
                    }`,
                  }}
                >
                  <span>Active</span>
                </Link>
                <Link
                  to={"/admin/salon/pending"}
                  style={{
                    backgroundColor: `${
                      pathname === "/admin/salon/pending" ? "blue" : ""
                    }`,
                  }}
                >
                  <span>Pending</span>
                </Link>
                <Link
                  to={"/admin/salon/deactivated"}
                  style={{
                    backgroundColor: `${
                      pathname === "/admin/salon/deactivated" ? "blue" : ""
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
                  pathname === "/admin/payment" ? "blue" : ""
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
              <span className={styles.downIcon}>
                <FaAngleDown />
              </span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;

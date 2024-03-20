import React from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TreatoLogo } from "../../../assets/images/icons";
import TreatoLogo2 from "../../../assets/images/partner/Treato2.png";
import menu from "../../../assets/icons/menu.png";
import signin from "../../../assets/icons/partner/signin.png";
import cross from "../../../assets/icons/partner/cross.png";
import right from "../../../assets/icons/partner/chevron-right.png";
import user from "../../../assets/icons/partner/user.png";
import pricing from "../../../assets/icons/partner/price.png";
import download from "../../../assets/icons/partner/download.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails, updateIsLoggedIn } from "../../../redux/slices/user";
import mask from "../../../assets/images/NavbarImages/Mask.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const handleLogout = () => {
    dispatch(updateIsLoggedIn(false));
    dispatch(resetUserDetails({}));
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    navigate("/partner");
  };
  const scrollToSection = (navigate, sectionId) => {
    navigate("/partner"); // Navigate to the home page
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 50,
          behavior: "smooth",
        });
      }
    }, 450);
  };
  return (
    <section className={style.mainContainer}>
      <header className={style.container}>
        <nav className={style.siteNamewrapper}>
          <Link to={"/"} className={style.siteName}>
            <img src={TreatoLogo} />
          </Link>
        </nav>

        <nav className={style.navMenu}>
          <p className={style.navItems}>
            {" "}
            <Link to={"/"} className={style.navItem}>
              For customers
            </Link>
            <Link
              onClick={() => scrollToSection(navigate, "AppDownload")}
              className={style.navItem}
            >
              Download App
            </Link>
            <Link to={"/"} className={style.navItem}>
              Pricing
            </Link>
          </p>
          <p className={style.actionWrapper}>
            {userData?.isLoggedIn ? (
              <div
                onClick={() => setShowProfile((pre) => !pre)}
                className={style.account}
              >
                <img
                  src={userData?.user?.avatar?.public_url ?? ""}
                  alt=""
                  onError={(e) => (e.target.src = mask)}
                />
                <h3>{userData?.user?.first_name}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <p className={style.action}>
                {" "}
                <Link to={"/login"}>
                  <button className={style.login}>Login</button>
                </Link>
                <Link to={"/partner/authchoice"}>
                  <button className={style.signup}>Sign up for free</button>
                </Link>
              </p>
            )}
          </p>
        </nav>
        {showProfile && (
          <div
            onClick={() => setShowProfile((pre) => !pre)}
            className={style.profileContainer}
          >
            <img
              src={userData?.user?.avatar?.public_url ?? ""}
              alt=""
              onError={(e) => (e.target.src = mask)}
            />
            <h3>{userData?.user?.first_name}</h3>
            {userData.user.role === "partner" && (
              <Link to={"/partner/dashboard"}>Dashboard</Link>
            )}
            <Link onClick={handleLogout}>LogOut</Link>
          </div>
        )}
        {/* mobile menu */}

        <div className={style.mobilemenu}>
          <Link to={"/"} className={style.siteName}>
            <img src={TreatoLogo2} />
          </Link>
          <button onClick={() => setshow((pre) => !pre)}>
            <img className={style.humburger} src={menu} />
          </button>

          {show && (
            <div className={style.mobileMenuContainer}>
              <div className={style.mobileMenhHEading}>
                <Link to={"/"} className={style.siteName}>
                  <img src={TreatoLogo} />
                </Link>
                <button onClick={() => setshow((pre) => !pre)}>
                  <img src={cross} />
                </button>
              </div>
              <div className={style.mobileMenuItms}>
                <div className={style.mobileMenuItem}>
                  <Link to={"/"}>
                    <img src={signin} /> <span>Sign up / Sign-in</span>
                  </Link>
                  <button onClick={() => setshow((pre) => !pre)}>
                    <img src={right} />
                  </button>
                </div>
                <div className={style.mobileMenuItem}>
                  <Link to={"/"}>
                    <img src={user} /> <span>For Customers</span>
                  </Link>
                  <button onClick={() => setshow((pre) => !pre)}>
                    <img src={right} />
                  </button>
                </div>
                <div className={style.mobileMenuItem}>
                  <Link to={"/"}>
                    <img src={pricing} /> <span>Pricing</span>
                  </Link>
                  <button onClick={() => setshow((pre) => !pre)}>
                    <img src={right} />
                  </button>
                </div>
                <div className={style.mobileMenuItem}>
                  <Link to={"/"}>
                    <img src={download} /> <span>Download app</span>
                  </Link>
                  <button onClick={() => setshow((pre) => !pre)}>
                    <img src={right} />
                  </button>
                </div>
                {userData.user.role === "partner" && (
                  <div className={style.mobileMenuItem}>
                    {userData.user.role === "partner" && (
                      <Link to={"/partner/dashboard"}>Dashboard</Link>
                    )}
                    <button onClick={() => setshow((pre) => !pre)}>
                      <img src={right} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </section>
  );
};

export default Navbar;

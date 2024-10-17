import React from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { TreatoLogo } from "../../../assets/images/icons";
import TreatoLogo2 from "../../../assets/images/partner/Treato2.webp";
import menu from "../../../assets/icons/menu.webp";
import signin from "../../../assets/icons/partner/signin.webp";
import cross from "../../../assets/icons/partner/cross.webp";
import right from "../../../assets/icons/partner/chevron-right.webp";
import user from "../../../assets/icons/partner/user.webp";
import pricing from "../../../assets/icons/partner/price.webp";
import download from "../../../assets/icons/partner/download.webp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails, updateIsLoggedIn } from "../../../redux/slices/user";
import mask from "../../../assets/images/NavbarImages/Mask.webp";
import icon from "../../../assets/svgs/icon (14).svg";
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

  const handleSetShow = () => {
    setshow((pre) => !pre);
  };
  const handler = () => {
    setShowProfile((pre) => !pre);
  };

  return (
    <section className={style.mainContainer}>
      <header className={style.container}>
        <nav className={style.siteNamewrapper}>
          <Link to={"/"} className={style.siteName}>
            <img loading="lazy" src={TreatoLogo} />
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
              <div onClick={handler} className={style.account}>
                <img
                  loading="lazy"
                  src={userData?.user?.avatar?.public_url ?? ""}
                  alt=""
                  onError={(e) => (e.target.src = mask)}
                />
                <h3>{userData?.user?.first_name}</h3>
                <img src={icon} alt="" />
              </div>
            ) : (
              <p className={style.action}>
                {" "}
                <Link to={"/partner/login"}>
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
          <div onClick={handler} className={style.profileContainer}>
            <img
              loading="lazy"
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
            <img
              loading="lazy"
              src={TreatoLogo2}
              className={style.TreatoLogo2}
              alt="TreatoLogo2"
            />
          </Link>
          <button onClick={() => setshow((pre) => !pre)}>
            <img loading="lazy" className={style.humburger} src={menu} />
          </button>

          {show && (
            <div className={style.mobileMenuContainer}>
              <div className={style.mobileMenhHEading}>
                <Link to={"/"} className={style.siteName}>
                  <img loading="lazy" src={TreatoLogo} />
                </Link>
                <button onClick={handleSetShow}>
                  <img loading="lazy" src={cross} />
                </button>
              </div>
              <div className={style.mobileMenuItms}>
                <div className={style.mobileMenuItem} onClick={handleSetShow}>
                  <Link to={"/partner/authchoice"}>
                    <img loading="lazy" src={signin} />{" "}
                    <span>Sign up / Sign-in</span>
                  </Link>
                  <button>
                    <img loading="lazy" src={right} />
                  </button>
                </div>

                <div className={style.mobileMenuItem} onClick={handleSetShow}>
                  <Link to={"/"}>
                    <img loading="lazy" src={user} /> <span>For Customers</span>
                  </Link>
                  <button>
                    <img loading="lazy" src={right} />
                  </button>
                </div>
                <div className={style.mobileMenuItem} onClick={handleSetShow}>
                  <Link to={"#"}>
                    <img loading="lazy" src={pricing} /> <span>Pricing</span>
                  </Link>
                  <button>
                    <img loading="lazy" src={right} />
                  </button>
                </div>
                <div className={style.mobileMenuItem} onClick={handleSetShow}>
                  <Link to={"/"}>
                    <img loading="lazy" src={download} />{" "}
                    <span>Download app</span>
                  </Link>
                  <button>
                    <img loading="lazy" src={right} />
                  </button>
                </div>
                {userData.user.role === "partner" && (
                  <div className={style.mobileMenuItem} onClick={handleSetShow}>
                    {userData.user.role === "partner" && (
                      <Link to={"/partner/dashboard"}>
                        <img loading="lazy" src={user} />
                        <span> Dashboard</span>
                      </Link>
                    )}
                    <button>
                      <img loading="lazy" src={right} />
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

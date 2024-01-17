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

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
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
    }, 450); // Delay the scroll to ensure the navigation has completed
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
              For customar
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
          <p className={style.action}>
            <Link to={"/login"}>
              <button className={style.login}>Login</button>
            </Link>
            <Link to={"/partner/authchoice"}>
              <button className={style.signup}>Sign up for free</button>
            </Link>
          </p>
        </nav>

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
              </div>
            </div>
          )}
        </div>
      </header>
    </section>
  );
};

export default Navbar;

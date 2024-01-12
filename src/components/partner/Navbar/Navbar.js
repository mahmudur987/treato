import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { TreatoLogo } from "../../../assets/images/icons";
import menu from "../../../assets/icons/menu.png";
import { useState } from "react";
const Navbar = () => {
  const [show, setshow] = useState(false);

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
            <Link to={"/"} className={style.navItem}>
              Download App
            </Link>
            {/* <Link to={"/"} className={style.navItem}>
              Pricing
            </Link> */}
          </p>
          <p className={style.action}>
            <Link>
              <button className={style.login}>Login</button>
            </Link>
            <Link>
              <button className={style.signup}>Sign up for free</button>
            </Link>
          </p>
        </nav>

        {/* mobile menu */}

        <div className={style.mobilemenu}>
          <button onClick={() => setshow((pre) => !pre)}>
            <img className={style.menuImage} src={menu} />
          </button>

          {show && (
            <div className={style.mobileMenuContainer}>
              <div className={style.mobileMenuItms}>
                <Link to={"/"} className={style.siteName}>
                  <img src={TreatoLogo} />
                </Link>
                <button onClick={() => setshow((pre) => !pre)}>x</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </section>
  );
};

export default Navbar;

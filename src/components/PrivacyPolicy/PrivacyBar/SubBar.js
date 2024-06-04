import React, { useState, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import style from './SubBar.module.css';

function SubBar() {
  const location = useLocation();
  const [selectOption, setOption] = useState(null);

  useEffect(() => {
    if (location.pathname.includes('Termofuse')) {
      setOption('TermOfUse');
    } else if (location.pathname.includes('policy')) {
      setOption('Policy');
    }
  }, [location.pathname]);

  return (
    <>
      <div className={style.subBar}>
        <div className={style.termPrivacy}>
          <div
            className={selectOption === 'TermOfUse' ? style.selected : style.notSelected}
            onClick={() => setOption('TermOfUse')}
            width={130}
          >
            <Link to="/Privacy/Termofuse">
              <h5>Terms of Use</h5>
            </Link>
            <div className={selectOption === 'TermOfUse' ? style.Highlighter : ''}></div>
          </div>
          <div
            className={selectOption === 'Policy' ? style.selected : style.notSelected}
            onClick={() => setOption('Policy')}
            width={142}
          >
            <Link to="/Privacy/policy">
              <h5>Privacy Policy</h5>
            </Link>
            <div className={selectOption === 'Policy' ? style.Highlighter : ''}></div>
          </div>
        </div>
        <hr />
      </div>
      <Outlet />
    </>
  );
}

export default SubBar;

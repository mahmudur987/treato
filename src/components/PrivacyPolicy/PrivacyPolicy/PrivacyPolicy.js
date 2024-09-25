import React, { useState } from "react";
import style from "./Privacy.module.css";
import { useGetAllLegal } from "../../../services/static";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";

function PrivacyService() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { data, isLoading, isError } = useGetAllLegal();
  const [privacy, _] = data?.data || [];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <div className={style.container}>
        <h5 className={style.tablename}>Table of Contents</h5>
        <div className={style.optionBox}>
          {privacy?.content?.length > 0 &&
            !isError &&
            privacy?.content?.map((x, i) => (
              <h6
                key={i}
                className={
                  selectedOption === x?._id
                    ? `${style.selected}`
                    : style.unSelected
                }
                onClick={() => {
                  scrollToSection(x?.title);
                  handleOptionClick(x?._id);
                }}
              >
                {x?.title}
              </h6>
            ))}
        </div>
      </div>
      <hr className={style.verticalLine} />
      <div className={style.rightContainer}>
        <h2 className={style.header}> {privacy?.Page} </h2>

        {privacy?.content?.length > 0 &&
          privacy?.content?.map((x, i) => (
            <>
              <section id={x?.title} key={i}>
                <h2> {x?.title} </h2>
                {x?.paragraph?.map((x, i) => (
                  <p key={i}>{x}</p>
                ))}
              </section>
              <div className={style.horizontal}></div>
            </>
          ))}
      </div>
    </>
  );
}

export default PrivacyService;

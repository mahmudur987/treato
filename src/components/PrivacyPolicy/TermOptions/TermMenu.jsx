import React, { useState } from "react";
import style from "../PrivacyPolicy/Privacy.module.css";
import { useGetAllLegal } from "../../../services/static";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";

function Termoptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { data, isLoading, isError } = useGetAllLegal();
  const [_, terms] = data?.data || [];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust this value according to the height of your fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading && <LoadSpinner />}
      {data && !isLoading && !isError && (
        <article>
          <div className={style.container}>
            <h5 className={style.tablename}>Table of Contents</h5>
            <div className={style.optionBox}>
              {terms?.content?.length > 0 &&
                terms?.content?.map((x) => (
                  <h6
                    className={
                      selectedOption === x?._id
                        ? style.selected
                        : style.unSelected
                    }
                    onClick={() => {
                      scrollToSection(x?.title);
                      handleOptionClick(x._id);
                    }}
                  >
                    {x?.title}
                  </h6>
                ))}
            </div>
          </div>
          <hr className={style.verticalLine} />
          <div className={style.rightContainer}>
            <h2 className={style.header}> {terms?.Page} </h2>

            {terms?.content?.length > 0 &&
              terms?.content?.map((x, i) => (
                <>
                  <section id={x?.title} className={style.section} key={i}>
                    <h2> {x?.title} </h2>

                    {x?.paragraph?.map((y) => (
                      <p>{y}</p>
                    ))}
                  </section>
                  <div className={style.horizontal}></div>
                </>
              ))}
          </div>
        </article>
      )}
    </>
  );
}

export default Termoptions;

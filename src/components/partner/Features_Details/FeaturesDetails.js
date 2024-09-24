import React from "react";
import style from "./FeaturesDetails.module.css";

import img2 from "../../../assets/icons/partner/icon2.webp";

import {
  useGetAllDetails,
  useGetMainTitleSmallTitle,
} from "../../../services/static";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../ErrorComponent/ErrorComponent";

const FeaturesDetails = () => {
  const { data, isLoading, isError, error } = useGetAllDetails();

  const {
    data: title,
    isLoading: titleLoading,
    isError: titleIsError,
  } = useGetMainTitleSmallTitle();

  const features = data?.data?.AllDetails?.map((x) => {
    const data = {
      logo: x?.Icon?.public_url,
      header: x?.Dtitle ?? "",
      description: x?.DsmallTitle ?? "",
    };
    return data;
  });

  if (isLoading || titleLoading) {
    return <LoadSpinner />;
  }
  if (isError || titleIsError) {
    <ErrorComponent message={error ? error?.message : "Error"} />;
  }
  return (
    <main className={style.mainContainer}>
      <section className={style.header}>
        <h1>{title?.data?.MainTile}</h1>
        <p>{title?.data?.SmallTitle}</p>
      </section>

      <section className={style.cardSection}>
        <div className={style.cardContainer}>
          {features.map((company, index) => {
            const { logo, header, description } = company;
            return (
              <div key={index} className={style.card}>
                <figure className={style.logo}>
                  <img loading="lazy" src={logo} alt={`${header} Logo`} />
                </figure>
                <h2 className={style.cardHeader}>{header}</h2>
                <p className={style.description}>{description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default FeaturesDetails;

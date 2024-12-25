import React from "react";
import styles from "../hero.module.css";
import { Frame1 } from "../../../../assets/images/HeroSectionImages";
import { useSelector } from "react-redux";
import { useGetAllNearSalonSList } from "../../../../services/salon";
import { Link } from "react-router-dom";

const Venues = ({ inputValue }) => {
  const userDetails = useSelector((state) => state?.user?.user);

  const { data, isLoading, isError } = useGetAllNearSalonSList({
    search: inputValue,
    lat: userDetails?.latitude,
    lng: userDetails?.longitude,
  });

  const venues = data?.salons || [];
  return (
    <>
      {!isError && (
        <div className={styles["venuesSection"]}>
          <h3>Venues</h3>
          {data && !isLoading && !isError && venues.length > 0 && (
            <div className={styles["vn_results"]}>
              {venues.map((venue) => (
                <Link
                  key={venue.id}
                  className={styles["vn_resultItem"]}
                  to={venue ? `/salons/${venue._id}` : null}
                >
                  <div className={styles["vn_itemImage"]}>
                    <img
                      height={48}
                      width={48}
                      loading="lazy"
                      src={venue?.salon_Img[0]?.public_url ?? Frame1}
                      alt="Venue"
                      onError={(e) => {
                        e.target.src = Frame1;
                      }}
                    />
                  </div>
                  <div className={styles["vn_itemdetails"]}>
                    <p>{venue.salon_name}</p>
                    <small>{venue.salons_address.slice(0, 20)}</small>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {data && !isLoading && !isError && venues.length === 0 && (
            <p>No venue available as of now</p>
          )}
        </div>
      )}
    </>
  );
};

export default Venues;

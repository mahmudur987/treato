import React, { useRef } from "react";
import styles from "./Testimonials.module.css";
import scrollRight from "../../../assets/images/recommendImages/scrollRight.png";
import star from "../../../assets/images/testimonialsImages/star.png";
import mask1 from "../../../assets/images/testimonialsImages/mask1.png";

const Testimonials = () => {

    const testisBoxRef = useRef(null);

    const handle_testisScrollRight = () => {
        console.log("hello");
        if (testisBoxRef.current) {
          testisBoxRef.current.scrollBy({
            left: 285, // Adjust the value as needed
            behavior: "smooth",
          });
        }
      };
    // testimonial objects

  const testimonials = [
    {
      star: 4,
      name: "Lucy",
      location: "Bengaluru, IN",
      content:
        "A transformative journey at your fingertips. This mindfulness app brings peace and clarity to your busy life.",
    },

    {
      star: 3,
      name: "Lucy",
      location: "Bengaluru, IN",
      content:
      "A transformative journey at your fingertips. This mindfulness app brings peace and clarity to your busy life.",
    },
    {
      star: 4,
      name: "Good and professional services.",
      location: "Bengaluru, IN",
      content:
      "A transformative journey at your fingertips. This mindfulness app brings peace and clarity to your busy life.",
    },
    {
        star: 4,
        name: "Good and professional services.",
        location: "Bengaluru, IN",
        content:
        "A transformative journey at your fingertips. This mindfulness app brings peace and clarity to your busy life.",
      },

  ];
  return (
    <section className={styles["container"]}>
      <div className={styles["TestisHeading"]}>
        <h2 className={styles["TestisText"]}>What our users say</h2>
        <img src={scrollRight}  alt="scrollRight" onClick={handle_testisScrollRight}/>
      </div>
      <div className={styles["Testis"]} ref={testisBoxRef}>
    
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles["TestisItem"]}>
            <div className={styles["stars"]}>
              {Array(testimonial.star)
                .fill(null)
                .map((_, starIndex) => (
                  <img key={starIndex} src={star} alt="Star" />
                ))}
            </div>
            <h4>Spa Bookings Made Easy!</h4>
            <p>{testimonial.content}</p>
            <div className={styles["testisProfile"]}>
              <img src={mask1} alt="Profile" />
              <div className={styles["profileDetails"]}>
                <h4 className={styles["profileName"]}>{testimonial.name}</h4>
                <p className={styles["profileLocation"]}>
                  {testimonial.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

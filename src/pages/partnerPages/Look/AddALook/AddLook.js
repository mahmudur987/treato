import React, { createContext, useState } from "react";
import styles from "./AddLook.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import LeftContent from "../../../../components/Services/Look/AddLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/AddLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/AddLook/TeamMembers/TeamMembers";
import { Link } from "react-router-dom";
export const addLookContext = createContext({});
const AddLook = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
  });
  const [selectedPeople, setSelectedPeople] = useState([]);
  const value = {
    image,
    setImage,
    formData,
    setFormData,
    selectedPeople,
    setSelectedPeople,
  };

  return (
    <addLookContext.Provider value={value}>
      <main className={styles.mainContainer}>
        <div className={styles.heading}>
          <Link to={"/partner/dashboard/look"} className={styles.icon}>
            <IoMdArrowRoundBack />
          </Link>

          <h1> Add A Look</h1>
        </div>

        <div className={styles.container}>
          <div className={styles.left}>
            <LeftContent />
          </div>
          <div className={styles.right}>
            <StyleDetails />

            <TeamMembers />
          </div>
        </div>
      </main>
    </addLookContext.Provider>
  );
};

export default AddLook;

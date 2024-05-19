import React, { createContext, useState } from "react";
import styles from "./EditLook.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import LeftContent from "../../../../components/Services/Look/EditLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/EditLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/EditLook/TeamMembers/TeamMembers";
import { Link } from "react-router-dom";
export const EditLookContext = createContext({});
const EditLook = () => {
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
    <EditLookContext.Provider value={value}>
      <main className={styles.mainContainer}>
        <div className={styles.heading}>
          <Link to={"/partner/dashboard/look"} className={styles.icon}>
            <IoMdArrowRoundBack />
          </Link>

          <h1> Edit Look</h1>
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
    </EditLookContext.Provider>
  );
};

export default EditLook;

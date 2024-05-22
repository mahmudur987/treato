import React, { createContext, useEffect, useState } from "react";
import styles from "./EditLook.module.css";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import LeftContent from "../../../../components/Services/Look/EditLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/EditLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/EditLook/TeamMembers/TeamMembers";
import { Link, useParams } from "react-router-dom";
import { useSingleLook } from "../../../../services/Look";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
export const EditLookContext = createContext({});
const EditLook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSingleLook(id);
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
  useEffect(() => {
    let singleLook = data?.data[0];
    setImage(singleLook?.photo?.public_url);
    setFormData({
      name: singleLook?.name ?? "N/A",
      description: singleLook?.description ?? "N / A",
      price: singleLook?.price ?? "0",
      rating: singleLook?.rating ?? "0",
    });

    setSelectedPeople(singleLook?.stylist.map((x) => x._id));
  }, [data]);

  console.log(selectedPeople);

  return (
    <EditLookContext.Provider value={value}>
      <main className={styles.mainContainer}>
        <div className={styles.heading}>
          <Link to={"/partner/dashboard/look"} className={styles.icon}>
            <IoMdArrowRoundBack />
          </Link>

          <h1> Edit Look</h1>
        </div>
        {isLoading && <LoadSpinner />}

        {isError && (
          <ErrorComponent message={error ? error.message : "Error"} />
        )}

        {!isLoading && !isError && (
          <div className={styles.container}>
            <div className={styles.left}>
              <LeftContent />
            </div>
            <div className={styles.right}>
              <StyleDetails />

              <TeamMembers />
            </div>
          </div>
        )}
        <div className={styles.btnContainer}>
          <button className={styles.cancel}>Cancel</button>

          <button className={styles.save}>Submit</button>
        </div>
      </main>
    </EditLookContext.Provider>
  );
};

export default EditLook;

// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./UpdateCategory.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import ColorSelect from "../../Select/ColorSelect/ColorSelect";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { useSingleSalon } from "../../../services/salon";
import downArrow from "../../../assets/svgs/icon (2).svg";

import { toast } from "react-toastify";
import axiosInstance from "../../../services/axios";
import { useNavigate } from "react-router-dom";
const UpdateCategoryModal = ({ showModal, onClose, data, category }) => {
  const { refetch } = useSingleSalon();
  const [selectedServiceType, setSelectedServiceType] = useState(
    data?.service_name
  );
  const [selectCategory, setselectCategory] = useState(category.category_name);
  const [colorCode, setColorCode] = useState("");

  const navigate = useNavigate();
  let serviceType = [];
  useEffect(() => {
    setColorCode(category?.color ? category.color : "");
  }, [category]);

  const serviceId = data?._id;
  const handleSubmit = async () => {
    const newCategory = {
      serviceId,
      mainCategoryId: category._id,
      newCategoryName: selectCategory,
      color: colorCode,
    };

    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance.patch(
        "/service/editCategory",
        newCategory,
        { headers }
      );

      console.log(data);
      toast.success(data?.message ?? "The category was successfully updated.", {
        toastId: 1,
      });
      refetch();
      navigate("/partner/dashboard/service");
      setselectCategory("");
    } catch (error) {
      console.error("error", error);
      toast.error(`An error occurred: ${error.message}`, { toastId: 2 });
    }
    onClose();
  };

  const handleInlineFunctions = (e) => {
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={onClose}>
                &times;
              </span>
              <span className={styles.back} onClick={onClose}>
                <IoMdArrowBack />
              </span>
              <h2 className={styles.modalHeading}>Update Category</h2>

              <form className={styles.form}>
                <div className={styles.formItems}>
                  <label htmlFor="servicetype"> Service Type</label>

                  <div className={styles.selectWrapper}>
                    <CustomSelect
                      options={serviceType}
                      value={selectedServiceType}
                      onChange={setSelectedServiceType}
                      disable={true}
                    />
                    <span></span>
                  </div>
                </div>
                {/* category Name */}

                <div className={styles.formItems}>
                  <label htmlFor="servicetype"> Category Name</label>

                  <div className={styles.selectWrapper}>
                    <input
                      type="text"
                      onChange={(e) => setselectCategory(e.target.value)}
                      value={selectCategory ? selectCategory : ""}
                    />
                  </div>
                </div>
                <div className={styles.formItems}>
                  <label htmlFor="servicetype"> Appointment color</label>

                  <div className={styles.selectWrapper}>
                    <ColorSelect
                      setColorCode={setColorCode}
                      colorCode={colorCode}
                    />
                    <span>
                      <img src={downArrow} alt="down arrow" />
                    </span>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.cancel}
                    type="button"
                    onCl
                    onClick={handleInlineFunctions}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.save}
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCategoryModal;

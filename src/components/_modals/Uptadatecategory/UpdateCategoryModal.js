// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./UpdateCategory.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import ColorSelect from "../../Select/ColorSelect/ColorSelect";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { getAllServices } from "../../../services/Services";
import { useSingleSalon } from "../../../services/salon";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axios";
import { useNavigate } from "react-router-dom";
const UpdateCategoryModal = ({ showModal, onClose, data, category }) => {
  const { refetch } = useSingleSalon();

  const [serviceType, setserviceType] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(
    data?.service_name
  );
  const [selectCategory, setselectCategory] = useState(category.category_name);
  const [colorCode, setColorCode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setColorCode(category?.color ? category.color : "");
  }, [category]);
  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();
        if (res) {
          const uniqueDataArray = res?.data?.data.reduce(
            (uniqueArray, currentItem) => {
              // Check if there's already an object with the same 'name' in uniqueArray
              if (
                !uniqueArray.some(
                  (item) => item.service_name === currentItem.service_name
                )
              ) {
                // If not found, add this object to uniqueArray
                uniqueArray.push(currentItem);
              }
              return uniqueArray;
            },
            []
          );

          const data = uniqueDataArray?.map((x) => x.service_name);

          setserviceType(data);
        } else {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllServices();
  }, []);
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
      toast.success(data ? data.message : "A New Category Added Successfully", {
        toastId: 1,
      });
      refetch();
      navigate("/partner/dashboard/service");
      setselectCategory("");
    } catch (error) {
      console.error("eror", error);
      toast.error(`Error happn ${error.message}`, { toastId: 2 });
    }
    onClose();
  };
  console.log(category);
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
                    <span>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg> */}
                    </span>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.cancel}
                    type="button"
                    onClick={() => onClose()}
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

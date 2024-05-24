// Modal.js
import React, { useEffect, useState } from "react";
import styles from "./AddCategory.module.css";
import CustomSelect from "../../Select/CustomeSelect";
import ColorSelect from "../../Select/ColorSelect/ColorSelect";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import { getAllServices } from "../../../services/Services";
import { useSingleSalon } from "../../../services/salon";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axios";
const AddCategory = ({ showModal, onClose }) => {
  const { refetch } = useSingleSalon();

  const [error, setError] = useState(null);
  const [serviceType, setserviceType] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(["Error"]);
  const [selectCategory, setselectCategory] = useState("");
  const [service, setservice] = useState([]);
  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();
        if (res) {
          const data = res?.data?.data.map((x) => x.service_name);
          setservice(res?.data?.data);
          setserviceType(data);
          setSelectedServiceType(data[0]);
        } else {
          setError(err);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchAllServices();
  }, []);
  const serviceId = service?.find((x) => {
    if (x.service_name === selectedServiceType) {
      return x._id;
    }
  })?._id;

  const handleSubmit = async () => {
    if (!selectCategory) {
      toast.error("Please select a category.");
      return;
    }

    const newCategory = {
      serviceId,
      mainCategoryData: {
        category_name: selectCategory,
        subCategories: [],
      },
    };

    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const { data } = await axiosInstance.patch(
        "/service/addNewCategory",
        newCategory,
        { headers }
      );

      toast.success(data ? data.message : "A New Category Added Successfully", {
        toastId: 1,
      });
      refetch();

      setselectCategory("");
    } catch (error) {
      console.error("error", error);
      toast.error(`An error occurred: ${error.message}`, { toastId: 2 });
    }
    onClose();
  };

  if (error) {
    toast.error("error happen");
  }
  return (
    <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <span className={styles.back} onClick={onClose}>
          <IoMdArrowBack />
        </span>
        <h2 className={styles.modalHeading}>Add a new category</h2>

        <form className={styles.form}>
          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Service Type</label>

            <div className={styles.selectWrapper}>
              <CustomSelect
                options={serviceType}
                value={selectedServiceType}
                onChange={setSelectedServiceType}
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
          {/* categor Name */}

          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Select Service Category</label>

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
              <ColorSelect />
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
  );
};

export default AddCategory;

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
const options = [
  "#CEB739",
  "#DE6296",
  "#801A7F",
  "#B3B59C",
  "#111B1F",
  "#0D3FC0",
  "#D952DA",
  "#E5EF4D",
  "#EDE092",
  "#6a5acd",
  "#F12783",
  "#F12124",
  "#F18865",
];
const AddCategory = ({ showModal, onClose }) => {
  const { data, isLoading, isError, refetch, error } = useSingleSalon();

  const [serviceType, setserviceType] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(["Error"]);
  const [selectCategory, setselectCategory] = useState("");
  const [service, setservice] = useState([]);
  const [colorCode, setColorCode] = useState(options[0]);
  useEffect(() => {
    const uniqueDataArray = data?.salon?.services;
    const x = uniqueDataArray?.map((x) => x.service_name);
    setserviceType(x);
    setSelectedServiceType(x[0] ? x[0] : "");
    setservice(uniqueDataArray);
  }, [data]);

  const serviceId = service?.find(
    (x) => x.service_name === selectedServiceType
  )?._id;
  console.log(serviceId);
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
      color: colorCode,
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
      console.log(data);
      toast.success("A New Category Added Successfully", {
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
          {/* category Name */}

          <div className={styles.formItems}>
            <label htmlFor="servicetype"> Service Category Name</label>

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
              <ColorSelect setColorCode={setColorCode} />
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

import React, { createContext, useState } from "react";
import styles from "./AddLook.module.css";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import LeftContent from "../../../../components/Services/Look/AddLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/AddLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/AddLook/TeamMembers/TeamMembers";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
export const addLookContext = createContext({});
const AddLook = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
  });
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [salonId, setSalonId] = useState("");
  const serviceCategoryID = serviceData?.find(
    (x) => x.category_name === category
  )?._id;
  const serviceSubCategoryId = serviceData
    ?.find((x) => x.category_name === category)
    ?.subCategories?.find((x) => x.service_name === selectedServices)?._id;

  const handleSubmit = async () => {
    if (!serviceCategoryID || !serviceSubCategoryId) {
      return toast.error("select service");
    }

    if (!image) {
      return toast.error("Select Image");
    }
    if (formData.name === "") {
      return toast.error("Add Name");
    }
    if (formData.description === "") {
      return toast.error("Add Description");
    }
    if (formData.price === "") {
      return toast.error("Add Price");
    }
    if (formData.rating === "") {
      return toast.error("Add Rating");
    }

    const data = new FormData();
    data.append("file", image);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("serviceCategories", serviceCategoryID);
    data.append("serviceSubCategoryId", serviceSubCategoryId);
    data.append("salonId", salonId);
    // Append selectedPeople array elements as separate fields
    selectedPeople.forEach((id) => {
      data.append("stylishListIds[]", id);
    });
    console.log({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      rating: formData.rating,
      serviceCategoryID,
      serviceSubCategoryId,
      stylishListIds: selectedPeople,
      salonId,
    });
    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };
      const res = await axiosInstance.post("look-book/new", data, { headers });

      console.log(res.data);
    } catch (error) {
      console.error("Network error:", error?.response?.data);
    }
  };
  const value = {
    image,
    setImage,
    formData,
    setFormData,
    selectedPeople,
    setSelectedPeople,
    serviceData,
    setServiceData,
    categories,
    setCategories,
    category,
    setCategory,
    service,
    setService,
    selectedServices,
    setSelectedServices,
    setSalonId,
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

        <div className={styles.btnContainer}>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => navigate("/partner/dashboard/look")}
          >
            Cancel
          </button>

          <button className={styles.save} type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </addLookContext.Provider>
  );
};

export default AddLook;

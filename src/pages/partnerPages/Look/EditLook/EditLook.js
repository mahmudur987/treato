import React, { createContext, useEffect, useState } from "react";
import styles from "./EditLook.module.css";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import LeftContent from "../../../../components/Services/Look/EditLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/EditLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/EditLook/TeamMembers/TeamMembers";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSingleLook } from "../../../../services/Look";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
export const EditLookContext = createContext({});
const EditLook = () => {
  const navigate = useNavigate();
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
  const [serviceData, setServiceData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [salonId, setSalonId] = useState("");
  const serviceCategoryID =
    serviceData?.find((x) => x.category_name === category)?._id ??
    data?.data[0]?.service_categories;
  const serviceSubCategoryId =
    serviceData
      ?.find((x) => x.category_name === category)
      ?.subCategories?.find((x) => x.service_name === selectedServices)?._id ??
    data?.data[0]?.service_subcategory_id;

  useEffect(() => {
    let singleLook = data?.data[0];
    setFormData({
      name: singleLook?.name ?? "N/A",
      description: singleLook?.description ?? "N / A",
      price: singleLook?.price ?? "0",
      rating: singleLook?.rating ?? "0",
    });
    const peoples = singleLook?.stylists?.map((x) => x._id);
    setSelectedPeople(peoples);
    setCategory(singleLook?.service[0]?.service_name);
    setSelectedServices(singleLook?.serviceSubCategoryData?.service_name);
  }, [data]);

  const handleSubmit = async () => {
    if (!serviceCategoryID || !serviceSubCategoryId) {
      return toast.error("select service");
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

      const res = await axiosInstance.patch(`look-book/edit/${id}`, data, {
        headers,
      });

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
          <button
            className={styles.cancel}
            onClick={() => navigate("/partner/dashboard/look")}
          >
            Cancel
          </button>

          <button className={styles.save} type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </EditLookContext.Provider>
  );
};

export default EditLook;

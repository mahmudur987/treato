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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [renderImage, setRenderImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
  });
  const [selectedPeople, setSelectedPeople] = useState([]);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [service, setService] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const serviceCategoryID = "";
  const serviceSubCategoryId = "";

  useEffect(() => {
    let singleLook = data?.data[0];
    setRenderImage(singleLook?.photo?.public_url);
    setFormData({
      name: singleLook?.name ?? "N/A",
      description: singleLook?.description ?? "N / A",
      price: singleLook?.price ?? "0",
      rating: singleLook?.rating ?? "0",
    });
    const peoples = singleLook?.stylists?.map((x) => x._id);
    setSelectedPeople(peoples);
    setCategory(singleLook?.service_categories);
    setSelectedServices(singleLook?.service_subcategory_id);
  }, [data]);
  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    if (image) {
      data.append("file", image);
    }

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("serviceCategories", serviceCategoryID);
    data.append("serviceSubCategoryId", serviceSubCategoryId);

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
    });
    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const res = await axiosInstance.patch(`look-book/edit/${id}`, data, {
        headers,
      });
      // console.log(res.data);
      if (res.data) {
        toast.success("Looks Edit Successfully");
      }
    } catch (error) {
      console.error("Network error:", error?.response?.data);
      toast.error("Error");
    }
    setLoading(false);
  };
  const value = {
    image,
    setImage,
    renderImage,
    setRenderImage,
    formData,
    setFormData,
    selectedPeople,
    setSelectedPeople,
    categories,
    setCategories,
    category,
    setCategory,
    service,
    setService,
    selectedServices,
    setSelectedServices,
  };

  if (loading) {
    return <LoadSpinner />;
  }

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

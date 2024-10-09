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
  const { data, isLoading, isError, error, refetch } = useSingleLook(id);
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

  useEffect(() => {
    let singleLook = data?.data[0];
    setRenderImage(singleLook?.photo?.public_url);
    setFormData({
      name: singleLook?.name ?? "N/A",
      description: singleLook?.description ?? "N / A",
      price: singleLook?.price ?? "0",
      rating: singleLook?.rating ?? "0",
    });
    const peoples = singleLook?.stylists
      ?.filter((stylist) => stylist.isContributing)
      ?.map((x) => x._id);
    setSelectedPeople(peoples);
    setCategory(singleLook?.service_categories);
    setSelectedServices(singleLook?.service_subcategory_id);
  }, [data]);
  const handleSubmit = async () => {
    setLoading(true);

    // Validation checks
    if (!formData.name) {
      toast.error("Name is required.");
      setLoading(false);
      return;
    }
    if (!formData.description) {
      toast.error("Description is required.");
      setLoading(false);
      return;
    }
    if (!formData.price) {
      toast.error("Price is required.");
      setLoading(false);
      return;
    }
    if (!formData.rating) {
      toast.error("Rating is required.");
      setLoading(false);
      return;
    }
    if (!category) {
      toast.error("Service category is required.");
      setLoading(false);
      return;
    }
    if (!selectedServices) {
      toast.error("Service sub-category is required.");
      setLoading(false);
      return;
    }

    // Create FormData
    const data = new FormData();
    if (image) {
      data.append("file", image);
    }
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("serviceCategories", category);
    data.append("serviceSubCategoryId", selectedServices);

    selectedPeople.forEach((id) => {
      data.append("stylishListIds[]", id);
    });

    console.log({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      rating: formData.rating,
      serviceCategoryID: category,
      serviceSubCategoryId: selectedServices,
      stylishListIds: selectedPeople,
    });

    try {
      const headers = {
        token: localStorage.getItem("jwtToken"),
      };

      const res = await axiosInstance.patch(`look-book/edit/${id}`, data, {
        headers,
      });

      if (res.data) {
        toast.success("Looks edited successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Network error:", error?.response?.data);
      toast.error(
        error?.response?.data?.message || "An error occurred while editing."
      );
    } finally {
      setLoading(false); // Ensure loading state is reset in all scenarios
    }
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

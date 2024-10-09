import React, { createContext, useState } from "react";
import styles from "./AddLook.module.css";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import LeftContent from "../../../../components/Services/Look/AddLook/LeftContent/LeftContent";
import StyleDetails from "../../../../components/Services/Look/AddLook/StyleDetails/StyleDetails";
import TeamMembers from "../../../../components/Services/Look/AddLook/TeamMembers/TeamMembers";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
import LoadSpinner from "../../../../components/LoadSpinner/LoadSpinner";
export const addLookContext = createContext({});
const AddLook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state at the beginning

    // Validation checks
    if (!category || !selectedServices) {
      toast.error("Select a service.");
      setIsLoading(false);
      return;
    }

    if (!image) {
      toast.error("Select an image.");
      setIsLoading(false);
      return;
    }

    const requiredFields = [
      { value: formData.name, message: "Add a name." },
      { value: formData.description, message: "Add a description." },
      { value: formData.price, message: "Add a price." },
      { value: formData.rating, message: "Add a rating." },
    ];

    for (const { value, message } of requiredFields) {
      if (value === "") {
        toast.error(message);
        setIsLoading(false);
        return;
      }
    }

    // Construct FormData
    const data = new FormData();
    data.append("file", image);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("serviceCategories", category);
    data.append("serviceSubCategoryId", selectedServices);

    // Append selectedPeople array elements as separate fields
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
      const res = await axiosInstance.post("look-book/new", data, { headers });
      console.log(res.data);

      if (res.data) {
        toast.success("A new look added successfully!");
        // Reset form fields
        setImage(null);
        setRenderImage(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          rating: "",
        });
        setSelectedPeople([]);
      }
    } catch (error) {
      console.error("Network error:", error?.response?.data);
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false); // Ensure loading state is reset in both success and error cases
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

  if (isLoading) {
    return <LoadSpinner />;
  }

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

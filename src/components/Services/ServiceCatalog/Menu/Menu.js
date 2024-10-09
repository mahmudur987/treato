import React, { memo, useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateCategoryModal from "../../../_modals/Uptadatecategory/UpdateCategoryModal";
import { toast } from "react-toastify";
import axiosInstance from "../../../../services/axios";
import { useSingleSalon } from "../../../../services/salon";
const Menu = ({ setShowBtnMenu, data, category }) => {
  const { refetch } = useSingleSalon();
  const navigate = useNavigate();
  const service_id = data._id;
  const category_id = category._id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowBtnMenu(null);
  };
  const handleDelete = async () => {
    const deleteCategoryUrl = `service/deleteCategory/${service_id}/${category_id}`;
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };

    // Optional: Confirm deletion with the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service category?"
    );
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const { data } = await axiosInstance.delete(deleteCategoryUrl, {
        headers,
      });
      console.log(data);
      toast.success("Service deleted successfully");

      navigate("/partner/dashboard/service");
      refetch();
      setShowBtnMenu("");
    } catch (error) {
      console.error("Error deleting data", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the service. Please try again."
      );
    }
  };

  return (
    <>
      <div className={styles.menuItems}>
        <p>
          <Link to={"/partner/dashboard/service/addservice"}>
            Add a new service
          </Link>
        </p>
        <p
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Edit category
        </p>
        <p onClick={handleDelete} className={styles.delete}>
          Delete Category
        </p>
      </div>
      <UpdateCategoryModal
        showModal={isModalOpen}
        onClose={closeModal}
        data={data}
        category={category}
      />
    </>
  );
};

export default Menu;

export const MemoizedMenu = memo(Menu);

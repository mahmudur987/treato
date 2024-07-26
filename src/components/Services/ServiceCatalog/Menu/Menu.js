import React, { useEffect, useState } from "react";
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
    let url = `service/deleteCategory/${service_id}/${category_id}`;
    const headers = {
      token: localStorage.getItem("jwtToken"),
    };
    try {
      const { data } = await axiosInstance.delete(url, { headers });
      console.log(data);
      toast.success("service delete successfully");
      navigate("/partner/dashboard/service");
      refetch();
      setShowBtnMenu("");
    } catch (error) {
      console.log("Erroor deleting data", error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className={styles.menuItems}>
        <p>
          <Link to={"/partner/dashboard/service/addservice"}>Add a new service</Link>
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

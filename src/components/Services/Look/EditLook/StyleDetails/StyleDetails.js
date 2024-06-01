import React, { useContext, useEffect, useState } from "react";
import styles from "./StyleDetails.module.css";
import { EditLookContext } from "../../../../../pages/partnerPages/Look/EditLook/EditLook";
import { useSingleSalon } from "../../../../../services/salon";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import { getCombinedMainCategories } from "../../AddLook/StyleDetails/StyleDetails";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
const StyleDetails = () => {
  const {
    formData,
    setFormData,
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
  } = useContext(EditLookContext);
  const { data, isLoading, isError, error } = useSingleSalon();

  useEffect(() => {
    const services = getCombinedMainCategories(data?.salon?.services);
    setServiceData(services);
    const mainCategories = services.map((x) => x.category_name);
    setCategories(mainCategories);
    setSalonId(data?.salon?._id);
  }, [data]);

  useEffect(() => {
    const services = serviceData
      .find((x) => x.category_name === category)
      ?.subCategories?.map((x) => x.service_name);
    setService(services);
  }, [category]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.heading}>
        <h2>Style Details</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="">Service Category</label>

          {data && !isLoading && !isError && (
            <CustomSelect2
              options={categories}
              value={category ? category : "please select one"}
              onChange={setCategory}
            />
          )}

          {isLoading && <LoadSpinner />}
          {isError && <ErrorComponent message={"Error "} />}
        </div>
        {/* select service */}
        {service && service?.length > 0 ? (
          <div className={styles.formGroup}>
            <label htmlFor="">Select Service </label>
            <CustomSelect2
              options={service}
              value={
                selectedServices?.length > 0
                  ? selectedServices
                  : "please select one"
              }
              onChange={setSelectedServices}
            />
          </div>
        ) : (
          <p className={styles.noservice}>
            No service available at selected category.please add a service
          </p>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Burgundy curls with twilight blue extensions"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="A brief description of the style."
          ></textarea>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. ₹699.00"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Customer Rating</label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={styles.input}
              placeholder="4.0"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default StyleDetails;

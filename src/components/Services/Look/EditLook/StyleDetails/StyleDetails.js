import React, { useContext, useEffect, useState } from "react";
import styles from "./StyleDetails.module.css";
import { EditLookContext } from "../../../../../pages/partnerPages/Look/EditLook/EditLook";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
import { useGetPartnerServices } from "../../../../../services/Services";
const StyleDetails = () => {
  const {
    formData,
    setFormData,
    categories,
    setCategories,
    category,
    setCategory,
    service,
    setService,
    setSelectedServices,
  } = useContext(EditLookContext);
  const { data, isLoading, isError, error } = useGetPartnerServices();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    setCategories(data ? data?.data : []);
  }, [data]);

  useEffect(() => {
    const services = data?.data?.find((x) => x.service_id === category);
    setService(services?.subCategories);
    setSelectedServices(
      services ? services?.subCategories[0]?.subCategory_id : "null"
    );
  }, [category, data]);

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
        {/*  category */}

        <div className={styles.formGroup}>
          <label htmlFor="">Service Category</label>

          {data && !isLoading && !isError && (
            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
              {categories?.map((x, i) => (
                <option
                  key={i}
                  value={x.service_id}
                  selected={x.service_id === category}
                >
                  {" "}
                  {x.service_name}{" "}
                </option>
              ))}
            </select>
          )}

          {isLoading && <LoadSpinner />}
          {isError && <ErrorComponent message={"Error "} />}
        </div>
        {/* select service */}
        {service && service?.length > 0 ? (
          <div className={styles.formGroup}>
            <label htmlFor="">Select Service </label>

            <select onChange={(e) => setSelectedServices(e.target.value)}>
              {service?.map((x, i) => (
                <option key={i} value={x.subCategory_id}>
                  {" "}
                  {x.subCategory_name}
                </option>
              ))}
            </select>
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

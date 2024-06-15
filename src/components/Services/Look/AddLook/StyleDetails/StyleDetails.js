import React, { useContext, useEffect, useState } from "react";
import styles from "./StyleDetails.module.css";
import { addLookContext } from "../../../../../pages/partnerPages/Look/AddALook/AddLook";
import { useSingleSalon } from "../../../../../services/salon";
import CustomSelect2 from "../../../../Select/CustomeSelect2/CustomeSelect2";
import LoadSpinner from "../../../../LoadSpinner/LoadSpinner";
import ErrorComponent from "../../../../ErrorComponent/ErrorComponent";
export const getCombinedMainCategories = (services) => {
  let mainCategoriesCombined = [];

  services?.forEach((service) => {
    if (service.mainCategories) {
      mainCategoriesCombined = mainCategoriesCombined.concat(
        service.mainCategories
      );
    }
  });

  return mainCategoriesCombined.concat(mainCategoriesCombined.subCategories);
};
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
  } = useContext(addLookContext);
  const { data, isLoading, isError, error } = useSingleSalon();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const services = data?.salon?.services;
    setServiceData(services);
    const mainCategories = services?.map((x) => {
      return { serviceName: x.service_name, id: x._id };
    });
    setCategories(mainCategories);
    setCategory(mainCategories ? mainCategories[0] : "null");
    setSalonId(data?.salon?._id);
  }, [data]);

  useEffect(() => {
    const subCategory = getCombinedMainCategories(data?.salon?.services);
    const services = subCategory
      .filter((x) => x !== undefined)
      .map((x) => {
        return { categoryName: x.category_name, id: x._id };
      });
    console.log(services);
    setService(services);
    setSelectedServices(services ? services[0] : "null");
  }, [category]);

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
                <option value={x.id}> {x.serviceName} </option>
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
                <option key={i} value={x.id}>
                  {" "}
                  {x.categoryName}
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
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Burgundy curls wit &&h twilight blue extensions"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            required
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
              required
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
              required
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

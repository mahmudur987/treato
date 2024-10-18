import React, { memo, useEffect, useMemo, useState } from "react";
import styles from "./BasicDetailForm.module.css";
import CustomSelect from "../../../Select/CustomeSelect";
import { downArrow } from "../../../Select/ColorSelect/ColorSelect";
import plus from "../../../../assets/svgs/icon (16).svg";
const BasicDetailsForm = ({ salon, setBasicDetails, submit }) => {
  const [showCategoryOption, setshowCategoryOption] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectCategory, setSelectCategory] = useState(null);
  const [serviceName, setserviceName] = useState("");
  const [duration, setDuration] = useState("15 mins");
  const [availableFor, setAvailableFor] = useState("Everyone");
  const [description, setDescription] = useState("");
  const [tax, setTax] = useState("Included");
  const [price, setPrice] = useState("0");
  const durationOfService = [
    "15 mins",
    "30 mins",
    "45 mins",
    "1 h",
    "1 h 15 mins",
    "1 h 30 mins",
    "1 h 45 mins",
    "2 h ",
    "2 h +",
  ];
  const categories = useMemo(() => {
    return (
      salon?.services
        ?.find((x) => x._id === selectedServiceType?.id)
        ?.mainCategories?.map((category) => category.category_name) || []
    );
  }, [salon?.services, selectedServiceType?.id]);
  const AvailableFor = ["Everyone", "Female only", "Male only"];
  const TaxAndFees = ["included", "excluded"];

  const serviceType = useMemo(() => {
    return (
      salon?.services?.map((x) => {
        return {
          name: x.service_name,
          id: x._id,
        };
      }) || []
    );
  }, [salon?.services]);

  const data = useMemo(
    () => ({
      selectedServiceType,
      selectCategory,
      serviceName,
      duration,
      availableFor,
      description,
      price,
      tax,
    }),
    [
      selectedServiceType,
      selectCategory,
      serviceName,
      duration,
      availableFor,
      description,
      price,
      tax,
    ]
  );
  useEffect(() => {
    setBasicDetails(data);
  }, [data, setBasicDetails]);

  useEffect(() => {
    if (serviceType.length > 0) {
      setSelectedServiceType(serviceType[0]);
    }
  }, [serviceType]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectCategory(categories[0]);
    }
  }, [categories]);
  useEffect(() => {
    if (submit) {
      setshowCategoryOption(false);
      setSelectCategory("");
      setserviceName("");
      setPrice("");
    }
  }, [submit]);

  return (
    <form className={styles.form}>
      {/* service type */}
      <div className={styles.serviceType}>
        <label htmlFor="serviceType">Service Type</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.selectOption}
            onChange={(e) =>
              setSelectedServiceType(serviceType[e.target.value])
            }
          >
            {serviceType.map((x, y) => (
              <option key={y} value={y}>
                {x?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* add  service category */}
      {!showCategoryOption && (
        <div
          onClick={() => setshowCategoryOption(true)}
          className={styles.subCategory}
        >
          <img src={plus} alt="" />

          <h5>Add service category</h5>
        </div>
      )}

      {/* service category     */}
      {showCategoryOption && (
        <>
          {categories.length > 0 ? (
            <div className={styles.serviceType}>
              <label htmlFor="serviceType">Service Category</label>
              <div className={styles.selectWrapper}>
                <CustomSelect
                  options={categories}
                  value={selectCategory ? selectCategory : categories[0]}
                  onChange={setSelectCategory}
                />
                <span>
                  <img src={downArrow} alt="" />
                </span>
              </div>
            </div>
          ) : (
            <p className={styles.warning}>
              please add a category before add a service
            </p>
          )}
        </>
      )}

      {/* name of service */}
      <div className={styles.nameOfService}>
        <label>Name of the service</label>

        <div className={styles.inpurWrapper}>
          <input
            value={serviceName}
            type="text"
            placeholder="e.g. Haircut for men"
            onChange={(e) => setserviceName(e.target.value)}
            required
          />
        </div>
      </div>

      {/* selects and text area */}

      <div className={styles.selectsContainer}>
        <div className={styles.content}>
          <h3>Duration of Service</h3>
          <div className={styles.selectWrapper}>
            <CustomSelect
              options={durationOfService}
              value={duration}
              onChange={setDuration}
            />
            <span>
              <img src={downArrow} alt="" />
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <h3>Available for</h3>
          <div className={styles.selectWrapper}>
            <CustomSelect
              options={AvailableFor}
              value={availableFor}
              onChange={setAvailableFor}
            />
            <span>
              <img src={downArrow} alt="" />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.textAreaContainer}>
        <h3>
          Describe the Service
          <span>(optional)</span>
        </h3>

        <textarea
          value={description}
          placeholder="Briefly describe the service and add relevant details such as aftercare."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.pricing}>
        <h3>Pricing</h3>
        <div className={styles.selectsContainer}>
          <div className={styles.content}>
            <h3>Price</h3>

            <div className={styles.selectWrapper}>
              <input
                type="number"
                placeholder="e.g. ₹  999.00"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.content}>
            <h3>Taxes & Fees</h3>

            <div className={styles.selectWrapper}>
              <CustomSelect
                options={TaxAndFees}
                value={tax}
                onChange={setTax}
              />
              <span>
                <img src={downArrow} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicDetailsForm;
export const MemoizedBasicDetailsForm = memo(BasicDetailsForm);

import React, { useEffect, useMemo, useState } from "react";
import styles from "./BasicDetailForm.module.css";
import CustomSelect from "../../../Select/CustomeSelect";
import { getAllServices } from "../../../../services/Services";
import { toast } from "react-toastify";
const BasicDetailsForm = ({ salon, setBasicDetails }) => {
  const [showCategoryOption, setshowCategoryOption] = useState(false);
  const [error, setError] = useState(null);
  const [serviceType, setserviceType] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(["Error"]);
  const [selectCategory, setselectCategory] = useState(null);
  const [serviceName, setserviceName] = useState("");
  const [duration, setDuration] = useState("15 min");
  const [availableFor, setAvailableFor] = useState("Male");
  const [description, setDescription] = useState("");
  const [tax, setTax] = useState("Included");
  const [price, setPrice] = useState("0");
  const durationOfService = [
    "15 min",
    "30 min",
    "45 min",
    "1 h",
    "1 h 15 min",
    "1 h 30 min",
    "1 h 45 min",
    "2 h ",
    "2 h +",
  ];
  const categories =
    salon?.services
      ?.find((x) => x.service_name === selectedServiceType)
      ?.mainCategories?.map((category) => category.category_name) || [];
  const AvailableFor = ["Male", "Female", "Unknown"];
  const TaxAndFees = ["included", "excluded"];

  useEffect(() => {
    async function fetchAllServices() {
      try {
        const { res, err } = await getAllServices();
        if (res) {
          const data = res?.data?.data.map((x) => x.service_name);
          setserviceType(data);
          setSelectedServiceType(data[0]);
        } else {
          setError(err);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchAllServices();
  }, []);
  useEffect(() => {
    if (categories && !selectCategory) {
      setselectCategory(categories[0]);
    }
  }, [categories]);

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
  }, [data]);

  if (error) {
    toast.error("error happen ", { toastId: 1 });
  }

  return (
    <form className={styles.form}>
      {/* service type */}
      <div className={styles.serviceType}>
        <label htmlFor="serviceType">Service Type</label>
        <div className={styles.selectWrapper}>
          <CustomSelect
            options={serviceType}
            value={selectedServiceType ? selectedServiceType : serviceType[0]}
            onChange={setSelectedServiceType}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      {/* add  service category */}
      {!showCategoryOption && (
        <div
          onClick={() => setshowCategoryOption(true)}
          className={styles.subCategory}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 4.16602V15.8327"
              stroke="#0D69D7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.16797 10H15.8346"
              stroke="#0D69D7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
                  onChange={setselectCategory}
                />
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ) : (
            <p style={{ color: "red" }}>
              ## please add a category before add a service
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
            name=""
            id=""
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
          name=""
          id=""
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
                type="text"
                placeholder="e.g. ₹999.00"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BasicDetailsForm;

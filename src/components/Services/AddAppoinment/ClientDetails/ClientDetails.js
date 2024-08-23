import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ClientDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import CustomSelect3 from "../../../Select/CustomeSelect3/CustomSelect3";
import AddNewClient from "../../../_modals/AddNewClient/AddNewClient";

import { useGetClients } from "../../../../services/salon";
import { AddAppointmentContext } from "../../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import NoDataDisplay from "../../../NodataToDisplay/NoDataDisplay";

const ClientsDetails = () => {
  const {
    price,
    setPrice,
    discount,
    setDiscount,
    setCustomerDetails,
    setComments,
  } = useContext(AddAppointmentContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError, error } = useGetClients();
  const contacts = data?.data;
  const [selectedClient, setSelectedClient] = useState({
    name: "No Clients ",
  });

  const clients = contacts?.filter(
    (contact) =>
      contact?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
      contact?.phone?.includes(searchText) ||
      contact?.email?.toLowerCase().includes(searchText?.toLowerCase())
  );
  useEffect(() => {
    if (clients?.length > 0) {
      setSelectedClient(clients[0]);
    }
  }, [clients]);

  const handleSelectClient = (value) => {
    setSelectedClient(value);
    setCustomerDetails(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Client Details</h3>
        {/* Select an existing client */}
        <div className={styles.existingClient}>
          <label htmlFor="">Select an existing client</label>
          {data && data?.data?.length > 0 && !isError && !isLoading ? (
            <CustomSelect3
              options={clients}
              value={selectedClient}
              onChange={handleSelectClient}
              setSearchText={setSearchText}
            />
          ) : (
            <ErrorComponent message={error?.message} />
          )}

          {data?.data?.length === 0 && (
            <NoDataDisplay message={"You Have No Existing Clients"} />
          )}
        </div>
        <p onClick={() => openModal()} className={styles.addNewClient}>
          <span>+</span>
          <span>Add a new client</span>
        </p>
        {/* Pricing*/}
        <h3>Pricing</h3>
        <div className={styles.selectPrice}>
          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              <label htmlFor="price">price </label>
              <p>
                <input
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="₹ 1.199.00"
                />

                <label htmlFor="price">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.422 2.60727C12.6409 1.82622 11.3746 1.82622 10.5936 2.60727L10.1222 3.07867L13.422 6.37851L13.8934 5.9071C14.6745 5.12605 14.6745 3.85973 13.8934 3.07867L13.422 2.60727ZM12.4792 7.32133L9.17932 4.02149L3.11869 10.0821C2.98616 10.2147 2.89355 10.3818 2.85141 10.5644L2.16604 13.5343C2.05513 14.0149 2.48586 14.4455 2.96634 14.3346L5.93628 13.6493C6.1189 13.6071 6.286 13.5145 6.41852 13.382L12.4792 7.32133Z"
                      fill="#0D69D7"
                    />
                  </svg>
                </label>
              </p>
            </div>{" "}
            <div className={styles.price}>
              <label htmlFor="discount">Discount (optional)</label>
              <p>
                <input
                  id="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                  value={discount}
                  placeholder="₹ 0.00"
                />

                <label htmlFor="discount">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.422 2.60727C12.6409 1.82622 11.3746 1.82622 10.5936 2.60727L10.1222 3.07867L13.422 6.37851L13.8934 5.9071C14.6745 5.12605 14.6745 3.85973 13.8934 3.07867L13.422 2.60727ZM12.4792 7.32133L9.17932 4.02149L3.11869 10.0821C2.98616 10.2147 2.89355 10.3818 2.85141 10.5644L2.16604 13.5343C2.05513 14.0149 2.48586 14.4455 2.96634 14.3346L5.93628 13.6493C6.1189 13.6071 6.286 13.5145 6.41852 13.382L12.4792 7.32133Z"
                      fill="#0D69D7"
                    />
                  </svg>
                </label>
              </p>
            </div>
          </div>
        </div>{" "}
        <div className={styles.comments}>
          <label htmlFor="comments">
            Additional comments <span>(optional)</span>
          </label>
          <textarea
            onChange={(e) => setComments(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <AddNewClient showModal={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default ClientsDetails;

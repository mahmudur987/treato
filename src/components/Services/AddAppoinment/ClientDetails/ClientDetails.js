import React, { memo, useContext, useEffect, useState } from "react";
import styles from "./ClientDetails.module.css";
import CustomSelect3 from "../../../Select/CustomeSelect3/CustomSelect3";
import AddNewClient from "../../../_modals/AddNewClient/AddNewClient";

import { useGetClients } from "../../../../services/salon";
import { AddAppointmentContext } from "../../../../pages/partnerPages/Services/AddAppoinment/AddAppoinment";
import icon from "../../../../assets/svgs/icon (15).svg";
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
  const { data, isLoading, isError } = useGetClients();

  const [selectedClient, setSelectedClient] = useState({
    name: "No Clients ",
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const searchResult = data?.data?.filter(
      (contact) =>
        contact?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
        contact?.phone?.includes(searchText) ||
        contact?.email?.toLowerCase().includes(searchText?.toLowerCase())
    );
    setClients(searchResult);
    setSelectedClient(
      searchResult?.length > 0 && !searchText ? searchResult[0] : ""
    );
    setCustomerDetails(
      searchResult?.length > 0 && !searchText ? searchResult[0] : ""
    );
  }, [data, searchText]);

  const handleSelectClient = (value) => {
    setSelectedClient(value);
    setCustomerDetails(value);
    setSearchText("");
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
          {data && !isError && !isLoading && clients?.length > 0 && (
            <CustomSelect3
              options={clients}
              value={selectedClient}
              onChange={handleSelectClient}
              setSearchText={setSearchText}
            />
          )}

          {clients?.length === 0 && (
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
                  <img src={icon} alt="" />
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
                  <img src={icon} alt="" />
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
      <AddNewClient
        showModal={isModalOpen}
        onClose={closeModal}
        setSelectedClient={setSelectedClient}
        clients={clients}
        setClients={setClients}
      />
    </section>
  );
};

export default ClientsDetails;
export const MemoizedClientsDetails = memo(ClientsDetails);

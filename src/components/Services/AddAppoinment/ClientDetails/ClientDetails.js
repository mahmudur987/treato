import React, { useState } from "react";
import styles from "./ClientDetails.module.css";
import CustomSelect2 from "../../../Select/CustomeSelect2/CustomeSelect2";
import CustomSelect3 from "../../../Select/CustomeSelect3/CustomSelect3";
import AddNewClient from "../../../_modals/AddNewClient/AddNewClient";
import { singleSalon } from "../../../../utils/data";
const ClientsDetails = () => {
  const teamMembers = singleSalon.salon.stylists.map((x) => {
    return { name: x.stylist_name, imageUrl: x.stylist_Img.public_url };
  });
  const [selectedteamMember, setSelectedTeamMember] = useState(
    teamMembers
      ? teamMembers[0]
      : {
          name: "mahmud",
          imageUrl:
            "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
        }
  );
  const [selectedClient, setSelectedclient] = useState({
    name: "mahmud",
    email: "mahmud@gmail.com",
  });
  const clients = [
    {
      name: "mahmud",
      email: "mahmud@gmail.com",
    },
    {
      name: "mahmud",
      email: "mahmud@gmail.com",
    },
    {
      name: "mahmud",
      email: "mahmud@gmail.com",
    },
    {
      name: "polash",
      email: "polash@gmail.com",
    },
    {
      name: "mamun",
      email: "mamun@gmail.com",
    },
  ];

  const handleSelectteamMember = (value) => {
    setSelectedTeamMember(value);
  };
  const handleSelectClient = (value) => {
    setSelectedclient(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log(members);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        <h3 className={styles.heding}>Client Details</h3>

        {/* Select an existing client< */}

        <div className={styles.existingClient}>
          <label htmlFor="">Select an existing client</label>

          <CustomSelect3
            options={clients}
            value={selectedClient}
            onChange={handleSelectClient}
          />
        </div>

        <p onClick={() => openModal()} className={styles.addNewCliente}>
          <span>+</span>
          <span>Add a new client</span>
        </p>

        {/* Pricing*/}
        <h3>Pricing</h3>
        <div className={styles.selectPrice}>
          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              <label htmlFor="">price </label>
              <p>
                <input type="text" placeholder="$1.199.00" />

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
              </p>
            </div>{" "}
            <div className={styles.price}>
              <label htmlFor="">Discount (optional)</label>
              <p>
                <input type="text" placeholder="$0.00" />

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
              </p>
            </div>
          </div>
        </div>

        {/* assign pro fessional*/}
        <h3 className={styles.heding}>Assign Professional</h3>

        <div className={styles.professional}>
          <CustomSelect2
            options={null}
            value={selectedteamMember}
            onChange={handleSelectteamMember}
            teamMembers={teamMembers}
          />
        </div>
      </div>
      <AddNewClient showModal={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default ClientsDetails;

import styles from "../../../pages/BookFlow/BookFlow.module.css";
import BookNow from "../../SalonDetail/BookNow/BookNow";
import clock from "../../../assets/images/SalonDetail/clock.svg";
import NoProfessional from "../../../assets/images/icons/NoProfessional.svg";
import { useNavigate } from "react-router-dom";
import AddedServiceMain from "../AddedServiceMain/AddedServiceMain";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SelectedServiceCard({
  updateActiveBookFlowBA,
  activeBookFlowBA,
  salonServices,
  SalonData,
  stepTwoDetails,
  setStepTwoDetails,
}) {
  const { contact } = useSelector((state) => state?.VisitorDetails);

  let [totalServicesPrice, setTotalServicesPrice] = useState(0);
  let [workerData, setWorkerData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (salonServices.length) {
      let prices = salonServices.map((v, i) => {
        return v.service_price;
      });
      let totalPrice = prices.reduce((a, b) => a + b, 0);
      setTotalServicesPrice(totalPrice);
    } else {
      setTotalServicesPrice(0);
    }
    if (stepTwoDetails?.workerData?.length) {
      setWorkerData(stepTwoDetails.workerData[0]);
    }
  }, [salonServices, stepTwoDetails]);
  let initialData = {
    workerData: null,
    dateData: null,
    timeData: null,
  };
  return (
    <div className={styles.service_cardMain}>
      <div className={styles.service_cardA}>{SalonData?.salon_name}</div>
      {activeBookFlowBA === 1 ? (
        <div className={styles.service_cardB}>
          You have selected the following services
        </div>
      ) : (
        <div className={styles.service_cardB}>{SalonData?.locationText}</div>
      )}
      {salonServices.length
        ? salonServices.map((v, i) => {
            return <AddedServiceMain serviceData={v} key={i} />;
          })
        : null}
      {totalServicesPrice > 0 ? (
        <div className={styles.service_cardD}>
          <div className={styles.service_cardDA}>Item total</div>
          <div className={styles.service_cardDA}>₹{totalServicesPrice}</div>
        </div>
      ) : null}
      {activeBookFlowBA === 1 ? (
        ""
      ) : activeBookFlowBA === 2 ? (
        <>
          <div className={styles.service_cardD}>
            <div>Service Details:</div>
          </div>
          <div className={styles.service_cardF}>
            <img src={clock} alt="" />
            <div>
              {stepTwoDetails?.dateData
                ? stepTwoDetails?.timeData
                  ? `${stepTwoDetails?.dateData} , ${stepTwoDetails?.timeData}`
                  : `${stepTwoDetails?.dateData} , Select time`
                : "Select date and time"}
            </div>
          </div>
          <div className={styles.service_cardG}>
            <div className={styles.service_cardGA}>
              <img
                src={
                  workerData
                    ? workerData?.stylist_Img?.public_url
                    : NoProfessional
                }
                alt=""
              />
            </div>
            <div>
              {workerData ? workerData?.stylist_name : "Select a stylist"}
            </div>
          </div>
        </>
      ) : activeBookFlowBA === 3 ? (
        <>
          <div className={styles.service_cardD}>
            <div>Service Details:</div>
          </div>
          <div className={styles.service_cardF}>
            <img src={clock} alt="" />
            <div>
              {stepTwoDetails?.dateData
                ? stepTwoDetails?.timeData
                  ? `${stepTwoDetails?.dateData} , ${stepTwoDetails?.timeData}`
                  : `${stepTwoDetails?.dateData} , Select time`
                : "Select date and time"}
            </div>
          </div>
          <div className={styles.service_cardG}>
            <div className={styles.service_cardGA}>
              <img
                src={
                  workerData
                    ? workerData?.stylist_Img?.public_url
                    : NoProfessional
                }
                alt=""
              />
            </div>
            <div>
              {workerData ? workerData?.stylist_name : "Select a stylist"}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.service_cardD}>
            <div>Service Details:</div>
          </div>
          <div className={styles.service_cardF}>
            <img src={clock} alt="" />
            <div>
              {stepTwoDetails?.dateData
                ? stepTwoDetails?.timeData
                  ? `${stepTwoDetails?.dateData} , ${stepTwoDetails?.timeData}`
                  : `${stepTwoDetails?.dateData} , Select time`
                : "Select date and time"}
            </div>
          </div>
          <div className={styles.service_cardG}>
            <div className={styles.service_cardGA}>
              <img
                src={
                  workerData
                    ? workerData?.stylist_Img?.public_url
                    : NoProfessional
                }
                alt=""
              />
            </div>
            <div>
              {workerData ? workerData?.stylist_name : "Select a stylist"}
            </div>
          </div>
        </>
      )}
      <div className={styles.service_cardE}>
        <BookNow
          innerText={"Proceed"}
          updateActiveBookFlowBA={
            updateActiveBookFlowBA ? updateActiveBookFlowBA : ""
          }
          activeBookFlowBA={activeBookFlowBA}
          Disabled={
            activeBookFlowBA === 1
              ? salonServices.length < 1
                ? true
                : false
              : activeBookFlowBA === 2
              ? stepTwoDetails.workerData === null ||
                stepTwoDetails.dateData === null ||
                stepTwoDetails.timeData === null
                ? true
                : false
              : activeBookFlowBA === 3
              ? contact.name === "" ||
                contact.phone === "" ||
                contact.email === ""
                ? true
                : false
              : false
          }
        />
      </div>
      <div
        className={styles.service_cardBack}
        onClick={() => {
          activeBookFlowBA === 1
            ? navigate(-1)
            : activeBookFlowBA === 2
            ? updateActiveBookFlowBA((activeBookFlowBA = 1))
            : activeBookFlowBA === 3
            ? updateActiveBookFlowBA((activeBookFlowBA = 2))
            : updateActiveBookFlowBA((activeBookFlowBA = 3));
          setStepTwoDetails(initialData);
          setWorkerData(null);
        }}
      >
        Back to previous
      </div>
    </div>
  );
}

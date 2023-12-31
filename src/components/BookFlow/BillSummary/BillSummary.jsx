import styles from "../../../pages/BookFlow/BookFlow.module.css";
import slide1 from "../../../assets/images/SalonDetail/slide1.png";
import discountIco from "../../../assets/images/SalonDetail/discountIco.svg";
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg";
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg";
import cancelIco from "../../../assets/images/icons/cancelIco.svg";
import taxIco from "../../../assets/images/icons/taxIco.svg";
import { useNavigate, useParams } from "react-router-dom";
import BookNow from "../../SalonDetail/BookNow/BookNow";
import PoliciesModal from "../../_modals/PoliciesModal/PoliciesModal";
import { useEffect, useState } from "react";
import { deleteOfferIcon, offerIcon } from "../../../assets/images/icons";
import { getSingleSalonData } from "../../../services/salon";
import { useSelector } from "react-redux";
import salonServices from "../../../redux/slices/salonServices";

export default function BillSummary({
  setShowModal,
  updateActiveBookFlowBA,
  activeBookFlowBA,
  showPay,
  paySelected,
  setCompletedPay,
}) {
  const [salon, setSalon] = useState(null);
  const [totalServicesPrice, setTotalServicesPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [amountToPay, setamountToPay] = useState(0);

  const selectedServices = useSelector(
    (state) => state?.salonServices?.salonContent
  );
  console.log(selectedServices);
  const navigate = useNavigate();
  const { id } = useParams();
  let [openModal, setOpenModal] = useState({
    taxModal: false,
    cancelModal: false,
  });
  useEffect(() => {
    getSingleSalonData(id).then((res) => {
      setSalon(res?.res?.data?.salon);
      console.log(res?.res?.data?.salon);
    });
  }, [id]);
  useEffect(() => {
    if (selectedServices?.length) {
      let prices = selectedServices.map((v, i) => {
        return v.service_price;
      });
      let totalPrice = prices.reduce((a, b) => a + b, 0);
      // Calculate 18% of the total price
      let taxAmount = (totalPrice * 18) / 100;
      setTotalServicesPrice(totalPrice.toLocaleString());
      setTaxPrice(taxAmount.toLocaleString());
      setamountToPay((totalPrice + taxAmount).toLocaleString());
    }
  }, [selectedServices]);

  return (
    <>
      <div className={styles.service_cardMain}>
        <div className={styles.bill_sumA}>Bill Summary</div>
        <div className={styles.bill_sumI}>
          <div className={styles.bill_sumB}>
            <img
              src={salon?.salon_image ? salon?.salon_image?.public_url : slide1}
              alt="salonImage"
            />
            <div>{salon?.salon_name}</div>
          </div>
          {selectedServices &&
            selectedServices?.map((e) => (
              <div className={styles.bill_sumC} key={e?.service_id}>
                <div className={styles.bill_sumCA}>
                  <div>{e?.service_count}</div>
                  <div>x</div>
                  <div>{e?.service_name}</div>
                </div>
                <div>₹{e?.service_price}</div>
              </div>
            ))}
          <div className={styles.bill_sumE}>
            <div>Item total</div>
            <div>₹{totalServicesPrice} </div>
          </div>
          <div className={styles.bill_sumE}>
            <div
              className={styles.bill_sumEA}
              onClick={() =>
                setOpenModal({ taxModal: true, cancelModal: false })
              }
            >
              Taxes and fees
            </div>
            <div className={styles.bill_sumEB}>₹{taxPrice}</div>
          </div>
          <div className={styles.bill_sumF}>
            <div className={styles.bill_sumFA}>Amount to be paid</div>
            <div className={styles.bill_sumFB}>
              <h1 className={styles.discountAmount}>₹245</h1> ₹{amountToPay}
            </div>
          </div>
        </div>
        <div className={`${styles.bill_sumF} ${styles.applyOfferContainer}`}>
          <div className={styles.applyOffer}>
            <div className={`${styles.bill_sumFC}`}>
              <img src={discountIco} alt="" />
              <div>Offers & Benefits</div>
            </div>
            <div
              className={styles.bill_sumFD}
              onClick={() => (setShowModal ? setShowModal(true) : "")}
            >
              <div>4 offers</div>
              <img src={rightBlue} alt="" />
            </div>
          </div>
          {/* //TODO will be display after applied offer  */}
{/* 
          <div className={styles.appliedOffer}>
            <div className={styles.offerDetails}>
              <div className={styles.firstLine}>
                <img src={offerIcon} alt="offerIcon" />
                <span className={styles.offerName}>'BEAUTY100' applied</span>
              </div>
              <div className={styles.secondLine}>
                ₹242 savings on this order
              </div>
            </div>
            <div className={styles.deleteOption}>
              <img src={deleteOfferIcon} alt="deleteIcon" />
            </div>
          </div> */}
        </div>
        {!showPay || paySelected ? (
          <BookNow innerText={"Pay ₹1,177"} setCompletedPay={setCompletedPay} />
        ) : (
          <div className={styles.bill_sumG}>
            <button>Pay ₹{amountToPay}</button>
          </div>
        )}
        <div
          className={styles.service_cardBack}
          onClick={() =>
            activeBookFlowBA === 1
              ? navigate(-1)
              : activeBookFlowBA === 2
              ? updateActiveBookFlowBA((activeBookFlowBA = 1))
              : activeBookFlowBA === 3
              ? updateActiveBookFlowBA((activeBookFlowBA = 2))
              : updateActiveBookFlowBA((activeBookFlowBA = 3))
          }
        >
          Back to previous
        </div>
      </div>
      <div className={styles.bill_sumH}>
        <img src={calendar_cancel} alt="" />
        <div className={styles.bill_sumHA}>
          Free cancellation & rescheduling till 4 hours before the start time,
          post that cancellation charge(s) apply.{" "}
          <span
            onClick={() => setOpenModal({ taxModal: false, cancelModal: true })}
          >
            Cancellation Policy.
          </span>
        </div>
      </div>
      {openModal.taxModal ? (
        <PoliciesModal
          setOpenModal={setOpenModal}
          mainIcon={taxIco}
          desc={
            "Taxes levied as per Govt. regulations, subject to change basis final service value. The fee goes towards training of partners and providing support & assistance during the service."
          }
          title={"Taxes and Fees"}
        />
      ) : openModal.cancelModal ? (
        <PoliciesModal
          setOpenModal={setOpenModal}
          mainIcon={cancelIco}
          desc={
            "Treato has a fair cancellation policy. Taxes levied as per Govt. regulations, subject to change basis final service value. The fee goes towards training of partners and providing support & assistance during the service."
          }
          title={"Cancellation Policy"}
        />
      ) : null}
    </>
  );
}

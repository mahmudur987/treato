import styles from "../../../pages/BookFlow/BookFlow.module.css";
import slide1 from "../../../assets/images/SalonDetail/slide1.webp";
import discountIco from "../../../assets/images/SalonDetail/discountIco.svg";
import rightBlue from "../../../assets/images/SalonDetail/rightBlue.svg";
import calendar_cancel from "../../../assets/images/SalonDetail/calendar-cancel.svg";
import cancelIco from "../../../assets/images/icons/cancelIco.svg";
import taxIco from "../../../assets/images/icons/taxIco.svg";
import { useFormAction, useNavigate, useParams } from "react-router-dom";
import BookNow from "../../SalonDetail/BookNow/BookNow";
import PoliciesModal from "../../_modals/PoliciesModal/PoliciesModal";
import { useEffect, useState } from "react";
import {
  TreatoLogo,
  deleteOfferIcon,
  offerIcon,
} from "../../../assets/images/icons";
import { getSingleSalonData } from "../../../services/salon";
import { useDispatch, useSelector } from "react-redux";
import salonServices, {
  updateAmount,
  updateAppliedOffer,
  updateServiceTaxPrice,
} from "../../../redux/slices/salonServices";
import {
  AppointmentVerify,
  bookSalonAppointment,
} from "../../../services/Appointments";
import { toast } from "react-toastify";
import CartPayment from "../../../payment/Payment";
import WorkerDetail from "../WorkerDetail/WorkerDetail";

export default function BillSummary({
  setShowModal,
  updateActiveBookFlowBA,
  activeBookFlowBA,
  showPay,
  paySelected,
  setCompletedPay,
  stepTwoDetails,
  offerCount,
}) {
  const [orderResponse, setOrderResponse] = useState(null);
  const [salon, setSalon] = useState(null);
  const [serviceIDs, setserviceIDs] = useState(null);
  const [totalServicesPrice, setTotalServicesPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [amountToPay, setamountToPay] = useState(0);
  const [selectedServiceSlot, setselectedServiceSlot] = useState(null);
  const selectedServices = useSelector(
    (state) => state?.salonServices?.salonContent
  );
  const selectedOffer = useSelector(
    (state) => state?.salonServices?.appliedOffer
  );
  const TotalServiceAmount = useSelector(
    (state) => state?.salonServices?.Amount
  );
  const userDetails = useSelector((state) => state?.user?.user);
  const serviceDetails = useSelector((state) => state?.salonServices);
  const saveAmount = useSelector((state) => state?.salonServices?.offerAmount);
  const visitorDetails = useSelector((state) => state?.VisitorDetails);

  useEffect(() => {
    let IDs = selectedServices?.map((e) => {
      return e?.service_id;
    });
    setserviceIDs(IDs);
  }, [selectedServices]);

  useEffect(() => {
    if (stepTwoDetails?.timeData) {
      setselectedServiceSlot(
        stepTwoDetails?.timeData.replace(/AM|am|PM|pm/g, "").trim()
      );
    }
  }, [stepTwoDetails]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  let [openModal, setOpenModal] = useState({
    taxModal: false,
    cancelModal: false,
  });
  useEffect(() => {
    getSingleSalonData(id).then((res) => {
      setSalon(res?.res?.data?.salon);
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
      dispatch(updateServiceTaxPrice(taxAmount));
      setTotalServicesPrice(totalPrice.toLocaleString());
      setTaxPrice(taxAmount.toLocaleString());
      const Amount = totalPrice + taxAmount;

      if (selectedOffer) {
        const payAbleAmount =
          Amount - (Amount * selectedOffer?.discount_percentage) / 100;
        setamountToPay(payAbleAmount.toLocaleString());
      } else {
        setamountToPay((totalPrice + taxAmount).toLocaleString());
        dispatch(updateAmount(totalPrice + taxAmount));
      }
    }
  }, [selectedServices, selectedOffer]);

  const handleDeleteOffer = () => {
    dispatch(updateAppliedOffer(null));
  };

  // razorpay gateway

  const initPayment = (order, id) => {
    const options = {
      key: id,
      amount: `${amountToPay}`,
      currency: "INR",
      name: "Treato",
      description: "test ",
      image: TreatoLogo,
      order_id: order?.id,
      handler: async (response) => {
        try {
          let verificationData = { ...response, order };
          console.log(verificationData);
          AppointmentVerify({ ...response, order }).then((res) => {
            console.log(res);
            if (res?.res?.data?.success) {
              setCompletedPay(true);
            }
          });
        } catch (error) {
          console.log(error);
          toast.error(`Payment failed`, {
            duration: 6000,
          });
        }
      },
      theme: {
        color: "#000000",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      let billInfo = {
        user_id: userDetails?._id,
        salons_id: id,
        service_id: serviceIDs,
        final_amount: `${
          selectedOffer?.amount_for_discount
            ? TotalServiceAmount - selectedOffer?.amount_for_discount
            : TotalServiceAmount
        }`,
        time: selectedServiceSlot,
        servicetimetaken: selectedServices?.map((x) => x.service_time),
        selectedStylistId: stepTwoDetails?.workerData[0]?._id
          ? stepTwoDetails?.workerData[0]?._id
          : "",
        dateforService: serviceDetails?.serviceDate,

        userData: visitorDetails?.contact,
        payment_mode: "online",
        // serviceDetails: selectedServices,
        noPreference: stepTwoDetails?.isNoPreference ?? false,
      };

      bookSalonAppointment(billInfo).then((res) => {
        let response = res?.res?.data;

        // console.log(res);
        if (response?.success) {
          setOrderResponse(response?.order);
          initPayment(response?.order, response?.razorpayid);
        } else if (res.err) {
          toast.error(res?.err?.response?.data?.error ?? "Error");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.message ?? "Error");
    }
  };

  // -------------------
  const handleOfflinePayment = () => {
    let billInfo = {
      user_id: userDetails?._id,
      salons_id: id,
      service_id: serviceIDs,
      final_amount: `${
        selectedOffer?.amount_for_discount
          ? TotalServiceAmount - selectedOffer?.amount_for_discount
          : TotalServiceAmount
      }`,
      time: selectedServiceSlot,
      servicetimetaken: selectedServices?.map((x) => x.service_time),
      selectedStylistId: stepTwoDetails?.workerData[0]?._id
        ? stepTwoDetails?.workerData[0]?._id
        : "",
      dateforService: serviceDetails?.serviceDate,

      userData: visitorDetails?.contact,
      payment_mode: "offline",
      // serviceDetails: selectedServices,
      noPreference: stepTwoDetails?.isNoPreference ?? false,
    };
    // console.log(billInfo);
    bookSalonAppointment(billInfo).then((res) => {
      let response = res?.res?.data;
      if (response?.success) {
        setOrderResponse(response?.order);
        toast.success("Appointment Booked successfully");
        setCompletedPay(true);
      } else if (res.err) {
        console.error("error");
        toast.error(res?.err?.response?.data?.error ?? "Error");
      }
    });
  };

  return (
    <>
      <div className={styles.service_cardMain}>
        <div className={styles.bill_sumA}>Bill Summary</div>
        <div className={styles.bill_sumI}>
          <div className={styles.bill_sumB}>
            <img
              loading="lazy"
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
              {selectedOffer?.amount_for_discount && (
                <h1 className={styles.discountAmount}>
                  ₹{TotalServiceAmount?.toLocaleString()}
                </h1>
              )}
              ₹{amountToPay}
            </div>
          </div>
        </div>
        <div className={`${styles.bill_sumF} ${styles.applyOfferContainer}`}>
          {!selectedOffer ? (
            <div className={styles.applyOffer}>
              <div className={`${styles.bill_sumFC}`}>
                <img loading="lazy" src={discountIco} alt="" />
                <div>Offers & Benefits</div>
              </div>
              <div
                className={styles.bill_sumFD}
                onClick={() => (setShowModal ? setShowModal(true) : "")}
              >
                <div>{offerCount ? offerCount : 0} offers</div>
                <img loading="lazy" src={rightBlue} alt="" />
              </div>
            </div>
          ) : (
            <div className={styles.appliedOffer}>
              <div className={styles.offerDetails}>
                <div className={styles.firstLine}>
                  <img loading="lazy" src={offerIcon} alt="offerIcon" />
                  <span className={styles.offerName}>
                    {selectedOffer?.title}
                  </span>
                </div>
                <div className={styles.secondLine}>
                  ₹{saveAmount} savings on this order
                </div>
              </div>
              <div className={styles.deleteOption} onClick={handleDeleteOffer}>
                <img loading="lazy" src={deleteOfferIcon} alt="deleteIcon" />
              </div>
            </div>
          )}
        </div>
        {!showPay || paySelected ? (
          <BookNow
            innerText={"Confirm Booking"}
            setCompletedPay={setCompletedPay}
            handleOfflinePayment={handleOfflinePayment}
            salonId={id}
          />
        ) : (
          <div className={styles.bill_sumG}>
            <button onClick={handlePayment}>Pay ₹{amountToPay}</button>
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
        <img loading="lazy" src={calendar_cancel} alt="" />
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

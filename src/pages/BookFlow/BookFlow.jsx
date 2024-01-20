import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoProfessional from "../../assets/images/icons/NoProfessional.svg";
import BillSummary from "../../components/BookFlow/BillSummary/BillSummary";
import CompletedPay from "../../components/BookFlow/CompletedPay/CompletedPay";
import FinalBill from "../../components/BookFlow/FInalBill/FinalBill";
import SelectedServiceCard from "../../components/BookFlow/SelectedServiceCard/SelectedServiceCard";
import VisitorDetail from "../../components/BookFlow/VisitorDetail/VisitorDetail";
import WorkerDetail from "../../components/BookFlow/WorkerDetail/WorkerDetail";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import BookNow from "../../components/SalonDetail/BookNow/BookNow";
import SalonServiceMain from "../../components/SalonDetail/SalonServiceMain/SalonServiceMain";
import SalonDetailModal from "../../components/_modals/SalonDetailModal/SalonDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { salon } from "../../services/salon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BookFlow.module.css";
import {
  AppointmentVerify,
  bookSalonAppointment,
  getAvailableSlots,
} from "../../services/Appointments";
import {
  updateServiceDate,
  updateServiceTime,
} from "../../redux/slices/salonServices";
import { TreatoLogo } from "../../assets/images/icons";

export default function BookFlow() {
  let navigate = useNavigate();
  let [activeBookFlowBA, updateActiveBookFlowBA] = useState(1);
  let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
  let [showPay, setShowPay] = useState(true);
  let [paySelected, setPaySelected] = useState(false);
  let [SalonData, setSalonData] = useState(null);
  let [stepTwoDetails, setStepTwoDetails] = useState({
    workerData: null,
    dateData: null,
    timeData: null,
  });
  function reportWindowSize() {
    let winWidth = window.innerWidth;
    updateWinWidthMain(winWidth);
  }
  window.onresize = reportWindowSize;
  let [showModal, setShowModal] = useState(false);
  let [completedPay, setCompletedPay] = useState(false);
  let { id } = useParams();
  const salonServices = useSelector(
    (state) => state.salonServices.salonContent
  );

  useEffect(() => {
    let SalonDataFunc = async () => {
      const { res, err } = await salon();
      if (res) {
        res.data.salons.map((v) => {
          if (v._id === id) {
            setSalonData(v);
          }
        });
      }
    };
    SalonDataFunc();
  }, []);

  let getWorkerData = (e) => {
    let oldData = { ...stepTwoDetails };
    if (SalonData && e.target.name === "preference" && e.target.value) {
      let filtered = SalonData?.stylists?.filter(
        (v) => v._id === e.target.value
      );
      if (filtered.length) {
        oldData.workerData = filtered;
      } else {
        oldData.workerData = [
          {
            stylist_name: "No preference",
            stylist_Img: { public_url: NoProfessional },
          },
        ];
      }
    }
    if (e.target.name === "time" && e.target.value) {
      oldData.timeData = e.target.value;
    }
    if (e.target.name === "date" && e.target.value) {
      oldData.dateData = e.target.value;
    }
    setStepTwoDetails(oldData);
  };

  return (
    <div className={styles.book_flowMain}>
      <ToastContainer />
      {completedPay ? (
        <CompletedPay />
      ) : (
        <>
          <BackButton
            updateActiveBookFlowBA={
              updateActiveBookFlowBA ? updateActiveBookFlowBA : ""
            }
            activeBookFlowBA={activeBookFlowBA}
          />
          {showModal ? <SalonDetailModal setShowModal={setShowModal} /> : ""}
          <div className={styles.book_flowMainA}>
            <div className={styles.book_flowA}>
              {activeBookFlowBA === 1
                ? "Select services"
                : activeBookFlowBA === 2
                ? "Select professional and time"
                : activeBookFlowBA === 3
                ? "Visitor Details"
                : "Payment"}
            </div>
            <div className={styles.book_flowB}>
              <div
                className={
                  activeBookFlowBA === 1 ||
                  activeBookFlowBA === 2 ||
                  activeBookFlowBA === 3 ||
                  activeBookFlowBA === 4
                    ? `${styles.book_flowBA} ${styles.activeBook_flowBA}`
                    : styles.book_flowBA
                }
              ></div>
              <div
                className={
                  activeBookFlowBA === 2 ||
                  activeBookFlowBA === 3 ||
                  activeBookFlowBA === 4
                    ? `${styles.book_flowBA} ${styles.activeBook_flowBA}`
                    : styles.book_flowBA
                }
              ></div>
              <div
                className={
                  activeBookFlowBA === 3 || activeBookFlowBA === 4
                    ? `${styles.book_flowBA} ${styles.activeBook_flowBA}`
                    : styles.book_flowBA
                }
              ></div>
              <div
                className={
                  activeBookFlowBA === 4
                    ? `${styles.book_flowBA} ${styles.activeBook_flowBA}`
                    : styles.book_flowBA
                }
              ></div>
            </div>
            {activeBookFlowBA === 4 && winWidthMain < 768 ? (
              <BillSummary setShowModal={setShowModal} />
            ) : (
              ""
            )}
            {activeBookFlowBA === 1 ? (
              <SalonServiceMain
                hideTitle={true}
                SalonData={SalonData ? SalonData : null}
              />
            ) : activeBookFlowBA === 2 ? (
              <WorkerDetail
                SalonData={SalonData ? SalonData : null}
                getWorkerData={getWorkerData}
              />
            ) : activeBookFlowBA === 3 ? (
              <VisitorDetail />
            ) : activeBookFlowBA === 4 ? (
              <FinalBill
                setShowPay={setShowPay}
                showPay={showPay}
                setPaySelected={setPaySelected}
                paySelected={paySelected}
              />
            ) : (
              navigate(id ? `/salons/${id}` : "/")
            )}
          </div>
          <div className={styles.book_flowMainB}>
            {activeBookFlowBA === 4 ? (
              <BillSummary
                setShowModal={setShowModal}
                updateActiveBookFlowBA={
                  updateActiveBookFlowBA ? updateActiveBookFlowBA : ""
                }
                activeBookFlowBA={activeBookFlowBA}
                showPay={showPay}
                paySelected={paySelected}
                setCompletedPay={setCompletedPay}
              />
            ) : (
              <SelectedServiceCard
                updateActiveBookFlowBA={
                  updateActiveBookFlowBA ? updateActiveBookFlowBA : ""
                }
                activeBookFlowBA={activeBookFlowBA}
                salonServices={salonServices ? salonServices : null}
                SalonData={SalonData ? SalonData : null}
                stepTwoDetails={stepTwoDetails ? stepTwoDetails : null}
                setStepTwoDetails={setStepTwoDetails}
              />
            )}
          </div>
          <div className={styles.book_flowMob}>
            <BookNow
              innerText={activeBookFlowBA === 4 ? "Pay ₹1,177" : "Proceed"}
              updateActiveBookFlowBA={
                updateActiveBookFlowBA ? updateActiveBookFlowBA : ""
              }
              activeBookFlowBA={activeBookFlowBA}
              salonServices={salonServices ? salonServices : null}
            />
          </div>
        </>
      )}
    </div>
  );
}

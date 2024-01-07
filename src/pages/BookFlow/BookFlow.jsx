import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NoProfessional from "../../assets/images/icons/NoProfessional.svg"
import BillSummary from '../../components/BookFlow/BillSummary/BillSummary'
import CompletedPay from '../../components/BookFlow/CompletedPay/CompletedPay'
import FinalBill from '../../components/BookFlow/FInalBill/FinalBill'
import SelectedServiceCard from '../../components/BookFlow/SelectedServiceCard/SelectedServiceCard'
import VisitorDetail from '../../components/BookFlow/VisitorDetail/VisitorDetail'
import WorkerDetail from '../../components/BookFlow/WorkerDetail/WorkerDetail'
import BackButton from '../../components/Buttons/BackButton/BackButton'
import BookNow from '../../components/SalonDetail/BookNow/BookNow'
import SalonServiceMain from '../../components/SalonDetail/SalonServiceMain/SalonServiceMain'
import SalonDetailModal from '../../components/_modals/SalonDetailModal/SalonDetailModal'
import { useDispatch, useSelector } from 'react-redux';
import { salon } from '../../services/salon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BookFlow.module.css'
import { AppointmentVerify, bookSalonAppointment, getAvailableSlots } from '../../services/Appointments'
import { updateServiceDate, updateServiceTime } from '../../redux/slices/salonServices'
import { TreatoLogo } from '../../assets/images/icons'

export default function BookFlow() {
    let navigate = useNavigate();
    let dispatch =useDispatch()
    let [activeBookFlowBA, updateActiveBookFlowBA] = useState(1);
    let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
    let [showPay, setShowPay] = useState(true);
    let [paySelected, setPaySelected] = useState(false);
    let [SalonData, setSalonData] = useState(null);
    const [serviceIDs, setserviceIDs] = useState(null);
  const [selectedServiceSlot, setselectedServiceSlot] = useState(null)
    const [availableSlots, setavailableSlots] = useState([])
    const [selectedYear, setSelectedYear] = useState("")
    let [stepTwoDetails,setStepTwoDetails] = useState({
        workerData : null,
        dateData : null,
        timeData : null
    });
    function reportWindowSize() {
        let winWidth = window.innerWidth;
        updateWinWidthMain(winWidth);
    }
    window.onresize = reportWindowSize;
    let [showModal, setShowModal] = useState(false);
    let [completedPay, setCompletedPay] = useState(false);
    let { id } = useParams();
    const salonServices = useSelector(state => state.salonServices.salonContent);
    const userDetails = useSelector(
        (state) => state?.user?.user
      );
      const serviceDetails = useSelector(
        (state) =>state?.salonServices
      );
useEffect(() => {
console.log(activeBookFlowBA);
}, [activeBookFlowBA])


useEffect(() => {
    let IDs=serviceDetails?.salonContent?.map((e)=>{
      return e?.service_id
    })
    setserviceIDs(IDs)
  }, [serviceDetails?.salonContent])

  useEffect(() => {
    if(stepTwoDetails?.timeData){
      setselectedServiceSlot(stepTwoDetails?.timeData.replace(/AM|am|PM|pm/g, "").trim())
    }
  }, [stepTwoDetails])
    useEffect(() => {
        let SalonDataFunc = async () => {
          const { res, err } = await salon();
          if (res) {
              res.data.salons.map((v)=>{
                  if(v._id===id){
                      setSalonData(v);
                  }
              })
          }
        }
        SalonDataFunc();
      }, [])


      const convertDate = (inputDate,Year) => {
        const dateObject = new Date(inputDate);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
  
        const formattedDate = `${Year}-${month}-${day}`;
        return formattedDate
      };


      let getWorkerData = (e,year) =>{
          let oldData = {...stepTwoDetails};
          let ServiceIds=salonServices?.map(e=>{
              return e?.service_id
          })

        if(SalonData&&e.target.name==='preference'&&e.target.value){
            let filtered = SalonData?.stylists?.filter(v => v._id===e.target.value);
            let requiredData
             if(filtered.length){
                 oldData.workerData = filtered;
                 oldData.isNoPreference = false;
                 requiredData={
                    salons_id:salonServices[0]?.salon_id,
                    service_id:ServiceIds,
                    selectedStylistId:filtered[0]?._id,
                    dateforService:convertDate(stepTwoDetails?.dateData,selectedYear),
                 }
                }else{
                    oldData.workerData = [{stylist_name: 'No preference',stylist_Img:{public_url: NoProfessional}}]
                    oldData.isNoPreference = true;
                    requiredData={
                        salons_id:salonServices[0]?.salon_id,
                        service_id:ServiceIds,
                        noPreference:true,
                        dateforService:convertDate(stepTwoDetails?.dateData,selectedYear),
                     }
                }
                if(stepTwoDetails?.dateData!==null){
                    console.log("from selected Stylist");
                    getAvailableSlots(requiredData).then((res)=>{
                    setavailableSlots(res?.res?.data?.data)
                    dispatch(updateServiceDate(requiredData?.dateforService))
                    })
                }
        }
        if(e.target.name==='time'&&e.target.value){
            dispatch(updateServiceTime(e.target.value))
            oldData.timeData = e.target.value;
        }
        if(e.target.name==='date'&&e.target.value){
            console.log("from selected Date");
            setSelectedYear(year)
            if(stepTwoDetails?.workerData!==null){
                let requiredData;
                if(oldData.isNoPreference){
                    console.log("--date NoPReferene----");
                  requiredData={
                        salons_id:salonServices[0]?.salon_id,
                        noPreference:oldData.isNoPreference,
                        service_id:ServiceIds,
                        dateforService:convertDate(e.target.value,year),
                     }
                }
                else{
                    console.log("--date PReferene----");
                    requiredData={
                        salons_id:salonServices[0]?.salon_id,
                        service_id:ServiceIds,
                        selectedStylistId:stepTwoDetails?.workerData[0]?._id,
                        dateforService:convertDate(e.target.value,year),
                     }
                }
            getAvailableSlots(requiredData).then((res)=>{
                    setavailableSlots(res?.res?.data?.data)
                    dispatch(updateServiceDate(requiredData?.dateforService))
             })
            }
            oldData.dateData = e.target.value;
        }
        setStepTwoDetails(oldData);
    }
//function to handle mobile view online razorpay payment


    const initPayment = (order) => {
        console.log(order);
        const options = {
          key: "rzp_test_ZkJ3ids4GaOOTU",
          amount: `${serviceDetails?.appliedOffer?.amount_for_discount?serviceDetails?.Amount-serviceDetails?.appliedOffer?.amount_for_discount:serviceDetails?.Amount}`,
          currency: "INR",
          name: "Treato",
          description: "test ",
          image: TreatoLogo,
          order_id: order?.id,
          handler: async (response) => {
            try {
              let verificationData={...response,order}
              console.log(verificationData);
              AppointmentVerify({...response,order}).then((res)=>{
                if(res?.res?.data?.message==="Payment Verified and Order Created Successfully"){
                  setCompletedPay(true)
                }
                console.log(res);
              })
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
            user_id:userDetails?._id,
            salons_id:id,
            service_id:serviceIDs,
            final_amount:`${serviceDetails?.appliedOffer?.amount_for_discount?serviceDetails?.Amount-serviceDetails?.appliedOffer?.amount_for_discount:serviceDetails?.Amount}`,
            time : "",
            selectedStylistId :stepTwoDetails?.workerData[0]?._id?stepTwoDetails?.workerData[0]?._id:"",
            dateforService:serviceDetails?.serviceDate,
            seletedSlot : selectedServiceSlot,
            userData : serviceDetails?.VisitorDetails?.contact,
            payment_mode:"online",
          }
          console.log("online",billInfo);
          bookSalonAppointment(billInfo).then((res)=>{
            console.log(res?.res?.data);
            let response=res?.res?.data
            if(response?.success){
                initPayment(response?.order);
            }
          })
      
        } catch (error) {
          console.log(error);
        }
      };

//function to handle mobile view offline payment

    const handleOfflinePayment=()=>{
        let billInfo = {
          user_id:userDetails?._id,
          salons_id:id,
          service_id:serviceIDs,
          final_amount:`${serviceDetails?.appliedOffer?.amount_for_discount?serviceDetails?.Amount-serviceDetails?.appliedOffer?.amount_for_discount:serviceDetails?.Amount}`,
          time : "",
          selectedStylistId :stepTwoDetails?.workerData[0]?._id?stepTwoDetails?.workerData[0]?._id:"",
          dateforService:serviceDetails?.serviceDate,
          seletedSlot : selectedServiceSlot,
          userData : serviceDetails?.VisitorDetails?.contact,
          payment_mode:"offline",
        }
        console.log("offline",billInfo);
        bookSalonAppointment(billInfo).then((res)=>{
          console.log(res?.res?.data);
          let response=res?.res?.data
          if(response?.success){
            setCompletedPay(true)
          }
        })
      }

    return (
        <div className={styles.book_flowMain}>
            <ToastContainer />
            {
                completedPay ?
                    <CompletedPay />
                    :
                    <>
                        <BackButton updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} />
                        {
                            showModal ?
                                <SalonDetailModal setShowModal={setShowModal} />
                                :
                                ''
                        }
                        <div className={styles.book_flowMainA}>
                            <div className={styles.book_flowA}>
                                {
                                    activeBookFlowBA === 1 ?
                                        'Select services'
                                        :
                                        activeBookFlowBA === 2 ?
                                            'Select professional and time'
                                            :
                                            activeBookFlowBA === 3 ?
                                                'Visitor Details'
                                                :
                                                'Payment'
                                }
                            </div>
                            <div className={styles.book_flowB}>
                                <div className={activeBookFlowBA === 1 || activeBookFlowBA === 2 || activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                                <div className={activeBookFlowBA === 2 || activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                                <div className={activeBookFlowBA === 3 || activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                                <div className={activeBookFlowBA === 4 ? `${styles.book_flowBA} ${styles.activeBook_flowBA}` : styles.book_flowBA}></div>
                            </div>
                            {
                                activeBookFlowBA === 4 && winWidthMain < 768 ?
                                    <BillSummary setShowModal={setShowModal} />
                                    :
                                    ''

                            }
                            {
                                activeBookFlowBA === 1 ?
                                    <SalonServiceMain hideTitle={true} SalonData={SalonData?SalonData:null}/>
                                    :
                                    activeBookFlowBA === 2 ?
                                        <WorkerDetail SalonData={SalonData?SalonData:null} getWorkerData={getWorkerData} availableSlots={availableSlots}/>
                                        :
                                        activeBookFlowBA === 3 ?
                                            <VisitorDetail />
                                            :
                                            activeBookFlowBA === 4 ?
                                                <FinalBill setShowPay={setShowPay} showPay={showPay} setPaySelected={setPaySelected} paySelected={paySelected} />
                                                :
                                                navigate(id?`/salons/${id}`:'/')

                            }
                        </div>
                        <div className={styles.book_flowMainB}>
                            {
                                activeBookFlowBA === 4 ?
                                    <BillSummary setShowModal={setShowModal} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} showPay={showPay} paySelected={paySelected} setCompletedPay={setCompletedPay} stepTwoDetails={stepTwoDetails}/>
                                    :
                                    <SelectedServiceCard updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} salonServices={salonServices?salonServices:null} SalonData={SalonData?SalonData:null} stepTwoDetails={stepTwoDetails?stepTwoDetails:null} setStepTwoDetails={setStepTwoDetails}/>

                            }
                        </div>
                        <div className={styles.book_flowMob}>
                            <BookNow innerText={activeBookFlowBA === 4 ? showPay?`Pay ₹`:"Confirm Booking" : 'Proceed'} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} salonServices={salonServices?salonServices:null} displayFinalAmount={true} handleOfflinePayment={handleOfflinePayment} handlePayment={handlePayment}/>
                        </div>
                    </>
            }
        </div>
    )
}
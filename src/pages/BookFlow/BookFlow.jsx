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
import { useSelector } from 'react-redux';
import { salon } from '../../services/salon'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BookFlow.module.css'
import { getAvailableSlots } from '../../services/Appointments'

export default function BookFlow() {
    let navigate = useNavigate();
    let [activeBookFlowBA, updateActiveBookFlowBA] = useState(1);
    let [winWidthMain, updateWinWidthMain] = useState(window.innerWidth);
    let [showPay, setShowPay] = useState(true);
    let [paySelected, setPaySelected] = useState(false);
    let [SalonData, setSalonData] = useState(null);
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
useEffect(() => {
console.log(activeBookFlowBA);
}, [activeBookFlowBA])

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
                    })
                }
        }
        if(e.target.name==='time'&&e.target.value){
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
             })
            }
            oldData.dateData = e.target.value;
        }
        setStepTwoDetails(oldData);
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
                                    <BillSummary setShowModal={setShowModal} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} showPay={showPay} paySelected={paySelected} setCompletedPay={setCompletedPay}/>
                                    :
                                    <SelectedServiceCard updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} salonServices={salonServices?salonServices:null} SalonData={SalonData?SalonData:null} stepTwoDetails={stepTwoDetails?stepTwoDetails:null} setStepTwoDetails={setStepTwoDetails}/>

                            }
                        </div>
                        <div className={styles.book_flowMob}>
                            <BookNow innerText={activeBookFlowBA === 4 ? showPay?`Pay ₹`:"Confirm booking" : 'Proceed'} updateActiveBookFlowBA={updateActiveBookFlowBA ? updateActiveBookFlowBA : ''} activeBookFlowBA={activeBookFlowBA} salonServices={salonServices?salonServices:null} displayFinalAmount={true}/>
                        </div>
                    </>
            }
        </div>
    )
}
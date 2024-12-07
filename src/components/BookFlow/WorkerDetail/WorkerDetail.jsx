import styles from "../../../pages/BookFlow/BookFlow.module.css";
import userIco from "../../../assets/images/SalonDetail/userIco.svg";
import WorkerComponent from "../WorkerComponent/WorkerComponent";
import ServiceTime from "../ServiceTime/ServiceTime";
import RadioInput from "../../Input/RadioInput/RadioInput";
import { memo, useEffect, useMemo, useRef } from "react";
import { useGetAllSalonServiceStylist } from "../../../services/salon";
import NoDataDisplay from "../../NodataToDisplay/NoDataDisplay";
import { useSelector } from "react-redux";

export default function WorkerDetail({
  SalonData,
  getWorkerData,
  availableSlots,
  updateItemCounter,
  itemCounter,
  stepTwoDetails,
}) {
  const noneLabelRef = useRef(null);
  const salonServices = useSelector(
    (state) => state.salonServices.salonContent
  );
  let ServiceIds = salonServices?.map((e) => {
    return e?.service_id;
  });
  const { data, isLoading, isError } = useGetAllSalonServiceStylist({
    services: ServiceIds,
  });
  const filteredStylistsId = useMemo(() => data?.map((x) => x._id), [data]);

  const filteredStylist = useMemo(() => {
    return SalonData?.stylists?.filter((x) =>
      filteredStylistsId?.includes(x._id)
    );
  }, [SalonData, filteredStylistsId]);

  useEffect(() => {
    // Click the label when the component mounts
    noneLabelRef.current.click();
  }, []);
  // console.log(data);
  return (
    <div className={styles.worker_detailMain}>
      <label htmlFor="none" onClick={getWorkerData} ref={noneLabelRef}>
        <div className={styles.worker_detailA}>
          <div className={styles.worker_detailAD}>
            <div className={styles.worker_detailAA}>
              <img loading="lazy" src={userIco} alt="" />
            </div>
            <div className={styles.worker_detailAB}>
              <div>No Preference</div>
              <div>
                Professional assigned by the salon. Maximum availability
              </div>
            </div>
          </div>
          <div className={styles.worker_detailAC}>
            <RadioInput
              Type={"radio"}
              NAME={"preference"}
              id={`none`}
              VALUE={"none"}
            />
          </div>
        </div>
      </label>
      {!isLoading && !isError && data && data?.length > 0 && (
        <div className={styles.worker_detailB}>
          {filteredStylist?.map((v, i) => {
            return (
              <WorkerComponent
                workerData={v}
                bookingAble={data}
                key={i}
                index={i}
                getWorkerData={getWorkerData}
              />
            );
          })}
        </div>
      )}
      {!isLoading && !isError && data && data?.length === 0 && (
        <div className={styles.worker_detailB}>
          <NoDataDisplay
            message={
              "No stylists are currently available for the selected service(s). Please try choosing different services or check back later."
            }
          />
        </div>
      )}
      <div className={styles.worker_detailC}>
        <ServiceTime
          getWorkerData={getWorkerData}
          availableSlots={availableSlots}
          stepTwoDetails={stepTwoDetails}
        />
      </div>
    </div>
  );
}

export const MemoizeWorkersDetails = memo(WorkerDetail);

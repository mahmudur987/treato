import styles from '../SalonMain/SalonMain.module.css'
import ellipse from "../../../assets/images/SalonDetail/Ellipse.svg"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../../../redux/slices/salonServices';
import { useEffect } from 'react';

export default function SalonServiceCard({ salonServiceData, serviceCategory, salonId }) {
    let [itemCounter, updateItemCounter] = useState(0)
    const dispatch = useDispatch()

    const salonServices = useSelector(state => state.salonServices.salonContent);

    let addServiceMain = (inc, dec) => {
        let isAlreadyAdded = salonServices.filter(v => v.service_name === salonServiceData.service_name)

        if (isAlreadyAdded.length) {
            let allServices = salonServices.map((v) =>
                v.service_name === isAlreadyAdded[0].service_name
                    ? { ...v, service_count: inc ? itemCounter + 1 : itemCounter - 1, service_price: inc ? salonServiceData?.price * (itemCounter + 1) : salonServiceData?.price * (itemCounter - 1) }
                    : v
            );

            allServices = allServices.filter((v) => v.service_count > 0); // Remove services with count 0

            dispatch(addService(allServices));
        } else {
            let services = {
                salon_id: salonId,
                service_category: serviceCategory,
                service_id: salonServiceData?._id,
                service_name: salonServiceData?.service_name,
                service_time: salonServiceData?.time_takenby_service,
                service_price: salonServiceData?.price,
                service_count: itemCounter + 1,
            }
            let allServices = [...salonServices, services]
            dispatch(addService(allServices))
        }
    }
    let isAlreadyAdded = [];
    useEffect(() => {
        isAlreadyAdded = salonServices.filter((v) => v.service_id === salonServiceData?._id);
        // Trigger a re-render to update the component with the new value
        updateItemCounter(isAlreadyAdded[0]?.service_count || 0);
    }, [salonServiceData, salonServices]);

    return (
        <>
            {
                salonServiceData ?
                    <div className={styles.salon_serviceB}>
                        <div className={styles.salon_serviceC}>
                            <div className={styles.salon_serviceD}>{salonServiceData?.service_name}</div>
                            <div>
                                {isAlreadyAdded[0]?.service_id === salonServiceData?._id ? (
                                    <button className={styles.salon_serviceE}>
                                        {isAlreadyAdded[0]?.service_count !== 0 ? (
                                            <div className={styles.salon_serviceEA}>
                                                <div onClick={() => { updateItemCounter(itemCounter !== 0 ? itemCounter - 1 : 0); addServiceMain(0, 1) }}>-</div>
                                                <div>{itemCounter}</div>
                                                <div onClick={() => { updateItemCounter(itemCounter + 1); addServiceMain(1, 0) }}>+</div>
                                            </div>
                                        ) : (
                                            <div className={styles.salon_serviceEB} onClick={() => { updateItemCounter(1); addServiceMain(1, 0) }}>Add</div>
                                        )}
                                    </button>
                                ) : (
                                    <button className={styles.salon_serviceE}>
                                        {itemCounter !== 0 ? (
                                            <div className={styles.salon_serviceEA}>
                                                <div onClick={() => { updateItemCounter(itemCounter !== 0 ? itemCounter - 1 : 0); addServiceMain(0, 1) }}>-</div>
                                                <div>{itemCounter}</div>
                                                <div onClick={() => { updateItemCounter(itemCounter + 1); addServiceMain(1, 0) }}>+</div>
                                            </div>
                                        ) : (
                                            <div className={styles.salon_serviceEB} onClick={() => { updateItemCounter(1); addServiceMain(1, 0) }}>Add</div>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={styles.salon_serviceF}>
                            <div>{salonServiceData?.time_takenby_service}</div>
                            <img src={ellipse} alt="" />
                            <div>₹{salonServiceData?.price}</div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

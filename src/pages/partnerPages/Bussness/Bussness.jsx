import React, { useEffect, useState } from 'react'
import BasicDetailsPartner from './BasicDetailsPartner'
import ServiceOffer from './ServiceOffer'
import ServiceLocation from './ServiceLocation'
import SalonPictures from './Gallery/SalonPictures'
import sty from "./Bussness.module.css"
import { useDispatch } from 'react-redux'
import { adminBasicDetails } from '../../../redux/slices/adminSlice/adminBasicAction'

const Bussness = () => {

    const dispatch = useDispatch()
    // const [salonData, setSalonData] = useState(
    //     {
    //         "salon_name":"New Salon Name",
    //         "salons_description":"New Salon Description",
    //         "salons_address":"New Salon Address",
    //          "services_provided":["Hairs","Nails","SomethingElse"],
    //         "website":"www.example.com",
    //         "location_details":{
    //     "location":"Business Location",
    //     "building_number":"HB-072",
    //     "landmark":"Near XYZ",
    //     "city":"Mumbai",
    //     "postal_code":"100102"
    //         },
    //         "locationText":"Address",
    //         "location":{
    //             "type":"Point",
    //             "coordinates":[17.385,78.4867]
    //         },
    //         "salons_phone_number":"1234567890",
    //         "salon_email":"EMAIL",
    //         "bank_details":{
    //             "account_number":"187918738913791",
    //             "bank_name":"SBI",
    //             "account_holder_name":"account_holder_name",
    //             "IFSC_code":"IFSC_code"
    //         },
    //         "services": [],
    //       "stylists": [],
    //       "working_hours": [
    //                 {
    //                     "day": "Monday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "654a46e4ec9cfbb06929df7c"
    //                 },
    //                 {
    //                     "day": "Tuesday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "656751ff6d3635cbb4e4c680"
    //                 },
    //                 {
    //                     "day": "Wednesday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "656751ff6d3635cbb4e4c681"
    //                 },
    //                 {
    //                     "day": "Thursday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "656751ff6d3635cbb4e4c682"
    //                 },
    //                 {
    //                     "day": "Friday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "656751ff6d3635cbb4e4c683"
    //                 },
    //                 {
    //                     "day": "Saturday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "9:00 PM",
    //                     "_id": "656751ff6d3635cbb4e4c684"
    //                 },
    //                 {
    //                     "day": "Sunday",
    //                     "opening_time": "9:00 AM",
    //                     "closing_time": "5:30 PM",
    //                     "_id": "654a46e4ec9cfbb06929df7d"
    //                 }
    //             ],
    //             "salon_logo":"URL_to_Salon_Logo",
    //             "banner":"URL_to_Banner",
    //             "social_media_url":{
    //                 "facebook":"Facebook_URL",
    //                 "instagram":"Instagram_URL",
    //                 "twitter":"Twitter_URL"
    //             },
    //         "rating":3
    //     }
    // )

    const [alldata, setalldata] = useState([])
    const [woking, setwoking] = useState(
        {
            day: "",
            opt: "",
            close: ""
        }
    )
    const [salonData, setSalonData] = useState({
        salon_name: "New Salon Name",
        salons_description: "New Salon Description",
        salons_address: "New Salon Address",
        website: "www.example.com",
        services_provided: ["Hairs", "Nails", "SomethingElse"],
        location: "Business Location",
        building_number: "HB-072",
        landmark: "Near XYZ",
        city: "Mumbai",
        postal_code: "100102",

        locationText: "Address",

        type: "Point",
        coordinates: 17.385,

        salons_phone_number: "1234567890",
        salon_email: "EMAIL",

        account_number: "187918738913791",
        bank_name: "SBI",
        account_holder_name: "account_holder_name",
        IFSC_code: "IFSC_code",

        day: "monday",
        opening_time: "9:00 AM",
        closing_time: "9:00 PM",


        // rating: 3
    });

    const handleSubmit = () => {
        const data = {
            salon_name: salonData.salon_name,
            salons_description: salonData.salons_description,
            salons_address: salonData.salons_address,

            location_details: {
                location: salonData.location,
                building_number: salonData.building_number,
                landmark: salonData.landmark,
                city: salonData.city,
                postal_code: salonData.postal_code
            }

        }
        dispatch(adminBasicDetails(20))

    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSalonData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (<>
        <div className={sty.container}>

            <form onSubmit={handleSubmit}>
                <BasicDetailsPartner salonData={salonData} setSalonData={setSalonData} handleChange={handleChange} />
                <div className={sty.ServiceOfferSmallScreen}>

                    <ServiceOffer salonData={salonData} setSalonData={setSalonData} />
                </div>
                <div className={sty.ServiceLocationSmallScreen}>

                    <ServiceLocation salonData={salonData} setSalonData={setSalonData} />
                </div>
                <div className={sty.SalonPicturesSmallScreen}>

                    <SalonPictures salonData={salonData} setSalonData={setSalonData} />
                </div>

                {/* <SalonPictures /> */}
                <div className={sty.saveBtnDiv}>
                    <button type='submit' className={sty.saveBtn}>Save</button>
                </div>
            </form>






        </div>
    </>

    )
}

export default Bussness
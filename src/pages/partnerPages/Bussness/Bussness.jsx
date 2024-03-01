import React from 'react'
import BasicDetailsPartner from './BasicDetailsPartner'
import ServiceOffer from './ServiceOffer'
import ServiceLocation from './ServiceLocation'
import SalonPictures from './Gallery/SalonPictures'
import PrimaryButton from '../../../components/Buttons/PrimaryButton/PrimaryButton'
import sty from "./Bussness.module.css"

const Bussness = () => {
    return (<>
        <div className={sty.container}>

            <form>
                <BasicDetailsPartner />
                <div className={sty.ServiceOfferSmallScreen}>

                    <ServiceOffer />
                </div>
                <div className={sty.ServiceLocationSmallScreen}>

                    <ServiceLocation />
                </div>
                <div className={sty.SalonPicturesSmallScreen}>

                    <SalonPictures />
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
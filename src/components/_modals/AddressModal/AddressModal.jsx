import React from 'react'
import styles from './AddressModal.module.css'
import DarkCross from '../../../assets/images/icons/DarkCross.svg'
import SecondaryButton from '../../Buttons/SecondaryButton/SecondaryButton'
import BasicInput from '../../Input/BasicInput/BasicInput'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import { useState } from 'react'
import { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux'
import { updateUser } from '../../../services/updateUser'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function AddressModal({ setAddressModal, updateInputVal, inputVal, setShowSave, addressModal }) {
    const userDetails = useSelector((state) => state.user);
    const getMapData = (e) => {
        console.log(e);
    };
    let lat = parseFloat(userDetails.user.latitude)
    let lng = parseFloat(userDetails.user.longitude)
    const defaultProps = {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 10
    };
    const isLoaded = defaultProps.center.lat !== NaN ? true : false;

    let updateAddress = (e) => {
        e.preventDefault();
        const userJWt = localStorage.getItem("jwtToken");
        let house = e.target.house.value;
        let landmark = e.target.landmark.value;
        let address = {
            type: e.target.type.value,
            landmark: landmark ? landmark : '',
            house: house ? house : ''
        }
        let allData = { ...inputVal };
        allData.place.push(address)
        updateInputVal(allData);
        updateUser(userJWt,allData).then((res)=>{
            localStorage.setItem('userData',JSON.stringify(allData))
        })
        .catch((err)=>{
            console.log(err)
        })
        setAddressModal(false)
        setShowSave(true)
    }
    let editAddress = (e) => {
        e.preventDefault();
        let allData = { ...inputVal };
        allData.place[addressModal.index].house = e.target.house.value;
        allData.place[addressModal.index].landmark = e.target.landmark.value;
        allData.place[addressModal.index].type = e.target.type.value;
        setAddressModal(false)
        updateInputVal(allData);
    }
    let [updateSave, setUpdateSave] = useState(false)
    let [locType, setLocType] = useState(0);
    let [inputs, updateInputs] = useState({
        home: '',
        landmark: ''
    });
    useEffect(() => {
        if (addressModal.data) {
            updateInputs({
                house: addressModal.data.house,
                landmark: addressModal.data.landmark,
                type: locType === 1 ? "Home" : "Other"
            });
            setLocType(addressModal.data.type === "Home" ? 1 : 2)
        }
    }, [])
    let onChangeInput = (e) => {
        let data = { ...inputs };
        data[e.target.name] = e.target.value;
        updateInputs(data)
    }
    return (
        <>
            {
                addressModal.data ?
                    <div className={styles.addressMain}>
                        <div className={styles.addressBack}>
                            <div className={styles.addressA}>
                                <div className={styles.addressAA}>Edit address</div>
                                <img src={DarkCross} alt="close" onClick={() => setAddressModal({ active: false, data: null })} />
                            </div>
                            <div className={styles.addressB}>
                                <div className={styles.addressBA}>{isLoaded && userDetails.user.city}, {isLoaded && userDetails.user.region}, {isLoaded && userDetails.user.postal}, {isLoaded && userDetails.user.country}</div>
                                <div className={styles.addressBB}><SecondaryButton children={'Change'} className={styles.addressBB_btn} /></div>
                            </div>
                            <div className={styles.addressC}>
                                {
                                    isLoaded &&
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                        yesIWantToUseGoogleMapApiInternals
                                        onClick={getMapData}
                                    >
                                        <AnyReactComponent
                                            lat={59.955413}
                                            lng={30.337844}
                                            text="My Marker"
                                        />
                                    </GoogleMapReact>
                                }
                            </div>
                            <form id='addressForm' onSubmit={editAddress}>
                                <div className={styles.addressD} onChange={() => setUpdateSave(true)}>
                                    <label htmlFor="house">
                                        <div className={styles.addressDA}>House/Flat Number*</div>
                                        <BasicInput PlaceHolder={'House or flat number'} NAME={'house'} required={true} id={"house"} VALUE={inputs.house} onChange={onChangeInput} />
                                    </label>
                                </div>
                                <div className={styles.addressD}>
                                    <label htmlFor="landmark" onChange={() => setUpdateSave(true)}>
                                        <div className={styles.addressDA}>Landmark (optional)</div>
                                        <BasicInput PlaceHolder={'e.g. opp. AXN Center'} NAME={'landmark'} id={"landmark"} VALUE={inputs.landmark} onChange={onChangeInput} />
                                    </label>
                                </div>
                                <div className={styles.addressE}>
                                    <div className={styles.addressEA}>Save as</div>
                                    <div className={styles.addressEB}>
                                        <label htmlFor="home" onChange={() => setUpdateSave(true)} onClick={() => setLocType(1)}>
                                            <BasicInput Type={"radio"} className={styles.d_none} id="home" NAME={"type"} VALUE={"Home"}/>
                                            <div className={locType === 1 ? `${styles.addressEBB} ${styles.addressEBA}` : styles.addressEBA}>Home</div>
                                        </label>
                                        <label htmlFor="other" onChange={() => setUpdateSave(true)} onClick={() => setLocType(2)}>
                                            <BasicInput Type={"radio"} className={styles.d_none} id="other" NAME={"type"} VALUE={"Other"}/>
                                            <div className={locType === 2 ? `${styles.addressEBB} ${styles.addressEBA}` : styles.addressEBA}>Other</div>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.addressF}>
                                    <PrimaryButton children={'Save Address'} className={updateSave ? null : styles.saveInactive} form="addressForm" disabled={updateSave ? false : true} />
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className={styles.addressMain}>
                        <div className={styles.addressBack}>
                            <div className={styles.addressA}>
                                <div className={styles.addressAA}>Add new address</div>
                                <img src={DarkCross} alt="close" onClick={() => setAddressModal({ active: false, data: null })} />
                            </div>
                            <div className={styles.addressB}>
                                <div className={styles.addressBA}>{isLoaded && userDetails.user.city}, {isLoaded && userDetails.user.region}, {isLoaded && userDetails.user.postal}, {isLoaded && userDetails.user.country}</div>
                                <div className={styles.addressBB}><SecondaryButton children={'Change'} className={styles.addressBB_btn} /></div>
                            </div>
                            <div className={styles.addressC}>
                                {
                                    isLoaded &&
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                        yesIWantToUseGoogleMapApiInternals
                                        onClick={getMapData}
                                    >
                                        <AnyReactComponent
                                            lat={59.955413}
                                            lng={30.337844}
                                            text="My Marker"
                                        />
                                    </GoogleMapReact>
                                }
                            </div>
                            <form id='addressForm' onSubmit={updateAddress}>
                                <div className={styles.addressD} onChange={() => setUpdateSave(true)}>
                                    <label htmlFor="house">
                                        <div className={styles.addressDA}>House/Flat Number*</div>
                                        <BasicInput PlaceHolder={'House or flat number'} NAME={'house'} required={true} id={"house"} />
                                    </label>
                                </div>
                                <div className={styles.addressD}>
                                    <label htmlFor="landmark" onChange={() => setUpdateSave(true)}>
                                        <div className={styles.addressDA}>Landmark (optional)</div>
                                        <BasicInput PlaceHolder={'e.g. opp. AXN Center'} NAME={'landmark'} id={"landmark"} />
                                    </label>
                                </div>
                                <div className={styles.addressE}>
                                    <div className={styles.addressEA}>Save as</div>
                                    <div className={styles.addressEB}>
                                        <label htmlFor="home" onChange={() => setUpdateSave(true)} onClick={() => setLocType(1)}>
                                            <BasicInput Type={"radio"} className={styles.d_none} id="home" NAME={"type"} VALUE={"Home"} required={true} />
                                            <div className={locType === 1 ? `${styles.addressEBB} ${styles.addressEBA}` : styles.addressEBA}>Home</div>
                                        </label>
                                        <label htmlFor="other" onChange={() => setUpdateSave(true)} onClick={() => setLocType(2)}>
                                            <BasicInput Type={"radio"} className={styles.d_none} id="other" NAME={"type"} VALUE={"Other"} required={true} />
                                            <div className={locType === 2 ? `${styles.addressEBB} ${styles.addressEBA}` : styles.addressEBA}>Other</div>
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.addressF}>
                                    <PrimaryButton children={'Add Address'} className={updateSave ? null : styles.saveInactive} form="addressForm" />
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

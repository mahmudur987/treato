import ProfileView from "../../components/AccountSettings/ProfieView/ProfileView";
import SocialSettings from "../../components/AccountSettings/SocialSettings/SocialSettings";
import UserAddress from "../../components/AccountSettings/UserAddress/UserAddress";
import UserDetails from "../../components/AccountSettings/UserDetails/UserDetails";
import styles from "./AccountSettings.module.css";
import chevronRight from "../../assets/images/AccountSettings/chevron-right.svg"
import mapPin from "../../assets/images/AccountSettings/map-pin.svg"
import signOut from "../../assets/images/AccountSettings/signOut.svg"
import userIco from "../../assets/images/AccountSettings/userIco.svg"
import lock from "../../assets/images/icons/lock.svg"
import { useEffect, useState } from "react";
import SaveChanges from "../../components/AccountSettings/SaveChanges/SaveChanges";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import PasswordChange from "../../components/AccountSettings/PasswordChange/PasswordChange";
import ChangePass from "../../components/_modals/ChangePass/ChangePass";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton";
import ChangeProfile from "../../components/_modals/ChangeProfile/ChangeProfile";
import AddressModal from "../../components/_modals/AddressModal/AddressModal";
import VerifyOtp from "../../components/_modals/VerifyOtp/VerifyOtp";
import { updateUser } from "../../services/updateUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateUserDetails } from "../../redux/slices/user";
import FindLocationModal from "../../components/_modals/FindLocationModal/FindLocationModal";

export default function AccountSettings() {
    let data = useSelector(state => state.user);
    let dispatch = useDispatch()
    let [mobileOpt, updateMobileOpt] = useState(-1)
    let [passModal, setPassModal] = useState(false)
    let [profileModal, setProfileModal] = useState(false)
    let [locationModal, setlocationModal] = useState(false)
    let [addressModal, setAddressModal] = useState({ active: false, data: null })
    const [userAddressText, setuserAddressText] = useState("")
    let [otpModal, setOtpModal] = useState(false)
    let [showSave, setShowSave] = useState(false)
    let [otpSuccess, setOtpSuccess] = useState(false)
    let [inputState, updateInputState] = useState(
        {
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            dob: true,
            house: true,
            landmark: true
        }
    );
    const userData = data.user
    console.log(userData);
    let [inputVal, updateInputVal] = useState({
        first_name: userData.first_name ? userData.first_name : '',
        last_name: userData.last_name ? userData.last_name : '',
        email: userData.email ? userData.email : '',
        phone: userData.phone ? userData.phone : '',
        dob: userData.dob ? userData.dob : '',
        house: userData.house ? userData.house : '',
        landmark: userData.landmark ? userData.landmark : '',
        place: userData.place ? userData.place : '',
        gender: userData.gender ? userData.gender : ''
    });
    let [activeGender, updateGender] = useState(userData.gender ? userData.gender : '');
    let setDefault = () => {
        let states = {
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            dob: true
        }
        let data = {
            first_name: userData.first_name ? userData.first_name : '',
            last_name: userData.last_name ? userData.last_name : '',
            email: userData.email ? userData.email : '',
            phone: userData.phone ? userData.phone : '',
            dob: userData.dob ? userData.dob : '',
            house: userData.house ? userData.house : '',
            landmark: userData.landmark ? userData.landmark : '',
            place: userData.place ? userData.place : '',
            gender: userData.gender ? userData.gender : ''
        }
        updateInputState(states)
        updateInputVal(data)
        setShowSave(false)
    }
    let submitForm = (e) => {
        e.preventDefault();
        const userJWt = localStorage.getItem("jwtToken");
        let formData = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            dob: e.target.dob.value,
            gender: activeGender,
            google: "",
            fb: "",
            instagram: "",
            house: inputVal?.house ? inputVal?.house : '',
            landmark: inputVal?.landmark ? inputVal?.landmark : '',
            address_type: inputVal?.house_type ? inputVal?.house_type : "",
            // place: inputVal?.place ? inputVal?.place : "",
            place: userAddressText ? userAddressText : ""
        }
        if (e.target.phone.value !== userData.phone && e.target.phone.value !== "") {
            setOtpModal(true)
            localStorage.setItem('tempUserData', JSON.stringify(formData))
        } else {
            console.log(formData);

            updateUser(userJWt, formData)
                .then((res) => {
                    setShowSave(false)

                    dispatch(updateUserDetails(res?.res?.data?.data))
                    let states = {
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone: true,
                        dob: true
                    }
                    updateInputState(states)


                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const navigate = useNavigate()
    let logOut = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userPhoneNumber');
        navigate('/')
        window.location.reload();
    }
    useEffect(() => {
        let data = {
            first_name: userData.first_name ? userData.first_name : '',
            last_name: userData.last_name ? userData.last_name : '',
            email: userData.email ? userData.email : '',
            phone: userData.phone ? userData.phone : '',
            dob: userData.dob ? userData.dob : '',
            house: userData?.location?.house ? userData?.location?.house : '',
            landmark: userData?.location?.landmark ? userData?.location?.landmark : '',
            place: userData?.location?.place ? userData?.location?.place : '',
            house_type: userData?.location?.address_type ? userData?.location?.address_type : '',
            gender: userData.gender ? userData.gender : ''
        }
        updateInputVal(data)
        updateGender(userData.gender ? userData.gender : '')
    }, [userData,])





    return (
        <>
            {
                userData ?
                    <>
                        <div className={styles.acc_setting_page}>
                            <BackButton updateMobileOpt={updateMobileOpt} />
                            <div className={mobileOpt === -1 ? styles.acc_head : styles.d_none}>Account Settings</div>
                            <div className={styles.acc_intro}>Manage your Treato profile. Changes will be reflected across all devices.</div>
                            <div className={styles.acc_setting_mid}>
                                <ProfileView setProfileModal={setProfileModal} logOut={logOut} />
                                <div className={styles.acc_setting_right}>
                                    <form id="acc_set_form" onSubmit={submitForm}>
                                        <UserDetails setOtpModal={setOtpModal} setShowSave={setShowSave} updateInputState={updateInputState} inputState={inputState} updateInputVal={updateInputVal} inputVal={inputVal} activeGender={activeGender} updateGender={updateGender} />
                                        <UserAddress setShowSave={setShowSave} setuserAddressText={setuserAddressText} setAddressModal={setAddressModal} addressModal={addressModal} updateInputVal={updateInputVal} inputVal={inputVal} />
                                        <SocialSettings />
                                        <PasswordChange setPassModal={setPassModal} />
                                    </form>
                                    <div className={showSave ? styles.acc_settingA : styles.d_none}>
                                        <SecondaryButton children={"Cancel"} onClick={setDefault} />
                                        <PrimaryButton children={"Save Changes"} form={"acc_set_form"} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.acc_setting_mobile}>
                                {
                                    mobileOpt === -1 ?
                                        <>
                                            <ProfileView mobView="true" setProfileModal={setProfileModal} />
                                            <div className={styles.acc_mob_options} onClick={() => updateMobileOpt(1)}>
                                                <div className={styles.acc_mob_flex}>
                                                    <div><img src={userIco} alt="user" className={styles.acc_mob_opt_ico} /></div>
                                                    <div>Personal Details</div>
                                                </div>
                                                <div>
                                                    <img src={chevronRight} alt="" />
                                                </div>
                                            </div>
                                            <div className={styles.acc_mob_options} onClick={() => updateMobileOpt(2)}>
                                                <div className={styles.acc_mob_flex}>
                                                    <div><img src={mapPin} alt="address" className={styles.acc_mob_opt_ico} /></div>
                                                    <div>Manage Addresses</div>
                                                </div>
                                                <div>
                                                    <img src={chevronRight} alt="" />
                                                </div>
                                            </div>
                                            <div className={styles.acc_mob_options} onClick={() => updateMobileOpt(3)}>
                                                <div className={styles.acc_mob_flex}>
                                                    <div><img src={lock} alt="lock" className={styles.acc_mob_opt_ico} /></div>
                                                    <div>Change Password</div>
                                                </div>
                                                <div>
                                                    <img src={chevronRight} alt="" />
                                                </div>
                                            </div>
                                            <div className={styles.acc_mob_options}>
                                                <div className={styles.acc_mob_flex} onClick={logOut}>
                                                    <div><img src={signOut} alt="" className={styles.acc_mob_opt_ico} /></div>
                                                    <div>Sign Out</div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        mobileOpt === 1 ?
                                            <>
                                                <form id="mob_acc_set_form" onSubmit={submitForm}>
                                                    <UserDetails mobView='Personal Details' setOtpModal={setOtpModal} setShowSave={setShowSave} updateInputState={updateInputState} inputState={inputState} updateInputVal={updateInputVal} inputVal={inputVal} activeGender={activeGender} updateGender={updateGender} />
                                                    <SocialSettings />
                                                    <div className={showSave ? null : styles.d_none}>
                                                        <SaveChanges form={"mob_acc_set_form"} />
                                                    </div>
                                                </form>
                                            </>
                                            :
                                            mobileOpt === 2 ?
                                                <>
                                                    <UserAddress setShowSave={setShowSave} setAddressModal={setAddressModal} updateInputVal={updateInputVal} inputVal={inputVal} />
                                                </>
                                                :
                                                mobileOpt === 3 ?
                                                    <ChangePass setPassModal={setPassModal} updateMobileOpt={updateMobileOpt} setOtpSuccess />
                                                    :
                                                    null
                                }
                            </div>
                        </div>
                        {
                            passModal ?
                                <ChangePass setPassModal={setPassModal} updateMobileOpt={updateMobileOpt} />
                                :
                                profileModal ?
                                    <ChangeProfile setProfileModal={setProfileModal} />
                                    :
                                    addressModal.active ?
                                        <AddressModal setAddressModal={setAddressModal} updateInputVal={updateInputVal} inputVal={inputVal} setShowSave={setShowSave} addressModal={addressModal} setlocationModal={setlocationModal} setuserAddressText={setuserAddressText} userAddressText={userAddressText} />
                                        :
                                        otpModal ?
                                            <VerifyOtp setOtpModal={setOtpModal} setOtpSuccess={setOtpSuccess} otpSuccess={otpSuccess} setShowSave={setShowSave} updateInputState={updateInputState} />
                                            :
                                            locationModal ?
                                                <FindLocationModal setAddressModal={setAddressModal} setlocationModal={setlocationModal} addressModal={addressModal} setuserAddressText={setuserAddressText} userAddressText={userAddressText} />
                                                :
                                                null
                        }
                    </>
                    :
                    null
            }
        </>
    )
}
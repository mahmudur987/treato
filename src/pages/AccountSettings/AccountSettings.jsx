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
import { useSelector } from "react-redux";
export default function AccountSettings() {
    let [mobileOpt, updateMobileOpt] = useState(-1)
    let [passModal, setPassModal] = useState(false)
    let [profileModal, setProfileModal] = useState(false)
    let [addressModal, setAddressModal] = useState({active:false,data:null})
    let [otpModal, setOtpModal] = useState(false)
    let [showSave, setShowSave] = useState(false)
    let [activeGender, updateGender] = useState(
        {
            index: -1,
            value: ''
        }
    );
    let [inputState, updateInputState] = useState(
        {
            f_name: true,
            l_name: true,
            user_email: true,
            user_tel: true,
            user_dob: true
        }
    );
    const userData = JSON.parse(localStorage.getItem("userData"));
    let [inputVal, updateInputVal] = useState({
        f_name: userData.first_name ? userData.first_name : '',
        l_name: userData.last_name ? userData.last_name : '',
        user_email: userData.email ? userData.email : '',
        user_tel: userData.phone ? userData.phone : '',
        user_dob: userData.dob ? userData.dob : '',
        user_loc: userData.location ? userData.location : '',
        user_gender: userData.gender ? userData.gender : ''
    });
    let setDefault = () => {
        let states = {
            f_name: true,
            l_name: true,
            user_email: true,
            user_tel: true,
            user_dob: true
        }
        let data = {
            f_name: userData.first_name ? userData.first_name : '',
            l_name: userData.last_name ? userData.last_name : '',
            user_email: userData.email ? userData.email : '',
            user_tel: userData.phone ? userData.phone : '',
            user_dob: userData.dob ? userData.dob : '',
            user_loc: userData.location ? userData.location : '',
            user_gender: userData.gender ? userData.gender : ''
        }
        updateInputState(states)
        updateInputVal(data)
        setShowSave(false)
    }
    let submitForm = (e) => {
        e.preventDefault();
        const userJWt = localStorage.getItem("jwtToken");
        let formData = {
            first_name: e.target.f_name.value,
            last_name: e.target.l_name.value,
            email: e.target.user_email.value,
            phone: e.target.user_tel.value,
            dob: e.target.user_dob.value,
            gender: activeGender.value,
            google: "",
            fb: "",
            instagram: "",
            house: inputVal.user_loc.length ? inputVal.user_loc[inputVal.user_loc.length - 1].house : '',
            landmark: inputVal.user_loc.length ? inputVal.user_loc[inputVal.user_loc.length - 1].landmark : '',
            place: inputVal.user_loc
        }
        setShowSave(false)
        let states = {
            f_name: true,
            l_name: true,
            user_email: true,
            user_tel: true,
            user_dob: true
        }
        updateInputState(states)
        console.log(formData);
        updateUser(userJWt,formData).then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className={styles.acc_setting_page}>
                <BackButton updateMobileOpt={updateMobileOpt} />
                <div className={mobileOpt === -1 ? styles.acc_head : styles.d_none}>Account Settings</div>
                <div className={styles.acc_intro}>Manage your Treato profile. Changes will be reflected across all devices.</div>
                <div className={styles.acc_setting_mid}>
                    <ProfileView setProfileModal={setProfileModal} />
                    <div className={styles.acc_setting_right}>
                        <form id="acc_set_form" onSubmit={submitForm}>
                            <UserDetails setOtpModal={setOtpModal} setShowSave={setShowSave} updateInputState={updateInputState} inputState={inputState} updateInputVal={updateInputVal} inputVal={inputVal} activeGender={activeGender} updateGender={updateGender} />
                            <UserAddress setShowSave={setShowSave} setAddressModal={setAddressModal} address={inputVal.user_loc} />
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
                                    <div className={styles.acc_mob_flex}>
                                        <div><img src={signOut} alt="" className={styles.acc_mob_opt_ico} /></div>
                                        <div>Sign Out</div>
                                    </div>
                                </div>
                            </>
                            :
                            mobileOpt === 1 ?
                                <>
                                 <form id="mob_acc_set_form" onSubmit={submitForm}>
                                    <UserDetails mobView='Personal Details' setOtpModal={setOtpModal} setShowSave={setShowSave} updateInputState={updateInputState} inputState={inputState} updateInputVal={updateInputVal} inputVal={inputVal} activeGender={activeGender} updateGender={updateGender}/>
                                    <SocialSettings />
                                    <SaveChanges form={"mob_acc_set_form"} />
                                    </form>
                                </>
                                :
                                mobileOpt === 2 ?
                                    <>
                                        <UserAddress setShowSave={setShowSave} setAddressModal={setAddressModal} address={inputVal.user_loc} />
                                    </>
                                    :
                                    mobileOpt === 3 ?
                                        <ChangePass setPassModal={setPassModal} />
                                        :
                                        null
                    }
                </div>
            </div>
            {
                passModal ?
                    <ChangePass setPassModal={setPassModal} />
                    :
                    profileModal ?
                        <ChangeProfile setProfileModal={setProfileModal} />
                        :
                        addressModal.active ?
                            <AddressModal setAddressModal={setAddressModal} updateInputVal={updateInputVal} inputVal={inputVal} setShowSave={setShowSave} addressModal={addressModal}/>
                            :
                            otpModal ?
                                <VerifyOtp setOtpModal={setOtpModal} />
                                :
                                null
            }
        </>
    )
}
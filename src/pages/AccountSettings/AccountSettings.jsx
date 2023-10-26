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
import { useState } from "react";
import SaveChanges from "../../components/AccountSettings/SaveChanges/SaveChanges";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import PasswordChange from "../../components/AccountSettings/PasswordChange/PasswordChange";
import ChangePass from "../../components/_modals/ChangePass/ChangePass";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton";
import ChangeProfile from "../../components/_modals/ChangeProfile/ChangeProfile";
import AddressModal from "../../components/_modals/AddressModal/AddressModal";
import VerifyOtp from "../../components/_modals/VerifyOtp/VerifyOtp";
export default function AccountSettings() {
    let [mobileOpt, updateMobileOpt] = useState(-1)
    let [passModal, setPassModal] = useState(false)
    let [profileModal, setProfileModal] = useState(false)
    let [addressModal, setAddressModal] = useState(false)
    let [otpModal, setOtpModal] = useState(false)
    let [showSave,setShowSave] = useState(false)
    let [inputState, updateInputState] = useState(
        {
            f_name: true,
            l_name: true,
            user_email: true,
            user_tel: true,
            user_dob: true
        }
    );
    let [inputVal, updateInputVal] = useState(
        {
            f_name: 'Sarah',
            l_name: 'Avasthi',
            user_email: 'shreya2716@gmail.com',
            user_tel: '9274611991',
            user_dob: '25 November, 1988'
        }
    );
    let setDefault = ()=>{
        let states = {
            f_name: true,
            l_name: true,
            user_email: true,
            user_tel: true,
            user_dob: true
        }
        let data = {
            f_name: 'Sarah',
            l_name: 'Avasthi',
            user_email: 'shreya2716@gmail.com',
            user_tel: '9274611991',
            user_dob: '25 November, 1988'
        }
        updateInputState(states)
        updateInputVal(data)
        setShowSave(false)
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
                        <UserDetails setOtpModal={setOtpModal} setShowSave={setShowSave} updateInputState={updateInputState} inputState={inputState} updateInputVal={updateInputVal} inputVal={inputVal}/>
                        <UserAddress setShowSave={setShowSave} setAddressModal={setAddressModal}/>
                        <SocialSettings />
                        <PasswordChange setPassModal={setPassModal} />
                        <div className={showSave?styles.acc_settingA:styles.d_none}>
                            <SecondaryButton children={"Cancel"} onClick={setDefault}/>
                            <PrimaryButton children={"Save Changes"} form={"acc_set_form"}/>
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
                                    <UserDetails mobView='Personal Details' setOtpModal={setOtpModal}/>
                                    <SocialSettings />
                                </>
                                :
                                mobileOpt === 2 ?
                                    <>
                                        <UserAddress setAddressModal={setAddressModal} />
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
                mobileOpt !== -1&&mobileOpt !== 3 ?
                    <SaveChanges />
                    :
                    <></>
            }
            {
                passModal ?
                    <ChangePass setPassModal={setPassModal} />
                    :
                    profileModal ?
                        <ChangeProfile setProfileModal={setProfileModal} />
                        :
                        addressModal ?
                            <AddressModal setAddressModal={setAddressModal} />
                            :
                            otpModal?
                            <VerifyOtp setOtpModal={setOtpModal}/>
                            :
                            null
            }
        </>
    )
}
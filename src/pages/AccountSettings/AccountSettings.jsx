import ProfileView from "../../components/AccountSettings/ProfieView/ProfileView";
import SocialSettings from "../../components/AccountSettings/SocialSettings/SocialSettings";
import UserAddress from "../../components/AccountSettings/UserAddress/UserAddress";
import UserDetails from "../../components/AccountSettings/UserDetails/UserDetails";
import styles from "./AccountSettings.module.css";
import leftIco from "../../assets/images/AccountSettings/arrow-left.svg"
import chevronRight from "../../assets/images/AccountSettings/chevron-right.svg"
import mapPin from "../../assets/images/AccountSettings/map-pin.svg"
import signOut from "../../assets/images/AccountSettings/sign-out-svgrepo-com 1.svg"
import userIco from "../../assets/images/AccountSettings/user-svgrepo-com (2) 1.svg"
import { useState } from "react";
import SaveChanges from "../../components/AccountSettings/SaveChanges/SaveChanges";
export default function AccountSettings() {
    let [mobileOpt, updateMobileOpt] = useState(-1)

    return (
        <>
        <div className={styles.acc_setting_page}>
            <div className={styles.acc_mob_back}><img src={leftIco} alt="" onClick={()=>updateMobileOpt(-1)}/></div>
            <div className={mobileOpt===-1?styles.acc_head:styles.d_none}>Account Settings</div>
            <div className={styles.acc_intro}>Manage your Treato profile. Changes will be reflected across all devices.</div>
            <div className={styles.acc_setting_mid}>
                <ProfileView />
                <div className={styles.acc_setting_right}>
                    <UserDetails />
                    <UserAddress />
                    <SocialSettings />
                </div>
            </div>
            <div className={styles.acc_setting_mobile}>
                {
                    mobileOpt === -1 ?
                        <>
                            <ProfileView mobView="true" />
                            <div className={styles.acc_mob_options} onClick={() => updateMobileOpt(1)}>
                                <div className={styles.acc_mob_flex}>
                                    <div><img src={userIco} alt="" className={styles.acc_mob_opt_ico} /></div>
                                    <div>Personal Details</div>
                                </div>
                                <div>
                                    <img src={chevronRight} alt="" />
                                </div>
                            </div>
                            <div className={styles.acc_mob_options} onClick={() => updateMobileOpt(2)}>
                                <div className={styles.acc_mob_flex}>
                                    <div><img src={mapPin} alt="" className={styles.acc_mob_opt_ico} /></div>
                                    <div>Manage Addresses</div>
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
                                <UserDetails mobView='Personal Details'/>
                                <SocialSettings/>
                            </>
                        :
                        mobileOpt === 2 ?
                        <>
                            <UserAddress/>
                        </>
                        :
                        <></>
                }
            </div>
        </div>
        {
            mobileOpt !== -1 ?
            <SaveChanges/>
            :
            <></>
        }
        </>
    )
}
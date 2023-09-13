import styles from "./SocialSettings.module.css";
import facebook from "../../../assets/images/AccountSettings/facebook.png"
import instagram from "../../../assets/images/AccountSettings/Instagram.png"
import google from "../../../assets/images/AccountSettings/google.png"
import { useState } from "react";

export default function SocialSettings(){

    let [connectStatus1,updateConnectStatus1] = useState(-1);
    let [connectStatus2,updateConnectStatus2] = useState(-1);
    let [connectStatus3,updateConnectStatus3] = useState(-1);

    return(
        <div className={styles.user_social}>
            <div className={styles.usr_social_head}>
                Social
            </div>
            <div className={styles.usr_social_desc}>
            Link your social media profiles for seamless integration with your Treato account.
            </div>
            <div className={styles.usr_social_opt}>
                <div className={styles.social_options}>
                    <div className={styles.social_opt_left}>
                        <img src={google} alt=""/>
                        Google
                    </div>
                    <div className={styles.social_opt_right}>
                        <button className={connectStatus1===1?styles.social_opt_disconnect:styles.social_opt_connect} onClick={()=>updateConnectStatus1(connectStatus1===1?-1:1)}>{connectStatus1===1?'Disconnect':'Connect'}</button>
                    </div>
                </div>
                <div className={styles.social_options}>
                    <div className={styles.social_opt_left}>
                        <img src={facebook} alt="" className={styles.social_opt_logo}/>
                        Facebook
                    </div>
                    <div className={styles.social_opt_right}>
                        <button className={connectStatus2===1?styles.social_opt_disconnect:styles.social_opt_connect} onClick={()=>updateConnectStatus2(connectStatus2===1?-1:1)}>{connectStatus2===1?'Disconnect':'Connect'}</button>
                    </div>
                </div>
                <div className={styles.social_options}>
                    <div className={styles.social_opt_left}>
                        <img src={instagram} alt="" className={styles.social_opt_logo}/>
                        Instagram
                    </div>
                    <div className={styles.social_opt_right}>
                        <button className={connectStatus3===1?styles.social_opt_disconnect:styles.social_opt_connect} onClick={()=>updateConnectStatus3(connectStatus3===1?-1:1)}>{connectStatus3===1?'Disconnect':'Connect'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import styles from "./UserDetails.module.css";
import editImg from "../../../assets/images/AccountSettings/edit.svg"
import { useState } from "react";

export default function UserDetails({mobView}){
    let [activeGender,updateGender] = useState(0);
    let [inputState,updateInputState] = useState(
        {
            f_name : true,
            l_name : true,
            email : true,
            phone : true,
            dob : true
        }
    );
    let [inputVal,updateInputVal] = useState(
        {
            f_name : 'Sarah',
            l_name : 'Avasthi',
            user_email : 'shreya2716@gmail.com',
            user_tel : '9274611991',
            user_dob : '2013-01-08'
        }
    );

    let updateInput = (data)=>{
        let newInputState = {...inputState}
        newInputState[Object.keys(data)[0]]===true ? newInputState[Object.keys(data)[0]]=false : newInputState[Object.keys(data)[0]]=true;
        updateInputState(newInputState)
    }

    let updateInputValue = (e)=>{
        let newInputVal = {...inputVal}
        newInputVal[e.target.name] = e.target.value;
        updateInputVal(newInputVal)
    }

    return(
        <div>
            <div className={styles.usr_detail_head}>
                {
                    mobView !== undefined ? mobView : 'Basic Details'
                }
            </div>
            <div className={styles.usr_detail_body}>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="f_name" className={styles.usr_detail_label}>First Name</label>
                    <input type="text" value={inputVal.f_name} disabled={inputState.f_name} id="f_name" name="f_name" className={styles.usr_detail_input} onChange={updateInputValue}/>
                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={()=>updateInput(inputState.f_name ? {f_name:false} : {f_name:true})}/>
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="l_name" className={styles.usr_detail_label}>Last Name</label>
                    <input type="text" value={inputVal.l_name} disabled={inputState.l_name} id="l_name" name="l_name" className={styles.usr_detail_input} onChange={updateInputValue}/>
                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={()=>updateInput(inputState.l_name ? {l_name:false} : {l_name:true})}/>
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="email" className={styles.usr_detail_label}>Email (used to log into your account)</label>
                    <input type="email" value={inputVal.user_email} disabled={inputState.email} id="email" name="user_email" className={styles.usr_detail_input} onChange={updateInputValue}/>
                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={()=>updateInput(inputState.email ? {email:false} : {email:true})}/>
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_tel" className={styles.usr_detail_label}>Phone</label>
                    <div className={styles.usr_detail_contact}>
                        <select name="" id="">
                            <option value="+91">+91</option>
                        </select>
                        <input type="tel" value={inputVal.user_tel} disabled={inputState.phone} id="user_tel" name="user_tel" className={styles.usr_detail_input} onChange={updateInputValue}/>
                    </div>
                    <img src={editImg} alt="" className={styles.usr_detail_edit} onClick={()=>updateInput(inputState.phone ? {phone:false} : {phone:true})}/>
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_dob" className={styles.usr_detail_label}>Date of Birth</label>
                    <input type="date" value={inputVal.user_dob} disabled={inputState.dob} id="user_dob" name="user_dob" className={styles.usr_detail_input} onChange={updateInputValue}/>
                    <img src={editImg} alt="" className={inputState.dob?styles.usr_detail_calendar:styles.d_none} onClick={()=>updateInput(inputState.dob ? {dob:false} : {dob:true})}/>
                </div>
                <div className={styles.usr_detail_box}>
                    <label htmlFor="user_gender" className={`${styles.usr_detail_label} ${styles.usr_detail_gender_label}`}>Gender</label>
                    <div className={styles.usr_genders}>
                    <div className={activeGender!==1 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={()=>updateGender(activeGender===1 ? 0 : 1)}>Male</div>
                    <div className={activeGender!==2 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={()=>updateGender(activeGender===2 ? 0 : 2)}>Female</div>
                    <div className={activeGender!==3 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={()=>updateGender(activeGender===3 ? 0 : 3)}>Non-Binary</div>
                    <div className={activeGender!==4 ? styles.usr_detail_gender : `${styles.usr_detail_gender} ${styles.active_gender}`} onClick={()=>updateGender(activeGender===4 ? 0 : 4)}>Other</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
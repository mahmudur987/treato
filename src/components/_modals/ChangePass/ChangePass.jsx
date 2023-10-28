import React, { useState } from 'react'
import styles from './ChangePass.module.css'
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg'
import BasicInput from '../../Input/BasicInput/BasicInput'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import { updatePass } from '../../../services/updatePass'

export default function ChangePass({ setPassModal }) {
    let [error,showError] = useState(false)
    let passUpdate = (e)=>{
        e.preventDefault();
        const userJWt = localStorage.getItem("jwtToken");
        if(e.target.currentPass.value!==''&&e.target.newPass.value!==''&&e.target.rePass.value!==''){
            let formData= {
                currentPassword: e.target.currentPass.value,
                newPassword: e.target.newPass.value
            }
            updatePass(userJWt,formData).then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err)
            })
            showError(false)
        }else{
            showError(true)
        }
    }
    return (
        <div className={styles.passMain}>
            <div className={styles.passA}>
                <div className={styles.passB}>
                    <div className={styles.passBA}>Change Password</div>
                    <div className={styles.passBB}><img src={Grey_Close} alt="" onClick={() => setPassModal(false)} /></div>
                </div>
                <form id="passChange" onSubmit={passUpdate}>
                    <div className={styles.passC}>
                        <label htmlFor="currentPass">
                            <div className={styles.passCA}>Current password</div>
                            <div><BasicInput Type={'password'} id={'currentPass'} PlaceHolder={'Enter your current password'} NAME={'currentPass'} /></div>
                        </label>
                    </div>
                    <div className={styles.passC}>
                        <label htmlFor="newPass">
                            <div className={styles.passCA}>New password</div>
                            <div><BasicInput Type={'password'} id={'newPass'} PlaceHolder={'Enter the new password'} NAME={'newPass'}/></div>
                        </label>
                    </div>
                    <div className={styles.passC}>
                        <label htmlFor="rePass">
                            <div className={styles.passCA}>Confirm new password</div>
                            <div><BasicInput Type={'password'} id={'rePass'} PlaceHolder={'Re-enter your new password'} NAME={'rePass'}/></div>
                        </label>
                        {
                            error?
                            <div className={styles.passError}>Please Fill All Fields</div>
                            :
                            null
                        }
                    </div>
                    <PrimaryButton children={'Update'} form="passChange"/>
                </form>
            </div>
        </div>
    )
}

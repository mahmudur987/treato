import React from 'react'
import styles from './VerifyOtp.module.css'
import Grey_Close from '../../../assets/images/icons/Grey_Close.svg'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'
import SuccessCircle from '../../../assets/images/icons/SuccessCircle.svg'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { updateUser } from '../../../services/updateUser'
import { sendLoginOTP } from '../../../services/auth'
import { toast } from 'react-toastify'

export default function VerifyOtp({ setOtpModal, setOtpSuccess, otpSuccess,setShowSave,updateInputState,updateInputVal, inputVal,userOTP, setuserOTP}) {
    let [timer, setTimer] = useState({
        min: 5,
        sec: 0
    })
    let [otpData, setOtpData] = useState({
        inp1: '',
        inp2: '',
        inp3: '',
        inp4: '',
    })
    let otpBoxReference = useRef([]);
    let otpFunc = (e) => {
        let data = { ...otpData };
        if (/^\d+$/.test(e.target.value) && e.target.value.length <= 1) {
            data[e.target.name] = e.target.value;
            setOtpData(data);
            otpBoxReference.current.map((v, i) => {
                if (e.target.name === v.name && e.target.value !== '' && i < otpBoxReference.current.length - 1) {
                    otpBoxReference.current[i + 1].focus();
                }
            });
        }
    };
    let onKeyPress = (e) => {
        if (e.keyCode === 8) {
            let data = { ...otpData }
            data[e.target.name] = '';
            setOtpData(data)
            otpBoxReference.current.map((v, i) => {
                if (e.target.name === v.name && i < otpBoxReference.current.length && i > 1) {
                    otpBoxReference.current[i - 1].focus();
                }
            })
        }
    }
    useEffect(() => {
        if (otpBoxReference.current.length) {
            otpBoxReference.current[1].focus();
        }
    }, [otpBoxReference])
    let timeCounter = setTimeout(() => {
        if (timer.min === 0 && timer.sec === 0) {
            clearTimeout(timeCounter);
        } else {
            let min = timer.min;
            let sec = timer.sec;
            if (timer.min !== 0 && timer.sec === 0) {
                min = timer.min - 1;
            }
            if (timer.sec === 0) {
                sec = 59
            } else {
                sec = timer.sec - 1;
            }
            let finalTime = { min, sec }
            setTimer(finalTime)
        }
    }, 1000)
    let submitPass = () => {
        let givenOTP=parseInt(otpData.inp1 + otpData.inp2 + otpData.inp3 + otpData.inp4)
        console.log(userOTP,givenOTP);
        const userJWt = localStorage.getItem("jwtToken");
        if(userOTP===givenOTP){
            updateUser(userJWt, inputVal)
                .then((res) => {
                    setShowSave(false)
                    let states = {
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone: true,
                        dob: true
                    }
                    updateInputState(states)
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err)
                })
            setOtpSuccess(otpSuccess ? setOtpModal(false) : true)
        }
        else{
            console.log("Invalid OTP");
            toast.error("Invalid OTP")
            setOtpData({
                inp1: '',
                inp2: '',
                inp3: '',
                inp4: '',
            })
        }
    }

    
    return (
        <div className={styles.otpMain}>
            <div className={styles.otpA}>
                <div className={styles.otpB}>
                    <div className={styles.otpBA}>{otpSuccess ? 'Update Successful!' : 'Verify OTP'}</div>
                    <div className={styles.otpBB}><img src={Grey_Close} alt="" onClick={() => setOtpModal(false)} /></div>
                </div>
                {
                    otpSuccess ?
                        <>
                            <div className={styles.otpH}>
                                <img src={SuccessCircle} alt="success" />
                            </div>
                            <div className={styles.otpI}>You have successfully updated your phone number.</div>
                        </>
                        :
                        <>
                            <div className={styles.otpC}>
                                Enter the OTP sent to to {inputVal?.phone}.
                            </div>
                            <div className={styles.otpD}>
                                <div>
                                    <input name='inp1' type="text" value={otpData.inp1} onChange={otpFunc} ref={(reference) => (otpBoxReference.current[1] = reference)} onKeyDown={onKeyPress} />
                                </div>
                                <div>
                                    <input name='inp2' type="text" value={otpData.inp2} onChange={otpFunc} ref={(reference) => (otpBoxReference.current[2] = reference)} onKeyDown={onKeyPress} />
                                </div>
                                <div>
                                    <input name='inp3' type="text" value={otpData.inp3} onChange={otpFunc} ref={(reference) => (otpBoxReference.current[3] = reference)} onKeyDown={onKeyPress} />
                                </div>
                                <div>
                                    <input name='inp4' type="text" value={otpData.inp4} onChange={otpFunc} ref={(reference) => (otpBoxReference.current[4] = reference)} onKeyDown={onKeyPress} />
                                </div>
                            </div>
                            <div className={`${styles.otpE} ${styles.hide}`}>Please enter the correct OTP or try again.</div>
                        </>
                }
                <div className={styles.otpF}>
                    <PrimaryButton children={otpSuccess ? "Continue" : "Submit"} onClick={submitPass} />
                </div>
                {
                    otpSuccess ?
                        null
                        :
                        <div className={styles.otpG}>
                            Didn’t receive OTP? <span>Resend in 0{timer.min}:{timer.sec < 10 ? '0' + timer.sec : timer.sec}</span>
                        </div>

                }
            </div>
        </div>
    )
}

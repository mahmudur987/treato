import { useEffect, useState } from 'react'
import { useRef } from 'react'
import styles from '../../../pages/BookFlow/BookFlow.module.css'
import BasicInput from '../../Input/BasicInput/BasicInput'
import PhoneInput from '../../Input/PhoneInput/PhoneInput'
import RadioInput from '../../Input/RadioInput/RadioInput'
import TextArea from '../../Input/TextArea/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateVisitorContent } from '../../../redux/slices/VisitorDetails'

export default function VisitorDetail() {
    const dispatch = useDispatch();
    const [guest, setGuest] = useState(0);
    const [visitorPhone, setvisitorPhone] = useState("")
    const [countryCode, setcountryCode] = useState("+91")
    const { contact } = useSelector((state) => state?.VisitorDetails);
    const userDetails = useSelector((state) => state?.user?.user);

    useEffect(() => {
        console.log(userDetails);
        if(guest===0){
            setvisitorPhone(userDetails?.phone?userDetails?.phone:"")
        }
    }, [guest])
    
    const handleRadioChange = (value) => {
      setGuest(value);
      dispatch(
        updateVisitorContent({
          guest: value,
          contact: {
            name: '',
            phone: '',
            email: '',
            preferences: '',
          },
        })
      );
    };
  
    const handleInputChange = (field, value) => {
        if(field==="phone"){
            const numericValue = value.replace(/\D/g, "");
            setvisitorPhone(numericValue)
            value = numericValue.slice(0, 10);
            value=`${countryCode}${value}`
        }
      dispatch(
        updateVisitorContent({
          guest,
          contact: {
            ...contact,
            [field]: value,
          },
        })
      );
    };
    return (
        <div className={styles.visitor_detailMain}>
            <div className={styles.visitor_detailA}>
                <div className={styles.visitor_detailAA}>
                    Who are you booking for?
                </div>
                <div className={styles.visitor_detailAB}>
                    <RadioInput Type={'radio'} NAME={'visitor'} setGuest={handleRadioChange} guest={false}/>
                    <div>Booking for myself</div>
                </div>
                <div className={styles.visitor_detailAB}>
                    <RadioInput Type={'radio'} NAME={'visitor'} setGuest={handleRadioChange} guest={true}/>
                    <div>Booking for someone else (guest)</div>
                </div>
            </div>
            <div className={styles.visitor_detailA}>
                <div className={`${styles.visitor_detailAA} ${styles.mb_0}`}>
                    {
                        guest?
                        "Enter details of guest"
                        :
                        "Enter contact details"
                    }
                </div>
                <div className={styles.visitor_detailAB}>You may need this phone number at the salon for OTP purposes</div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Name</div>
                    <div className={styles.visitor_detailACB}>
                        <BasicInput Type={'text'} PlaceHolder={'Shreyas Awasthi'} onChange={(e)=>handleInputChange('name', e.target.value)}/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Phone</div>
                    <div className={`${styles.visitor_detailACB} ${styles.visitor_detailAC_opt}`}>
                    <div className={styles.phone_inputMain}>
            <select name="country" id="" className={styles.phone_select} onChange={(e)=>setcountryCode(e.target.value)}>
                <option value="+91">+91</option>
                <option value="+88">+88</option>
                <option value="+66">+66</option>
            </select>
            <div className={styles.phone_inputBorder}></div>
              <input value={visitorPhone} type="tel" placeholder={'Enter your phone number'} maxLength={10} className={styles.phone_input}  name={'phone'} onChange={(e)=>handleInputChange('phone', e.target.value)}/>
            </div>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Email</div>
                    <div className={styles.visitor_detailACB}>
                        <BasicInput Type={'email'} PlaceHolder={'shreya2716@gmail.com'} onChange={(e)=>handleInputChange('email', e.target.value)} required={true}/>
                    </div>
                </div>
                <div className={styles.visitor_detailAC}>
                    <div className={styles.visitor_detailACA}>Preferences (optional)</div>
                    <div className={styles.visitor_detailACB}>
                        <TextArea PlaceHolder={'Anyhing specific you want to share'}  onChange={(e)=>handleInputChange('preferences', e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
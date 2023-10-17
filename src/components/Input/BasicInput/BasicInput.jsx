import styles from './BasicInput.module.css'

export default function BasicInput({PlaceHolder,Type,VALUE,DISABLED,ID,NAME,updateInputVal,inputVal}){
    function inputValue(e){
        if(updateInputVal){
            let allValue = {...inputVal};
            allValue[e.target.name]=e.target.value
            updateInputVal(allValue)
        }
    }
    return(
        <input type={Type?Type:''} placeholder={PlaceHolder?PlaceHolder:''} className={styles.basic_input} value={VALUE?VALUE:''} disabled={DISABLED?DISABLED:false} id={ID?ID:''} name={NAME?NAME:''} onChange={inputValue}/>
    )
}
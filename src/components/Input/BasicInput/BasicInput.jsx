import styles from './BasicInput.module.css'

export default function BasicInput({PlaceHolder,Type,VALUE,DISABLED,id,NAME,updateInputVal,inputVal,required,className,onChange}){
    function inputValue(e){
        if(updateInputVal){
            let allValue = {...inputVal};
            allValue[e.target.name]=e.target.value
            updateInputVal(allValue)
        }
    }
    return(
        <>
            {
                VALUE?
                <input type={Type?Type:''} placeholder={PlaceHolder?PlaceHolder:''} className={className?`${className} ${styles.basic_input}`:styles.basic_input} value={VALUE?VALUE:''} disabled={DISABLED?DISABLED:false} id={id?id:''} name={NAME?NAME:''} onChange={onChange?onChange:null} required={required?required:false} />
                :
                <input type={Type?Type:''} placeholder={PlaceHolder?PlaceHolder:''} className={className?`${className} ${styles.basic_input}`:styles.basic_input} disabled={DISABLED?DISABLED:false} id={id?id:''} name={NAME?NAME:''} onChange={onChange?onChange:null}  required={required?required:false}/>
            }
        </>
    )
}
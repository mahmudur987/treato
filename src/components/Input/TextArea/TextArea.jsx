import styles from './TextArea.module.css'

export default function TextArea({PlaceHolder}){
    return(
        <textarea name="" id=""  placeholder={PlaceHolder?PlaceHolder:''} className={styles.text_area}></textarea>
    )
}
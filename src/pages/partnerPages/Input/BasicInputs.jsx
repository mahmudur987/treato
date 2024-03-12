import styles from './BasicInputs.module.css'

export default function BasicInputs(props) {

    const { placeholder, type, value, DISABLED, id, NAME, updateInputVal, inputVal, required, className, onChange, checked, label, style } = props;
    function inputValue(e) {
        if (updateInputVal) {
            let allValue = { ...inputVal };
            allValue[e.target.name] = e.target.value
            updateInputVal(allValue)
        }
    }
    return (
        <>
            <label className={styles.label}>
                {type === 'checkbox' ? (
                    <>
                        <input type="checkbox" name={NAME} checked={checked} onChange={onChange} />
                    </>
                ) : type === 'textarea' ? (
                    <>
                        {/* {props.label} */}
                        {/* {label} */}
                        <textarea
                            name={NAME}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className={style}
                        />
                    </>
                ) : (
                    <>
                        {/* {props.label} */}
                        {/* {label} */}
                        <input
                            type={type}
                            name={NAME}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className={styles.input}
                        />
                    </>
                )}
            </label>
            {/* {
                VALUE ?
                    <input type={type ? type : ''} placeholder={placeholder ? placeholder : ''} className={className ? `${className} ${styles.basic_input}` : styles.basic_input} value={VALUE ? VALUE : ''} disabled={DISABLED ? DISABLED : false} id={id ? id : ''} name={NAME ? NAME : ''} required={required ? required : false} onChange={onChange ? onChange : inputValue} />
                    :
                    <input type={type ? type : ''} placeholder={placeholder ? placeholder : ''} className={className ? `${className} ${styles.basic_input}` : styles.basic_input} disabled={DISABLED ? DISABLED : false} id={id ? id : ''} name={NAME ? NAME : ''} onChange={onChange ? onChange : null} required={required ? required : false} />
            } */}
        </>
    )
}

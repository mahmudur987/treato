import styles from './BasicInputs.module.css'

export default function BasicInputs({ PlaceHolder, Type, VALUE, DISABLED, id, NAME, updateInputVal, inputVal, required, className, onChange, checked }) {

    function inputValue(e) {
        if (updateInputVal) {
            let allValue = { ...inputVal };
            allValue[e.target.name] = e.target.value
            updateInputVal(allValue)
        }
    }
    return (
        <>
            <label
            // className={inputStyles.label}
            >
                {Type === 'checkbox' ? (
                    <>
                        <input Type="checkbox" name={NAME} checked={checked} onChange={onChange} />
                    </>
                ) : Type === 'textarea' ? (
                    <>
                        {/* {props.label} */}
                        <textarea
                            name={NAME}
                            value={VALUE}
                            onChange={onChange}
                            placeholder={PlaceHolder}
                            className={styles.textareaContent}
                        />
                    </>
                ) : (
                    <>
                        {/* {props.label} */}
                        <input
                            Type={Type}
                            name={NAME}
                            value={VALUE}
                            onChange={onChange}
                            placeholder={PlaceHolder}
                        // className={inputStyles.input}
                        />
                    </>
                )}
            </label>
            {
                VALUE ?
                    <input Type={Type ? Type : ''} placeholder={PlaceHolder ? PlaceHolder : ''} className={className ? `${className} ${styles.basic_input}` : styles.basic_input} value={VALUE ? VALUE : ''} disabled={DISABLED ? DISABLED : false} id={id ? id : ''} name={NAME ? NAME : ''} required={required ? required : false} onChange={onChange ? onChange : inputValue} />
                    :
                    <input Type={Type ? Type : ''} placeholder={PlaceHolder ? PlaceHolder : ''} className={className ? `${className} ${styles.basic_input}` : styles.basic_input} disabled={DISABLED ? DISABLED : false} id={id ? id : ''} name={NAME ? NAME : ''} onChange={onChange ? onChange : null} required={required ? required : false} />
            }
        </>
    )
}

import stylesInp from "./BasicInputTeam.module.css";

export default function BasicInputTeam(props) {
  const {
    placeholder,
    type,
    VALUE,
    DISABLED,
    id,
    NAME,
    updateInputVal,
    inputVal,
    required,
    className,
    onChange,
    checked,
    label,
    sty,
  } = props;

  return (
    <>
      <label className={stylesInp.label}>
        {type === "checkbox" ? (
          <>
            <input
              required={required}
              type="checkbox"
              name={NAME}
              checked={checked}
              onChange={onChange}
            />
          </>
        ) : type === "textarea" ? (
          <>
            {/* {props.label} */}
            {/* {label} */}
            <textarea
              required={required}
              name={NAME}
              value={VALUE}
              onChange={onChange}
              placeholder={placeholder}
              className={sty}
            />
          </>
        ) : (
          <>
            {/* {props.label} */}
            {/* {label} */}
            <input
              required={required}
              type={type}
              name={NAME}
              value={VALUE}
              onChange={onChange}
              placeholder={placeholder}
              className={stylesInp.input}
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
  );
}

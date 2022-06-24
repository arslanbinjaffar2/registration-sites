import React from "react";

const Input = ({ onChange, label, type, value, placeholder, required, className, tooltip, min, pattern, name }) => {
  return (
    <label className={`${className} label-input`}>
      {tooltip &&
        <em className="app-tooltip">
          <i className="material-icons">info</i>
          <div className="app-tooltipwrapper">{tooltip}</div>
        </em>}
      <input onChange={onChange} pattern={pattern} type={type} placeholder={placeholder} min={min} value={value} name={name} />
      {label && (
        <span>{label}{required && (<em className='req'>*</em>)}</span>
      )}
    </label>
  );
};

export default Input;
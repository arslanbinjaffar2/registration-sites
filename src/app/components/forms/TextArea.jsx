import React from "react";

type Props = {
  className?: any,
  label?: any,
  required?: any,
  onChange?: any,
  placeholder?: any,
  value?: any
}

const TextArea = ({ className, label, required, onChange, value, placeholder }: Props) => {
  return (
    <label className={`${className && className} label-textarea`}>
      <textarea onChange={onChange} name="" cols={30} rows={10} defaultValue={value ? value : ''} placeholder={placeholder}></textarea>
      {label && (
        <span>{label}{required && (<em className='req'>*</em>)}</span>
      )}
    </label>
  );
};

export default TextArea;
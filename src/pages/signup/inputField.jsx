import React from 'react';

const InputField = ({
  label,
  type,
  value,
  autoComplete,
  placeholder,
  onChange,
  error,
}) => (
  <>
    <label htmlFor={label} className="sr-only">
      {label}
    </label>
    <input
      id={label}
      name={label}
      type={type}
      autoComplete={autoComplete}
      className="input-form"
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
    <p className="error-msg">{error}</p>
  </>
);

export default InputField;

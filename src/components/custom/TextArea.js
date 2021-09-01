import { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      name,
      label,
      errorMessage,
      required,
      rows = 3,
      maxLength = 500,
      value,
      onChange,
      dark = false,
    },
    ref
  ) => (
    <div className="text-field">
      <label className="label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        //required={required}
        className={`text-field-input textarea ${errorMessage ? "error" : ""} ${
          dark ? "dark" : ""
        }`}
        ref={ref}
        name={name}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="text-field-error">{errorMessage}</p>}
    </div>
  )
);

export default TextArea;

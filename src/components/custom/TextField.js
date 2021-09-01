import { forwardRef } from "react";

const TextField = forwardRef(
  (
    {
      name,
      label,
      errorMessage,
      required,
      type = "text",
      value,
      onChange,
      placeholder,
      iconLabel = false,
      dark = false,
    },
    ref
  ) => (
    <div className={value ? "changed text-field" : "text-field"}>
      <label
        className={`${iconLabel ? "label icon-label" : "label"}`}
        htmlFor={name}
      >
        {iconLabel && iconLabel}
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        //required={required}
        className={`text-field-input ${errorMessage ? "error" : ""} ${
          dark ? "dark" : ""
        }`}
        ref={ref}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      />
      {errorMessage && <p className="text-field-error">{errorMessage}</p>}
    </div>
  )
);

export default TextField;

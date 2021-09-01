import { useState, useRef } from "react";
import { ChevronDown } from "react-feather";
import useOutsideClick from "../hooks/useOutsideClick";

const DropDown = ({
  options,
  onChange,
  value,
  label,
  iconLabel = false,
  dark = false,
}) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });

  const getActiveName = options.find((option) => option.id === value).name;

  const handleDropDownChange = (id) => {
    if (value !== id) {
      onChange(id);
    }
    setOpen(false);
  };

  return (
    <div className={value ? "changed dropdown-wrap" : "dropdown-wrap"}>
      <label className={`${iconLabel ? "label icon-label" : "label"}`}>
        {iconLabel && iconLabel}
        {label}
      </label>
      <div className="dropdown" ref={wrapperRef}>
        <button
          type="button"
          className={`${dark ? "dark" : ""} dropdown-button button icon`}
          onClick={() => setOpen(!open)}
        >
          <ChevronDown size={14} />
          <p>{getActiveName}</p>
        </button>
        {open && (
          <div className="dropdown-options">
            {options &&
              options.map((option) => (
                <div
                  className={`dropdown-option ${
                    option.id === value ? "active" : ""
                  }`}
                  onClick={() => handleDropDownChange(option.id)}
                  key={option.id}
                >
                  {option.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;

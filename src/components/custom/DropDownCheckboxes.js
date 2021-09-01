import { useState, useRef } from "react";
import { RotateCcw } from "react-feather";
import TextField from "./TextField";
import { ChevronDown } from "react-feather";

import useOutsideClick from "../hooks/useOutsideClick";
const DropDownCheckBoxes = ({
  options,
  setOptions,
  label,
  iconLabel = false,
  dark = false,
}) => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });

  const selectedOptions = options.filter((option) => option.selected);
  const dropDownText = () => {
    if (!selectedOptions || !selectedOptions.length) {
      return `Velg ${label.toLowerCase()}`;
    }

    if (selectedOptions.length === 1) {
      const sliceText = (text, num) => {
        if (!text) return "";
        return text.length > num ? text.slice(0, num) + "..." : text;
      };

      return sliceText(selectedOptions[0].name, 10);
    }

    return `${selectedOptions.length} valgt`;
  };

  const handleChecked = (option) => {
    let newOptions = [...options];
    // find index
    const indx = newOptions.findIndex((item) => item.name === option.name);
    newOptions[indx].selected = !newOptions[indx].selected;
    setOptions(newOptions);
  };

  const emptyCheckboxes = () => {
    let newOptions = options.map((option) => {
      return { ...option, selected: false };
    });
    setOptions(newOptions);
    setTerm("");
  };

  const filteredOptions = term
    ? options.filter((option) => option.name.toLowerCase().includes(term))
    : options;

  const onTermChange = (term) => {
    setTerm(term.toLowerCase());
  };

  return (
    <>
      <div
        className={
          selectedOptions?.length > 0
            ? "changed dropdown-wrap"
            : "dropdown-wrap"
        }
      >
        <label className={`${iconLabel ? "label icon-label" : "label"}`}>
          {iconLabel && iconLabel}
          {`${label} (${options.length})`}
        </label>
        <div className="dropdown" ref={wrapperRef}>
          <button
            type="button"
            className={`${dark ? "dark" : ""} dropdown-button button icon`}
            onClick={() => setOpen(!open)}
          >
            <ChevronDown size={14} />
            <p>{dropDownText()}</p>
          </button>
          {open && (
            <div className="checkboxes">
              <div
                className={
                  options.length > 8
                    ? "checkboxes-options-compact dropdown-options checkboxes-options"
                    : "dropdown-options checkboxes-options"
                }
              >
                {options.length > 8 && (
                  <div className="dropdown-options-tf">
                    <TextField
                      value={term}
                      onChange={(e) => onTermChange(e.target.value)}
                      placeholder={`Søk på ${label.toLowerCase()}`}
                    />
                    <span
                      onClick={emptyCheckboxes}
                      className="empty-checkboxes"
                    >
                      <RotateCcw size={14} />
                    </span>
                  </div>
                )}

                {options &&
                  filteredOptions
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((option) => (
                      <div
                        className="checkbox"
                        onClick={() => handleChecked(option)}
                        key={option.name}
                      >
                        <div
                          className={`checkbox-icon ${
                            option.selected ? "checked" : ""
                          }`}
                        ></div>
                        <p className="checkbox-title">{option.name}</p>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDownCheckBoxes;

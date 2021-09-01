import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "react-feather";

import useOutsideClick from "../hooks/useOutsideClick";

const YearPicker = ({ onChange, value, text = "velg år", dark = false }) => {
  const wrapperRef = useRef(null);

  const [year, setYear] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorPoints, setAnchorPoints] = useState({});

  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });

  const skip = (e, amount_skipped = 9, add = true) => {
    e.preventDefault();

    if (add) {
      setYear(year + amount_skipped);
    }

    if (!add) {
      if (year >= amount_skipped) {
        setYear(year - amount_skipped);
      }
    }
  };

  const handleChange = (newYear) => {
    setOpen(false);

    if (!newYear) {
      onChange(null);
      return;
    }

    // check if valid
    if (newYear >= 0 && newYear < 3000) {
      onChange(newYear);
    } else {
      console.log("error, year is not valid");
    }
  };

  const _handleKeyDown = (e, val) => {
    if (e.key === "Enter") {
      handleChange(parseInt(val));
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setYear(new Date().getFullYear());
  };

  const handleShowYears = (e) => {
    e.preventDefault();
    if (value) {
      setYear(value);
    } else {
      setYear(new Date().getFullYear());
    }

    if (!open) {
      const fromLeft = wrapperRef.current.offsetLeft;
      const offsetRight = wrapperRef.current.offsetWidth + fromLeft;
      const w = window.innerWidth;
      const y = wrapperRef.current.offsetTop;
      const wy = document.querySelector(".wrap").offsetHeight;
      const fromRight = w - offsetRight;
      let myStyle = {};

      if (fromLeft + 270 < w) {
        myStyle = { ...myStyle, left: "0px", right: "initial" };
      } else if (fromLeft < fromRight) {
        myStyle = { ...myStyle, left: "0px", right: "initial" };
      } else if (fromLeft > fromRight) {
        myStyle = { ...myStyle, right: "0px", left: "initial" };
      }

      if (y + 270 > wy) {
        myStyle = { ...myStyle, bottom: "calc(100% + 0.5rem)", top: "initial" };
      }
      setAnchorPoints(myStyle);
    }

    setOpen(!open);
  };

  return (
    <div
      ref={wrapperRef}
      className={value ? "changed year-picker" : "year-picker"}
    >
      <button
        type="button"
        className={`${dark ? "dark" : ""} button`}
        onClick={handleShowYears}
      >
        {value ? value : text}
      </button>
      {open && (
        <div style={anchorPoints} className="year-picker-content">
          <input
            className="text-field-input"
            onKeyDown={(e) => _handleKeyDown(e, e.target.value)}
            autoFocus
            placeholder="Skriv inn årstall"
            type="text"
          />
          <div className="actions">
            <div onClick={(e) => skip(e, 18, false)}>
              <ChevronsLeft size="21" />
            </div>
            <div onClick={(e) => skip(e, 9, false)}>
              <ChevronLeft size="21" />
            </div>
            <div onClick={handleReset}>{new Date().getFullYear()}</div>
            <div onClick={(e) => skip(e, 9, true)}>
              <ChevronRight size="21" />
            </div>
            <div onClick={(e) => skip(e, 18, true)}>
              <ChevronsRight size="21" />
            </div>
          </div>
          <div className="years">
            {[...Array(9)].map((_, i) => (
              <div
                className={value === year + i ? "active-year" : ""}
                onClick={() => handleChange(year + i)}
                key={i}
              >
                {year + i}
              </div>
            ))}
          </div>
          <div
            className="reset-year-picker"
            onClick={() => [onChange(null), setOpen(false)]}
          >
            Fjern år
          </div>
        </div>
      )}
    </div>
  );
};

export default YearPicker;

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  Calendar,
} from "react-feather";
import useOutsideClick from "../hooks/useOutsideClick";
import { dateToString } from "../functions/common";

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const weekdays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

const DatePicker = ({ value, onChange, text = "Velg dato", dark = false }) => {
  const wrapperRef = useRef(null);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [anchorPoints, setAnchorPoints] = useState({});
  const [open, setOpen] = useState(false);

  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });

  const handleYearChange = (add = true, amount = 1) => {
    if (add) {
      year + amount < 3000 ? setYear(year + amount) : console.log("year error");
    } else {
      year + amount > 0 ? setYear(year - amount) : console.log("year error");
    }
  };

  const handleMonthChange = (add = true) => {
    if (add) {
      if (month >= 11) {
        setMonth(0);
        if (year < 3000) {
          setYear(year + 1);
        }
      } else {
        setMonth(month + 1);
      }
    } else {
      if (month <= 0) {
        setMonth(11);
        if (year > 0) {
          setYear(year - 1);
        }
      } else {
        setMonth(month - 1);
      }
    }
  };

  const handleDateChange = (day) => {
    setOpen(false);
    onChange(new Date(year, month, day + 1));
  };

  const isSelectedDate = (i) => {
    if (value) {
      return value.getFullYear() === year &&
        value.getMonth() === month &&
        value.getDate() - 1 === i
        ? "selected-date"
        : "";
    }
    return "";
  };

  const renderDaysBefore = [...Array(new Date(year, month, 0).getDay())].map(
    (_, i) => <div className="days-before" key={i}></div>
  );
  const renderDays = [...Array(new Date(year, month + 1, 0).getDate())].map(
    (_, i) => (
      <div
        onClick={() => handleDateChange(i)}
        className={`day ${isSelectedDate(i)}`}
        key={i}
      >
        {i + 1}
      </div>
    )
  );

  const renderWeekDays = weekdays.map((dayName) => (
    <div key={dayName}>{dayName}</div>
  ));

  const handleShowDatePicker = (e) => {
    e.preventDefault();
    if (value) {
      setYear(value.getFullYear());
      setMonth(value.getMonth());
    } else {
      setYear(new Date().getFullYear());
      setMonth(new Date().getMonth());
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

      if (y + 300 > wy) {
        myStyle = { ...myStyle, bottom: "calc(100% + 0.5rem)", top: "initial" };
      }
      setAnchorPoints(myStyle);
    }

    setOpen(!open);
  };

  return (
    <div
      ref={wrapperRef}
      className={value ? "changed date-picker" : "date-picker"}
    >
      <button
        type="button"
        className={`${dark ? "dark" : ""} button icon`}
        onClick={handleShowDatePicker}
      >
        <Calendar size={16} />
        {value ? dateToString(value, true) /* short format */ : text}
      </button>
      {open && (
        <div style={anchorPoints} className="date-picker-content">
          <div className="actions">
            <div className="month-actions">
              <div onClick={() => handleMonthChange(false)}>
                <ChevronLeft size="21" />
              </div>
              <p onClick={() => setMonth(new Date().getMonth())}>
                {months[month]}
              </p>
              <div onClick={handleMonthChange}>
                <ChevronRight size="21" />
              </div>
            </div>
            <div className="year-actions">
              <div onClick={() => handleYearChange(false)}>
                <ChevronLeft size="21" />
              </div>
              <div onClick={() => handleYearChange(false, 5)}>
                <ChevronsLeft size="21" />
              </div>
              <p onClick={() => setYear(new Date().getFullYear())}>{year}</p>
              <div onClick={() => handleYearChange(true, 5)}>
                <ChevronsRight size="21" />
              </div>
              <div onClick={handleYearChange}>
                <ChevronRight size="21" />
              </div>
            </div>
          </div>
          <div className="weekdays">{renderWeekDays}</div>
          {year && (
            <div className="days">
              {renderDaysBefore}
              {renderDays}
            </div>
          )}

          <div className="bottom-actions">
            <div
              className="set-today"
              onClick={() => [onChange(new Date()), setOpen(false)]}
            >
              I dag
            </div>
            <div
              onClick={() => [onChange(null), setOpen(false)]}
              className="remove-date"
            >
              Fjern dato
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

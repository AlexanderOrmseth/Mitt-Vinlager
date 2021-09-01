import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../custom/TextField";
import DropDown from "../../../custom/DropDown";
import FilterOptions from "./FilterOptions";
import { Filter, X, Camera, CameraOff, Grid, List } from "react-feather";

const WineFilter = ({
  countries,
  grapes,
  types,
  term,
  setTerm,
  orderBy,
  filters,
  wineView,
}) => {
  const dispatch = useDispatch();
  const wineListName = useSelector((state) => state.wineList);
  const wineOrderBy = useSelector((state) => state.wineOrderBy);

  const [open, setOpen] = useState(false);

  const handleTermChange = (e) => {
    // max length?
    // delay update?
    setTerm(e.target.value);
  };

  const changeList = (newList) => {
    if (newList === "CUSTOM_FILTER") setOpen(true);
    dispatch({ type: "CHANGED_LIST", payload: newList });
  };

  const changeOrderBy = (newOrderById) => {
    dispatch({ type: "CHANGED_ORDER", payload: newOrderById });
  };

  return (
    <div className="wine-list-options cpd ">
      <section className="wine-list-top-options">
        <div className="search">
          <TextField
            onChange={handleTermChange}
            value={term}
            label="Søk i vinsamlingen"
            placeholder="Navn på vin"
            dark
          />
        </div>
        <div className="options-actions">
          <DropDown
            options={filters}
            value={wineListName}
            label="Velg liste"
            onChange={changeList}
            dark
          />
          <DropDown
            options={orderBy}
            value={wineOrderBy}
            label="Sorter"
            dark
            onChange={changeOrderBy}
          />
          <div className="break"></div>
          <button onClick={() => setOpen(!open)} className="button icon dark">
            {!open ? <Filter size={16} /> : <X size={16} />}
            Avansert filter
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "CHANGED_VIEW",
                payload: { compact: !wineView.compact },
              })
            }
            className={
              (wineView.compact ? "active " : "") + "button icon-only dark"
            }
          >
            {wineView.compact ? <CameraOff size={16} /> : <Camera size={16} />}
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "CHANGED_VIEW",
                payload: { listView: !wineView.listView },
              })
            }
            className={
              (wineView.listView ? "active " : "") + "button icon-only dark"
            }
          >
            {wineView.listView ? <List size={16} /> : <Grid size={16} />}
          </button>
        </div>
      </section>

      {open && (
        <FilterOptions
          setSearchTerm={setTerm}
          types={types}
          countries={countries}
          grapes={grapes}
        />
      )}
    </div>
  );
};

export default WineFilter;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// custom inputs
import TextField from "../../../custom/TextField";
import DropDown from "../../../custom/DropDown";
import YearPicker from "../../../custom/YearPicker";
import DatePicker from "../../../custom/DatePicker";
import DropDownCheckBoxes from "../../../custom/DropDownCheckboxes";

// icons
import { Check, RotateCcw } from "react-feather";

const favorites = [
  {
    id: 0,
    name: "Alle",
  },
  {
    id: 1,
    name: "Kun favoritter",
  },
  {
    id: 2,
    name: "Kun ikke-favoritter",
  },
];

const inStorage = [
  {
    id: 0,
    name: "Alle",
  },
  {
    id: 1,
    name: "På lager",
  },
  {
    id: 2,
    name: "Ikke på lager",
  },
];

const score = [
  {
    id: 0,
    name: "Alle",
  },
  {
    id: 1,
    name: "0,5",
  },
  {
    id: 2,
    name: "1",
  },
  {
    id: 3,
    name: "1,5",
  },
  {
    id: 4,
    name: "2",
  },
  {
    id: 5,
    name: "2,5",
  },
  {
    id: 6,
    name: "3",
  },
  {
    id: 7,
    name: "3,5",
  },
  {
    id: 8,
    name: "4",
  },
  {
    id: 9,
    name: "4,5",
  },
  {
    id: 10,
    name: "5",
  },
];

const FilterOptions = ({ types, countries, grapes, setSearchTerm }) => {
  // store
  const dispatch = useDispatch();
  const wineFilter = useSelector((state) => state.wineFilter);

  // initial values for dynamic settings
  const initialTypeOptions = types.map((item) => {
    return { selected: wineFilter.types.includes(item), name: item };
  });
  const initialCountryOptions = countries.map((item) => {
    return { selected: wineFilter.countries.includes(item), name: item };
  });

  const initialIngredientsOptions = grapes.map((item) => {
    return { selected: wineFilter.grapes.includes(item), name: item };
  });

  // state
  const [typeOptions, setTypeOptions] = useState(initialTypeOptions);
  const [countryOptions, setCountryOptions] = useState(initialCountryOptions);
  const [ingredientsOptions, setIngredientsOptions] = useState(
    initialIngredientsOptions
  );

  const [favoritesDropdownValue, setFavoritesDropdownValue] = useState(
    wineFilter.favorites || 0
  );
  const [inStorageDropdownValue, setInStorageDropdownValue] = useState(
    wineFilter.inStorage || 0
  );
  const [scoreDropdownValue, setScoreDropdownValue] = useState(
    wineFilter.score || 0
  );

  const [minPrice, setMinPrice] = useState(wineFilter.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(wineFilter.maxPrice || "");
  const [placePurchased, setPlacePurchased] = useState(
    wineFilter.placePurchased || ""
  );

  const [startYear, setStartYear] = useState(wineFilter.startYear || null);
  const [endYear, setEndYear] = useState(wineFilter.endYear || null);

  const [startDate, setStartDate] = useState(wineFilter.startDate || null);
  const [endDate, setEndDate] = useState(wineFilter.endDate || null);
  const [drinkBetweenStart, setDrinkBetweenStart] = useState(null);
  const [drinkBetweenEnd, setDrinkBetweenEnd] = useState(null);

  const handleResetFilters = () => {
    const resetCheckboxes = (val) => {
      return val.map((item) => {
        return { selected: false, name: item.name };
      });
    };

    // checkboxes
    setTypeOptions(resetCheckboxes(typeOptions));
    setCountryOptions(resetCheckboxes(countryOptions));
    setIngredientsOptions(resetCheckboxes(ingredientsOptions));
    // Dropdown
    setFavoritesDropdownValue(0);
    setInStorageDropdownValue(0);
    setScoreDropdownValue(0);
    // textFields
    setMinPrice("");
    setMaxPrice("");
    setPlacePurchased("");

    // dates
    setStartYear(null);
    setEndYear(null);
    setStartDate(null);
    setEndDate(null);
    setDrinkBetweenStart(null);
    setDrinkBetweenEnd(null);
    setSearchTerm("");

    // set redux
    //dispatch({ type: "RESET_FILTER", payload: null });
    //dispatch({ type: "CHANGED_LIST", payload: "CUSTOM_FILTER" });
  };

  const handleApplyFilters = () => {
    // create arrays
    const countries = countryOptions
      .filter((item) => item.selected)
      .map((type) => type.name);
    const types = typeOptions
      .filter((item) => item.selected)
      .map((type) => type.name);
    const grapes = ingredientsOptions
      .filter((item) => item.selected)
      .map((type) => type.name);

    // create settings object with filters
    const customFilter = {
      types,
      countries,
      grapes,
      favorites: favoritesDropdownValue,
      inStorage: inStorageDropdownValue,
      score: scoreDropdownValue,
      placePurchased: placePurchased.toLowerCase().trim(),
      minPrice,
      maxPrice,
      startYear,
      endYear,
      startDate,
      endDate,
      drinkBetweenStart,
      drinkBetweenEnd,
    };

    // set redux
    dispatch({ type: "APPLIED_FILTER", payload: customFilter });
    dispatch({ type: "CHANGED_LIST", payload: "CUSTOM_FILTER" });
  };

  return (
    <div className="custom-filter">
      <div className="custom-filter-settings">
        <div className="custom-filter-input-row">
          <div className="filter-input-flex">
            <TextField
              name="min_price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              label="Min pris"
              dark
            />
            <TextField
              name="max_price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              label="Max pris"
              dark
            />
          </div>
          <TextField
            name="place_purchased"
            value={placePurchased}
            onChange={(e) => setPlacePurchased(e.target.value)}
            label="Kjøpested"
            dark
          />
          <div>
            <label className="label">Årgang</label>
            <div className="filter-input-flex">
              <YearPicker
                value={startYear}
                onChange={setStartYear}
                text="Min årgang"
                dark
              />
              <YearPicker
                value={endYear}
                onChange={setEndYear}
                text="Max årgang"
                dark
              />
            </div>
          </div>
          <div>
            <label className="label">Drikkes mellom</label>
            <div className="filter-input-flex">
              <YearPicker
                value={drinkBetweenStart}
                onChange={setDrinkBetweenStart}
                text="Fra årstall"
                dark
              />
              <YearPicker
                value={drinkBetweenEnd}
                onChange={setDrinkBetweenEnd}
                text="Til årstall"
                dark
              />
            </div>
          </div>
        </div>
        <div className="custom-filter-input-row">
          <div className="filter-input-flex">
            <DropDown
              options={favorites}
              value={favoritesDropdownValue}
              label="Favoritt"
              onChange={setFavoritesDropdownValue}
              dark
            />
            <DropDown
              options={score}
              value={scoreDropdownValue}
              label="Minimum stjerner"
              onChange={setScoreDropdownValue}
              dark
            />
          </div>

          <DropDown
            options={inStorage}
            value={inStorageDropdownValue}
            label="På lager"
            onChange={setInStorageDropdownValue}
            dark
          />

          <div>
            <label className="label">Dato kjøpt</label>
            <div className="filter-input-flex">
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                text="Velg fra dato"
                dark
              />
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                text="Velg til dato"
                dark
              />
            </div>
          </div>
        </div>

        <div className="custom-filter-input-row">
          {ingredientsOptions && (
            <DropDownCheckBoxes
              options={ingredientsOptions}
              label="Råstoff"
              dark
              setOptions={setIngredientsOptions}
            />
          )}
          {countryOptions && (
            <DropDownCheckBoxes
              options={countryOptions}
              label="Land"
              dark
              setOptions={setCountryOptions}
            />
          )}
          {typeOptions && (
            <DropDownCheckBoxes
              options={typeOptions}
              label="Type"
              dark
              setOptions={setTypeOptions}
            />
          )}
        </div>
      </div>

      <div className="custom-filter-actions">
        <button onClick={handleApplyFilters} className="button icon primary">
          <Check size={18} />
          Vis resultat
        </button>

        <button onClick={handleResetFilters} className="button icon delete">
          <RotateCcw size={18} />
          Tilbakestill
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;

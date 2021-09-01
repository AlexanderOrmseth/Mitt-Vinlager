import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

// redux
import { getWine } from "../../../../actions/wine";
import { useSelector, useDispatch } from "react-redux";

// components
import Wine from "./WineListItem";
import WineTableItem from "./WineTableItem";
import WineFilter from "../filter/WineFilter";

import { Frown } from "react-feather";
import WineListToolBar from "./WineListToolBar";

// flag
import "../../../../flags/flag.css";
// loading
import Loading from "../../../custom/Loading";
// modals
import ModalDelete from "../../../modals/ModalDelete";
import ModalDrank from "../../../modals/ModalDrank";

const orderBy = [
  {
    id: "PRICE_ASC",
    name: "Pris: høy → lav",
    fnc: (a, b) => b.price - a.price,
  },
  {
    id: "PRICE_DESC",
    name: "Pris: lav → høy",
    fnc: (a, b) => a.price - b.price,
  },
  {
    id: "NAME_ASC",
    name: "Navn: A → Å",
    fnc: (a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    id: "NAME_DESC",
    name: "Navn: Å → A",
    fnc: (a, b) => {
      if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
      if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    id: "COUNTRY",
    name: "Land",
    fnc: (a, b) => {
      if (a.origin.country?.toLowerCase() < b.origin.country?.toLowerCase())
        return -1;
      if (a.origin.country?.toLowerCase() > b.origin.country?.toLowerCase())
        return 1;
      return 0;
    },
  },
  {
    id: "TYPE",
    name: "Type",
    fnc: (a, b) => {
      if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
      if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
      return 0;
    },
  },
  {
    id: "AMOUNT",
    name: "Antall",
    fnc: (a, b) => b.amount - a.amount,
  },
  {
    id: "YEAR",
    name: "Årgang",
    fnc: (a, b) => a.year - b.year,
  },
  {
    id: "DATE_DESC",
    name: "Dato kjøpt",
    fnc: (a, b) =>
      (b != null) - (a != null) ||
      new Date(b.dates.purchased_date) - new Date(a.dates.purchased_date),
  },
  {
    id: "DATE_ADDED",
    name: "Dato lagt til",
    fnc: (a, b) =>
      (b != null) - (a != null) ||
      new Date(b.createdAt) - new Date(a.createdAt),
  },
];

// values for orderByDropDown
const orderByDropDown = orderBy.map((item) => {
  return { id: item.id, name: item.name };
});

const filtersDropdown = [
  {
    id: "ALL",
    name: "Alle",
  },
  {
    id: "DRINK_BETWEEN",
    name: "Alle med drikkevindu",
  },
  {
    id: "IN_STORAGE",
    name: "Alle på lager",
  },
  {
    id: "FAVORITE",
    name: "Dine favoritter",
  },
  {
    id: "CUSTOM_FILTER",
    name: "Tilpasset liste",
  },
];

const WineList = () => {
  const dispatch = useDispatch();
  // selector
  const wine = useSelector((state) => state.wine);
  // order
  const wineListName = useSelector((state) => state.wineList);
  const wineOrderBy = useSelector((state) => state.wineOrderBy);
  const wineFilter = useSelector((state) => state.wineFilter);

  const wineView = useSelector((state) => state.wineView);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState();
  const [deleteModalData, setDeleteModalData] = useState({
    id: null,
    amount: null,
    year: null,
    name: "",
  });
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  // Drank Modal
  const [drankModal, setDrankModal] = useState(false);
  const [drankId, setDrankId] = useState(null);
  const handleCloseDrankModal = () => {
    setDrankModal(false);
  };

  // state
  const [term, setTerm] = useState("");

  useEffect(() => {
    // load wine list from server
    if (!wine) {
      dispatch(getWine());
    }
  }, [wine, dispatch]);

  const wineAfterFilter = useMemo(() => {
    if (!wine || !wineFilter) {
      return [];
    }

    const filter = [
      {
        id: "ALL",
        fnc: (wine) => wine,
      },
      {
        id: "DRINK_BETWEEN",
        fnc: (wine) =>
          wine.dates.drink_between_start && wine.dates.drink_between_end,
      },
      {
        id: "IN_STORAGE",
        fnc: (wine) => wine.amount > 0,
      },
      {
        id: "FAVORITE",
        fnc: (wine) => wine.favorite,
      },
      {
        id: "CUSTOM_FILTER",
        fnc: (wine) => {
          // Typer
          if (wineFilter.types.length > 0) {
            if (!wineFilter.types.includes(wine.type.toLowerCase())) {
              return false;
            }
          }
          // Land
          if (wineFilter.countries.length > 0) {
            if (
              !wineFilter.countries.includes(wine.origin.country.toLowerCase())
            ) {
              return false;
            }
          }
          // Grapes / Ingredients
          if (wineFilter.grapes.length > 0) {
            if (!wine.grapes) return false;
            // get this wine ingredients
            const wineIngredients = wine.grapes
              .replace(/[0-9%]/g, "")
              .toLowerCase()
              .split(",")
              .map((ingredient) => ingredient.trim());
            if (
              !wineFilter.grapes.every((ingredient) =>
                wineIngredients.includes(ingredient)
              )
            ) {
              return false;
            }
          }
          // favoritter
          if (wineFilter.favorites > 0) {
            const val = wineFilter.favorites === 1 ? true : false;
            if (val !== wine.favorite) return false;
          }
          // in storage
          if (wineFilter.inStorage > 0) {
            const val = wineFilter.inStorage === 1 ? true : false;
            if ((val && wine.amount === 0) || (!val && wine.amount > 0)) {
              return false;
            }
          }
          // score
          if (wineFilter.score > 0) {
            if (!wine.rating || wine.rating === 0) {
              return false;
            }
            if (wine.rating < wineFilter.score) {
              return false;
            }
          }
          // min Price
          if (wineFilter.minPrice && wineFilter.minPrice.length > 0) {
            const minPrice = parseInt(wineFilter.minPrice);
            if (isNaN(minPrice)) return false;
            if (wine.price < minPrice) return false;
          }
          // max price
          if (wineFilter.maxPrice && wineFilter.maxPrice.length > 0) {
            const maxPrice = parseInt(wineFilter.maxPrice);
            if (isNaN(maxPrice)) return false;
            if (wine.price > maxPrice) return false;
          }
          // Year Start
          if (wineFilter.startYear && wineFilter.startYear > wine.year)
            return false;
          // Year End
          if (wineFilter.endYear && wineFilter.endYear < wine.year)
            return false;
          // Year DrinkBetween Start
          if (
            wineFilter.drinkBetweenStart &&
            wineFilter.drinkBetweenStart > wine.dates.drink_between_start
          )
            return false;
          // Year DrinkBetween End
          if (
            wineFilter.drinkBetweenEnd &&
            wineFilter.drinkBetweenEnd < wine.dates.drink_between_end
          )
            return false;
          if (wineFilter.startDate) {
            const date = new Date(wine.dates.purchased_date);
            if (wineFilter.startDate > date) {
              return false;
            }
          }
          if (wineFilter.endDate) {
            const date = new Date(wine.dates.purchased_date);
            if (wineFilter.endDate < date) {
              return false;
            }
          }
          // Kjøpested
          if (
            wineFilter.placePurchased &&
            wineFilter.placePurchased.length > 0
          ) {
            if (!wine.place_purchased) return false;

            if (
              !wine.place_purchased
                .toLowerCase()
                .includes(wineFilter.placePurchased)
            ) {
              return false;
            }
          }
          return true;
        },
      },
    ];

    console.log(">> Rendered filtered wine <<");
    return (
      wine
        // apply search term
        .filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase().trim())
        ) // apply filter
        .filter((item) =>
          filter.find((filter) => filter.id === wineListName).fnc(item)
        )
    );
  }, [wine, wineFilter, term, wineListName]);

  const dynamicInputValues = useMemo(() => {
    if (!wine) return;

    console.log(">> Updated values for dynamic inputs <<");

    const countries = [
      ...new Set(
        wine
          .filter((wine) => wine.origin.country)
          .map((wine) => {
            return wine.origin.country.toLowerCase();
          })
      ),
    ];
    const types = [
      ...new Set(
        wine.map((wine) => {
          return wine.type.toLowerCase().trim();
        })
      ),
    ];
    const grapes = [
      ...new Set(
        wine
          .filter((wine) => wine.grapes)
          .map((wine) => wine.grapes.replace(/[0-9%?]/g, ""))
          .join(",")
          .toLowerCase()
          .split(",")
          .map((ingredient) => ingredient.trim())
      ),
    ];

    return { countries, types, grapes };
  }, [wine]);

  // loading
  if (!wine) {
    return <Loading />;
  }

  const handleDrankClicked = (id) => {
    setDrankModal(true);
    setDrankId(id);
  };

  // no wine
  if (!wine.length) {
    return (
      <div className="cpd fff-block">
        <div className="page-header">
          <h2 className="title">Vinlageret ditt er tomt</h2>
        </div>
        <div className="main-content">
          <label className="label">Trykk her for å legge til en vin</label>
          <Link className="button-link" to="/wine/add">
            <button className="button primary">Legg til vin</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wine-list-wrap">
      <ModalDrank
        id={drankId}
        closeModal={handleCloseDrankModal}
        isOpen={drankModal}
      />
      <ModalDelete
        wine={deleteModalData}
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
      />

      <WineFilter
        countries={dynamicInputValues.countries}
        types={dynamicInputValues.types}
        grapes={dynamicInputValues.grapes}
        term={term}
        setTerm={setTerm}
        orderBy={orderByDropDown}
        filters={filtersDropdown}
        wineView={wineView}
      />

      {wine && wineAfterFilter.length ? (
        <>
          <WineListToolBar count={`${wineAfterFilter.length}/${wine.length}`} />
          <div className="wine-list-container cpd">
            {!wineView.listView ? (
              <div
                className={
                  (wineView?.compact ? "wine-list-compact " : "") + "wine-list"
                }
              >
                {wineAfterFilter
                  .sort(orderBy.find((order) => order.id === wineOrderBy).fnc)
                  .map((wine) => (
                    <Wine
                      handleDrankClicked={handleDrankClicked}
                      setDeleteModal={setDeleteModal}
                      setDeleteModalData={setDeleteModalData}
                      key={wine._id}
                      wine={wine}
                    />
                  ))}
              </div>
            ) : (
              <div className="wine-table-list-wrap">
                <div className="wine-table-list-header">
                  <div>Navn</div>
                  <div>Årgang</div>
                  <div>Type</div>
                  <div>Pris</div>
                  <div>Karakter</div>
                  <div>Antall</div>
                  <div>Drikkevindu</div>
                  <div>Rediger/Drukket/Slett</div>
                </div>
                {wineAfterFilter
                  .sort(orderBy.find((order) => order.id === wineOrderBy).fnc)
                  .map((wine) => (
                    <WineTableItem
                      handleDrankClicked={handleDrankClicked}
                      setDeleteModal={setDeleteModal}
                      setDeleteModalData={setDeleteModalData}
                      key={wine._id}
                      wine={wine}
                    />
                  ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="no-results cpd">
          <Frown size={60} strokeWidth={1.5} />
          <h3>
            Ingen treff på
            <span>
              {filtersDropdown
                .find((item) => item.id === wineListName)
                .name.toLowerCase()}
            </span>
            av totalt {wine?.length || "ERROR"} mulige.
          </h3>
        </div>
      )}
    </div>
  );
};

export default WineList;

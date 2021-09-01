const initialValue = {
  types: [],
  countries: [],
  grapes: [],
  favorites: 0,
  inStorage: 0,
  score: 0,
  startYear: null,
  endYear: null,
  startDate: null,
  endDate: null,
  drinkBetweenStart: null,
  drinkBetweenEnd: null,
  minPrice: "",
  maxPrice: "",
  placePurchased: "",
};

const wineCustomFilterReducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "APPLIED_FILTER":
      return payload;
    case "RESET_FILTER":
      return initialValue;
    case "APPLIED_ONE_TERM":
      return { ...initialValue, ...payload };
    default:
      return state;
  }
};

export default wineCustomFilterReducer;

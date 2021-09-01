const wineOrderByReducer = (state = "DATE_ADDED", action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGED_ORDER":
      return payload;
    default:
      return state;
  }
};

export default wineOrderByReducer;

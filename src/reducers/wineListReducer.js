const wineListReducer = (state = "IN_STORAGE", action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGED_LIST":
      return payload;
    default:
      return state;
  }
};

export default wineListReducer;

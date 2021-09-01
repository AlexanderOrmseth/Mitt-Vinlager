const wineReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_WISH_LIST":
      return payload;
    default:
      return state;
  }
};

export default wineReducer;

const wineReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_WINE_LIST":
      return payload;
    case "DELETE_WINE":
      return state.filter((wine) => wine._id !== payload);
    default:
      return state;
  }
};

export default wineReducer;

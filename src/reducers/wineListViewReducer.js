const wineListView = (state = { compact: false, listView: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGED_VIEW":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default wineListView;

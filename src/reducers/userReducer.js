const userReducer = (state = { done: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case "IS_LOGGED_IN":
      return payload;
    case "SET_USER":
      return payload;
    case "REMOVE_USER":
      return payload;
    default:
      return state;
  }
};

export default userReducer;

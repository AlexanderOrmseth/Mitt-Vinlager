import { combineReducers } from "redux";
import userReducer from "./userReducer";
import wineReducer from "./wineReducer";
import wineListReducer from "./wineListReducer";
import wineOrderByReducer from "./wineOrderByReducer";
import wineCustomFilterReducer from "./wineCustomFilterReducer";
import wineListViewReducer from "./wineListViewReducer";
import wishListReducer from "./wishListReducer";
export default combineReducers({
  wineView: wineListViewReducer,
  wishList: wishListReducer,
  user: userReducer,
  wine: wineReducer,
  wineList: wineListReducer,
  wineOrderBy: wineOrderByReducer,
  wineFilter: wineCustomFilterReducer,
});
